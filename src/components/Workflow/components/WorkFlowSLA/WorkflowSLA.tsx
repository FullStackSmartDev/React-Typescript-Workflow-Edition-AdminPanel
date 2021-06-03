import React from "react";
import { TabInfo } from "../../../../models/tab.model";
import FrxTabs from "../../../shared/FrxTabs/FrxTabs";
import CurrentWorkflowSLA from "./Current";

import "./WorkflowSLA.scss";

const tabs = [
    { id: 1, text: "CURRENT" },
    { id: 2, text: "ARCHIVE" },
    { id: 3, text: "SLA" }
];
export default class WorkFlowSLA extends React.Component<any, any> {

    state = {
        activeTabIndex: 0,
        tabs: tabs,
    }

    onClickTab = (selectedTabIndex: number) => {
        let activeTabIndex = 0;

        const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
            if (index === selectedTabIndex) {
                activeTabIndex = index;
            }
            return tab;
        });
        this.setState({ tabs, activeTabIndex })
    };
    renderActiveTabContent = () => {
        const tabIndex = this.state.activeTabIndex;
        switch (tabIndex) {
            case 0:
                return <CurrentWorkflowSLA />;
            case 1:
                return <div>ARCHIVE</div>;
            case 2:
                return <div>SLA</div>;
        }
    };

    render() {

        return (
            <div className="workflow-sla-container">
                <FrxTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                />
                <div className="workflow-sla-tabs-info">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        )
    };
}