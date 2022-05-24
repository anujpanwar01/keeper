import { createContext } from "react";

const CardContext = createContext({
  items: [],
  isTaskOpen: false,
  isEdit: false,
  setIsTaskOpen: (bool) => {},
  addItem: (item) => {},
  removeItem: (id) => {},
  removeAllItem: (items) => {},
  editItem: (bool) => {},
  editItemDetail:(itemsDetails)=>{},
  deleteAll: (array) => {},
});
export default CardContext;
