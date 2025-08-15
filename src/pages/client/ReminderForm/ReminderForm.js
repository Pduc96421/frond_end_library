import React, { useEffect, useState } from "react";
import { Modal, Card, Space, Typography, Row, Col, Pagination, Empty, Switch, Button, Popconfirm } from "antd";
import { BellOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  createReminder,
  deleteReminder,
  getAllReminder,
  toggleReminder,
  updateReminder,
} from "~/services/reminderService";
import styles from "./ReminderForm.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";
import LoadingUi from "../Loading";
import ReminderAddModal from "../ReminderAddModal";

const cx = classNames.bind(styles);
const { Text, Title } = Typography;

const ReminderForm = ({ open, onCancel }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchReminders = async (page = 0, size = 10) => {
    try {
      const response = await getAllReminder(page, size);
      setReminders(response.result.content);
      setPagination({
        current: response.result.page + 1,
        pageSize: response.result.size,
        total: response.result.totalElements,
      });
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setInitialLoading(true);
      fetchReminders();
    }
  }, [open]);

  const handlePageChange = (page, pageSize) => {
    fetchReminders(page - 1, pageSize);
  };

  //add
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddReminder = async (values) => {
    setLoading(true);
    try {
      const response = await createReminder(values);
      if (response.code === 200) {
        dispatch(showAlert("Tạo nhắc nhở thành công", "success"));
        setShowAddModal(false);
        fetchReminders(); // Refresh the list
      }
    } catch (error) {
      dispatch(showAlert("Không thể tạo nhắc nhở", "error"));
    } finally {
      setLoading(false);
    }
  };
  // end add

  const ReminderCard = ({ reminder }) => {
    const handleToggle = async (checked) => {
      try {
        const response = await toggleReminder(reminder.id);
        if (response.code === 200) {
          dispatch(showAlert(checked ? "Đã bật nhắc nhở" : "Đã tắt nhắc nhở", "success"));
          // Refresh the reminders list
          fetchReminders(pagination.current - 1, pagination.pageSize);
        }
      } catch (error) {
        dispatch(showAlert("Không thể thay đổi trạng thái nhắc nhở", "error"));
        console.error("Toggle reminder error:", error);
      }
    };

    // edit
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditReminder = async (values) => {
      setLoading(true);
      try {
        const response = await updateReminder(reminder.id, values);
        if (response.code === 200) {
          dispatch(showAlert("Cập nhật nhắc nhở thành công", "success"));
          setShowEditModal(false);
          fetchReminders(pagination.current - 1, pagination.pageSize); // Refresh the list
        }
      } catch (error) {
        dispatch(showAlert("Không thể cập nhật nhắc nhở", "error"));
      } finally {
        setLoading(false);
      }
    };

    const handleDeleteReminder = async () => {
      try {
        const response = await deleteReminder(reminder.id);
        if (response.code === 200) {
          dispatch(showAlert("Xóa nhắc nhở thành công", "success"));
          fetchReminders(pagination.current - 1, pagination.pageSize);
        }
      } catch (error) {
        dispatch(showAlert("Không thể xóa nhắc nhở", "error"));
      }
    };

    return (
      <Card className={cx("reminder-card")} loading={loading}>
        <div className={cx("reminder-time-container")}>
          <div className={cx("time-display")}>
            <div className={cx("time")}>{moment(reminder.remindAt).format("HH:mm")}</div>
            <div className={cx("date")}>{moment(reminder.remindAt).format("DD/MM/YYYY")}</div>
          </div>
          <Space>
            <Switch checked={reminder.active} onChange={handleToggle} className={cx("reminder-switch")} />
            <div className={cx("action-buttons")}>
              <Button type="text" icon={<EditOutlined />} onClick={() => setShowEditModal(true)} />

              <Popconfirm
                title="Xóa nhắc nhở"
                description="Bạn có chắc chắn muốn xóa nhắc nhở này?"
                onConfirm={handleDeleteReminder}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          </Space>
        </div>

        <div className={cx("content")}>
          <Title className={cx("title")} level={4}>
            {reminder.title}
          </Title>
          <Text className={cx("description")}>{reminder.description}</Text>
        </div>

        <ReminderAddModal
          open={showEditModal}
          onCancel={() => setShowEditModal(false)}
          onSubmit={handleEditReminder}
          loading={loading}
          title="Chỉnh sửa nhắc nhở"
          initialValues={{
            ...reminder,
            remindAt: moment(reminder.remindAt),
          }}
        />
      </Card>
    );
  };

  return (
    <Modal
      title={
        <div className={cx("modal-title")}>
          <BellOutlined /> Danh sách nhắc nhở
        </div>
      }
      open={open}
      onCancel={onCancel}
      width={800}
      footer={null}
      className={cx("reminder-modal")}
    >
      <Button type="primary" onClick={() => setShowAddModal(true)} style={{ marginBottom: 16 }}>
        Thêm nhắc nhở
      </Button>

      {initialLoading ? (
        <div className={cx("loading-container")}>
          <LoadingUi />
        </div>
      ) : reminders.length === 0 ? (
        <Empty description="Chưa có nhắc nhở nào" />
      ) : (
        <>
          <div className={cx("reminders-container")}>
            <Row gutter={[16, 16]}>
              {reminders.map((reminder) => (
                <Col xs={24} key={reminder.id}>
                  <ReminderCard reminder={reminder} />
                </Col>
              ))}
            </Row>
          </div>
          <div className={cx("pagination-container")}>
            <Pagination
              current={pagination.current}
              total={pagination.total}
              pageSize={pagination.pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      <ReminderAddModal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onSubmit={handleAddReminder}
        loading={loading}
      />
    </Modal>
  );
};

export default ReminderForm;
