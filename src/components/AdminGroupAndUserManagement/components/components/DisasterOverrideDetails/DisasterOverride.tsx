import React, { Fragment } from "react";
import { disasterOverrideData } from "../../../../../mocks/grid/audit-view-mock";
import { DisasterOverrideColumn } from "../../../../../utils/grid/columns";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer";
import { Button } from "@material-ui/core";
import "./DisasterOverride.scss";
import DisasterOverrideDetail from "./components/DisasterOverrideDetail";

export default class DisasterOverride extends React.Component<any, any> {
  state = {
    isNameClick: false,
  };

  onDisasterNameClick = (id: any) => {
    this.setState({ isNameClick: true });
  };

  triDotDropdownItemClick = (dataRow: any, item: any) => {
    this.setState({ isNameClick: true });
  };
  render() {
    return (
      <Fragment>
        {this.state.isNameClick === false ? (
          <div className="disaster-override-grid-container">
            <div className="grid-container-header-wrapper">
              <div className="grid-name-fields-wrapper">
                <span>disaster list</span>
                <input type="text" placeholder="Name" />
                <DropDown
                  placeholder="Override Type"
                  className="disaster-dropdown"
                  options={["Restrictive", "Clinical", "Administrative"]}
                />
                <DropDown
                  placeholder="Override Type"
                  className="disaster-dropdown"
                  options={["Restrictive", "Clinical", "Administrative"]}
                />
              </div>
              <div className="action-btn">
                <Button className="add-new-disaster-override">
                  + Add New Disaster Override
                </Button>
              </div>
            </div>
            <div className="disaster-grid-container">
              <FrxGridContainer
                enableSearch
                enableColumnDrag
                onSearch={() => {}}
                enableSettings
                settingsTriDotDropDownItems={["Edit"]}
                onsettingsTriDotDropDownItemClick={this.triDotDropdownItemClick}
                fixedColumnKeys={["claimId"]}
                gridName="DISASTER OVERRIDE"
                isFetchingData={false}
                columns={DisasterOverrideColumn({
                  onDisasterNameClick: (id: any) =>
                    this.onDisasterNameClick(id),
                })}
                data={disasterOverrideData()}
                pagintionPosition="topRight"
                onSettingsClick="grid-menu"
                scroll={{ x: 0, y: 420 }}
              />
            </div>
          </div>
        ) : (
          <DisasterOverrideDetail />
        )}
      </Fragment>
    );
  }
}
