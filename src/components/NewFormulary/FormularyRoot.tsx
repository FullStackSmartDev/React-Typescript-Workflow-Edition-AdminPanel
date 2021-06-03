import React, { Fragment } from "react";
import { TabInfo } from "../../models/tab.model";
import Formulary from "./NewFormulary";
import FrxTabs from "../shared/FrxTabs/FrxTabs";

const tabs = [
  { id: 1, text: "Formulary" },
  { id: 2, text: "Components" },
  { id: 3, text: "Formulary Benefits" },
];

class FormularyRoot extends React.Component<any, any> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        if (selectedTabIndex === 1) {
          window.open(
            "http://vertx-dev-staging-01.ap.futurerx.com:8000/",
            "_blank"
          );
        } else if (selectedTabIndex === 2) {
          window.open(
            "http://vertx-dev-staging-01.ap.futurerx.com:5000",
            "_blank"
          );
        }
        activeTabIndex = index;
      }
      return tab;
    });
    // this.setState({ tabs, activeTabIndex });
  };

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <Formulary />;
      case 1:
        return <div>Formulary Components</div>;
      case 2:
        return <div>Formulary Benefits</div>;
    }
  };

  render() {
    return (
      <>
        <div className="formulary-root">
          <FrxTabs
            tabList={this.state.tabs}
            typeCard={"line"}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          <div className="formulary-inner-content-wrapper">
            {this.renderActiveTabContent()}
          </div>
        </div>
      </>
    );
  }
}

export default FormularyRoot;
