import React, { useContext, useState } from "react";
import CardContext from "../../context/card-context/card-context";
import TogglerContext from "../../context/toggler-context/toggler-context";
import CardChildren from "../card-children/card-children.component";
import { updateCard, deleteCard } from "../../firebase/firebase.util";
import "./card.styles.scss";

const Card = function (ele) {
  const [inputValue, setInputValue] = useState({
    title: ele.title,
    subTitle: ele.subTitle,
  });

  const [read, setRead] = useState(false);

  const { items, removeItem, editItem, isEdit } = useContext(CardContext);
  const { grid } = useContext(TogglerContext);

  //////////////////////////////////////////

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleSave = function (e) {
    e.currentTarget.closest(".card-container").classList.remove("out-of-flow");
    document.querySelectorAll(".card").forEach((card) => card.scrollTo(0, 0));

    document.body.style.overflow = "hidden visible";
    editItem(false);
    updateCard(ele.id, {
      ...ele,
      title: inputValue.title,
      subTitle: inputValue.subTitle,
    });
  };
  ////////////////////////////////////////////////

  const isCardEdit = (e) => {
    editItem(true);

    const findItem = items.find((curr) => curr.id === ele.id);
    findItem &&
      e.currentTarget.closest(".card-container").classList.add("out-of-flow");

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = () => {
    // deleteCard(ele.id);
    removeItem(ele.id);
  };

  const openText = () => {
    setRead(true);
  };

  const closeText = () => {
    setRead(false);
  };
  /////////////////////////////

  const cardProps = {
    grid,
    closeText,
    openText,
    handleDelete,
    isCardEdit,
    handleSave,
    inputChangeHandler,
    isEdit,
    read,
    submitHandler,
    inputValue,
    ...ele,
  };

  return <CardChildren {...cardProps} />;
};
export default Card;
