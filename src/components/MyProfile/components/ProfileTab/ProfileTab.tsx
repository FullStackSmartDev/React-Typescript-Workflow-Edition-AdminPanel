import React, { Fragment } from "react";
import { TabInfo } from "../../../../models/tab.model";
import FrxTabs from "../../../shared/FrxTabs/FrxTabs";

// import css

import "./ProfileTab.scss"

const tabs = [
    { id: 1, text: "Tasks" },
    { id: 2, text: "Alerts" },
    { id: 3, text: "Access" },
    { id: 4, text: "Audit" },
    { id: 5, text: "User Summary" },
];

export default class ProfileTab extends React.Component<any, any> {

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
            return <div>Formulary Components</div>;
          case 1:
            return <div>Formulary Components</div>;
          case 2:
            return <div>Formulary Benefits</div>;
           case 3:
               return <div></div>;
            case 4:
                return <div></div>;
        }
      };
  render() {
    return (
        <div className="tabs-container">
            <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          <div className="profile-inner-content-wrapper">
            {this.renderActiveTabContent()}
          </div>
        </div>
    );
  }
}