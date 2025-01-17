import { A } from "@cocalc/frontend/components";
import { isCoCalcURL, parseCoCalcURL } from "@cocalc/frontend/lib/cocalc-urls";
import { redux } from "@cocalc/frontend/app-framework";

function loadTarget(
  project_id: string,
  target: string,
  switchTo: boolean,
  anchor: string
): void {
  // get rid of "?something" in "path/file.ext?something"
  const i = target.lastIndexOf("/");
  if (i > 0) {
    const j = target.slice(i).indexOf("?");
    if (j >= 0) target = target.slice(0, i + j);
  }
  // open project
  redux
    .getActions("projects")
    .open_project({ switch_to: switchTo, project_id });
  // open file in project
  redux
    .getProjectActions(project_id)
    .load_target(target, switchTo, false, true, anchor);
  if (switchTo) {
    // show project if switchTo
    redux.getActions("page").set_active_tab(project_id);
  }
}

interface Options {
  project_id: string;
  path: string;
}

export default function getAnchorTagComponent({ project_id, path }: Options) {
  return function AnchorTagComponent({ href, title, children }) {
    if (isCoCalcURL(href) && href.includes("/projects/")) {
      // CASE: Link inside a specific browser tab.
      // target starts with cloud URL or is absolute, and has /projects/ in it,
      // so we open the link directly inside this browser tab.
      return (
        <a
          title={title}
          href={href}
          target={"_blank"}
          rel={"noopener" /* only used in case of fallback */}
          onClick={(e: any) => {
            const { project_id, page, target, anchor } = parseCoCalcURL(href);
            if (project_id != null && target != null) {
              loadTarget(
                project_id,
                decodeURI(target),
                !(e.which === 2 || e.ctrlKey || e.metaKey),
                anchor ?? ""
              );
              e.preventDefault();
              return;
            } else if (page) {
              // opening a different top level page, e.g., all projects or account settings or something.
              redux.getActions("page").set_active_tab(page);
              e.preventDefault();
              return;
            }
            // this will fall back to default.
          }}
        >
          {children}
        </a>
      );
    }
    if (href.includes("://")) {
      // external non-cocalc URL
      return (
        <A href={href} title={title}>
          {children}
        </A>
      );
    } else {
      // Internal link -- this one is interesting of course.
      return (
        <a href={"foo/bar" + href} title={title}>
          {children}/{project_id}/{path}
        </a>
      );
    }
  };
}
