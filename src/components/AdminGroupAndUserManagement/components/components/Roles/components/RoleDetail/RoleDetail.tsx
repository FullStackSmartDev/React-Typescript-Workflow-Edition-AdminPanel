import React from "react";
import { TabInfo } from "../../../../../../../models/tab.model";
import FrxTabs from "../../../../../../shared/FrxTabs/FrxTabs";
import Availability from "./components/Availability/Availability";
import Permission from "./components/Permission/Permission";
import RoleUpdate from "./components/RoleUpdate/RoleUpdate";
import UserGroups from "./components/UserGroups/UserGroups";
import Users from "./components/Users/Users";
import "./RoleDetail.scss";


const miniTabs = [
    { id: 1, text: "Permissions" },
    { id: 2, text: "Availability" },
    { id: 3, text: "Users" },
    { id: 4, text: "User Groups" },
    { id: 5, text: "Summary" }
];
export default class RoleDetail extends React.Component<any, any> {
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
            return <Permission />
          case 1:
            return <Availability />
          case 2:
            return <Users />
          case 3:
            return <UserGroups />
          case 4:
            return (
            <>
            <Permission />
            <Availability />
            <Users />
            <UserGroups />
            </>
            )
        }
    };
  render() {
    return (
        <>
        <div className="role-detail-top">
          {/* <RoleUpdate /> */}
        </div>
        <div className="role-detail-bottom">
          <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab} />
          <div className="inner-container">{this.renderActiveTabContent()}</div>
        </div></>
    );
  }
}