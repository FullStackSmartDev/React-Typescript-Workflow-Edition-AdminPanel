import * as React from "react";
import { Component } from "react";
import { ReactComponent as EditIcon } from "../../../../../../../assets/icons/EditIcon.svg";
import "./SelectFormularyDropdown.scss";

export interface SelectFormularyDropDownProps {
  openSelectFormulary: () => void;
  formularyName: string;
}

export interface SelectFormularyDropDownState {}

class SelectFormularyDropDown extends React.Component<
  SelectFormularyDropDownProps,
  SelectFormularyDropDownState
> {
  handleIconClick = () => {
    if (this.props.openSelectFormulary) {
      this.props.openSelectFormulary();
    }
  };

  render() {
    return (
      <div className="select-formulary-dropdown">
        <div className="select-formulary-dropdown__input-element">
          <div className="bordered pointer bg-green">
            <span onClick={e => this.handleIconClick()} className="inner-font">
              {this.props.formularyName
                ? this.props.formularyName
                : "Select Formulary"}
            </span>
            <EditIcon onClick={e => this.handleIconClick()} />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectFormularyDropDown;
