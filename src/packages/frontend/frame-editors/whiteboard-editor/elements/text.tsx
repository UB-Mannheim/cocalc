import { useEffect, useMemo, useRef, useState } from "react";
import { useFrameContext } from "../hooks";
import { Element } from "../types";
import { DEFAULT_FONT_SIZE } from "../tools/defaults";
import TextStatic, { getStyle, PADDING } from "./text-static";
export { getStyle };
import { useIsMountedRef } from "@cocalc/frontend/app-framework";
import { debounce } from "lodash";
import MultiMarkdownInput from "@cocalc/frontend/editors/markdown-input/multimode";
import { three_way_merge as threeWayMerge } from "@cocalc/sync/editor/generic/util";
import { SAVE_DEBOUNCE_MS } from "@cocalc/frontend/frame-editors/code-editor/const";

interface Props {
  element: Element;
  focused?: boolean;
  canvasScale: number;
  readOnly?: boolean;
  noteMode?: boolean; // used for sticky note
  cursors?: { [account_id: string]: any[] };
}

export default function Text(props: Props) {
  if (props.readOnly || !props.focused || props.element.locked) {
    return <TextStatic element={props.element} />;
  }
  return <EditText {...props} />;
}

function EditText({
  element,
  canvasScale,
  noteMode,
  cursors,
}: {
  element: Element;
  canvasScale: number;
  noteMode?: boolean;
  cursors?;
}) {
  const isMounted = useIsMountedRef();
  const [value, setValue] = useState<string>(element.str ?? "");
  const [editFocus, setEditFocus] = useState<boolean>(false);
  const { actions, id: frameId } = useFrameContext();
  const editorDivRef = useRef<HTMLDivElement>(null);
  const lastRemote = useRef<string>(element.str ?? "");
  const valueRef = useRef<string>(value);
  const setting = useRef<boolean>(false);
  const save = useMemo(() => {
    return debounce(() => {
      if (!isMounted.current || lastRemote.current == valueRef.current) return;
      lastRemote.current = valueRef.current;
      try {
        setting.current = true;
        actions.setElement({ obj: { id: element.id, str: valueRef.current } });
      } finally {
        setting.current = false;
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    if (setting.current) return;
    const base = lastRemote.current;
    const remote = element.str ?? "";
    const newVal = threeWayMerge({
      base,
      local: valueRef.current,
      remote: element.str ?? "",
    });
    if (newVal != valueRef.current) {
      valueRef.current = newVal;
      lastRemote.current = remote;
      setValue(newVal);
    }
  }, [element.str]);

  useEffect(() => {
    return () => {
      actions.setElement({ obj: { id: element.id, str: valueRef.current } });
    };
  }, []);

  useEffect(save, [value]);

  return (
    <div
      style={{
        ...getStyle(element),
        padding: `${PADDING}px ${PADDING}px 0 ${PADDING}px `,
        height: "100%",
      }}
      className={editFocus ? "nodrag" : undefined}
    >
      <MultiMarkdownInput
        cacheId={element.id}
        noVfill
        autoFocus
        minimal
        hideHelp
        editorDivRef={editorDivRef}
        onFocus={() => setEditFocus(true)}
        onBlur={() => setEditFocus(false)}
        onShiftEnter={() => {
          const id = actions.createAdjacentElement(element.id, "bottom");
          if (!id) return;
          actions.setSelectedTool(frameId, "select");
          actions.setSelection(frameId, id);
          actions.centerElement(id);
        }}
        value={value}
        fontSize={element.data?.fontSize ?? DEFAULT_FONT_SIZE}
        onChange={(value) => {
          valueRef.current = value;
          setValue(value);
          setTimeout(() => {
            // possibly adjust height.  We do this in the next render
            // loop because sometimes when the change fires the dom
            // hasn't updated the height of the containing div yet,
            // so we end up setting the height 1 step behind reality.
            const elt = editorDivRef.current;
            if (elt == null) return;
            const height = elt.offsetHeight;
            if (height != null) {
              if (element.h != height) {
                actions.setElement({
                  obj: { id: element.id, h: height + 2 * PADDING + 2 + 15 },
                  commit: false,
                });
              }
            }
          }, 0);
        }}
        editBarStyle={{
          top: noteMode ? "-32px" : `${-55 - 5 / canvasScale}px`,
          left: "5px",
          position: "absolute",
          border: "1px solid #ccc",
          borderRadius: "3px",
          boxShadow: "1px 3px 5px #ccc",
          margin: "5px",
          minWidth: "500px",
          background: "white",
          transform: noteMode
            ? `scale(${Math.min(0.8, 1 / canvasScale)})`
            : `scale(${1 / canvasScale})`,
          transformOrigin: "bottom left",
          fontFamily: "sans-serif",
        }}
        markdownToggleStyle={noteMode ? { right: "-23px" } : undefined}
        onCursors={(cursors) => {
          actions.setCursors(element.id, cursors);
        }}
        cursors={cursors}
        onSave={() => {
          actions.save(true);
        }}
        onUndo={() => {
          actions.undo();
        }}
        onRedo={() => {
          actions.redo();
        }}
      />
    </div>
  );
}
