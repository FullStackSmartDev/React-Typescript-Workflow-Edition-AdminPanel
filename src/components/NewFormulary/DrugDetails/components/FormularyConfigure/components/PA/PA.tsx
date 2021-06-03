import React, { useState } from "react";

import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import { connect } from "react-redux";

import CustomizedSwitches from "../CustomizedSwitches";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../../mocks/formulary/mock-data";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDownMap";
import { Grid } from "@material-ui/core";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { TabInfo } from "../../../../../../../models/tab.model";
import PaReplace from "./PaReplace";
import PaRemove from "./PaRemove";
import {
  getPaSummary,
  getPaGrouptDescriptions,
  getPaTypes,
  getDrugLists,
} from "../../../../../../../redux/slices/formulary/pa/paActionCreation";
import "../Tier.scss";
import "./PA.scss";
import CustomPanelGrid from "../../../../../../shared/Frx-components/custom-panel-grid/CustomPanelGrid";

function mapDispatchToProps(dispatch) {
  return {
    getPaSummary: (a) => dispatch(getPaSummary(a)),
    getPaGrouptDescriptions: (a) => dispatch(getPaGrouptDescriptions(a)),
    getPaTypes: (a) => dispatch(getPaTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
  };
}
function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary,
    paData: state.paReducer.data,
    formulary_lob_id: state?.application?.formulary_lob_id,
    configureSwitch: state.switchReducer.configureSwitch,
  };
}

class PA extends React.Component<any, any> {
  state = {
    tierGridContainer: false,
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      {
        id: 2,
        text: "Append",
        disabled: this.props.formulary_lob_id == 1 ? true : false,
      },
      { id: 3, text: "Remove", disabled: false },
    ],
    panelGridTitle: [
      "Type",
      "Number Of Groups",
      "Added Groups",
      "Removed Groups",
      "NUMBER OF Drugs",
      "Added Drugs",
      "Removed Drugs",
    ],
    panelGridValue: [],
    paList: [],
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

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    switch (activeTabIndex) {
      case 0:
        return <PaReplace tab_type="replace" />;
        break;
      case 1:
        switch (this.props.formulary_lob_id) {
          case 1:
            return "";
            break;
          case 4:
            return <PaReplace tab_type="append" />;
            break;
          default:
            break;
        }
        break;
      case 2:
        return <PaRemove />;
        break;
    }
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
    let tmpData = nextProps.paData;
    if (tmpData && Array.isArray(tmpData) && tmpData.length > 0) {
      var tierOption: any[] = [];
      var result = tmpData.map(function (el) {
        var curRow = [
          el["pa_type_name"],
          el["total_group_description_count"],
          el["added_group_description_count"],
          el["removed_group_description_count"],
          el["total_drug_count"],
          el["added_drug_count"],
          el["removed_drug_count"],
        ];
        return curRow;
      });
      // if (tierOption.length > 0) {
      //   let lastTier = tierOption[tierOption.length - 1];
      //   this.state.newTierId = lastTier.id_tier + 1;
      // }
      this.setState({
        // tierDefinationColumns: TierColumns,
        panelGridValue: result,
        //tierOption: tierOption
      });
    }
  }

  componentDidMount() {
    this.props
      .getPaSummary(this.props.current_formulary.id_formulary)
      .then((json) => {
        //

        let tmpData =
          json.payload && json.payload.result ? json.payload.result : [];

        var rows = tmpData.map(function (el) {
          var curRow = [
            el["pa_type_name"],
            el["total_group_description_count"],
            el["added_group_description_count"],
            el["removed_group_description_count"],
            el["total_drug_count"],
            el["added_drug_count"],
            el["removed_drug_count"],
          ];
          return curRow;
        });

        console.log(rows);
        this.setState({
          panelGridValue: rows,
        });
      });

    this.props.getDrugLists("0").then((json) => {
      //
      let tmpData = json.payload.data;
      this.setState({
        paList: tmpData,
      });
    });
  }
  render() {
    return (
      <>
        <div className="drug-detail-LA-root">
          <div className="drug-detail-la-container">
            <div className="drug-detail-la-inner">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="mb-10">
                    <div className="limited-access">
                      <PanelHeader title="Prior Authorization - DRUG SELECTION" />
                      <div className="inner-container">
                        <PanelGrid
                          panelGridTitle={this.state.panelGridTitle}
                          panelGridValue={this.state.panelGridValue}
                        />
                        <br />
                        <div className="limited-access">
                          <PanelHeader title="Prior Authorization Settings" />
                          <div className="modify-wrapper white-bg">
                            <div className="modify-panel">
                              <div className="icon">
                                <span>P</span>
                              </div>
                              <div className="switch-box">
                                <CustomizedSwitches
                                  leftTitle="Modify"
                                  rightTitle="view all"
                                />
                              </div>
                              <div className="mini-tabs">
                                <FrxMiniTabs
                                  tabList={this.state.tabs}
                                  activeTabIndex={this.state.activeTabIndex}
                                  onClickTab={this.onClickTab}
                                  disabled={this.props.configureSwitch}
                                />
                              </div>
                              <div>
                                <div className="PA-list">
                                  <span className="list-label">LIST</span>
                                  <DropDown
                                    options={this.state.paList}
                                    valueProp="text"
                                    dispProp="text"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pa-tab-content">
                            {this.renderTabContent()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PA);
