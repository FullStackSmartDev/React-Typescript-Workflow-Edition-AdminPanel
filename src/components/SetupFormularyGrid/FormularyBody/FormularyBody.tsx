import React from "react";
import { TabInfo } from "../../../models/tab.model";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import Medicare from "../../NewFormulary/Medicare/Medicare";
import DrugDetails from "../../NewFormulary/DrugDetails/components/FormularyConfigure/components/DrugDetails";

import "./FormularyBody.scss";
import HmpsSubmissionTable from "../hmpsSubmissionTable/hmpsSubmissionTable";
import StandardReporting from "../StandardReporting/StandardReporting";
import MarketingMaterial from "../MarketingMaterial/MarketingMaterial";

const tabs = [
  { id: 1, text: "HMPS SUBMISSION FILES (EXPORT)" },
  { id: 2, text: "MARKETING MATERIALS & FORMULARY SEARCH TOOL" },
  { id: 3, text: "STANDARD REPORTING" },
  // { id: 4, text: "EXCHANGE" }
];

interface State {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  showTabs: boolean;
  showDrugDetails: boolean;
}

export default class FormularyBody extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showDrugDetails: false,
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
  drugDetailsClickHandler = () => {
    this.setState({
      showTabs: !this.state.showTabs,
      showDrugDetails: !this.state.showDrugDetails,
    });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        // return <Medicare drugDetailClick={this.drugDetailsClickHandler}/>
        return <HmpsSubmissionTable />;
      case 1:
        return <MarketingMaterial />;
      case 2:
        return (
          <div>
            <StandardReporting />
          </div>
        );
      default:
        return null;
    }
  };
  render() {
    return (
      <div className="formulary-root">
        {this.state.showTabs ? (
          <>
            <FrxTabs
              tabList={this.state.tabs}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
            <div className="formulary-tabs-info">
              {this.renderActiveTabContent()}
            </div>
          </>
        ) : this.state.showDrugDetails ? (
          <>
            <DrugDetails />
          </>
        ) : null}
      </div>
    );
  }
}
