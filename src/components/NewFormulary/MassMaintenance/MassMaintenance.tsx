import React from "react";
import { TabInfo } from "../../../models/tab.model";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import MassMaintenanceConfigure from "./configure/MassMaintenanceConfigure";
import MassMaintenanceTop from "./MassMaintenanceTop";
import MassMaintenanceSetup from "./setup/MassMaintenanceSetup";
// import "./FormularyDetails.scss";

const tabs = [
  { id: 1, text: "Setup" },
  { id: 2, text: "Configure" },
  { id: 3, text: "Compare/View" },
  { id: 4, text: "Validation" },
  { id: 5, text: "Complete" },
];
export default class MassMaintenance extends React.Component<any, any> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <MassMaintenanceSetup />;
      case 1:
        return <MassMaintenanceConfigure  />;
      case 2:
        return <div>Compare/View</div>;
      case 3:
        return <div>Validation</div>;
      case 4:
        return <div>Complete</div>;
      default:
        return null;
    }
  };
  render() {
    const fData = this.props.data;
    return (
      <>
        <MassMaintenanceTop formularyTopData={fData}  />
        <div className="drug-details-bottom">
          <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          <div className="inner-container">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}
