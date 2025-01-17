/*
Handle incoming JSON messages from a project.
*/

import handleVersion from "./handle-version";
import handleQuery from "./handle-query";
import handleSyncdoc from "./handle-syncdoc";
import { error, pong } from "@cocalc/util/message";
import getLogger from "@cocalc/backend/logger";
const logger = getLogger("project-connection:handle-message");

interface Options {
  socket;
  project_id: string;
  mesg;
}

const callCallbacks: { [id: string]: Function } = {};

export default async function handleMessage({
  socket,
  project_id,
  mesg,
}: Options): Promise<void> {
  logger.debug("received message ", project_id);

  if (mesg.event == "version") {
    handleVersion(project_id, mesg.version);
    return;
  }
  // globally unique random uuid
  const { id } = mesg;
  if (id == null) {
    // all messages except "version" must have an id
    logger.warn("WARNING: all messages except 'version' must have an id", mesg);
    return;
  }

  const f = callCallbacks[id];
  if (f != null) {
    f(mesg);
    return;
  }

  logger.debug("handling call from project");
  function sendResponse(resp) {
    resp.id = id;
    socket.write_mesg("json", resp);
  }

  try {
    switch (mesg.event) {
      case "ping":
        sendResponse(pong());
        return;
      case "query":
      case "query_cancel":
        await handleQuery({ project_id, mesg, sendResponse });
        return;
      case "get_syncdoc_history":
        await handleSyncdoc({ project_id, mesg, sendResponse });
        return;
      case "file_written_to_project":
      case "file_read_from_project":
      case "error":
        // ignore/deprecated/don't care...?
        return;
      default:
        throw Error(`unknown event '${mesg.event}'`);
    }
  } catch (err) {
    sendResponse(error({ error: `${err}` }));
  }
}
