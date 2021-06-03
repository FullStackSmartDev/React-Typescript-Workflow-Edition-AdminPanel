import React from "react";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";

import Setting from "./Setting/Setting";
import ExpectionLevel from "./ExpectionLevel";
import Overrides from "./Overrides";

import "./DisasterOverrideDetail.scss";


const miniTabs = [
    { id: 1, text: "Settings" },
    { id: 2, text: "Expection Levels" },
    { id: 3, text: "Overrides" }
];

export default class DisasterOverrideDetail extends React.Component<any, any> {
    state = {
        tabs: miniTabs,
        activeTabIndex: 0
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
            return <Setting />
          case 1:
            return <ExpectionLevel />
          case 2:
            return <Overrides />
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
            <div className="inner-container">{this.renderActiveTabContent()}</div>
        </div>
    );
  }
}
