/*
Viewer used by time travel to show whiteboard canvas at a particular point in time.
*/
import Canvas from "./canvas";

export default function WhiteboardTimeTravel({ syncdb, version, font_size }) {
  const elements = syncdb.version(version).get().toJS();
  return <Canvas elements={elements} font_size={font_size} margin={50} />;
}