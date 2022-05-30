import CustomBtn from "../custom-btn/CustomBtn";
import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import "./grid-btn.styles.scss";

const GridBtn = (props) => {
  return (
    <CustomBtn
      className={`grid-btn ${props.className}`}
      handleChange={props.onGrid}
    >
      {!props.grid ? <HiViewGrid size={32} /> : <MdViewStream size={32} />}
      <span className="grid-btn-text">List view</span>
    </CustomBtn>
  );
};
export default GridBtn;
