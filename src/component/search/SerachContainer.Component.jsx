import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import TogglerContext from "../../context/toggler-context/toggler-context";
import CustomInput from "../custom-input/CustomInut.component";
import "./SearchContainer.styles.scss";

const SearchContainer = () => {
  const { searchValue, setSearchValue } = useContext(TogglerContext);
  const inputChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-container">
      <label className="search-icon" htmlFor="search">
        <FaSearch size={16} fill={"#555"} />
      </label>
      <CustomInput type="checkbox" className="checkbox" />
      <CustomInput
        type="search"
        id="search"
        value={searchValue}
        handleChange={inputChangeHandler}
        placeholder="search"
        className="search-box"
      />
      {
        <label
          style={
            searchValue ? { transform: "scale(0)" } : { transform: "scale(1)" }
          }
          className="key-btn"
          htmlFor="search"
        >
          /
        </label>
      }
    </div>
  );
};

export default SearchContainer;
