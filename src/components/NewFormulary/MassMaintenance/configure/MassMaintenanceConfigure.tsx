import React, { Component } from "react";
import { TabInfo } from "../../../../models/tab.model";
import FrxTabs from "../../../shared/FrxTabs/FrxTabs";
import MassMaintenancePA from "./MassMaintenancePA";
import "./MassMaintenanceConfigure.scss";
import MassMaintenanceTier from "./MassMaintenanceTier";
import formularyDetailsContext from "../../FormularyDetailsContext";
const tabs = [
  { id: 1, text: "TIER" },
  { id: 2, text: "PA" },
  { id: 3, text: "ST" },
  { id: 4, text: "QL" },
  { id: 5, text: "DRUG DETAILS" },
];
interface configureState {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
}
interface configureProps {  
}

class MassMaintenanceConfigure extends Component<configureProps,configureState> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };
  static contextType = formularyDetailsContext;

 
  componentDidMount() {
    debugger;
    console.log(this.context);
 }

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
        return <MassMaintenanceTier />;
      case 1:
        return <MassMaintenancePA />;
      case 2:
        return <div>ST</div>;
      case 3:
        return <div>QL</div>;
      case 4:
        return <div>DRUG DETAILS</div>;
    }
  };
  render() {
    return (
      <div className="bordered">
        <FrxTabs
          tabList={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onClickTab={this.onClickTab}
        />
        <div className="inner-container mm-configure-root white-bg">
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }
}

export default MassMaintenanceConfigure;
