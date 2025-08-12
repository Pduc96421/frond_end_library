import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Search.module.scss";
import { Col, Select, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTags } from "~/services/documentService";

const cx = classNames.bind(styles);
const { Search } = Input;

function SearchUi({ isTag = false, redirect }) {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams("");
  const [selectedTag, setSelectedTag] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const keyword = searchParams.get("keyword") || "";
  const tag = searchParams.get("tag") || "";

  // Initialize searchValue from URL parameter
  useEffect(() => {
    setSearchValue(keyword);
  }, [keyword]);

  // Initialize selectedTag from URL parameter
  useEffect(() => {
    if (tag) {
      const tagObj = tagOptions.find((t) => t.name === tag);
      if (tagObj) {
        setSelectedTag(tagObj.id);
      }
    }
  }, [tag, tagOptions]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await getTags();
        if (response.code === 200) {
          setTagOptions(response.result);
        } else {
          dispatch(showAlert("Lỗi khi lấy danh sách thẻ tag", "error"));
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        dispatch(showAlert("Lỗi khi lấy danh sách thẻ tag", "error"));
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [dispatch]);

  const handlerSearch = async (value) => {
    // Include keyword and selected tag in search parameters
    let tagString = "";
    if (selectedTag) {
      const tagObj = tagOptions.find((t) => t.id === selectedTag);
      tagString = tagObj ? tagObj.name : "";
    }

    const params = new URLSearchParams();

    if (value) params.set("keyword", value);
    if (tagString) params.set("tag", tagString);

    navigate(`${redirect}/search?${params.toString()}`);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle select change for single tag
  const handleTagChange = (selectedValue) => {
    setSelectedTag(selectedValue);
  };

  // Convert tag options to format required by Select
  const selectOptions = tagOptions.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <Row gutter={16} className={cx("search-container")}>
      <Col xs={24} sm={16} md={12} lg={12} xl={12}>
        <Search
          placeholder="Tìm kiếm..."
          allowClear
          prefix={<SearchOutlined />}
          className={cx("search-input")}
          enterButton
          onSearch={(value) => handlerSearch(value)}
          value={searchValue}
          onChange={handleInputChange}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={8} md={6} lg={6} xl={5}>
        {isTag && (
          <Select
            placeholder="Chọn thẻ tag"
            style={{ width: "100%" }}
            options={selectOptions}
            value={selectedTag}
            onChange={handleTagChange}
            loading={loading}
            allowClear
          />
        )}
      </Col>
    </Row>
  );
}

export default SearchUi;
