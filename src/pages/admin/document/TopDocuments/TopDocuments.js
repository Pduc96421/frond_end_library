import { Button, Card, Image, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { EyeOutlined } from "@ant-design/icons";

import { getTopDocument } from "~/services/documentService";
import styles from "./TopDucuments.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function TopDocuments() {
  const [dataTopDocuments, setDataTopDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      setLoading(true);
      const response = await getTopDocument();
      console.log("response", response.result);
      if (response.code === 200) {
        setDataTopDocuments(response.result);
      } else {
        console.error("Error fetching top documents:", response.message);
      }
    } catch (error) {
      console.error("Error fetching top documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (text, record, index) => {
        return <span key={`index-${index}`}>{index + 1}</span>;
      },
    },
    {
      title: "Preview",
      key: "preview",
      dataIndex: "previewUrls",
      width: 150,
      align: "center",
      render: (_, record) => (
        <Image.PreviewGroup>
          <Image
            src={record.previewUrls?.[0] || ""}
            alt={record.title}
            className={cx("preview-image")}
          />
        </Image.PreviewGroup>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 150,
      align: "center",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "danh mục",
      dataIndex: "category_name",
      key: "category_name",
      width: "30%",
      align: "center",
      render: (_, record) => <span>{record.category.name}</span>,
    },
    {
      title: "Số lượt tải",
      dataIndex: "downloads",
      key: "downloads",
      width: 50,
      align: "center",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "views",
      dataIndex: "views",
      key: "views",
      width: 50,
      align: "center",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 130,
      align: "center",
      render: (_, record) => (
        <Space size="middle" className={cx("action-buttons")}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/admin/documents/detail/${record.id}`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Card title="Danh sách tải liệu nổi bật" className={cx("card-wrapper")}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataTopDocuments}
          rowKey={(record) => record.id}
          pagination={false}
          scroll={{ x: 1100 }}
          bordered
        />
      </Card>
    </>
  );
}

export default TopDocuments;
