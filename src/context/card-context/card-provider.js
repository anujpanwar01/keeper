import { useReducer } from "react";
import CardContext from "./card-context";
import { deleteAllCard, deleteCard } from "../../firebase/firebase.util";

const init = {
  items: [],
  isTaskOpen: false,
  isEdit: false,
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
      deleteCard(payload);

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
      deleteAllCard();
      return {
        ...state,
        items: payload,
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

  const value = {
    items: state.items,
    isTaskOpen: state.isTaskOpen,
    isEdit: state.isEdit,
    replaceItems,
    setIsTaskOpen: taskHandler,
    editItem,
    deleteAll,
    removeItem,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
export default CardProvider;
