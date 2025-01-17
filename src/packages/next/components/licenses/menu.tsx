import { Menu } from "antd";
import { Icon } from "@cocalc/frontend/components/icon";
import { useRouter } from "next/router";

export default function ConfigMenu({ main }) {
  const router = useRouter();

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[main]}
      style={{ height: "100%" }}
      onSelect={(e) => {
        router.push(`/licenses/${e.keyPath[0]}`, undefined, {
          scroll: false,
        });
      }}
    >
      <Menu.Item key={""}>
        <b style={{ color: "#666" }}>Licenses</b>
      </Menu.Item>
      <Menu.Item key={"managed"}>
        <Icon name={"key"} style={{ marginRight: "5px" }} /> Manage
      </Menu.Item>
      <Menu.Item key={"projects"}>
        <Icon name={"edit"} style={{ marginRight: "5px" }} />
        Projects
      </Menu.Item>
      <Menu.Item key={"how-used"}>
        <Icon name={"key"} style={{ marginRight: "5px" }} /> How Used
      </Menu.Item>
    </Menu>
  );
}
