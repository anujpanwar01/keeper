import { createContext } from "react";

const CardContext = createContext({
  items: [],
  isTaskOpen: false,
  isEdit: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
  setIsTaskOpen: (bool) => {},
  removeItem: (id) => {},
  editItem: (bool) => {},
  deleteAll: (array) => {},
  replaceItems: (items) => {},
  setIsCreating: (bool) => {},
  setIsUpdating: (bool) => {},
  setIsDeleting: (bool) => {},
  setIsFetching: (bool) => {},
});
export default CardContext;
