import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const cx = classNames.bind(styles);

function DefaultLayout() {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <Header />
        </div>
        
        <div className={cx("container")} style={{ marginTop: "40px", padding: "0px"}}>
          <div className={cx("content")} style={{ padding: "0px" }}>
            <Outlet />
          </div>
        </div>

        <div className={cx("footer")}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
