import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion"
import { marketingColumns } from "../../../utils/grid/columns";
import { MarketingMockData } from "../../../mocks/MarketingMock";
import {
  getTapList,
  getMaterialTableTab,
} from "../../../mocks/formulary/mock-data";
import downloadIcon from "../../../assets/icons/download.png";
import { DatePicker, TimePicker } from "antd";
import moment from 'moment';
import "./MarketingMaterial.scss";
import MaterialIconPopup from "./MaterialIconPopup";
import AddFileMarketingPopup from "./AddFileMarketingPopup";
import NocReportPopup from "./NocReportPopup";
import WebAnalyticsPopup from "./WebAnalyticsPopup";

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
}

interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
  title: "NOC Report"
  title2: "test"
}


interface State {
 
  materialPopupInd: boolean;
  show:boolean;
  
}

export default class MarketingMaterialTable extends React.Component<any, any> {

  state = {
    miniTabs: getMaterialTableTab(),
    activeTabIndex: 0,
    activeMiniTabIndex: 0,
    materialPopupInd: false,    
    show:false,
    popUpIdn:"",
    title:"",
    communicationPopupHeader: false,
    btnAcordian: false
  };

  onClose = () => {
    console.log("close");
    this.setState({ materialPopupInd: false });
    return true;
  };
  closeClaimsResult = () => {
    this.setState({ materialPopupInd: false });
  };
  handleIconClick = (param,title,headerData) => {
    this.setState({ materialPopupInd: true });
    this.setState({ popUpIdn: param });
    this.setState({ title: title });
    this.setState({ communicationPopupHeader: headerData });
  }

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };
  processCloseActions = () => {
    this.setState({ show: true });
  };
  render() {
    return (
        <Fragment>
          <div className="marketing-material-table-container">
          <div className="header-material space-between pr-10">
            MATERIALS AND SEARCH TOOLS
            <div className="button-wrapper">
              <Button label="NOC Report" onClick={(e) => this.handleIconClick("noc", "Noc report",false)} />
              <Button label="Website Analytics" onClick={(e) => this.handleIconClick("web", "Website traffic analysis",false)} className="web-anylaytic-btn" />
              <img
              style={{ marginRight: "20px" }}
              src={downloadIcon}
              alt=""
              width="16px"
              height="16px"
            />
            </div>
          </div>
          <div className="date-time-wrapper">
            <div className="group">
                <label>
                  Publish Date And Time
                </label>
                <DatePicker
                  className="effective-date"
                  placeholder="Select Date"
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ant-picker-suffix"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  }
                />
            </div>
            <div className="group time-picker">
            <TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
            </div>
            <div className="submit-btn">
            <Box display="flex">
              <Button label="Submit" className="sub-btn" />
            </Box>
            </div>
          </div>
          <div className="marketing-material-table">
          <div className="header space-between pr-10">
            COMMON MATERIALS
            <div className="button-wrapper">
              <Button label="Add File" onClick={(e) => this.handleIconClick("addFile","communication",true)} />
            </div>
          </div>
          <div className="mini-tabs">
            <FrxMiniTabs
              tabList={this.state.miniTabs}
              activeTabIndex={this.state.activeMiniTabIndex}
              onClickTab={this.onClickMiniTab}
            />
          </div>
          </div>
          </div>
          <div className="popup-wrapper-add-file">
          <MaterialIconPopup
            className="frx-claims-result-rooty"
            open= {this.state.materialPopupInd}
            positiveActionText="Communication"
            ulpoadIconBtnText="Select"
            title={this.state.title}
            communicationPopupHeader={this.state.communicationPopupHeader}
            showCloseIcon={true}
            showActions={false}
            handleClose={() => {
              this.onClose();
            }}
            handleAction={() => {
              this.processCloseActions();
            }}
          >
            {this.state.popUpIdn === "addFile" ?
          <AddFileMarketingPopup /> 
          : this.state.popUpIdn === "noc" ?
          <NocReportPopup />
          : 
          <WebAnalyticsPopup />
        }
        </MaterialIconPopup>
        </div>
        <div className="market-tabel-border">
          <div className="bordered">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={marketingColumns()}
            scroll={{ x: 2000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={MarketingMockData()}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
            }}
          />
            <div className="group-accordian">
            <CustomAccordion name="Group 1" btnAcordian={true}>

            </CustomAccordion>
            </div>
            <div className="group-accordian">
            <CustomAccordion name="Group 2" btnAcordian={true}>

            </CustomAccordion>
          </div>
        </div>
        </div>
    </Fragment>
    );
  }
}
