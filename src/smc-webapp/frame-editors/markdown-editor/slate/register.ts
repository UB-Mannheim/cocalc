/*
 *  This file is part of CoCalc: Copyright © 2020 Sagemath, Inc.
 *  License: AGPLv3 s.t. "Commons Clause" – see LICENSE.md for details
 */

import { React } from "../../../app-framework";
import { RenderElementProps } from "slate-react";
import { Node } from "slate";
import { Token, State as MarkdownParserState } from "./markdown-to-slate";
import { Info } from "./slate-to-markdown";

export interface markdownToSlateOptions {
  type: string;
  token: Token;
  state: MarkdownParserState;
  level: number;
  math: string[];
  children: Node[];
  isEmpty: boolean;
}

export interface slateToMarkdownOptions {
  node: Node;
  children: string;
  info: Info;
  child_info: Info;
}

type markdownToSlateFunction = (markdownToSlateOptions) => Node | undefined;

type slateToMarkdownFunction = (slateToMarkdownOptions) => string;

interface Handler {
  slateType: string;
  Element: React.FC<RenderElementProps>;
  // markdownType is the optional type of the markdown token
  // if different than slateType; use an array if there are
  // multiple distinct types of markdown tokens to handle
  // with the same plugin.
  markdownType?: string | string[];
  toSlate: markdownToSlateFunction;
  fromSlate: slateToMarkdownFunction;
}

const renderer: { [slateType: string]: React.FC<RenderElementProps> } = {};
const markdownToSlate: {
  [tokenType: string]: markdownToSlateFunction;
} = {};
const slateToMarkdown: {
  [slateType: string]: slateToMarkdownFunction;
} = {};

export function register(h: Handler): void {
  if (renderer[h.slateType] != null) {
    throw Error(`render for slateType '${h.slateType}' already registered!`);
  }
  renderer[h.slateType] = h.Element;

  const x = h.markdownType ?? h.slateType;
  const types = typeof x == "string" ? [x] : x;
  for (const type of types) {
    if (markdownToSlate[type] != null) {
      throw Error(`markdownToSlate for type '${type}' already registered!`);
    }
    markdownToSlate[type] = h.toSlate;
  }

  if (slateToMarkdown[h.slateType] != null) {
    throw Error(
      `slateToMarkdown for type '${h.slateType}' already registered!`
    );
  }
  slateToMarkdown[h.slateType] = h.fromSlate;
}

export function getRender(slateType: string): React.FC<RenderElementProps> {
  if (renderer[slateType] == null) {
    createGenericPlugin(slateType);
    if (renderer[slateType] == null) {
      throw Error("getRender -- bug creating generic element plugin");
    }
  }
  return renderer[slateType];
}

export function getMarkdownToSlate(tokenType: string): markdownToSlateFunction {
  if (markdownToSlate[tokenType] == null) {
    createGenericPlugin(tokenType);
    if (markdownToSlate[tokenType] == null) {
      throw Error("getMarkdownToSlate -- bug creating generic element plugin");
    }
  }
  return markdownToSlate[tokenType];
}

export function getSlateToMarkdown(slateType: string): slateToMarkdownFunction {
  if (slateToMarkdown[slateType] == null) {
    createGenericPlugin(slateType);
    if (slateToMarkdown[slateType] == null) {
      throw Error("getSlateToMarkdown -- bug creating generic element plugin");
    }
  }
  return slateToMarkdown[slateType];
}

// Create a generic plugin for the given type since it was
// requested, but wasn't defined.
function createGenericPlugin(type: string) {
  // console.log("createGenericPlugin", { type });
  renderer[type] = renderer[""];
  markdownToSlate[type] = markdownToSlate[""];
  slateToMarkdown[type] = slateToMarkdown[""];
  if (
    renderer[type] == null ||
    markdownToSlate[type] == null ||
    slateToMarkdown[type] == null
  ) {
    throw Error("no generic plugin -- define generic plugin with type ''");
  }
}

// Now import all the element plugins:
import "./elements";
