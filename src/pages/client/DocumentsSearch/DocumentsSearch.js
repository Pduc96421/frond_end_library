import { useParams, useSearchParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DocumentsSearch.module.scss";
import { getTags, likeDocument, searchDocument } from "~/services/documentService";
import { useState, useEffect } from "react";
import { Pagination, Empty, Select, Row, Col, Image, Button, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { showAlert } from "~/store/actions/alert";
import LoadingUi from "../Loading";

const cx = classNames.bind(styles);

function DocumentsSearch() {
  let { keyword } = useParams();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [tagsOptions, setTagOptions] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag") || "";
  const dispatch = useDispatch();

  // Determine selected tag based on URL parameter
  const [selectedTag, setSelectedTag] = useState(undefined);

  useEffect(() => {
    if (tag && tagsOptions.length > 0) {
      const foundTag = tagsOptions.find((t) => t.name === tag);
      if (foundTag) {
        setSelectedTag(foundTag.id);
      } else {
        setSelectedTag(undefined);
      }
    } else if (!tag) {
      setSelectedTag(undefined);
    }
  }, [tag, tagsOptions]);

  useEffect(() => {
    fetchApiDoc(pagination.current, pagination.pageSize);
    // eslint-disable-next-line
  }, [keyword, tag, pagination.current]);

  const fetchApiDoc = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);

      const searchKeyword = keyword?.trim() || "";

      const response = await searchDocument(searchKeyword, tag, page - 1, pageSize);
      if (response.code === 200) {
        setDocuments(response.result.content);
        setPagination((prev) => ({
          ...prev,
          current: page,
          pageSize: pageSize,
          total: response.result.totalElements,
        }));
      } else {
        setDocuments([]);
        setPagination((prev) => ({
          ...prev,
          total: 0,
        }));
        dispatch(showAlert("Không tìm thấy tài liệu phù hợp!", "warning"));
      }
    } catch (error) {
      setDocuments([]);
      setPagination((prev) => ({
        ...prev,
        total: 0,
      }));
      dispatch(showAlert("Lỗi khi tải danh sách tài liệu!", "error"));
    } finally {
      setLoading(false);
    }
  };

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await getTags();

        setTagOptions(response.result);
      } catch (error) {
        console.error("Error fetching tags:", error);
        dispatch(showAlert("Lỗi khi lấy danh sách thẻ tag", "error"));
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, [dispatch]);

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  // Update URL with selected tag when tag changes
  const handleTagChange = (selectedValue) => {
    setSelectedTag(selectedValue);

    // Reset to first page when filter changes
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));

    // Update the URL with the selected tag
    const params = new URLSearchParams(searchParams);

    if (selectedValue) {
      const selectedTagObj = tagsOptions.find((t) => t.id === selectedValue);
      if (selectedTagObj) {
        params.set("tag", selectedTagObj.name);
      }
    } else {
      params.delete("tag");
    }

    setSearchParams(params);
  };

  return (
    <div className={cx("search-wrapper")}>
      <div className={cx("search-header")}>
        <h2 className={cx("search-title")}>
          Kết quả với từ khóa <span className={cx("keyword")}>"{keyword}"</span>
          {tag && (
            <>
              {" "}
              và thẻ tag <span className={cx("keyword")}>"{tag}"</span>
            </>
          )}
        </h2>
        <div className={cx("filters")}>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={12} md={10} lg={8}>
              <div className={cx("content-filter")}>
                <p className={cx("title")}>Thẻ tag: </p>
                <div className={cx("select-wrapper")}>
                  <Select
                    placeholder="Chọn thẻ tag"
                    style={{ width: "100%", fontWeight: 500 }}
                    options={tagsOptions.map((tag) => ({
                      value: tag.id,
                      label: (
                        <span
                          style={{
                            fontWeight: tag.id === selectedTag ? 600 : 400,
                          }}
                        >
                          {tag.name}
                        </span>
                      ),
                    }))}
                    value={selectedTag}
                    onChange={handleTagChange}
                    loading={loading}
                    allowClear
                    dropdownStyle={{ maxHeight: 300, overflow: "auto" }}
                    suffixIcon={<span style={{ color: "#d9d9d9" }}>▾</span>}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={cx("content-doc")}>
        {loading ? (
          <div className={cx("loading")}>
            <LoadingUi />
          </div>
        ) : documents.length === 0 ? (
          <Empty description="Không tìm thấy tài liệu phù hợp." />
        ) : (
          <div className={cx("doc-list")}>
            {documents.map((doc) => (
              <div className={cx("doc-item")} key={doc.id}>
                <div className={cx("doc-thumb")}>
                  <Image.PreviewGroup>
                    <Image src={doc.previewUrls[0]} alt={doc.title} className={cx("preview-image")} />
                  </Image.PreviewGroup>
                </div>
                <div className={cx("doc-info")}>
                  <Link to={`/documents/${doc.id}`}>
                    <div className={cx("doc-title")}>{doc.title}</div>
                  </Link>
                  <div className={cx("doc-desc")}>{doc.description}</div>
                  <div className={cx("doc-meta")}>
                    <span>
                      <EyeOutlined /> {doc.views || 0}
                    </span>
                    <span>
                      <Tooltip title="Thích">
                        <Button
                          type="text"
                          icon={<LikeOutlined />}
                          className={cx("like-btn")}
                          // onClick={() => handleLike(doc.id)}
                        >
                          {doc.likes || 0}
                        </Button>
                      </Tooltip>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {pagination.total > pagination.pageSize && (
        <div className={cx("pagination")}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default DocumentsSearch;
