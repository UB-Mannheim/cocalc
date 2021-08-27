import A from "components/misc/A";
import Logo from "components/logo-rectangular";
import { Layout } from "antd";
import { useCustomize } from "lib/customize";

function Item({
  first,
  children,
}: {
  first?: boolean;
  children: string | JSX.Element;
}) {
  if (first) return <>{children}</>;
  return (
    <>
      &nbsp;{" – "}&nbsp;{children}
    </>
  );
}

export default function Footer() {
  const { siteName, organizationName, termsOfServiceURL, contactEmail } =
    useCustomize();
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        borderTop: "1px solid lightgrey",
      }}
    >
      <div>
        {siteName ?? <Item first>CoCalc</Item>}
        <Item>
          <A href="https://cocalc.com/index.html">CoCalc</A>
        </Item>
        {organizationName && <Item>{organizationName}</Item>}
        {termsOfServiceURL && (
          <Item>
            <A href={termsOfServiceURL}>Terms of Service</A>
          </Item>
        )}
        {contactEmail && (
          <Item>
            <A href={"mailto:" + contactEmail}>Contact {contactEmail}</A>
          </Item>
        )}
      </div>
      <br />
      <div>
        <Logo style={{ height: "40px" }} />
      </div>
    </Layout.Footer>
  );
}
