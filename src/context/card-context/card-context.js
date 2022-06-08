import { createContext } from "react";

const CardContext = createContext({
  items: [],
  isTaskOpen: false,
  isEdit: false,
  setIsTaskOpen: (bool) => {},
  removeAllItem: (items) => {},
  removeItem: (id) => {},
  editItem: (bool) => {},
  deleteAll: (array) => {},
  replaceItems: (items) => {},
});
export default CardContext;
