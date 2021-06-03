import React from "react";
import Grid from "@material-ui/core/Grid";
import RadioButton from "../../../../../../../shared/Frx-components/radio-button/RadioButton";

export default class AdjuctionInfoRight extends React.Component<any, any> {
  render() {
    return(
        <Grid item xs={5}>
          <div className="adjuction-radio-wrapper">
              <div className="adjuction-radio-group">
                    <div className="radio-groups">
                        <span className="radio-label">Allow Dynamic Eligibility<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="dynamic-aligibility"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="dynamic-aligibility"
                        />
                    </div>
                    <div className="radio-groups">
                        <span className="radio-label">Match on DOB<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="dob"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="dob"
                        />
                    </div>
              </div>
              <div className="adjuction-radio-group">
                    <div className="radio-groups">
                        <span className="radio-label">Match on Relationship Code<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="relationship"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="relationship"
                        />
                    </div>
                    <div className="radio-groups">
                        <span className="radio-label">Match on Gender<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="gender"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="gender"
                        />
                    </div>
              </div>
                <div className="radio-groups">
                        <span className="radio-label">Combine Member ID and Person Code<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="member-id"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="member-id"
                        />
                </div>
                <div className="radio-groups">
                        <span className="radio-label">Match on Person Code<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="person-code"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="person-code"
                        />
                </div>
                <div className="radio-groups">
                        <span className="radio-label">Match on LAST Name<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="last-name"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="last-name"
                        />
                </div>
                <div className="adjuction-radio-input-fields">
                    <label>Number of letters to be matched on last name</label>
                    <input type="text" />
                </div>
                <div className="radio-groups">
                        <span className="radio-label">Match on First Name<span className="astaric"></span></span>
                        <RadioButton
                            label="Yes"
                            name="first-name"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="first-name"
                        />
                </div>
                <div className="adjuction-radio-input-fields">
                    <label>Number of letters to be matched on first name</label>
                    <input type="text" />
                </div>
          </div>
        </Grid>
    );
  }
}
