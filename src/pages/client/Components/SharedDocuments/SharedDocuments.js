import React, { useEffect, useState } from "react";
import { Card, Row, Col, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { getSharedDocuments } from "~/services/documentService";
import { StarFilled } from "@ant-design/icons";
import "./SharedDocument.scss";
import Loading from "../../Loading";

const SharedDocuments = ({ userData }) => {
  const [sharedDocs, setSharedDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSharedDocs = async () => {
      try {
        const response = await getSharedDocuments(); // page = 0, size = 10 mặc định
        const rawDocs = response.result.content || [];
        const docs = Array.from(
          new Map(rawDocs.map((doc) => [doc.id, doc])).values()
        );

        console.log("Shared documents response:", docs);
        setSharedDocs(docs);
      } catch (error) {
        console.error("Lỗi khi lấy tài liệu được chia sẻ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedDocs();
  }, []);

  const handleCardClick = (docId) => {
    navigate(`/documents/${docId}`);
  };

  return (
    <div className="shared-documents">
      {loading ? (
        <Loading />
      ) : sharedDocs.length > 0 ? (
        <Row gutter={[16, 16]}>
          {sharedDocs.map((doc, index) => (
            <Col span={8} key={index}>
              <Card
                title={doc.title}
                bordered={false}
                className="shared-doc-card"
                hoverable
                onClick={() => handleCardClick(doc.id)}
              >
                <p>
                  <strong>Chuyên mục : </strong> {doc.category?.name}
                </p>
                <p>
                  <strong>Lượt xem : </strong> {doc.views}
                </p>
                <p>
                  <strong>Lượt tải : </strong> {doc.downloads}
                </p>
                <p>
                  <strong>Đánh giá : </strong>{" "}
                  {doc.averageRating?.toFixed(1) ?? "Chưa có"}{" "}
                  <StarFilled style={{ color: "#fadb14" }} />
                </p>

                {doc.previewUrls?.length > 0 && (
                  <img
                    src={doc.previewUrls[0]}
                    alt="Preview"
                    style={{ width: "100%", marginTop: 8 }}
                  />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="Chưa có tài liệu nào được chia sẻ." />
      )}
    </div>
  );
};

export default SharedDocuments;
