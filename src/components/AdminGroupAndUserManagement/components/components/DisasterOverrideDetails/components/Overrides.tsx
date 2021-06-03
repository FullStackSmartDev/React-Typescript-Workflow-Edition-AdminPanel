import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "antd";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";

import "./DisasterOverrideDetail";

export default class Overrides extends React.Component<any, any> {

  state = {
    isClickRadio: false
  }
  softHardRadioHandler = (e) => {
    this.setState({isClickRadio: true})
  }

  softHardRejectRadioHandler = (e) => {
    this.setState({isClickRadio: false})
  }
    render() {
    return (
        <div className="override-container">
          <div className="override-heading-btn-wrapper">
            <h3>overrides</h3>
            <Button>Save</Button>
          </div>
          <div className="radio-btns-wrapper">
            <Grid container>
              <Grid item xs={6}>
                <div className="override-radio-group">
                  <span className="span">Override PA Required:</span>
                  <RadioButton
                    label="Yes"
                    name="override-pa-radio"
                    checked
                  />
                  <RadioButton
                    label="No"
                    name="override-pa-radio"
                  />
                </div>
                <div className="override-radio-group">
                  <span className="span">Override Duplicate Rx / Duplicate Therapy:</span>
                  <RadioButton
                    label="Yes"
                    name="override-duplicate-radio"
                    onChange={(e) => this.softHardRejectRadioHandler(e)}
                    checked
                  />
                  <RadioButton
                    label="Soft Reject Only"
                    name="override-duplicate-radio"
                    onChange={(e) => this.softHardRejectRadioHandler(e)}
                  />
                  <RadioButton
                    label="Soft and Hard Reject Only"
                    name="override-duplicate-radio"
                    onChange={(e) => this.softHardRadioHandler(e)}
                  />
                </div>
                {this.state.isClickRadio === true &&
                  <div className="override-radio-group">
                    <span className="span">Clarification Code 13 Must Be On Claim To Override Hard Reject?</span>
                    <RadioButton
                      label="Yes"
                      name="override-clarification-radio"
                      checked
                    />
                    <RadioButton
                      label="No"
                      name="override-clarification-radio"
                    />
                  </div>
                }
                <div className="override-radio-group">
                  <span className="span">Override Member Prescriber Exceptions:</span>
                  <RadioButton
                    label="Yes"
                    name="override-member-pres-radio"
                  />
                  <RadioButton
                    label="No"
                    name="override-member-pres-radio"
                    checked
                  />
                </div>
                <div className="override-radio-group">
                  <span className="span">Overrride Mandatory Network Fills:</span>
                  <RadioButton
                    label="Yes"
                    name="override-mendatory-radio"
                    checked
                  />
                  <RadioButton
                    label="No"
                    name="override-mendatory-radio"
                  />
                </div>
                <div className="override-radio-group">
                  <span>DUR and Refill Override Limit:</span>
                  <input type="text" placeholder="123" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="override-radio-group">
                    <span className="span">Override Refill / Fill Limits:</span>
                    <RadioButton
                      label="Yes"
                      name="override-refill-radio"
                    />
                    <RadioButton
                      label="No"
                      name="override-refill-radio"
                      checked
                    />
                  </div>
                  <div className="override-radio-group">
                    <span className="span">Override Member Pharmacy Exceptions:</span>
                    <RadioButton
                      label="Yes"
                      name="override-member-phar-radio"
                      checked
                    />
                    <RadioButton
                      label="No"
                      name="override-member-phar-radio"
                    />
                  </div>
              </Grid>
            </Grid>
          </div>
        </div>
    );
  }
}
