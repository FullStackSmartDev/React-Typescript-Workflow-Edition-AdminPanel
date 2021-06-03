import React from "react";
import {ReactComponent as SearchBoxIcon} from "../../../../assets/icons/SearchBoxIcon.svg";

import "./SearchBox.scss";
export default function SearchBox(props: any) {
  const { iconPosition = "right" } = props;
  const iconPositionClass = iconPosition === "right" ? 'icon-right' : 'icon-left';
  
  return (
    <div className="SearchBox">
      <input type="text" {...props} />
      <span className={`SearchBox-Icon ${iconPositionClass}`}>
        <SearchBoxIcon />
      </span>
    </div>
  );
}
