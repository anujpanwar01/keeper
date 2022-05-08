import spinner from "../../assester/sm-spin.svg";
import "./spinner.styles.scss";

const Spinner = () => (
  <div className="spinner">
    <img src={spinner} alt="spinner" />
  </div>
);

export default Spinner;
