import { useReducer } from "react";
import CardContext from "./card-context";

const init = {
  items: [],
  isTaskOpen: false,
  isEdit: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
};
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REPLACE_CARD":
      state.items = payload;
      const item = { ...state };
      return item;

    // case "ADD_CARD":
    //   const items = state.items.concat(payload);
    //   return { ...state, items };

    case "REMOVE_ITEM":
      state.items = state.items.filter((card) => card.id !== payload);
      return { ...state };

    case "TASK":
      return { ...state, isTaskOpen: payload };

    case "EDIT_CARD":
      return {
        ...state,
        isEdit: payload,
      };

    case "DELETE_ALL":
      return {
        ...state,
        items: payload,
      };
    case "CREATING":
      return {
        ...state,
        isCreating: payload,
      };
    case "FETCHING":
      return {
        ...state,
        isFetching: payload,
      };
    case "UPDATING":
      return {
        ...state,
        isUpdating: payload,
      };
    case "DELETING":
      return {
        ...state,
        isDeleting: payload,
      };
    default:
      return init;
  }
};
const CardProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, init);

  // const addItem = (card) => {
  //   dispatchState({ type: "ADD_CARD", payload: card });
  // };
  const replaceItems = (items) => {
    dispatchState({ type: "REPLACE_CARD", payload: items });
  };
  const taskHandler = (bool) => {
    dispatchState({ type: "TASK", payload: bool });
  };

  const editItem = (bool) => {
    dispatchState({ type: "EDIT_CARD", payload: bool });
  };

  const deleteAll = (array) => {
    dispatchState({ type: "DELETE_ALL", payload: array });
  };
  const removeItem = (id) => {
    dispatchState({ type: "REMOVE_ITEM", payload: id });
  };

  const setIsCreating = (bool) => {
    dispatchState({ type: "CREATING", payload: bool });
  };

  const setIsUpdating = (bool) => {
    dispatchState({ type: "UPDATING", payload: bool });
  };
  const setIsDeleting = (bool) => {
    dispatchState({ type: "DELETING", payload: bool });
  };
  const setIsFetching = (bool) => {
    dispatchState({ type: "FETCHING", payload: bool });
  };
  const value = {
    items: state.items,
    isTaskOpen: state.isTaskOpen,
    isEdit: state.isEdit,
    isCreating: state.isCreating,
    isUpdating: state.isUpdating,
    isDeleting: state.isDeleting,
    isFetching: state.isFetching,
    replaceItems,
    setIsTaskOpen: taskHandler,
    editItem,
    deleteAll,
    removeItem,
    setIsCreating,
    setIsUpdating,
    setIsDeleting,
    setIsFetching,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
export default CardProvider;
