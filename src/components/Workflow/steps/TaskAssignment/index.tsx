import React, { Component } from "react";
import { Col, Row, Input } from "antd";

import "./styles.scss";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../shared/Frx-components/label/Label";
import CriteriaConditionPanel from "./components/CriteriaConditionPanel";

const EditIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
    >
      <path
        d="M11.6493 2.43854L14.2593 5.08111C14.3692 5.19244 14.3692 5.37408 14.2593 5.48541L7.93981 11.8838L5.25463 12.1856C4.89583 12.2266 4.59201 11.919 4.63252 11.5557L4.93056 8.83697L11.25 2.43854C11.36 2.32721 11.5394 2.32721 11.6493 2.43854ZM16.3368 1.76764L14.9248 0.337951C14.485 -0.107361 13.7703 -0.107361 13.3275 0.337951L12.3032 1.37506C12.1933 1.48639 12.1933 1.66803 12.3032 1.77936L14.9132 4.42193C15.0231 4.53326 15.2025 4.53326 15.3125 4.42193L16.3368 3.38482C16.7766 2.93658 16.7766 2.21295 16.3368 1.76764ZM11.1111 10.1436V13.126H1.85185V3.75103H8.50116C8.59375 3.75103 8.68056 3.71295 8.74711 3.6485L9.90451 2.47662C10.1244 2.25397 9.96817 1.87604 9.65856 1.87604H1.38889C0.622106 1.87604 0 2.50592 0 3.28228V13.5948C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5948V8.97173C12.963 8.65826 12.5897 8.50298 12.3698 8.72271L11.2124 9.89458C11.1487 9.96197 11.1111 10.0499 11.1111 10.1436Z"
        fill="#2055B5"
      />
    </svg>
  );
};

class TaskAssignment extends Component<any, any> {
  render() {
    return (
      <div className="step-action-area">
        <Row className="heading-row">
          <Col span={24}>
            <span className="heading">TASK ASSIGNMENT SETTINGS</span>
          </Col>
        </Row>

        <div className="border" />

        <div className="task-assignment-container">
          <div className="assignment-method-container">
            <div className="input-label">Assignment: Method</div>
            <div className="radio-field-group">
              <div className="radio-field">
                <RadioButton label="Manual (Pull)" name="assignment-method" />
              </div>
              <div className="radio-field">
                <RadioButton
                  label="Automatic (Push)"
                  name="assignment-method"
                />
              </div>
            </div>
          </div>

          <div className="assignment-conditions">
            <div className="condition-field">
              <Label required={true}>
                No. of items to be pushed at one time
              </Label>
              <Input className="condition-field__text" />
            </div>

            <div className="condition-field">
              <Label>Trigger the push when</Label>
              <Input className="condition-field__text" />
              <Label required={true}>Items are left in the queue</Label>
            </div>
          </div>

          <div className="criteria-container">
            <Row className="heading-row">
              <Col span={24}>
                <span className="heading">Criteria 1</span>
              </Col>
            </Row>
            <div className="border"></div>

            <div className="criteria-content">
              <div className="criteria-content__left">
                <div className="drop-down-field-container">
                  <DropDown
                    className="time-complete-dropdown"
                    placeholder="Criteria Builder attributes "
                    options={["Members", "Pharmacy", "Prescriber", "Priority"]}
                  />
                </div>
                <div className="drop-down-field-container">
                  <DropDown
                    className="time-complete-dropdown"
                    placeholder="Assign To"
                    options={["Roles", "Users Group"]}
                  />
                </div>
              </div>
              <div className="criteria-content__right">
                <CriteriaConditionPanel title="Members">
                  <div className="criteria-content__radio-field-group">
                    <div className="radio-field">
                      <RadioButton label="VIP" name="members" />
                    </div>
                    <div className="radio-field">
                      <RadioButton label="High Priority" name="members" />
                    </div>
                    <div className="radio-field">
                      <RadioButton label="Medium Priority" name="members" />
                    </div>
                    <div className="radio-field">
                      <RadioButton label="Low Priority" name="members" />
                    </div>
                    <div className="radio-field">
                      <RadioButton label="General" name="members" />
                    </div>
                  </div>
                </CriteriaConditionPanel>

                <CriteriaConditionPanel title="Roles">
                  <div className="tags-container">
                    <div className="tag">Role 1</div>
                    <div className="tag">Role 2</div>
                    <div className="tag">Role 3</div>
                  </div>
                </CriteriaConditionPanel>
              </div>
            </div>
          </div>
          <div className="criteria-link">
            <EditIcon />
            <span className="criteria-link__text">
              Additional Criteria Configuration
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskAssignment;
