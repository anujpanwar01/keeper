import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import TogglerContext from "../../context/toggler-context/toggler-context";
import CustomInput from "../custom-input/CustomInut.component";
import "./SearchContainer.styles.scss";

const SearchContainer = () => {
  const { searchValue, setSearchValue } = useContext(TogglerContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(() => window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  console.log(width);

  const forCheckBox = function (e) {
    // const checkbox = document.querySelector(".checkbox");
    // const overlay = document.querySelector(".checkbox-overlay");
    // checkbox.setAttribute("checked", true);
    // overlay.classList.add("checkbox-up");
    // setTimeout(() => (overlay.style.top = "0"), 3500);
  };

  const inputChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-container" onClick={forCheckBox}>
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
