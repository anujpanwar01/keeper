import { memo, useContext } from "react";
import TogglerContext from "../../context/toggler-context/toggler-context";
import CustomInput from "../custom-input/CustomInut.component";
import { FaMoon, FaSun } from "react-icons/fa";
import "./Theme.styles.scss";

const ThemeComponent = (props) => {
  console.log("theme");
  const { theme, setTheme } = useContext(TogglerContext);

  const themeChanger = () => {
    setTheme(!theme);
  };

  const body = document.body;
  !theme && body.classList.add("bg-black");
  theme && body.classList.remove("bg-black");

  return (
    <div className={`theme ${props.className}`}>
      <CustomInput
        id="check"
        className={"check-box"}
        type="checkbox"
        handleChange={themeChanger}
      />
      <label htmlFor="check" className="theme-btn toggle-btn">
        <div className="sun">
          {" "}
          <FaMoon color="#8f8f8f" />
        </div>
        <div className="moon">
          {" "}
          <FaSun color="#ff9e00" />
        </div>
        <div className="toggle-thumb" />
        <span className="theme-btn-text">change Theme</span>
      </label>
    </div>
  );
};
export default memo(ThemeComponent);
