/*
Render any element
*/

import { Element } from "../types";
import Text from "./text";
import Note from "./note";
import Code from "./code";
import Frame from "./frame";
import Generic from "./generic";
import Pen from "./pen";
import Timer from "./timer";
import Selection from "./selection";
import Icon from "./icon";
import Edge from "./edge";
import Chat from "./chat";

interface Props {
  element: Element;
  focused: boolean;
  canvasScale: number;
}

export default function Render(props: Props) {
  /* dumb for now, but will be a cool plugin system like we used for our slate wysiwyg editor....*/

  switch (props.element.type) {
    case "text":
      return <Text {...props} />;
    case "icon":
      return <Icon {...props} />;
    case "note":
      return <Note {...props} />;
    case "code":
      return <Code {...props} />;
    case "frame":
      return <Frame {...props} />;
    case "pen":
      return <Pen {...props} />;
    case "timer":
      return <Timer {...props} />;
    case "edge":
      return <Edge {...props} />;
    case "chat":
      return <Chat {...props} />;
    case "selection":
      return <Selection {...props} />;
    default:
      return <Generic {...props} />;
  }
}