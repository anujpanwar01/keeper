import "./card.styles.scss";

const Card = function ({ title, subTitle, file, color, src }) {
  return (
    <div
      className="card"
      style={
        color ? { backgroundColor: color } : { backgroundColor: "#fff390" }
      }
    >
      {src ? (
        <div
          className="image"
          style={{
            backgroundImage: `url(${file})`,
          }}
        >
          <img
            src={src}
            style={{ width: "100%" }}
            className="card-image"
            alt="img"
          />
        </div>
      ) : null}
      <h2 className="card-title">{title}</h2>
      <p className="card-subTitle">{subTitle}</p>
    </div>
  );
};
export default Card;
