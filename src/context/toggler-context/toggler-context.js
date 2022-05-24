import { createContext } from "react";

const TogglerContext = createContext({
  searchValue: "",
  grid: false,
  theme: true,
  dropDown: false,
  isSearchFocus:false,
  setSearchValue: (value) => {},
  setGrid: (bool) => {},
  setTheme: (bool) => {},
  setDropDown: (bool) => {},
  searchFocus: (bool) => {},
});
export default TogglerContext;
