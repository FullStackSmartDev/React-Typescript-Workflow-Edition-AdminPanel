import React, { Component } from "react";
import Access from "../Access/Access";
import Roles from "../Roles/Roles";
import UserGroups from "../UserGroups/UserGroups";
import "./Summary.scss";

import { Collapse } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

export class Summary extends Component {
  render() {
    return (
      <div>
        {/* Access */}
        <div className="summary-component-container">
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
            <Panel
              header={
                <p className="collapse-title">
                  ACCESS <InfoCircleOutlined />
                </p>
              }
              key="1"
              className="ant-collapse-panel-customization"
            >
              <div className="access-border-remove">
                <Access />
              </div>
            </Panel>
          </Collapse>
        </div>

        {/* Roles */}
        <div className="summary-component-container">
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
            <Panel
              header={
                <p className="collapse-title">
                  ROLES <InfoCircleOutlined />
                </p>
              }
              key="1"
              style={{ backgroundColor: "white" }}
            >
              <Roles />
            </Panel>
          </Collapse>
        </div>

        {/* UserGroups */}
        <div className="summary-component-container">
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
            <Panel
              header={
                <p className="collapse-title">
                  USER GROUPS <InfoCircleOutlined />
                </p>
              }
              key="1"
              className="ant-collapse-panel-customization"
            >
              <UserGroups />
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Summary;
