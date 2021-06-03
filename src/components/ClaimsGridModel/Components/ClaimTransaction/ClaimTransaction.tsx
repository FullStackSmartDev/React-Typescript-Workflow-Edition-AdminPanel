/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./ClaimTransaction.scss";

//antd
import { Table } from "antd";

//material ui
import { Grid } from "@material-ui/core";

//components
import { TabInfo } from "../../../../models/tab.model";
import {
  claimTransactionAccorLabels,
  getClaimModalTransactionMiniTabData,
  responseStatus,
} from "../../../../mocks/ClaimGridModelMock";
import FrxMiniTab from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import ClaimTransactionAccordion from "./ClaimTransactionAccordion";
import CustomDropdown from "../../../shared/Frx-components/dropdown/DropDown";

export interface ClaimTransactionProps {
  claimData: any;
}

class ClaimTransaction extends React.Component<ClaimTransactionProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      blocks: claimTransactionAccorLabels,
      miniTab: getClaimModalTransactionMiniTabData(),
      activeTabIndex: 0,
      showButton: true,
    };
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    const folderTabs = this.state.miniTab.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ folderTabs, activeTabIndex });
  };

  toggle(id) {
    this.setState((prevState) => {
      const index = prevState.blocks.findIndex((item) => item.id == id);
      prevState.blocks[index].expanded = !prevState.blocks[index].expanded;
      return { blocks: prevState.blocks };
    });
  }

  toggleExpand(expand) {
    this.setState((prevState) => {
      const blocks = prevState.blocks.map((item) => {
        item.expanded = expand;
        return item;
      });
      return { blocks };
    });
    this.setState({
      showButton: !this.state.showButton,
    });
  }

  render() {
    return (
      <div className="claim-transaction-root scroll-bar">
        <div className="claim-transaction-root__actions">
          <FrxMiniTab
            tabList={this.state.miniTab}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          {this.state.activeTabIndex === 0 ? (
            <>
              {this.props.claimData.status === "Rejected" ? (
                <>
                  <label>Show</label>
                  <CustomDropdown
                    placeholder="All"
                    options={["All", "Passed Only", "Errors Only"]}
                  />
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          <div className="claim-transaction-root__actions--buttons">
            <button
              style={{ display: this.state.showButton ? "block" : "none" }}
              type="button"
              className="claim-transaction-root__actions--buttons__btn"
              onClick={() => this.toggleExpand(true)}
            >
              Expand All
            </button>
            <button
              style={{ display: this.state.showButton ? "none" : "block" }}
              type="button"
              className="claim-transaction-root__actions--buttons__btn"
              onClick={() => this.toggleExpand(false)}
            >
              Collapse All
            </button>
          </div>
        </div>
        <dl className="accordion">
          {this.state.activeTabIndex === 0 ? (
            <>
              {this.state.blocks.map((item) => (
                <>
                  <ClaimTransactionAccordion
                    claimStatus={this.props.claimData.status}
                    key={item.id}
                    title={item.label}
                    content={item.content}
                    expand={item.expanded}
                    onClick={() => this.toggle(item.id)}
                  />
                </>
              ))}
            </>
          ) : this.state.activeTabIndex === 1 ? (
            <>
              <div className="response-status">
                {responseStatus.map((status, i) => (
                  <div className="fields">
                    <label>{status.label}</label>
                    {/* {this.props.claimData.status === "Rejected" ? ( */}
                    <div className="fields-status">
                      <span>{status.statusValue}</span>
                    </div>
                    {/* ) : ""} */}
                    {/* {this.props.claimData.status === "Paid" || this.props.claimData.status === "Reversed" ? (
                        <span>{status.statusValue2}</span>
                        ) : ""} */}
                  </div>
                ))}
              </div>
              <div className="accordion-response">
                {this.state.blocks.map((item) => (
                  <>
                    <ClaimTransactionAccordion
                      claimStatus={this.props.claimData.status}
                      key={item.id}
                      title={item.responseLabel}
                      content={item.content}
                      expand={item.expanded}
                      onClick={() => this.toggle(item.id)}
                    />
                  </>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </dl>
      </div>
    );
  }
}

export default ClaimTransaction;
