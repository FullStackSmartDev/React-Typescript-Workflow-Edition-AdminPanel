import React, { Component } from "react";
import { Checkbox, Input } from "antd";
import Label from "../../../shared/Frx-components/label/Label";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import Hierarchy from "./Hierarchy";

import "./styles.scss";

class Availability extends Component<any, any> {
  state = {
    hierarchyType: "",
  };

  handleOnHierarchyTypeClick = (e) => {
    this.setState({
      hierarchyType: e.target.value,
    });
  };

  render() {
    const { hierarchyType } = this.state;

    return (
      <div className="availability-container">
        <div className="availability-choice">
          <div className="row-1-container">
            <div className="radio-fields-container">
              <Label required={true}>
                What hierarchy levels should this workflow be available?
              </Label>

              <div className="availability-choice__radio-fields-group">
                <div className="radio-field-container">
                  <RadioButton
                    label="Level"
                    name="choice"
                    value="level"
                    defaultChecked={hierarchyType === "level"}
                    onChange={this.handleOnHierarchyTypeClick}
                  />
                </div>

                <div className="radio-field-container">
                  <RadioButton
                    label="Specific Hierarchy"
                    name="choice"
                    value="specific-hierarchy"
                    defaultChecked={hierarchyType === "specific-hierarchy"}
                    onChange={this.handleOnHierarchyTypeClick}
                  />
                </div>
              </div>
            </div>

            {hierarchyType === "specific-hierarchy" && (
              <div className="search-field-container">
                <div className="form-field-container">
                  <Input placeholder="Name" className="form-field" />
                </div>

                <div className="form-field-container">
                  <Input placeholder="Account Number" className="form-field" />
                </div>

                <div className="form-field-container">
                  <div className="form-field-button">Search</div>
                </div>
              </div>
            )}
          </div>

          {hierarchyType === "level" && (
            <div className="availability-choice__checkbox-fields-group">
              <Checkbox>
                <span className="checkbox-label">FutureRx</span>
              </Checkbox>

              <Checkbox>
                <span className="checkbox-label">Customer</span>
              </Checkbox>
              <Checkbox>
                <span className="checkbox-label">Client</span>
              </Checkbox>
              <Checkbox>
                <span className="checkbox-label">Carrier</span>
              </Checkbox>
              <Checkbox>
                <span className="checkbox-label">Account</span>
              </Checkbox>
              <Checkbox>
                <span className="checkbox-label">Group</span>
              </Checkbox>
              <Checkbox>
                <span className="checkbox-label">Select All</span>
              </Checkbox>
            </div>
          )}

          {hierarchyType === "specific-hierarchy" && <Hierarchy />}
        </div>
      </div>
    );
  }
}

export default Availability;
