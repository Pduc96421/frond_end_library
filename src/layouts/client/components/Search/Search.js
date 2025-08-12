import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  let [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Hàm xử lý khi người dùng nhấn nút tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      navigate('/documents/search');
    } else {
      navigate(`/documents/search/${trimmedValue}`);
    }

    setSearchValue("");
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("search-form")} onSubmit={handleSearchSubmit}>
        <input
          className={cx("search-input")}
          type="text"
          placeholder="Tìm kiếm..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button className={cx("search-button")} type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
}

export default Search;
