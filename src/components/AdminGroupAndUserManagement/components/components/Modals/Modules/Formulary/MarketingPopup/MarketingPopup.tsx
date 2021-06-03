import React, { Component } from "react";
import FrxTabs from "../../../../../../../shared/FrxTabs/FrxTabs";
import MainTab1 from "./MainTab1/MainTab1";
import MainTab2 from "./MainTab2/MainTab2";
import MainTab3 from "./MainTab3/MainTab3";
import MainTab4 from "./MainTab4/MainTab4";
import "./style.scss";

const tabs = [
  { id: 1, text: "MATERIAL AND SEARCH TOOL LEGEND" },
  { id: 2, text: "SEARCH TOOL CONGIDURATION" },
  { id: 3, text: "PLAN LANGUAGE DESCRIPTORS" },
  { id: 4, text: "CAST-SHARE DETAILS" },
];

export class MarketingPopup extends Component {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };

  onClickTab = (selectedTabIndex: number) => {
    this.setState({ activeTabIndex: selectedTabIndex });
  };

  renderCurrentTab = () => {
    switch (this.state.activeTabIndex) {
      case 0: // MATERIAL AND SEARCH TOOL LEGEND
        return <MainTab1 />;

      case 1: // SEARCH TOOL CONGIDURATION
        return <MainTab2 />;

      case 2: // PLAN LANGUAGE DESCRIPTORS
        return <MainTab3 />;

      case 3: // CAST-SHARE DETAILS
        return <MainTab4 />;
    }
  };

  render() {
    return (
      <div className="marketing-popup-container">
        <FrxTabs tabList={this.state.tabs} activeTabIndex={this.state.activeTabIndex} onClickTab={this.onClickTab} />
        <div className="marketing-popup-container-body">{this.renderCurrentTab()}</div>
      </div>
    );
  }
}

export default MarketingPopup;
