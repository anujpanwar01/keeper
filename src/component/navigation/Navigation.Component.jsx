import { useContext, useState } from "react";
import TogglerContext from "../../context/toggler-context/toggler-context";
import ThemeComponent from "../theme/Theme.Component";
import CustomBtn from "../custom-btn/CustomBtn";
import { HiViewGrid } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdViewStream } from "react-icons/md";
import ShowUserProfileComponent from "../show-profile/ShowUserProfile.Component";
import "./Navigation.styles.scss";
import ResizeObserverContext from "../../context/resize-context/resize-observer.context";
import MobileNavigation from "../mobile-navigation/mobile-navigation.component";
import UserContext from "../../context/user-context/user-context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { grid, setGrid } = useContext(TogglerContext);
  const width = useContext(ResizeObserverContext);

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
      {width < 551 && (
        <CustomBtn className="open-search-box" onClick={openSearchContainer}>
          <FaSearch size={16} fill={"#000"} />
        </CustomBtn>
      )}
      <CustomBtn className="grid-btn" handleChange={gridChanger}>
        {!grid ? <HiViewGrid size={32} /> : <MdViewStream size={32} />}
        <span className="grid-btn-text">List view</span>
      </CustomBtn>
      {width > 550 && <ThemeComponent className="big-theme" />}
      <ShowUserProfileComponent />
      {width < 551 && (
        <CustomBtn className="dots" handleChange={mobileNav}>
          <span />
          <span />
          <span />
        </CustomBtn>
      )}{" "}
      {width < 551 && (
        <MobileNavigation
          onCloseMobileOverlay={setOpenMobileNav}
          openNav={openMobileNav}
          user={currentUser}
        />
      )}
    </nav>
  );
};
export default Navigation;
