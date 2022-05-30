import { Link } from "react-router-dom";
import ThemeComponent from "../theme/Theme.Component";
import Overlay from "../overlay/overlay.component";
import React from "react";
import "./mobile-navigation.styles.scss";
import CustomBtn from "../custom-btn/CustomBtn";
import GridBtn from "../grid-btn/grid-btn.component";

const MobileNavigation = (props) => {
  const { openNav, user } = props;

  const closeMobileOverlay = () => props.onCloseMobileOverlay(!openNav);

  return (
    <div
      className={`mobile-navigation ${
        openNav ? "add-mobile-nav" : " remove-mobile-nav"
      }`}
    >
      <ThemeComponent />
      <GridBtn onGrid={props.onGrid} className="grid" grid={props.grid} />
      {!user && <Link to={"/sign-up"}>Sign Up</Link>}
      {
        <>
          <Overlay
            className={`mobile-overlay ${
              openNav ? "add-mobile-overlay" : "close-mobile-overlay"
            }`}
            onClick={closeMobileOverlay}
            target={"mobile-nav"}
          >
            <CustomBtn
              type="button"
              className={`close-overlay-btn mobile-overlay-btn ${
                openNav && "close-mobile-overlay-btn"
              }`}
              handleChange={closeMobileOverlay}
            />
          </Overlay>
        </>
      }
    </div>
  );
};
export default MobileNavigation;
