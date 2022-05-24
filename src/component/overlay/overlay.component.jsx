import { createPortal } from "react-dom";
const Overlay = ({ target, ...props }) => {
  const parent = document.getElementById(target);
  const child = <div {...props}></div>;
  return createPortal(child, parent);
};
export default Overlay;
