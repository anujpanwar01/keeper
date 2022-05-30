import { useEffect, useState } from "react";

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resize = () => setWidth(() => window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return width;
};

export default useResize;
