import React from "react";
import { DataProps, hasHandler, getHandler, getPriority } from "./register";
import { all_fields_equal as allFieldsEqual } from "@cocalc/util/misc";
import useNBViewerContext from "@cocalc/frontend/jupyter/nbviewer/context";

function shouldMemoize(prev, next) {
  return (
    prev.message.equals(next.message) &&
    allFieldsEqual(prev, next, ["project_id", "directory", "trust"])
  );
}

export const Data: React.FC<DataProps> = React.memo((props) => {
  const nbviewer = useNBViewerContext();
  const data = props.message.get("data");
  if (data == null || typeof data.forEach != "function") {
    return null;
  }

  const types = data.keySeq().toJS();
  let type: string | undefined;
  if (nbviewer?.kernelspec?.language === "r") {
    // very special case -- using an R kernel inside nbviewer (so XSS prevention) -- prefer image, then plain text,
    // due to bugs in text/latex *and* unfriendly markdown *and* complicated html that XSS mangles.
    for (const x of types) {
      if (x.startsWith("image")) {
        type = x;
        break;
      }
    }
    if (type === undefined && types.includes("text/plain")) {
      type = "text/plain";
    }
  } else {
    type = getTypeToRender(types);
  }
  if (type == null) throw Error("bug");
  const H = getHandler(type);
  return <H type={type} value={data.get(type)} data={data} {...props} />;
}, shouldMemoize);

function getTypeToRender(types: string[]): string {
  // "Best" is just the first one otherwise?  Another heuristic seems to be
  // that text/html is better than image/*.
  const x: { priority: number; type: string }[] = [];
  for (const type of types) {
    if (hasHandler(type)) {
      x.push({ priority: getPriority(type), type });
    }
  }
  if (x.length == 0) return "unknown";
  x.sort((a, b) => b.priority - a.priority);
  return x[0].type;
}
