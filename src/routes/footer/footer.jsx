import myImg from "../../assester/me.png";
import { Link } from "react-router-dom";
import "./footer.styles.scss";
import { memo } from "react";

const Footer = function () {
  return (
    <section className="footer">
      <div>
        <Link className="footer-logo" to={"/"}>
          Keeper
        </Link>
        <p>&copy; {new Date().getFullYear()} by keeper</p>
        <a
          className="footer-social"
          target={"_blank"}
          href="https://twitter.com/anujpanwar7911"
          rel="noreferrer"
        >
          <img src={myImg} alt="anuj_panwar" />
          Anuj Panwar
        </a>
      </div>
    </section>
  );
};
export default memo(Footer);
