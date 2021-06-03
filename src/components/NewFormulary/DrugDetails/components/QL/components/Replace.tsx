import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../../shared/Frx-components/label/Label";
import Button from "../../../../../shared/Frx-components/button/Button";
import { Input } from "@material-ui/core";
import "./common.scss";

class Replace extends Component<any, any> {
  // const openTierGridContainer = () => {};
  componentDidMount() {
    this.props.onUpdateSelectedCriteria([]);
  }

  render() {
    console.log("{values}:", this.props.values);
    const { quantity = "", days = "", periodOfTime = "" } = this.props.values;
    return (
      <div className="ql-replace-container">
        <div className="panel-note">
          By inputting ‘Period of Time in Days’ you are creating a Type 2 QL
          indicating Quantity Limit over Time. Populate ‘Quantity’ and ‘Days’ to
          create Type 1 QL indicating Daily Quantity Limit.
        </div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>QUANTITY</Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className={`formulary-list-search 
                  ${this.props.errors?.quantity ? "error_class" : null}
                  `}
                  // placeholder="Search"

                  type="text"
                  name="quantity"
                  disableUnderline={true}
                  onChange={this.props.handleOnChange}
                  value={quantity}
                  required={true}
                  disabled={this.props.isViweAll}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={false}>DAYS </Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className={`formulary-list-search ${
                    this.props.errors?.days ? "error_class" : null
                  }`}
                  // placeholder="Search"
                  type="text"
                  name="days"
                  value={days}
                  onChange={this.props.handleOnChange}
                  disableUnderline={true}
                  disabled={this.props.isViweAll}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>PERIOD OF TIME IN DAYS</Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className="formulary-list-search"
                  // placeholder="Search"
                  type="text"
                  name="periodOfTime"
                  value={periodOfTime}
                  onChange={this.props.handleOnChange}
                  disableUnderline={true}
                  disabled={this.props.isViweAll}
                />
              </div>
            </div>
          </Grid>
          {/* <Button
          label="Apply"
          onClick={openTierGridContainer}
          // disabled={this.props.configureSwitch}
        ></Button> */}
        </Grid>
      </div>
    );
  }
}

export default Replace;
