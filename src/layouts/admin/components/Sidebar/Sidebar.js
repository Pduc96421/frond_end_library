import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  FolderOutlined,
  SafetyOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import classNames from "classnames/bind";

import styles from "./SideBar.module.scss";
import config from "~/config";

const cx = classNames.bind(styles);

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: config.routesAdmin.dashboard,
      icon: <HomeOutlined />,
      label: "Tổng quan",
      onClick: () => navigate(config.routesAdmin.dashboard),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Người dùng",
      children: [
        {
          key: config.routesAdmin.users.list,
          label: "Danh sách người dùng",
          onClick: () => navigate(config.routesAdmin.users.list),
        },
      ],
    },
    {
      key: "documents",
      icon: <FileTextOutlined />,
      label: "Tài liệu",
      children: [
        {
          key: "/admin/documents",
          label: "Tất cả tài liệu",
          onClick: () => navigate("/admin/documents"),
        },
        {
          key: "/admin/documents/top-document",
          label: "Tài liệu nổi bật",
          onClick: () => navigate("/admin/documents/top-document"),
        },
        {
          key: "/admin/documents/upload",
          label: "Tải lên tài liệu",
          onClick: () => navigate("/admin/documents/upload"),
        },
        {
          key: '/admin/documents/all-tag',
          label: "Tất cả thẻ tag",
          onClick: () => navigate('/admin/documents/all-tag'),
        }
      ],
    },
    {
      key: "categories",
      icon: <BookOutlined />,
      label: "Danh mục",
      children: [
        {
          key: "/admin/categories",
          label: "Danh sách danh mục",
          onClick: () => navigate("/admin/categories"),
        },
      ],
    },
    {
      key: "libraries",
      icon: <FolderOutlined />,
      label: "Thư viện",
      children: [
        {
          key: "/admin/library",
          label: "Danh sách thư viện",
          onClick: () => navigate("/admin/library"),
        },
      ],
    },
    {
      key: "roles",
      icon: <SafetyOutlined />,
      label: "Phân quyền",
      children: [
        {
          key: "/admin/roles",
          label: "Vai trò",
          onClick: () => navigate("/admin/roles"),
        },
      ],
    },
  ];

  return (
    <div className={cx("sidebar")}>
      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname.split("/")[2]]}
        items={menuItems}
        className={cx("menu")}
      />
    </div>
  );
}

export default Sidebar;
