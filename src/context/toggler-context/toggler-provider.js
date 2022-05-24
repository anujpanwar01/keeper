import { useReducer } from "react";
import TogglerContext from "./toggler-context";

const init = {
  searchValue: "",
  grid: false,
  theme: true,
  dropDown: false,
  isSearchFocus: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SEARCH":
      return {
        ...state,
        searchValue: payload,
      };
    case "GRID":
      return {
        ...state,
        grid: payload,
      };
    case "THEME":
      return { ...state, theme: payload };

    case "SEARCH_FOCUS":
      return { ...state, isSearchFocus: payload };
    case "DROP_DOWN":
      return { ...state, dropDown: payload };
    default:
      return init;
  }
};

const TogglerProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, init);

  const setSearch = (value) => {
    dispatchState({ type: "SEARCH", payload: value });
  };

  const searchFocus = (bool) => {
    console.log(bool);
    dispatchState({ type: "SEARCH_FOCUS", payload: bool });
  };

  const gridToggler = (bool) => {
    dispatchState({ type: "GRID", payload: bool });
  };

  const themeChanger = (bool) =>
    dispatchState({ type: "THEME", payload: bool });

  const isDropDownOpen = (bool) => {
    dispatchState({ type: "DROP_DOWN", payload: bool });
  };

  const togglerContext = {
    searchValue: state.searchValue,
    grid: state.grid,
    theme: state.theme,
    dropDown: state.dropDown,
    isSearchFocus: state.isSearchFocus,
    setSearchValue: setSearch,
    setGrid: gridToggler,
    setTheme: themeChanger,
    setDropDown: isDropDownOpen,
    searchFocus,
  };

  return (
    <TogglerContext.Provider value={togglerContext}>
      {children}
    </TogglerContext.Provider>
  );
};

export default TogglerProvider;
