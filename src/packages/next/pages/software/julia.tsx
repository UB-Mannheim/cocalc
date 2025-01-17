import Footer from "components/landing/footer";
import Header from "components/landing/header";
import Head from "components/landing/head";
import withCustomize from "lib/with-customize";
import { Customize } from "lib/customize";
import JuliaLibraries from "components/landing/julia-libraries";
import Image from "components/landing/image";
import { Alert, Layout } from "antd";
import A from "components/misc/A";
import screenshot from "/public/software/julia-jupyter.png";

export default function Software({ customize }) {
  return (
    <Customize value={customize}>
      <Head title="Julia Packages in CoCalc" />
      <Header page="software" subPage="julia" />
      <Layout.Content
        style={{
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "15px auto",
            padding: "15px",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: "32pt", color: "#444" }}>
            Installed Julia Packages
          </h1>
          <div
            style={{ width: "50%", float: "right", padding: "0 0 15px 15px" }}
          >
            <Image src={screenshot} alt="Using Julia in a Jupyter notebook" />
          </div>
          <p>
            Julia is a fast modern compiled language that is{" "}
            <A href="/features/julia">well supported</A> on CoCalc. This table
            lists available <A href="https://julialang.org/">Julia</A>{" "}
            libraries. If something is missing, you can{" "}
            <A href="https://doc.cocalc.com/howto/install-julia-package.html">
              install additional libraries
            </A>
            , or request that we install them.
          </p>
          <Alert
            style={{ margin: "15px 0" }}
            message="Learn More"
            description={
              <span style={{ fontSize: "10pt" }}>
                Learn more about{" "}
                <strong>
                  <A href="/features/julia">Julia in CoCalc</A>
                </strong>{" "}
                and our{" "}
                <strong>
                  <A href="https://doc.cocalc.com/howto/pluto.html">Pluto</A>
                </strong>{" "}
                and{" "}
                <strong>
                  <A href="/features/jupyter-notebook">Jupyter</A>
                </strong>{" "}
                Notebook support.
              </span>
            }
            type="info"
            showIcon
          />

          <JuliaLibraries />
        </div>
        <Footer />
      </Layout.Content>
    </Customize>
  );
}

export async function getServerSideProps(context) {
  return await withCustomize({ context });
}
