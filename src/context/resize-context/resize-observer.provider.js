import { useState, useEffect } from "react";
import ResizeObserverContext from "./resize-observer.context";

const ResizeObserverProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(() => window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <ResizeObserverContext.Provider value={width}>
      {children}
    </ResizeObserverContext.Provider>
  );
};

export default ResizeObserverProvider;
