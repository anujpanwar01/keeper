import "./card.styles.scss";
const Card = function ({ title, subTitle }) {
  console.log(title, subTitle);
  return (
    <div className="card">
      <h2 className='card-title'>{title}</h2>
      <p className='card-subTitle'>{subTitle}</p>
    </div>
  );
};
export default Card;
