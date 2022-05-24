import React, { useContext, useEffect, useState } from "react";
import CardContext from "../../context/card-context/card-context";
import TogglerContext from "../../context/toggler-context/toggler-context";
import CardChildren from "../card-children/card-children.component";
import "./card.styles.scss";

const Card = function (ele) {

  const [inputValue, setInputValue] = useState({
    title: ele.title,
    subTitle: ele.subTitle,
  });
  const [data, setData] = useState({});
  const [read, setRead] = useState(false);

  const { items, removeItem, editItem, isEdit, editItemDetail } =
    useContext(CardContext);
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
  const { title, subTitle } = inputValue;

  useEffect(() => {
    const time = setTimeout(() => {
      setData((prev) => {
        return {
          ...prev,
          id: ele.id,
          title,
          subTitle,
          ...ele,
        };
      });
    }, 500);
    return () => clearTimeout(time);
  }, [title, subTitle, ele]);

  const handleSave = function (e) {
    e.currentTarget.closest(".card-container").classList.remove("out-of-flow");
    document.querySelectorAll(".card").forEach((card) => card.scrollTo(0, 0));

    // const { cardEdit } = cardList(e);
    // cardEdit.classList.remove("out-of-flow");
    // cardEdit.scrollTo(0, 0);

    // data2.forEach((ele) => {
    //   ele.style.overflow = "hidden";
    //   ele.scrollTo(0, 0);
    // });
    // cardEdit.children[0].children[0].scrollTo(0, 0);

    document.body.style.overflow = "hidden visible";
    editItem(false);
    editItemDetail(data);
  };
  ////////////////////////////////////////////////

  /////////////////////////////
  // useEffect(() => {
  //   // if user the refresh page between editing section
  //   // to remove overlay this is imporatant

  //   window.onload = function () {
  //     dispatch(editCard(false));
  //   };
  // });

  const isCardEdit = (e) => {
    editItem(true);

    const findItem = items.find((curr) => curr.id === ele.id);
    findItem &&
      e.currentTarget.closest(".card-container").classList.add("out-of-flow");

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = () => {
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
