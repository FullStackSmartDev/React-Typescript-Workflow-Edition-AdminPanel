import React from "react";
import { connect } from "react-redux";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../../../../../models/tab.model";
import {
  getCommercialTabList,
  getMedicareTabList,
} from "../../../../../../mocks/formulary/mock-data";
import LAComponent from "./DrugDetailLA";
import AFComponent from "./DrugDetailAF";
import PBSTComponent from "./DrugDetailPBST";
import PGCComponent from "./DrugDetailPGC";
import MOMNComponent from "./DrugDetailMOMN";
import LISComponent from "./DrugDetailLIS";
import IBFComponent from "./DrugDetailIBF";
import FGCComponent from "./FGC";
import FFFComponent from "./FFF";
import HIComponent from "./HI";
import VBIDComponent from "./VBID";
import CBComponent from "./CB";
import SSMComponent from "./SSM";
import SOComponent from "./SO";
import getLobCode from "../../../../Utils/LobUtils";
import DrugDetailAL from "../../AL/AL";
import DrugDetailGL from "../../GL/GL";
import DrugDetailICD from "../../ICD/ICD";
import DrugDetailPN from "../../PN/PN";
import DrugDetailPT from "../../PT/PT";
import DrugDetailPOS from "../../POS/POS";
import DrugDetailPR from "../../PR/PR";
import DrugDetailFFF from "../../FFF/FFF";
import DrugDetailOther from "../../Other/Other";

interface drugDetailsState {
  activeTabIndex: number;
  tabs: Array<TabInfo>;
}

const mapStateToProps = (state) => {
  return {
    formulary_lob_id: state?.application?.formulary_lob_id,
    edit_info: state?.application?.formulary?.edit_info,
    designOptions: state?.setupOptions?.designOptions,
  };
};

interface ddTopState {
  activeTabIndex: number,
  tabs: any[],
}

class DrugDetails extends React.Component<any, drugDetailsState> {
  state: ddTopState = {
    activeTabIndex: 0,
    tabs: [],
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    console.log("The Tabs = ", this.state.tabs)
    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      console.log("The Tab index = ", index, " The Selected index = ", selectedTabIndex);
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex }, () => console.log("The tabs = ", tabs, " and Active tab Index = ", activeTabIndex));
  };

  componentDidMount() {
    let tabs: any[] = [];
    if (this.props.formulary_lob_id === 4) {
      tabs = this.getCommTabData();
    } else {
      tabs = getMedicareTabList();
    }
    this.setState({ tabs });

    this.getCommTabData();
  }

  getCommTabData = () => {
    console.log("------The Application edit_info = ", this.props.edit_info);
    console.log("------THe Application designOptions = ", this.props.designOptions);

    let ddtabdata = [
      {key: 61, code: "AL", text: "AL"},
      {key: 62, code: "GL", text: "GL"},
      {key: 63, code: "ICD", text: "ICDL"},
      {key: 65, code: "PN", text: "PHNW"},
      {key: 66, code: "PT", text: "PRTX"},
      {key: 67, code: "POS", text: "POS"},
      {key: 64, code: "PR", text: "PATRS"},
      {key: 439, code: "FFF", text: "FFF"},
    ];

    let newDDtableData:any[] = [];
    if(this.props.edit_info){
      for(let j=0; j<this.props.edit_info.length; j++) {
        
        for(let i=0; i<ddtabdata.length; i++) {
          if((this.props.edit_info[j]['id_edit'] === ddtabdata[i]['key']) && this.props.edit_info[j]['id_checked']) {
            let ddObj = {};
            ddObj['id'] = newDDtableData.length + 1;
            ddObj['text'] = ddtabdata[i]['code'];
            newDDtableData.push(ddObj);
          }
        }
      }

      for(let i=0; i<this.props.designOptions.length; i++) {
        if(this.props.designOptions[i]['is_custom']) {
          let ddObj = {};
          ddObj['id'] = newDDtableData.length + 1;
          ddObj['text'] = 'Other';
          newDDtableData.push(ddObj);
          break;
        }
      }
    }
    console.log("--THe New DD Table Data = ", newDDtableData);
    return newDDtableData;

    // if(this.props.designOptions) {
    //   let commercialTabList: any[] = [];
    //   for(let i=0; i<this.props.designOptions.length; i++) {
        
    //     for(let j=0; j<this.props.edit_info.length; j++) {
    //       if((this.props.designOptions[i]['id_edit'] === this.props.edit_info[j]['id_edit']) && this.props.edit_info[j]['id_checked']) {
    //         let commObj = {};
    //         commObj['id'] = i;
    //         commObj['text'] = this.props.designOptions[i]['code_value'];
    //         commercialTabList.push(commObj);
    //       }
    //     }
    //   }
    //   console.log("THe COmmercial Tab List = ", commercialTabList);
    // }
  }

  getCommercialTabList = () => {
    return [
      {
          id: 1,
          text: "AL"
      },
      {
          id: 2,
          text: "GL"
      },
      {
          id: 3,
          text: "ICD"
      },
      {
          id: 4,
          text: "PN"
      },
      {
          id: 5,
          text: "PT"
      },
      {
          id: 6,
          text: "POS"
      },
      {
          id: 7,
          text: "PR"
      },
      {
          id: 8,
          text: "FFF"
      },
      {
          id: 9,
          text: "Other"
      },
    ]
  }

  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    console.log("The Active Tab Index ==== ", tabIndex);
    console.log("The Available Tabs = ", this.state.tabs);
    let tabToRender = this.state.tabs[tabIndex]?.text;
    if (this.props.formulary_lob_id === 4) {
      switch (tabToRender) {
        case "AL":
          return <DrugDetailAL />;
        case "GL":
          return <DrugDetailGL />;
        case "ICD":
          return <DrugDetailICD />;
        case "PR":
          return <DrugDetailPR />;
        case "PN":
          return <DrugDetailPN />;
        case "PT":
          return <DrugDetailPT />;
        case "POS":
          return <DrugDetailPOS />;
        case "FFF":
          return <DrugDetailFFF />;
        case "Other":
          return <DrugDetailOther />;
      }
    } else {
      switch (tabIndex) {
        case 0:
          return <LAComponent />;
        case 1:
          return <MOMNComponent />;
        case 2:
          return <IBFComponent />;
        case 3:
          return <FGCComponent />;
        case 4:
          return <PGCComponent />;
        case 5:
          return <FFFComponent />;
        case 6:
          return <HIComponent />;
        case 7:
          return <VBIDComponent />;
        case 8:
          return <CBComponent />;
        case 9:
          return <LISComponent />;
        case 10:
          return <PBSTComponent />;
        case 11:
          return <SSMComponent />;
        case 12:
          return <AFComponent />;
        case 13:
          return <SOComponent />;
      }
    }
  };

  render() {
    console.log("--------The LOB ID = ", this.props.formulary_lob_id);
    console.log("----THe LOB COde = ", getLobCode(this.props.formulary_lob_id));

    return (
      <>
        <div className="bordered details-top white-bg details-tab-top">
          <div className="header">Drug Details</div>
          <div className="inner-container">
            <div className="configure-mini-tabs">
              <FrxMiniTabs
                tabList={this.state.tabs}
                activeTabIndex={this.state.activeTabIndex}
                onClickTab={this.onClickTab}
              />
            </div>
          </div>
        </div>
        <div className="tabs-info details-tab-bottom-info">{this.renderActiveTabContent()}</div>
      </>
    );
  }
}

export default connect(mapStateToProps)(DrugDetails);
