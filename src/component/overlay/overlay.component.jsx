import { createPortal } from "react-dom";
const Overlay = ({ children, target, ...props }) => {
  const parent = document.getElementById(target);
  const child = <div {...props}>{children}</div>;
  return createPortal(child, parent);
};
export default Overlay;
