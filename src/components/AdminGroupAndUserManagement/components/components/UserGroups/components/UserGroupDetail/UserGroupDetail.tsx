import React from "react";
import { TabInfo } from "../../../../../../../models/tab.model";
import FrxTabs from "../../../../../../shared/FrxTabs/FrxTabs";
import Availability from "./components/Availability/Availability";
import Roles from "./components/Roles/Roles";
import Users from "./components/Users/Users";
//import Summary from "./components/Summary/Summary";
import UserForm from "./components/UserForm/UserForm";
import "./UserGroupDetail.scss";


const miniTabs = [
    { id: 1, text: "Availability" },
    { id: 2, text: "Roles" },
    { id: 3, text: "Users" },
    { id: 4, text: "Summary" }
];
export default class UserGroupDetail extends React.Component<any, any> {
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
            return <Availability />
          case 1:
            return <Roles />
          case 2:
            return <Users />
          case 3:
            return (
            <>
            <Availability summary={true}/>
            <Roles />
            <Users />
            </>
            )
        }
    };
  render() {
    return (
        <div>
            <div className="UserGroup-detail-top">
                <UserForm />
            </div>
            <div className="UserGroup-detail-bottom">
                <FrxTabs
                    tabList={this.state.tabs}
                    typeCard={"line"}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab} />
                <div className="inner-container">{this.renderActiveTabContent()}</div>
            </div>
        </div>
    );
  }
}