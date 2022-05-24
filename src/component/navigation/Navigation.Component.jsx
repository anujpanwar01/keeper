import { useContext } from "react";
import TogglerContext from "../../context/toggler-context/toggler-context";
import ThemeComponent from "../theme/Theme.Component";
import CustomBtn from "../custom-btn/CustomBtn";
import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import ShowUserProfileComponent from "../show-profile/ShowUserProfile.Component";
import "./Navigation.styles.scss";

const Navigation = () => {
  const { grid, setGrid } = useContext(TogglerContext);

  console.log("navigation");
  const gridChanger = () => setGrid(!grid);

  return (
    <nav>
      <CustomBtn className="grid-btn" handleChange={gridChanger}>
        {!grid ? <HiViewGrid size={32} /> : <MdViewStream size={32} />}
        <span className="grid-btn-text">List view</span>
      </CustomBtn>
      <ThemeComponent />
      <ShowUserProfileComponent />
    </nav>
  );
};
export default Navigation;
