import { Link } from "react-router-dom";
import error from "../../assester/page-not-found.svg";
import "./not-found.styles.scss";

const NotFound = () => {
  return (
    <section className="page-not-found">
      <div className="not-found">
        <div className="not-found-img">
          <img src={error} alt={"page not found"} />
        </div>
        <div className="not-found-text">
          <h1>Page Not Found</h1>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
