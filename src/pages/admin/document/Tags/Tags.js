import { Card, Col, Input, Row, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { SearchOutlined } from "@ant-design/icons";

import { getTags } from "~/services/documentService";
import styles from "./Tags.module.scss";

const cx = classNames.bind(styles);

const { Search } = Input;

function Tags() {
  const [dataTags, setDataTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    try {
      setLoading(true);
      const response = await getTags();
      console.log("response roles", response.result);
      if (response.code === 200) {
        setDataTags(response.result);
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
      title: "Tên thẻ",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
      render: (text, record) => {
        return (
          <Tooltip title={text}>
            <span>{text}</span>
          </Tooltip>
        );
      },
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
          dataSource={dataTags}
          rowKey={(record) => record.id}
          pagination={false}
          scroll={{ x: 1100 }}
          bordered
        />
      </Card>
    </>
  );
}

export default Tags;
