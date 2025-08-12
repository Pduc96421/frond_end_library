import { Alert } from "antd";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Alert.module.scss";
import { useEffect } from "react";
import { hideAlert } from "~/store/actions/alert";

const cx = classNames.bind(styles);

function AlertUi() {
  const { message, type, show } = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);
  return (
    <>
      {show && (
        <Alert
          message={message}
          type={type}
          className={cx("alert")}
          showIcon
          closable
          onClose={() => dispatch(hideAlert())}
        />
      )}
    </>
  );
}

export default AlertUi;