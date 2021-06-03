import { Grid, Input } from "@material-ui/core";
import React from "react";
import { TabInfo } from "../../../../../../../models/tab.model";
import FrxTabs from "../../../../../../shared/FrxTabs/FrxTabs";
import FrxTree from "../../../../../../shared/FrxTree";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import HierarchyInformation from "./components/HierarchyInformation";
import HierarchyModules from "./components/HierarchyModules";
import HierarchySummary from "./components/HierarchySummary";
import "./ExpandedDetails.scss";

const data = [
  {
    id: "1",
    key: "1",
    title: "Future Rx",
    styles: { color: "#684999", marginLeft: "0" },
    value: "",
    children: [
      {
        id: "1.1",
        key: "1.1",
        title: "Health Net Community Solutions  |  HCN123",
        styles: { color: "#F65A1C", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.1.1",
            key: "1.1.1",
            title: "HCN PPO  |  HNC3245943303A1",
            styles: { color: "#1FBBC4", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.1.1",
                key: "1.1.1.1",
                title: "Choice Enhanced  |  76-41165CPDC",
                styles: { color: "#80C483", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.1.1.1",
                    key: "1.1.1.1.1",
                    title: "Colorado  |  77701000A2654DC",
                    styles: { color: "#F4AF64", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.1.1.1.1",
                        key: "1.1.1.1.1.1",
                        title: "Choice Enhanced C1  |  11AB30001PPO2C1",
                        styles: { color: "#F89090", marginLeft: "0" },
                        value: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "1.1.2",
            key: "1.1.2",
            title: "Choice Standard  |  76-411365CPHC",
            styles: { color: "#80C483", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.2.1",
                key: "1.1.2.1",
                title: "Florida  |  77701000A2654FL",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
              {
                id: "1.1.2.2",
                key: "1.1.2.2",
                title: "North Carolina |  77701000A2654NC",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.2.2.1",
                    key: "1.1.2.2.1",
                    title: "Choice Standard NC1 |  11AB130003PPONC1",
                    styles: { color: "#F89090", marginLeft: "0" },
                    value: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        key: "1.2",
        title: "HCN EPO   |  HNC324594330EPO",
        styles: { color: "#684999", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.2.1",
            key: "1.2.1",
            title: "EPO Enhanced  |  76-411365EPOE",
            styles: { color: "#80C483", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.2.1.1",
                key: "1.2.1.1",
                title:
                  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |  77701000A2654FL",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
              {
                id: "1.2.1.2",
                key: "1.2.1.2",
                title: "South Carolina  |  77701000A2654SC",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
            ],
          },
        ],
      },
    ],
  },
];

const tabs = [
    { id: 1, text: "Information" },
    { id: 2, text: "Modules" },
    { id: 3, text: "Summary" },
  ];

export default class ExpandedDetails extends React.Component<any, any> {
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
            return <HierarchyInformation />;
          case 1:
            return <HierarchyModules />;
          case 2:
            return <HierarchySummary />;
        }
      };
        
    render(){
        return(
            <div className="hierarchyExpandedContainer">
                <Grid container xs={12}>
                    <Grid item xs={7}>
                        <div className="expandedLeftSection">
              <div className="expandlable-input-field-wrapper">
                <div className="field-container">
                  <Input
                    className="formulary-list-search expandable-formulary-list-search"
                    placeholder="Search"
                    type="text"
                    disableUnderline={true}
                    startAdornment={
                      <svg
                        className="member-search__icon"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                          fill="#999999"
                        />
                      </svg>
                    }
                  />
                </div>
                <div className="field-container expandable-drop-down">
                  <DropDown
                    className="formulary-type-dropdown expandable-formulary-type-dropdown"
                    placeholder="Active"
                    options={["Module", "Module 1"]}
                  />
                </div>
              </div>
                        <div className="hierarchy-tree-container expandable-tree">
        <div className="hierarchy-tree-wrapper expandable-hierarchy-tree-wrapper">
          <div className="hierarchy-tree-sidebar">
            <h6>All</h6>
            <div className="side-bar-options">
              <div>
                <span style={{ color: "#684999" }}>&#x25cf;</span> <span className="text">FutureRX</span>
              </div>
              <div>
                <span style={{ color: "#F65A1C" }}>&#x25cf;</span> <span className="text">Customer</span>
              </div>
              <div>
                <span style={{ color: "#3CBBC4" }}>&#x25cf;</span> <span className="text">Client</span>
              </div>
              <div>
                <span style={{ color: "#80C483" }}>&#x25cf;</span> <span className="text">Carrier</span>
              </div>
              <div>
                <span style={{ color: "#F4AF64" }}>&#x25cf;</span> <span className="text">Account</span>
              </div>
              <div>
                <span style={{ color: "#F89090" }}>&#x25cf;</span> <span className="text">Group</span>
              </div>
            </div>
          </div>
          <div className="hierarchy-tree-body expandable-hierarchy-tree-body">
              <div className="hierarchy-tree">
                <FrxTree checkable={false} data={data} />
              </div>
          </div>
        </div>
        </div>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="expandedRightSection">
                            <FrxTabs
                                tabList={this.state.tabs}
                                typeCard={"line"}
                                activeTabIndex={this.state.activeTabIndex}
                                onClickTab={this.onClickTab}
                            />
                            <div className="tabsInnerSection">
                                {this.renderActiveTabContent()}
                            </div>
                            
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}