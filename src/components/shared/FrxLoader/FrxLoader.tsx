import React from "react";
import "./FrxLoader.scss";

const FrxLoader = () => {
  return (
    <div className="frx-loader">
      <img
        src={require("../../../assets/img/loader.gif")}
        alt="loader"
        className="frx-loader__img"
      />
    </div>
  );
};

export default FrxLoader;
