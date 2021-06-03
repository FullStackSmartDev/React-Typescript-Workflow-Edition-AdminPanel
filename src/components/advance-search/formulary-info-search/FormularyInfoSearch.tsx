import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select} from "antd";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import CustomDatePicker from "../../shared/Frx-components/date-picker/CustomDatePicker";

import "./FormularyInfoSearch.scss";

interface Props {}
interface State {}

const {Option} = Select;
class FormularyInfoSearch extends Component<Props, State> {
  state = {
    medicareTyep: 0, //seting default(M) value for 3rd dropdown
    effectiveDate: "",
    dueDate: "",
  };

  onSelectforMedicare = (value) => {
    console.log("value = " + value);
    this.setState({medicareTyep: value});
  };

  handleEffectiveDate = (date) => {
    this.setState({effectiveDate: date});
  };
  handleDueDate = (date) => {
    this.setState({dueDate: date});
  };

  render() {
    return (
      <div className="formulary-info-search-main-container">
        <Grid container className="formulary-info-search-tab-container">
          <Grid
            item
            container
            className="formulary-info-search-member-info-contianer"
          >
            <Grid item sm={4} className="member-info-heading">
              Member Information
            </Grid>
            <Grid item sm={4} className="member-info-search-field">
              <Input
                className="member-search__input"
                placeholder="First Name"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>

          <Grid
            item
            container
            className="formulary-info-search-formulary-container"
          >
            <Grid item sm={4} className="formulary-info-heading">
              Formulary Information
            </Grid>
            <Grid item sm={4} className="formulay-info-search-field">
              <Input
                className="member-search__input"
                placeholder="Formulary ID"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
              <Input
                className="member-search__input"
                placeholder="Formulary Name"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
              <div className="formuary-search-select-boxes">
                <DropDown
                  placeholder="Service Year"
                  className="member-search__input--dropdown"
                  dropdownClassName="formulary-service-year-dropdown"
                  options={[
                    "01/01/2020 - 12/31/2020",
                    "01/01/2019 - 12/31/2019",
                    "01/01/2018 - 12/31/2018",
                  ]}
                />

                <DropDown
                  placeholder="Status"
                  className="member-search__input--dropdown"
                  dropdownClassName="formulary-service-year-dropdown"
                  options={["Paid", "Rejected", "B3"]}
                />

                <DropDown
                  placeholder="Medicare"
                  className="member-search__input--dropdown"
                  // dropdownClassName="formulary-service-year-dropdown"
                  defaultValue={this.state.medicareTyep}
                  options={["Medicare", "Medicaid", "Commercial"]}
                  onSelect={this.onSelectforMedicare}
                />
              </div>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
          <Grid
            item
            container
            className="formulary-info-search-madicare-container"
          >
            {this.state.medicareTyep === 0 ? (
              <>
                <Grid item sm={4} className="madicare-heading">
                  Medicare Information
                </Grid>
                <Grid item sm={4} className="madicare-search-field">
                  <Input
                    className="member-search__input"
                    placeholder="Contract"
                    type="text"
                    disableUnderline={true}
                    startAdornment={
                      // <InputAdornment position="start">
                      <svg
                        className="member-search__icon"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                          fill="#999999"
                        />
                      </svg>

                      // {/* </InputAdornment> */}
                    }
                    // variant="outlined"
                    //   name="claimId"
                    //   value={this.state.claimId}
                    //   onChange={(e) => this.handleInputChange(e)}
                  />
                  <Input
                    className="member-search__input"
                    placeholder="PBP"
                    type="text"
                    disableUnderline={true}
                    startAdornment={
                      // <InputAdornment position="start">
                      <svg
                        className="member-search__icon"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                          fill="#999999"
                        />
                      </svg>

                      // {/* </InputAdornment> */}
                    }
                    // variant="outlined"
                    //   name="claimId"
                    //   value={this.state.claimId}
                    //   onChange={(e) => this.handleInputChange(e)}
                  />
                </Grid>
                <Grid item sm={4}></Grid>
              </>
            ) : this.state.medicareTyep === 1 ? (
              <>
                <Grid item sm={4} className="madicare-heading">
                  Medicaid Information
                </Grid>
                <Grid item sm={4} className="madicare-search-field">
                  <div className="formuary-search-select-boxes">
                    <DropDown
                      placeholder="State"
                      className="member-search__input--dropdown"
                      // dropdownClassName="formulary-service-year-dropdown"
                      // defaultValue={this.state.medicareTyep}
                      options={["--NA--"]}
                      // onSelect={this.onSelectforMedicare}
                    />
                  </div>
                  <Input
                    className="member-search__input"
                    placeholder="Group ID"
                    type="text"
                    disableUnderline={true}
                    startAdornment={
                      // <InputAdornment position="start">
                      <svg
                        className="member-search__icon"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                          fill="#999999"
                        />
                      </svg>

                      // {/* </InputAdornment> */}
                    }
                    // variant="outlined"
                    //   name="claimId"
                    //   value={this.state.claimId}
                    //   onChange={(e) => this.handleInputChange(e)}
                  />
                </Grid>
                <Grid item sm={4}></Grid>
              </>
            ) : this.state.medicareTyep === 2 ? (
              <>
                <Grid item sm={4} className="madicare-heading">
                  Commercial Information
                </Grid>
                <Grid item sm={4} className="madicare-search-field">
                  <Input
                    className="member-search__input"
                    placeholder="Group ID"
                    type="text"
                    disableUnderline={true}
                    startAdornment={
                      // <InputAdornment position="start">
                      <svg
                        className="member-search__icon"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                          fill="#999999"
                        />
                      </svg>

                      // {/* </InputAdornment> */}
                    }
                    // variant="outlined"
                    //   name="claimId"
                    //   value={this.state.claimId}
                    //   onChange={(e) => this.handleInputChange(e)}
                  />
                </Grid>
                <Grid item sm={4}></Grid>
              </>
            ) : null}
          </Grid>

          <Grid item container className="formulary-search-date-container">
            <Grid item sm={4} className="date-heading">
              Dates
            </Grid>
            <Grid item container sm={5} className="date-container">
              <Grid item sm={6} className="date-effectiveDate-contianer">
                <CustomDatePicker
                  className="member-search__input "
                  onChange={this.handleEffectiveDate}
                  value={this.state.effectiveDate}
                  placeholder="Effective Date"
                />
              </Grid>
              <Grid item sm={6} className="date-dueDate-contianer">
                <CustomDatePicker
                  className="member-search__input member-search__input--date"
                  onChange={this.handleDueDate}
                  value={this.state.dueDate}
                  placeholder="Due Date"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
      </div>
    );
  }
}

export default FormularyInfoSearch;