import React, { Component } from "react";
import FrxMiniTabs from "../../../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Commercial from "./Commercial";
import Exchange from "./Exchange";
import Medicaid from "./Medicaid";
import Medicare from "./Medicare";

const tabs = [
  { id: 1, text: "Commercial" },
  { id: 2, text: "Exchange" },
  { id: 3, text: "Medicaid" },
  { id: 4, text: "Medicare" },
];

export class MainTab1 extends Component {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };

  onClickTab = (selectedTabIndex: number) => {
    this.setState({ activeTabIndex: selectedTabIndex });
  };

  renderCurrentTab = () => {
    switch (this.state.activeTabIndex) {
      case 0: // Commercial
        return <Commercial />;

      case 1: // Exchange
        return <Exchange />;

      case 2: // Medicaid
        return <Medicaid />;

      case 3: // Medicare
        return <Medicare />;
    }
  };

  render() {
    return (
      <div className="disaster-override-mini-tabs-container">
        <FrxMiniTabs
          tabList={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onClickTab={this.onClickTab}
        />
        <div className="inner-container">{this.renderCurrentTab()}</div>
      </div>
    );
  }
}

export default MainTab1;
