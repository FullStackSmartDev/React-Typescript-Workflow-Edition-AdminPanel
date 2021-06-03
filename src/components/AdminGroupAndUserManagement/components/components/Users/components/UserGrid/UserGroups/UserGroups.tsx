import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Row, Col } from "antd";
import { EyeFilled, PlusCircleFilled } from "@ant-design/icons";
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";
import Users from "../../../../Roles/components/RoleDetail/components/Users/Users";
import "./UserGroups.scss";

import { SearchOutlined } from "@ant-design/icons";

export class UserGroups extends Component {
  availableUserGroup = [
    {
      key: 1,
      user_group: "User Group 1 | 30 Users",
      description: "Domain@GroupOrigin | A Brief description of User Group 1",
    },
    {
      key: 2,
      user_group: "User Group 1 | 30 Users",
      description: "Domain@GroupOrigin | A Brief description of User Group 1",
    },
    {
      key: 3,
      user_group: "User Group 3 | 0 Users",
      description: "Domain@GroupOrigin | A Brief description of User Group 1",
    },
    {
      key: 4,
      user_group: "User Group 4 | 40 Users",
      description: "Domain@GroupOrigin | A Brief description of User Group 1",
    },
    {
      key: 5,
      user_group: "User Group 1 | 50 Users",
      description: "Domain@GroupOrigin | A Brief description of User Group 1",
    },
  ];
  render() {
    return (
      <div className="usergroup-container">
        <div className="usergroup-topbar">
          <div>
            <form className="example">
              <span>
                <SearchOutlined />
                <input type="text" name="search2" placeholder="Search" />
              </span>
            </form>
          </div>
          <div>
            <DropDown
              placeholder="Active"
              className="disaster-dropdown"
              options={["Owner", "Tenant"]}
            />
          </div>
          <div className="action-btn">
            <Button className="add-new-disaster-override">
              + Add New User Group
            </Button>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <Users />
        </div>

        <div className="usergroup-bottom">
          <div className="action-btn">
            <Button className="add-new-disaster-override">Save</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserGroups;
