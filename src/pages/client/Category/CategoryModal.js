import { useEffect, useState } from "react";
import { Modal } from "antd";
import classNames from "classnames/bind";
import styles from "./CategoryModal.module.scss";
import { useNavigate } from "react-router-dom";
import config from "~/config";
import { getCategories } from "~/services/categoryService";

const cx = classNames.bind(styles);

function CategoryModal({ open, onClose }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (open) {
      getCategories()
        .then((res) => {
          if (res.code === 200) {
            setCategories(res.result);
          }
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        });
    }
  }, [open]);

  const handleCategoryClick = (categoryId) => {
    navigate(config.routesClient.category.replace(":categoryId", categoryId));
    onClose();
  };

  return (
    <Modal
      title="Danh Mục"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      className={cx("category-modal")}
    >
      <div className={cx("category-container")}>
        {categories.map((item) => (
          <div
            key={item.id}
            className={cx("category-item")}
            onClick={() => handleCategoryClick(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default CategoryModal;
