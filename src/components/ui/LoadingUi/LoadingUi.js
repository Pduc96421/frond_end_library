import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./LoadingUi.module.scss";

const cx = classNames.bind(styles);

function LoadingUi({
  size = "large",
  fullScreen = false,
  tip = "Đang tải...",
}) {
  const { isLoading } = useSelector((state) => state.loadingReducer);

  if (!isLoading) return null;

  return (
    <div className={cx("loadingContainer", { fullScreen })}>
      <div className={cx("loadingContent")}>
        <div className={cx("loader")}></div>
      </div>
    </div>
  );
}

LoadingUi.propTypes = {
  size: PropTypes.oneOf(["small", "default", "large"]),
  fullScreen: PropTypes.bool,
  tip: PropTypes.string,
};

export default LoadingUi;
