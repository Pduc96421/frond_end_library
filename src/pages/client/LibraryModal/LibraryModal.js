import React, { useEffect, useState } from "react";
import { Modal, Select, Input, Button, Space, message } from "antd";
import {
  getAllLibraryOfUser,
  addDocumentToLibrary,
  createLibrary,
} from "~/services/libraryService";

const { Option } = Select;

function Library({ onClose, documentId }) {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibraryId, setSelectedLibraryId] = useState("");
  const [newLibraryName, setNewLibraryName] = useState("");
  const [newLibraryDesc, setNewLibraryDesc] = useState("");
  const [showCreateFields, setShowCreateFields] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      const res = await getAllLibraryOfUser();
      console.log(res);
      setLibraries(res.result.content);
    } catch (error) {
      message.error("Không thể tải danh sách thư viện.");
    }
  };

  const handleCreateLibrary = async () => {
    if (!newLibraryName.trim()) {
      return message.warning("Tên thư viện không được để trống.");
    }

    try {
      setLoading(true);
      const res = await createLibrary(newLibraryName, newLibraryDesc);
      message.success("Đã tạo thư viện mới.");
      const newLib = res.data;
      await fetchLibraries();
      setSelectedLibraryId(newLib.id); // Chọn luôn thư viện mới tạo
      setNewLibraryName("");
      setNewLibraryDesc("");
      setShowCreateFields(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = async () => {
    if (!selectedLibraryId) {
      return message.warning("Vui lòng chọn thư viện.");
    }

    try {
      setLoading(true);
      await addDocumentToLibrary(selectedLibraryId, documentId);
      message.success("Đã thêm tài liệu vào thư viện!");
      onClose();
    } catch (error) {
      message.error("Không thể thêm tài liệu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      onCancel={onClose}
      onOk={handleAddDocument}
      okText="Thêm vào thư viện"
      cancelText="Hủy"
      confirmLoading={loading}
      title="Thêm tài liệu vào thư viện"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          placeholder="Chọn thư viện"
          style={{ width: "100%" }}
          value={selectedLibraryId}
          onChange={(value) => setSelectedLibraryId(value)}
        >
          {libraries.map((lib) => (
            <Option key={lib.id} value={lib.id}>
              {lib.name}
            </Option>
          ))}
        </Select>

        {!showCreateFields && (
          <Button type="dashed" onClick={() => setShowCreateFields(true)}>
            + Tạo thư viện mới
          </Button>
        )}

        {showCreateFields && (
          <>
            <Input
              placeholder="Tên thư viện mới"
              value={newLibraryName}
              onChange={(e) => setNewLibraryName(e.target.value)}
            />
            <Input.TextArea
              placeholder="Mô tả thư viện"
              value={newLibraryDesc}
              onChange={(e) => setNewLibraryDesc(e.target.value)}
              autoSize={{ minRows: 2 }}
            />
            <Button type="primary" onClick={handleCreateLibrary}>
              Xác nhận tạo thư viện
            </Button>
            <Button onClick={() => setShowCreateFields(false)} type="link">
              Hủy
            </Button>
          </>
        )}
      </Space>
    </Modal>
  );
}

export default Library;
