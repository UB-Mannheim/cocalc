/* Save other paths in # part of URL then redirect to the single page app.
   That this happened is assumed, e.g., in packages/static/src/init-app-base-path.ts

   This redirect is *undone* in @cocalc/frontend/client/handle-hash-url.ts
*/

import { parse } from "url";
import { join } from "path";
import { Router } from "express";
import basePath from "@cocalc/backend/base-path";

// All top level page "entry points" in the webapp must be listed here.
// Should be consistent with what is handled in @cocalc/frontend/history.ts
// and @cocalc/frontend/app/actions.ts
const ROUTES = ["admin", "help", "projects", "settings", "notifications"];

export default function init(router: Router) {
  const v: string[] = [];
  for (const path of ROUTES) {
    v.push(`/${path}*`);
  }
  router.get(v, (req, res) => {
    const q = parse(req.url, true).search || ""; // gives exactly "?key=value,key=..."
    res.redirect(join(basePath, "static/app.html#") + req.path.slice(1) + q);
  });
}
