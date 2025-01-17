/* File context, for rendering files on the share server. */

//
//     const context = useFrameContext();
//
// inside of any component being used inside of a CoCalc frame,
// and you get the project_id, path, and id of that particular
// frame, and probably more as we need it.

import React, { createContext, useContext, ReactNode } from "react";

interface IFileContext {
  AnchorTagComponent?: React.FC<{
    href?: string;
    children?: ReactNode;
    title?: string;
  }>;

  // If given, then when an anchor (A) tag is clicked
  // on, the given function is called.
  anchorTagAction?: (url: string) => void;

  // If given, then all href and src attributes in all
  // tags are transformed by urlTransform, except anchor
  // tags if anchorTagAction is defined.  If it returns
  // undefined, they are unchanged; if it returns a string,
  // they are replaced by that.
  urlTransform?: (url: string, tag?: string) => string | undefined;

  noSanitize?: boolean;
}

export const FileContext = createContext<IFileContext>({});

export const useFileContext = () => {
  return useContext(FileContext);
};
