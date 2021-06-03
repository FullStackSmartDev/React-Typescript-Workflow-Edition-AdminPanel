import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import STF from "./STF";
import STRemove from "./StepTherpyRemove";
import FrxGrid from "../../../../../shared/FrxGrid/FrxGrid";
import { getClaimsGridData } from "../../../../../../mocks/grid/claims-mock";
import { getAuditMockColumns } from "../../../../../../utils/grid/columns";
import { getClaimsSearchData } from "../../../../../../mocks/search/claims-search-mock";
import {
  claimsGridColumnsForRejectedAndTotal,
  _claimsGridColumns,
  _grievancesGridColumns,
  _pacases_initial,
  _testClaimsGridColumns,
} from "../../../../../../utils/grid/columns";

interface MemberAuditPopupState {
  activeMiniTabIndex: number;
  miniTabs: any;
  filteredData: any;
  isFetchingData: boolean;
  data: any;
}

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    configureSwitch: state.switchReducer.configureSwitch,
  };
}

class STS extends React.Component<any, any> {
  state = {
    panelGridValue1: [],
    filteredData: [],
    activeTabIndex: 0,
    tabs: [
      {
        id: 1,
        text: "Replace",
        disabled: false,
      },
      {
        id: 2,
        text: "Append",
        disabled: this.props.formulary_lob_id == 1 ? true : false,
      },
      {
        id: 3,
        text: "Remove",
        disabled: false,
      },
    ],
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

  componentWillReceiveProps(nextProps) {
    // debugger;
    console.log("TIER: componentWillReceiveProps", nextProps);

    if (nextProps.configureSwitch) {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: true },
          { id: 2, text: "Append", disabled: true },
          { id: 3, text: "Remove", disabled: true },
        ],
        activeTabIndex: 0,
      });
    } else {
      this.setState({
        tabs: [
          { id: 1, text: "Replace", disabled: false },
          {
            id: 2,
            text: "Append",
            disabled: this.props.formulary_lob_id == 1 ? true : false,
          },
          { id: 3, text: "Remove", disabled: false },
        ],
      });
    }
  }
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    const columns = getAuditMockColumns();
    switch (tabIndex) {
      case 0:
        return <STF tab_type="replace" />;

      case 1:
        switch (this.props.formulary_lob_id) {
          case 1:
            return "";

            break;
          case 4:
            return <STF tab_type="append" />;
            break;
          default:
            break;
        }
        break;

      case 2:
        //     return <FrxGrid
        //     showSettingsMenu={false}
        //     enableColumnDrag={false}
        //     pagintionPosition="topRight"
        //     columns={columns}
        //     data={this.state.filteredData}
        //     gridName={"Audit"}
        //     fixedColumnKeys={['record_type']}
        //     hideClearFilter={true}
        //     hideItemsPerPage={true}
        //     hideMultiSort={true}
        //     hidePageJumper={true}
        //     hideResults={true}
        //     scroll={{ x: 300, y: 400 }}
        //     enableSettings={false}
        //     hidePagination={true}
        // />

        return <STRemove />;
    }
  };

  render() {
    return (
      <>
        <div className="bordered">
          <PanelHeader title="STEP THERAPY SETTING" />
          <div className="inner-container bg-light-grey" style={{ padding: "0px" }}>
            <div className="modify-wrapper  white-bg">
              <div className="modify-panel">
                <div className="icon">
                  <span>P</span>
                </div>
                <div className="switch-box">
                  <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-info">{this.renderActiveTabContent()}</div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(STS);
