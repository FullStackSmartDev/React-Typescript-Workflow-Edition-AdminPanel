import React from "react";
import { TabInfo } from "../../models/tab.model";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import LOBDetail from "./components/LOBDetail";
import { getFormularyDetails, hierarchyDetailsGridData } from "../../mocks/formulary/formularyDetails";
import "./AdminGroupAndUserManagement.scss";

const tabs = [
  { id: 1, text: "HIERARCHY" },
  { id: 2, text: "MODULE MANAGEMENT" },
  { id: 3, text: "USERS" },
  { id: 4, text: "ROLES" },
  { id: 5, text: "USERS GROUPS" },
];

interface State {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  baseData: any;
}

class AdminGroupAndUserManagement extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showMassMaintenance: false,
    showDrugDetails: false,
    pageSize: 10,
    baseData: [],
    rootPath: "",
  };

  listPayload = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 1,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["cms_formulary_id"],
    sort_order: ["desc"],
  };

  componentDidMount() {
    this.setState({ baseData: hierarchyDetailsGridData() });
  }
  addNewFormulary = () => {};
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex }, () => {
      this.updateData(this.state.activeTabIndex);
    });
  };
  updateData = (currentTabIndex) => {
    switch (currentTabIndex) {
      case 0: //HIERARCHY
        {
          console.log("HIERARCHY selected");
          this.setState({ baseData: hierarchyDetailsGridData() });
        }
        break;
      case 1: //MODULE MANAGEMENT
        {
          console.log("MODULE MANAGEMENT selected");
          this.setState({ baseData: null });
        }
        break;
      case 2: // USERS
        {
          this.setState({ baseData: getFormularyDetails() });
        }
        break;
      case 3: //ROLES
        {
          console.log("ROLES selected");
          this.setState({ baseData: null });
        }
        break;
      case 4: //USERS GROUPS
        {
          console.log("USERS GROUPS selected");
          this.setState({ baseData: null });
        }
        break;
    }
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {};
  onApplyFilterHandler = (filters) => {};
  onPageSize = (pageSize) => {};
  onGridPageChangeHandler = (pageNumber: any) => {};
  onClearFilterHandler = () => {};

  render() {
    return (
      <div className="formulary-root">
        <FrxTabs
          tabList={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onClickTab={this.onClickTab}
        />
        <div className="formulary-tabs-info">
          <LOBDetail
            baseData={this.state.baseData}
            onPageSize={this.onPageSize}
            pageSize={this.listPayload.limit}
            selectedCurrentPage={
              this.listPayload.index / this.listPayload.limit + 1
            }
            onPageChangeHandler={this.onGridPageChangeHandler}
            onClearFilterHandler={this.onClearFilterHandler}
            applyFilter={this.onApplyFilterHandler}
            getColumnSettings={this.onSettingsIconHandler}
            addNewFormulary={this.addNewFormulary}
            currentSelectedModule={this.state.tabs[
              this.state.activeTabIndex
            ].text.toLowerCase()}
          />
        </div>
      </div>
    );
  }
}

export default AdminGroupAndUserManagement;
