import React from "react";
import "./FrxReportingTags.scss";
import { ReactComponent as PlusIcon } from "../../../assets/icons/BluePlusIcon.svg";
import { ReactComponent as MinusIcon } from "../../../assets/icons/BlueMinusIcon.svg";
import FrxCategoryTag from "./FrxCategoryTag";

function FrxMiniTagContainer(props) {
  const {
    addIcon,
    tag,
    tag: { name, description, categoriesWithColor },
    onClickAdd,
    onClickRemove,
  } = props;

  const getRandomTagColor = () => {
    return ["blue", "green", "orange"][Math.floor(Math.random() * 3 + 1)];
  };

  return (
    <div className="container">
      <div className="inner-container">
        <span className="tag-name">{name}</span>
        <div className="category-container">
          {categoriesWithColor.map((category) => (
            <FrxCategoryTag
              category={category.name}
              // bgColor={getRandomTagColor()}
              bgColor={category.color}
            />
          ))}
        </div>
        <p className="inner-text">{description}</p>
      </div>
      <div>
        {addIcon ? (
          <PlusIcon onClick={() => onClickAdd(tag)} />
        ) : (
          <MinusIcon onClick={() => onClickRemove(tag)} />
        )}
      </div>
    </div>
  );
}

export default FrxMiniTagContainer;
