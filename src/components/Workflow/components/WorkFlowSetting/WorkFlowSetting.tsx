import React, { Component } from "react";
import WorkFlowSettingTop from "./WorkFlowSettingTop/WorkFlowSettingTop";

import "./WorkFlowSetting.scss";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDropDown from "./WorkFlowDropDown/CustomDropDown";


class WorkFlowSetting extends Component<any, any> {
    render() {
        return (
            <div className="workflow-setting-container">
                <WorkFlowSettingTop />
                <div className="workflow-setting-body">
                    <div className="group">
                        <p>Please select the calender for which the due date will be calculated?<span className="star">*</span></p>
                        <CustomDropDown />
                    </div>
                    <div className="group">
                        <p>How will the Time to Complete be calculated?<span className="star">*</span></p>
                        <div className="dropdown-input-wrapper">
                            <DropDown
                                className="time-complete-dropdown"
                                options={["Days", "Hours"]}
                            />
                            <input type="text" placeholder="Select..." />
                        </div>
                    </div>
                    <div className="group">
                        <p>Please select the calender for which the due date will be calculated?<span className="star">*</span></p>
                        <RadioButton
                            label="Yes"
                            name="calender-radio"
                            checked
                        />
                        <RadioButton
                            label="No"
                            name="calender-radio"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkFlowSetting;
