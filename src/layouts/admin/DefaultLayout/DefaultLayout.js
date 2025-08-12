import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import styles from "./DefaultLayout.module.scss";
import HeaderUi from "../components/Header";
import SidebarUI from "../components/Sidebar";

const { Sider, Content } = Layout;
const cx = classNames.bind(styles);

function DefaultLayout() {
  return (
    <>
      <Layout className={cx("wrapper")}>
        <header>
          <HeaderUi />
        </header>

        <Layout className={cx("container")}>
          <Sider width={250} className={cx("sidebar")}>
            <SidebarUI />
          </Sider>

          <Content className={cx("content")}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default DefaultLayout;
