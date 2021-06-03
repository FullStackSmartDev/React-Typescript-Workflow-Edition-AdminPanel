import { Box, Grid } from "@material-ui/core";
import { Checkbox, DatePicker, Input, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { Component } from "react";
import { Left } from "react-bootstrap/lib/Media";
import Button from "../../../shared/Frx-components/button/Button";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../shared/Frx-components/label/Label";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import County from "./components/County";
import State from "./components/State";
import './WorkflowInfo.scss';
export default class WorkflowInfo extends Component<any, any> {
    state = {
        isRegionBase: false,
        isStateSelectionNeeded: false,
        selectedStateList: [],
        selectedCountyList: [],
    }

    selectRegion = (param: boolean) => {
        this.setState({ isRegionBase: param, isStateSelectionNeeded: false });
    }

    selectedStateItemClick = (selectedStateItem: any) => {
        this.setState({ selectedStateList: [...this.state.selectedStateList, selectedStateItem] })

    }
    selectedCountyItemClick = (selectedCountyItem: any) => {
        this.setState({ selectedCountyList: [...this.state.selectedCountyList, selectedCountyItem] })
    }

    selectCountry = (element: any) => {
        if (element === "United States") {
            this.setState({ isStateSelectionNeeded: true });
        }
        else {
            this.setState({ isStateSelectionNeeded: false });
        }

    }
    render() {
        return (
            <div className="workflow-info-container">
                <div className="workflow-controls-wrapper">
                    <Grid container>
                        <Grid item md={3} sm={3}>
                            <div className="input-control-wrapper">
                                <Label>What do you want to name the workflow? <span>*</span></Label>
                                <Input className="input-control" placeholder="Text Here" />
                            </div>
                        </Grid>
                        <Grid item md={3} sm={3}>
                            <div className="input-control-wrapper">
                                <Label>Description <span>*</span></Label>
                                <TextArea className="input-area-control" rows={3} placeholder="Text Here" />
                            </div>
                        </Grid>
                        <Grid item md={6} sm={6}>
                            <div className="input-control-wrapper">
                                <Label>Effective date and time:</Label><br />
                                <DatePicker
                                    className="input-date-control"
                                    placeholder=""
                                    suffixIcon={
                                        <svg
                                            width="18"
                                            height="20"
                                            viewBox="0 0 18 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ant-picker-suffix"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                                fill="#C4C4C4"
                                            />
                                        </svg>
                                    }
                                />

                                <div className="input-time-control-wrapper custom-time">
                                    <DropDown
                                        className="input-time-control set-left-margin"
                                        options={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]}
                                    />
                                </div>
                                <span className="time-seprator">:</span>
                                <div className="input-time-control-wrapper custom-time">
                                    <DropDown
                                        className="input-time-control"
                                        options={["05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]}
                                    />
                                </div>

                                <div className="input-time-control-wrapper set-left-margin">
                                    <DropDown
                                        placeholder="AM"
                                        className="input-time-control set-left-margin"
                                        options={["AM", "PM"]}
                                    />
                                </div>

                            </div>
                        </Grid>

                        <Grid item md={6} sm={6}>
                            <div className="input-control-wrapper set-top-margin">
                                <Label>For which LOB would the workflow be available?</Label><br />
                                <div className="checkbox-wrapper"><Checkbox className="custom-checkbox" /><span>Commercial</span></div>
                                <div className="checkbox-wrapper"><Checkbox className="custom-checkbox" /><span>Exchange</span></div>
                                <div className="checkbox-wrapper"><Checkbox className="custom-checkbox" /><span>Medicaid</span></div>
                                <div className="checkbox-wrapper"><Checkbox className="custom-checkbox" /><span>Medicare</span></div>
                                <div className="checkbox-wrapper"><Checkbox className="custom-checkbox" /><span>N/A</span></div>
                            </div>
                        </Grid>
                        <Grid item md={6} sm={6}>
                            <div className="input-control-wrapper set-top-margin">
                                <Label>What entity do you want to use the workflow? <span>*</span></Label><br />
                                <DropDown
                                    defaultValue="Select Entity"
                                    className="input-dropdown-control"
                                    options={["Formulary"]}
                                />
                            </div>
                        </Grid>

                        <Grid item md={12} sm={12}>
                            <div className="input-control-wrapper set-top-margin custom-radio">
                                <Label>Type</Label><br />
                                <RadioButton
                                    label="Initial"
                                    name="workflow-type-radio"
                                    checked
                                />
                                <RadioButton
                                    label="Maintenance"
                                    name="workflow-type-radio"
                                />
                            </div>

                        </Grid>
                        <Grid item md={3} sm={3}>
                            <div className="input-control-wrapper set-top-region-margin custom-radio">
                                <Label>Is your workflow going to be based by region? <span>*</span></Label><br />
                                <RadioButton
                                    label="Yes"
                                    name="region-based-radio"
                                    onChange={(e) => this.selectRegion(true)}
                                    checked={this.state.isRegionBase}
                                />
                                <RadioButton
                                    label="No"
                                    name="region-based-radio"
                                    onChange={(e) => this.selectRegion(false)}
                                    checked={!this.state.isRegionBase}
                                />
                            </div>
                        </Grid>
                        {this.state.isRegionBase &&
                            <Grid item md={3} sm={3}>
                                <div className="input-control-wrapper set-top-region-margin ">
                                    <Label>Which country is the workflow for? <span>*</span></Label><br />
                                    <DropDown
                                        defaultValue="Select Country"
                                        className="input-dropdown-control"
                                        options={["United States", "Canada"]}
                                        onChange={(e) => this.selectCountry(e)}
                                    />
                                </div>
                            </Grid>
                        }
                    </Grid>
                </div>

                {
                    this.state.isStateSelectionNeeded &&
                    <>
                        <State selectedStateItemClick={this.selectedStateItemClick} />
                        <County selectedStateList={this.state.selectedStateList} selectedCountyItemClick={this.selectedCountyItemClick} />
                    </>
                }

                <div className="save-btn-wrapper">
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            className="Button view-fl-btn primary-btn"
                            label="Save"
                        />

                        <Button
                            className="Button view-fl-btn primary-btn"
                            label="Save & Continue"
                        />
                    </Box>
                </div>

            </div>

        );
    }
}