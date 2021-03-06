import { Button, Grid } from "@material-ui/core";
import React from "react";
import { TabInfo } from "../../../../../models/tab.model";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import ModulesSelectionDetails from "./components/ModulesSelectionDetails/ModulesSelectionDetails";
import Formulary from "./../Modals/Modules/Formulary";
import Adjudication from "./../Modals/Modules/Adjudication";

import "./ModulesDetails.scss";

export default class ModulesDetails extends React.Component<any, any> {
  state = {
    lstSelectedModule: [],
    isModulesSelected: false,
    isModulePopoverNeeded: false,
    tabs: Array(),
    activeTabIndex: 0,
  };

  getTabs = () => {
    let tabs: any[] = [];
    for (let i = 0; i < this.state.lstSelectedModule.length; i++) {
      let obj = {};
      obj["id"] = this.state.lstSelectedModule[i]["id"];
      obj["text"] = this.state.lstSelectedModule[i]["name"];

      tabs.push(obj);
    }
    return tabs;
  };

  ModulesSelectionApplyClick = (lstSelectedModule: any) => {
    this.setState(
      { isModulesSelected: true, lstSelectedModule: lstSelectedModule },
      () => {
        this.setState({ tabs: this.getTabs(), isModulePopoverNeeded: false });
      }
    );
  };

  ModulesPopoverClickHandler = () => {
    this.setState({ isModulePopoverNeeded: !this.state.isModulePopoverNeeded });
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
    if(this.state.tabs?.length > 0){
      const tabText= this.state.tabs[this.state.activeTabIndex].text.toLowerCase();
      switch (tabText) {
        case 'adjudication':
          return <Adjudication />;
        case 'formulary':
          return <Formulary />;
      }
    }
  
  };
  render() {
    return (
      <div>
        {!this.state.isModulesSelected ? (
          <Grid container xs={6} className="modulesSelectionWrapper">
            <ModulesSelectionDetails
              ModulesSelectionApplyClick={this.ModulesSelectionApplyClick}
            />
          </Grid>
        ) : (
          <div className="ModulesDetailsWrapper">
            <label className="heading">Modules</label>
            <br />
            <br />
            <div className="grid-container-header-wrapper">
              <div className="grid-name-fields-wrapper">
                <div className="input-field-search--icon-wrapper">
                  <span>
                    <svg width="11" height="11" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.66 23.3432L19.7915 18.0861C19.5717 17.8488 19.2739 17.717 18.9613 17.717H18.1654C19.5131 15.8557 20.314 13.5145 20.314 10.9677C20.314 4.90909 15.7678 0 10.157 0C4.54623 0 0 4.90909 0 10.9677C0 17.0263 4.54623 21.9354 10.157 21.9354C12.5156 21.9354 14.6837 21.0706 16.4074 19.6153V20.4748C16.4074 20.8122 16.5295 21.1339 16.7493 21.3712L21.6178 26.6283C22.0768 27.1239 22.8191 27.1239 23.2732 26.6283L24.6551 25.136C25.1141 24.6404 25.1141 23.8389 24.66 23.3432ZM10.157 17.717C6.70459 17.717 3.90654 14.7009 3.90654 10.9677C3.90654 7.23972 6.69971 4.21834 10.157 4.21834C13.6094 4.21834 16.4074 7.23445 16.4074 10.9677C16.4074 14.6956 13.6143 17.717 10.157 17.717Z" fill="#C4C4C4"/>
                    </svg>
                  </span>
                  <div><input type="text" placeholder="Name" /></div>
                </div>
                <div className="input-field-search--icon-wrapper">
                  <span>
                    <svg width="11" height="11" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.66 23.3432L19.7915 18.0861C19.5717 17.8488 19.2739 17.717 18.9613 17.717H18.1654C19.5131 15.8557 20.314 13.5145 20.314 10.9677C20.314 4.90909 15.7678 0 10.157 0C4.54623 0 0 4.90909 0 10.9677C0 17.0263 4.54623 21.9354 10.157 21.9354C12.5156 21.9354 14.6837 21.0706 16.4074 19.6153V20.4748C16.4074 20.8122 16.5295 21.1339 16.7493 21.3712L21.6178 26.6283C22.0768 27.1239 22.8191 27.1239 23.2732 26.6283L24.6551 25.136C25.1141 24.6404 25.1141 23.8389 24.66 23.3432ZM10.157 17.717C6.70459 17.717 3.90654 14.7009 3.90654 10.9677C3.90654 7.23972 6.69971 4.21834 10.157 4.21834C13.6094 4.21834 16.4074 7.23445 16.4074 10.9677C16.4074 14.6956 13.6143 17.717 10.157 17.717Z" fill="#C4C4C4"/>
                    </svg>
                  </span>
                  <div>
                    <input
                    className="setleftMargin"
                    type="text"
                    placeholder="Level ID"
                    />
                  </div>
                </div>
                { 
                    (this.state.tabs?.length > 0 && this.state.tabs[this.state.activeTabIndex].text.toLowerCase()==='adjudication') &&
                  <>
                <div className="input-field-search--icon-wrapper">
                  <span>
                    <svg width="11" height="11" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.66 23.3432L19.7915 18.0861C19.5717 17.8488 19.2739 17.717 18.9613 17.717H18.1654C19.5131 15.8557 20.314 13.5145 20.314 10.9677C20.314 4.90909 15.7678 0 10.157 0C4.54623 0 0 4.90909 0 10.9677C0 17.0263 4.54623 21.9354 10.157 21.9354C12.5156 21.9354 14.6837 21.0706 16.4074 19.6153V20.4748C16.4074 20.8122 16.5295 21.1339 16.7493 21.3712L21.6178 26.6283C22.0768 27.1239 22.8191 27.1239 23.2732 26.6283L24.6551 25.136C25.1141 24.6404 25.1141 23.8389 24.66 23.3432ZM10.157 17.717C6.70459 17.717 3.90654 14.7009 3.90654 10.9677C3.90654 7.23972 6.69971 4.21834 10.157 4.21834C13.6094 4.21834 16.4074 7.23445 16.4074 10.9677C16.4074 14.6956 13.6143 17.717 10.157 17.717Z" fill="#C4C4C4"/>
                    </svg>
                  </span>                 
                  <div>
                    <input
                    className="setleftMargin"
                    type="text"
                    placeholder="BIN"
                    />
                  </div>
                </div>
                <div className="input-field-search--icon-wrapper">
                  <span>
                  </span>
                  <div>
                    <input
                    className="setleftMargin"
                    type="text"
                    placeholder="PCN"
                  />
                  </div>
                </div>
                </>
        }
              </div>
              <div className="clear-search-btn-wrapper">
                <span>
                  <svg width="76" height="35" viewBox="0 0 76 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 26C23.1944 26 27 22.1945 27 17.5C27 12.8055 23.1944 9 18.5 9C13.8056 9 10 12.8055 10 17.5C10 22.1945 13.8056 26 18.5 26ZM18.5 25C22.6422 25 26 21.6421 26 17.5C26 13.3579 22.6422 10 18.5 10C14.3578 10 11 13.3579 11 17.5C11 21.6421 14.3578 25 18.5 25Z" fill="#666666"/>
                  <path d="M15.318 14.318C15.1228 14.5133 15.1228 14.8299 15.318 15.0251L17.7929 17.5L15.318 19.9749C15.1228 20.1701 15.1228 20.4867 15.318 20.682C15.5133 20.8772 15.8299 20.8772 16.0251 20.682L18.5 18.2071L20.9749 20.682C21.1701 20.8772 21.4867 20.8772 21.682 20.682C21.8773 20.4867 21.8773 20.1701 21.682 19.9749L19.2071 17.5L21.682 15.0251C21.8773 14.8299 21.8773 14.5133 21.682 14.318C21.4867 14.1228 21.1701 14.1228 20.9749 14.318L18.5 16.7929L16.0251 14.318C15.8299 14.1228 15.5133 14.1228 15.318 14.318Z" fill="#666666"/>
                  <path d="M44.6799 18.793C44.5745 19.6953 44.2405 20.3926 43.678 20.8848C43.1194 21.373 42.3752 21.6172 41.4455 21.6172C40.4377 21.6172 39.6291 21.2559 39.0198 20.5332C38.4143 19.8105 38.1116 18.8438 38.1116 17.6328V16.8125C38.1116 16.0195 38.2522 15.3223 38.5334 14.7207C38.8186 14.1191 39.2209 13.6582 39.7405 13.3379C40.26 13.0137 40.8616 12.8516 41.5452 12.8516C42.4514 12.8516 43.178 13.1055 43.7248 13.6133C44.2717 14.1172 44.5901 14.8164 44.6799 15.7109H43.5491C43.4514 15.0312 43.2385 14.5391 42.9104 14.2344C42.5862 13.9297 42.1311 13.7773 41.5452 13.7773C40.8264 13.7773 40.262 14.043 39.8518 14.5742C39.4455 15.1055 39.2424 15.8613 39.2424 16.8418V17.668C39.2424 18.5938 39.4358 19.3301 39.8225 19.877C40.2092 20.4238 40.7502 20.6973 41.4455 20.6973C42.0705 20.6973 42.5491 20.5566 42.8811 20.2754C43.217 19.9902 43.4397 19.4961 43.5491 18.793H44.6799ZM47.3488 21.5H46.2648V12.5H47.3488V21.5ZM51.8398 21.6172C50.9805 21.6172 50.2812 21.3359 49.7422 20.7734C49.2031 20.207 48.9336 19.4512 48.9336 18.5059V18.3066C48.9336 17.6777 49.0527 17.1172 49.291 16.625C49.5332 16.1289 49.8691 15.7422 50.2988 15.4648C50.7324 15.1836 51.2012 15.043 51.7051 15.043C52.5293 15.043 53.1699 15.3145 53.627 15.8574C54.084 16.4004 54.3125 17.1777 54.3125 18.1895V18.6406H50.0176C50.0332 19.2656 50.2148 19.7715 50.5625 20.1582C50.9141 20.541 51.3594 20.7324 51.8984 20.7324C52.2812 20.7324 52.6055 20.6543 52.8711 20.498C53.1367 20.3418 53.3691 20.1348 53.5684 19.877L54.2305 20.3926C53.6992 21.209 52.9023 21.6172 51.8398 21.6172ZM51.7051 15.9336C51.2676 15.9336 50.9004 16.0938 50.6035 16.4141C50.3066 16.7305 50.123 17.1758 50.0527 17.75H53.2285V17.668C53.1973 17.1172 53.0488 16.6914 52.7832 16.3906C52.5176 16.0859 52.1582 15.9336 51.7051 15.9336ZM59.6063 21.5C59.5438 21.375 59.493 21.1523 59.454 20.832C58.9501 21.3555 58.3485 21.6172 57.6493 21.6172C57.0243 21.6172 56.5106 21.4414 56.1083 21.0898C55.7098 20.7344 55.5106 20.2852 55.5106 19.7422C55.5106 19.082 55.7606 18.5703 56.2606 18.207C56.7645 17.8398 57.4716 17.6562 58.3817 17.6562H59.4364V17.1582C59.4364 16.7793 59.3231 16.4785 59.0966 16.2559C58.87 16.0293 58.536 15.916 58.0946 15.916C57.7079 15.916 57.3837 16.0137 57.122 16.209C56.8602 16.4043 56.7294 16.6406 56.7294 16.918H55.6395C55.6395 16.6016 55.7509 16.2969 55.9735 16.0039C56.2001 15.707 56.5048 15.4727 56.8876 15.3008C57.2743 15.1289 57.6981 15.043 58.1591 15.043C58.8895 15.043 59.4618 15.2266 59.8759 15.5938C60.2899 15.957 60.5048 16.459 60.5204 17.0996V20.0176C60.5204 20.5996 60.5946 21.0625 60.743 21.4062V21.5H59.6063ZM57.8075 20.6738C58.1473 20.6738 58.4696 20.5859 58.7743 20.4102C59.079 20.2344 59.2997 20.0059 59.4364 19.7246V18.4238H58.5868C57.2587 18.4238 56.5946 18.8125 56.5946 19.5898C56.5946 19.9297 56.7079 20.1953 56.9345 20.3867C57.161 20.5781 57.452 20.6738 57.8075 20.6738ZM65.4041 16.1328C65.24 16.1055 65.0623 16.0918 64.8709 16.0918C64.1599 16.0918 63.6775 16.3945 63.4236 17V21.5H62.3396V15.1602H63.3943L63.4119 15.8926C63.7673 15.3262 64.2712 15.043 64.9236 15.043C65.1345 15.043 65.2947 15.0703 65.4041 15.125V16.1328Z" fill="#666666"/>
                  <line x1="38" y1="24" x2="66" y2="24" stroke="#666666" stroke-dasharray="1 1"/>
                  </svg>
                </span>
                <Button>Search</Button>
              </div>
            </div>

            <div className="modulesTabsWrapper">
              <div className="modulesMiniTabs">
                {this.state.lstSelectedModule &&
                  this.state.lstSelectedModule.length > 0 && (
                    <FrxMiniTabs
                      tabList={this.state.tabs}
                      activeTabIndex={this.state.activeTabIndex}
                      onClickTab={this.onClickTab}
                    />
                  )}
              </div>
              <div className="action-btn">
                <Button
                  onClick={this.ModulesPopoverClickHandler}
                  className="modulesBtn"
                >
                  Modules
                </Button>
                {this.state.isModulePopoverNeeded && (
                  <div className="modulesSelection">
                    <PanelHeader title="Select Modules" />
                    <div className="setleftMargin modulesSelectionWrapper">
                      <ModulesSelectionDetails
                        alreadySelectedModules={this.state.lstSelectedModule}
                        ModulesSelectionApplyClick={
                          this.ModulesSelectionApplyClick
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {this.state.lstSelectedModule &&
              this.state.lstSelectedModule.length > 0 && (
                <div className="inner-container">
                  {this.renderActiveTabContent()}
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}
