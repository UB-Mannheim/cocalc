import { Layout } from "antd";
import Footer from "components/landing/footer";
import A from "components/misc/A";
import Header from "components/landing/header";
import Content from "components/landing/content";
import withCustomize from "lib/with-customize";
import { Customize } from "lib/customize";
import Head from "components/landing/head";
import { Icon } from "@cocalc/frontend/components/icon";
import Pitch from "components/landing/pitch";

import WhiteboardImage from "/public/features/whiteboard-sage.png";

export default function Whiteboard({ customize }) {
  return (
    <Customize value={customize}>
      <Head title="Mathematical Whiteboard" />
      <Layout>
        <Header page="features" subPage="whiteboard" />
        <Layout.Content>
          <div style={{ backgroundColor: "#c7d9f5" }}>
            <Content
              logo={<Icon name="layout" style={{ fontSize: "100px" }} />}
              title={<h1>Online Whiteboard</h1>}
              subtitle={
                <>
                  <hr />
                  Sketch out ideas and run Jupyter code cells with CoCalc's
                  mathematical whiteboard
                </>
              }
              image={WhiteboardImage}
            />
          </div>

          <Pitch
            col1={
              <div>
                <h2>A full featured online collaborative whiteboard</h2>
                <p>
                  CoCalc{"'"}s collaborative mathematical whiteboard supports an
                  infinite canvas with
                </p>
                <ul>
                  <li>
                    <strong>text</strong> with mathematical formulas,
                  </li>
                  <li>
                    sticky <strong>notes</strong>,
                  </li>
                  <li>
                    sketching with <strong>pens</strong>,
                  </li>
                  <li>
                    <A href="/features/jupyter-notebook">Jupyter</A>{" "}
                    <strong>code cells</strong>,
                  </li>
                  <li>
                    <strong>chat</strong> conversations with your friends,
                  </li>
                  <li>
                    <strong>stopwatches</strong> and{" "}
                    <strong>countdown timers</strong> to organize and track
                    work.
                  </li>
                </ul>
              </div>
            }
            col2={
              <div>
                <h2>The Whiteboard with Jupyter cells and more!</h2>
                You can use Jupyter notebook code cells with over a dozen
                supported kernels, a massive library of pre-installed software,
                and interactive widgets, with execution ordered determined by a
                directed graph. You
                <ul>
                  <li>
                    create <strong>edges</strong> between all objects,
                  </li>
                  <li>
                    use <strong>frames</strong> to organize the whiteboard into
                    sections,
                  </li>
                  <li>
                    infinitely <strong>split your editor</strong> windows to
                    view multiple parts of the whiteboard simultaneously,
                  </li>
                  <li>
                    easily navigate with an <strong>overview map</strong>,
                  </li>
                  <li>
                    every change you make is recorded via browseable{" "}
                    <strong>TimeTravel</strong>,
                  </li>
                  <li>
                    and you can <strong>publish</strong> your whiteboards to{" "}
                    <A href="/share">the share server</A>.
                  </li>
                </ul>
              </div>
            }
          />
        </Layout.Content>

        <div
          style={{
            color: "#555",
            fontSize: "40px",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <A href="https://github.com/sagemathinc/cocalc/pull/5674">
            Coming in March 2022!
          </A>
        </div>
        <Footer />
      </Layout>
    </Customize>
  );
}

export async function getServerSideProps(context) {
  return await withCustomize({ context });
}
