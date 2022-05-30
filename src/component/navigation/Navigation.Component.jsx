import { useContext, useState } from "react";
import TogglerContext from "../../context/toggler-context/toggler-context";
import ThemeComponent from "../theme/Theme.Component";
import CustomBtn from "../custom-btn/CustomBtn";
import { HiViewGrid } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdViewStream } from "react-icons/md";
import ShowUserProfileComponent from "../show-profile/ShowUserProfile.Component";
import "./Navigation.styles.scss";
import MobileNavigation from "../mobile-navigation/mobile-navigation.component";
import UserContext from "../../context/user-context/user-context";
import useResize from "../../hooks/use-resize";
import GridBtn from "../grid-btn/grid-btn.component";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const width = useResize();

  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { grid, setGrid } = useContext(TogglerContext);

  const gridChanger = () => setGrid(!grid);
  const mobileNav = () => setOpenMobileNav((prev) => !prev);

  const openSearchContainer = () => {
    document.querySelector(".search-container").classList.toggle("open-search");

    document
      .querySelector(".checkbox-overlay")
      .classList.toggle("visi-checkbox-overlay");
  };
  return (
    <nav>
      {width < 901 && (
        <CustomBtn className="open-search-box" onClick={openSearchContainer}>
          <FaSearch size={16} fill={"#000"} />
        </CustomBtn>
      )}
      {width > 901 && <GridBtn onGrid={gridChanger} grid={grid} />}
      {width > 901 && <ThemeComponent className="big-theme" />}
      <ShowUserProfileComponent />
      {width < 901 && (
        <CustomBtn className="dots" handleChange={mobileNav}>
          <span />
          <span />
          <span />
        </CustomBtn>
      )}{" "}
      {width < 901 && (
        <MobileNavigation
          openNav={openMobileNav}
          user={currentUser}
          grid={grid}
          onGrid={gridChanger}
          onCloseMobileOverlay={setOpenMobileNav}
        />
      )}
    </nav>
  );
};
export default Navigation;
