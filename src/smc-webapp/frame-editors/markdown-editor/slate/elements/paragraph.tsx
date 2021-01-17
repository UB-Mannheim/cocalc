/*
 *  This file is part of CoCalc: Copyright © 2020 Sagemath, Inc.
 *  License: AGPLv3 s.t. "Commons Clause" – see LICENSE.md for details
 */

import { React } from "../../../../app-framework";
import { register } from "./register";

register({
  slateType: "paragraph",

  toSlate: ({ token, children }) => {
    // We include a tight property when hidden is true, since that's the
    // hack that markdown-it uses for parsing tight lights.
    return {
      ...{ type: "paragraph", children },
      ...(token.hidden ? { tight: true } : {}),
    };
  },

  Element: ({ attributes, children, element }) => {
    if (element.tight) {
      return <span {...attributes}>{children}</span>;
    }
    return <p {...attributes}>{children}</p>;
  },

  fromSlate: ({ node, children }) => {
    if (children.trim() == "" && !node.tight) {
      // We put in an invisible space paragraph, which parses back fine
      // from markdown and preserves looking like an extra paragraph.
      // This is a pretty solid simple fix to the "vertical whitespace"
      // problem with markdown...  right?
      return "&nbsp;\n\n";
    }
    return `${children}${node.tight ? "\n" : "\n\n"}`;
  },
});
