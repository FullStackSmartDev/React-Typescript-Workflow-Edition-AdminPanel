import React, { Component } from "react";
import Groups from "../../../../../../../NewFormulary/DrugDetails/components/FormularyConfigure/components/Groups";
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";
import Access from "../Access/Access";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./Roles.scss";

const groupData = [
  {
    id: 0,
    label: "Role1",
    status: "completed",
    is_archived: "true",
  },
  {
    id: 1,
    label: "Role2",
    status: "warning",
    is_archived: "true",
  },
  {
    id: 2,
    label: "Role3",
    status: "completed",
    is_archived: "true",
  },
  {
    id: 3,
    label: "Role4",
    status: "warning",
    is_archived: "true",
  },
  {
    id: 4,
    label: "Role5",
    status: "completed",
    is_archived: "true",
  },
];
export class Roles extends Component {
  render() {
    return (
      <div className="roles-container">
        <div className="roles-sidebar">
          <div className="roles-sidebar-header">
            <div>
              <p>
                ROLES <InfoCircleOutlined />
              </p>
            </div>
            <div>
              <DropDown
                placeholder="Active"
                className="disaster-dropdown"
                options={["Owner", "Tenant"]}
              />
            </div>
          </div>
          <div className="groups-container">
            {groupData.map((group, key) => (
              <Groups
                key={key}
                id={group.id}
                title={group.label}
                statusType={group.status}
                selectGroup={() => {}}
                isSelected={false}
              />
            ))}
          </div>
        </div>
        <div className="roles-body">
          <div className="roles-body-header">
            <p>
              DATA AVAILABILITY FOR ROLE 3 <InfoCircleOutlined />
            </p>
          </div>
          <Access />
        </div>
      </div>
    );
  }
}

export default Roles;
