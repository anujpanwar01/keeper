import "./card.styles.scss";
import { useSelector } from "react-redux";
const Card = function ({ title, subTitle }) {
  const card = useSelector((state) => state.card);
  // const color = card.filter((ele) => ele.color);
  console.log(card.filter((ele) => ele.title));
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-subTitle">{subTitle}</p>
    </div>
  );
};
export default Card;
