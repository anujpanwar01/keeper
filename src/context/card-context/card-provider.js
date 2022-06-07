import { useReducer } from "react";
import CardContext from "./card-context";
import { deleteCard } from "../../firebase/firebase.util";

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

    case "ADD_CARD":
      const items = state.items.concat(payload);
      return { ...state, items };

    case "TASK":
      return { ...state, isTaskOpen: payload };

    case "REMOVE_CARD":
      deleteCard(payload);
      const filterItem = state.items.filter((card) => card.id !== payload);
      return {
        ...state,
        items: filterItem,
      };

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
    // case "EDIT_ITEM_DETAIL":
    //   //1 find the that item which we want edit;
    //   //2 after find that item update the items

    //   // updateCard(payload.id, payload);

    //   const updatedItem = state.items.findIndex(
    //     (item) => item.id === payload.id
    //   );

    //   const updatedItems = [...state.items];
    //   console.log(updatedItems);
    //   updatedItems[updatedItem] = payload;

    //   return {
    //     ...state,
    //     items: updatedItems,
    //   };
    default:
      return init;
  }
};
const CardProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, init);

  const addItem = (card) => {
    dispatchState({ type: "ADD_CARD", payload: card });
  };
  const replaceItems = (items) => {
    dispatchState({ type: "REPLACE_CARD", payload: items });
  };
  const taskHandler = (bool) => {
    dispatchState({ type: "TASK", payload: bool });
  };

  const removeItem = (id) => {
    dispatchState({ type: "REMOVE_CARD", payload: id });
  };

  const editItem = (bool) => {
    dispatchState({ type: "EDIT_CARD", payload: bool });
  };

  const deleteAll = (array) => {
    dispatchState({ type: "DELETE_ALL", payload: array });
  };
  // const editItemDetail = (details) => {
  //   console.log(details);
  //   dispatchState({ type: "EDIT_ITEM_DETAIL", payload: details });
  // };

  const value = {
    items: state.items,
    isTaskOpen: state.isTaskOpen,
    isEdit: state.isEdit,
    replaceItems,
    setIsTaskOpen: taskHandler,
    addItem,
    removeItem,
    editItem,
    deleteAll,
    // editItemDetail,
  };
  // console.log(value);

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
export default CardProvider;
