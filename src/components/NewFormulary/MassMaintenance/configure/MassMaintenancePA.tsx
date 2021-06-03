import React, { Component } from "react";

import IconInfo from "../../../../assets/icons/IconInfo.svg";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";
import DownloadIcon from "../../../../assets/icons/DownloadIcon.svg";
import EditIcon from "../../../../assets/icons/EditIcon.svg";
import {
  getColumns,
  getData,
  getPACommercialData,
  getDrugsList,
} from "../../../../mocks/formulary-grid/FormularySimpleGridMock";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../shared/Frx-components/button/Button";
import SimpleGrid from "../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import { TabInfo } from "../../../../models/tab.model";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";
import { Input } from "antd";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
import formularyDetailsContext from "../../FormularyDetailsContext";
import {
  getFormularyGridData,
  getDrugsPAGridData,
} from "../../../../mocks/formulary-grid/FormularyGridData";
// import FormularyGrid from "./FormularyGrid";
import DrugGrid from "../../DrugDetails/components/DrugGrid";
import {
  getFormularyGridColumns,
  getDrugsPAGridColumns,
  getTPACommercialGridData,
  getTPAtGridData,
} from "../../../../mocks/formulary-grid/FormularyGridColumn";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";
import PanelHeader from "../../../shared/Frx-components/panel-header/PanelHeader";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";

export interface FormularyGridDS {
  key: string;
  formularyName: string;
  formularyId: string;
  formularyVersion: number;
  contractYeat: string;
  formularyType: string;
  effectiveDate: string;
}
interface MassMaintenancePAState {
  isGroupDescPopupEnabled: boolean;
  gridData: FormularyGridDS[];
  isSearchOpen: boolean;
  isFormularyGridShown: boolean;
  columns: any;
  data: any;
  pinData: {
    value: boolean;
  };
  scroll: {
    x: number;
    y: number;
  };
  miniTabs: TabInfo[];
  activeMiniTabIndex: number;
  drugsList: any[];
}
class MassMaintenancePA extends Component<any, MassMaintenancePAState> {
  state = {
    isGroupDescPopupEnabled: false,
    isSearchOpen: false,
    gridData: getData(),
    gridColumns: getColumns(),
    drugsList: getDrugsList(),
    isFormularyGridShown: false,
    columns: null,
    data: [],
    pinData: {
      value: false,
    },
    scroll: {
      x: 960,
      y: 450,
    },
    miniTabs: [
      {
        id: 1,
        text: "Replace",
      },
      {
        id: 2,
        text: "Append",
      },
      {
        id: 3,
        text: "Remove",
      },
    ],
    activeMiniTabIndex: 0,
  };
  static contextType = formularyDetailsContext;
  addNew = () => {
   
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  saveClickHandler = () => {
    console.log("Save data");
  };
  rowSelectionChange = (r) => {
    console.log(r);
  };

  getPAAssignmentGridData(){
    if(this.context.selectedLOBType == "medicare"){
      return getTPAtGridData();
    }
    else if (this.context.selectedLOBType == "commercial"){
      return getTPACommercialGridData();
    }   
    return getTPACommercialGridData(); 
  }

  getPAGridData(){
    if(this.context.selectedLOBType == "medicare"){
      return getData();
    }
    else if (this.context.selectedLOBType == "commercial"){
      return getPACommercialData();
    }    
    return getPACommercialData();
  }
  
  componentDidMount() {
    debugger;
    this.setState({     
      data: this.getPAAssignmentGridData(),
      gridData: this.getPAGridData(),
    });
  }
 
  onClickMiniTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ miniTabs: tabs, activeMiniTabIndex: activeTabIndex });
  };

  openGroupDescription = (event) => {
    event.stopPropagation();
    this.setState({
      isGroupDescPopupEnabled: !this.state.isGroupDescPopupEnabled,
    });
  };

  closeGroupDescription = () => {
    this.setState({
      isGroupDescPopupEnabled: !this.state.isGroupDescPopupEnabled,
    });
  };
  handleSearch = (searchObject: any) => {
   
  };
  render() {
    const {
      gridData,
      gridColumns,
      drugsList,
      isSearchOpen,
      miniTabs,
      activeMiniTabIndex,
      isGroupDescPopupEnabled,
    } = this.state;
   
    return (
      <div className="mm-pa-root">
        <div className="bordered details-top">
          <div>
          <PanelHeader
                      title="SELECTED FORMULARIES"
                      tooltip="SELECTED FORMULARIES"
                    /> 
          </div>
          <div className="inner-container p-20">
            <div>
              <SimpleGrid columns={gridColumns} data={gridData} />
            </div>
            <div className="dynamic-row-addition">
              <span onClick={this.addNew}>
                <img src={PlusIcon} alt="PlusIcon" />
                &nbsp;
                <span className="__add-new-row">add new</span>
              </span>
            </div>
          </div>
        </div>
        <div className="bordered mm-configure details-top">
          <div className="header">
            <div className="mini-container">
              <div>
                SELECT DRUGS FOR PRIOR AUTHORIZATION
                <span>
                  &nbsp; &nbsp;
                  <img src={IconInfo} alt="info" />
                </span>
              </div>
              <div>
                <DropDown
                  placeholder="FRF"
                  options={["FRF", "Non FRF", "OTC", "ADD File", "Excluded"]}
                />
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                className="Button normal"
                label="Advance Search"
                onClick={this.advanceSearchClickHandler}
              />
              <Button label="Save" onClick={this.saveClickHandler} disabled />
              <img
                style={{
                  marginLeft: "10px",
                }}
                src={DownloadIcon}
                alt="DownloadIcon"
              />
            </div>
          </div>
          <div className="inner-container mm-configure-grid p-20">
          <FrxGridContainer
              enableSearch={false}
              enableColumnDrag={false}
              onSearch={this.handleSearch}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName=""
              enableSettings={true}
              isFetchingData={false}
              columns={getDrugsPAGridColumns()}
              isPinningEnabled={false}
              scroll={{ x: 0, y: 377 }}
              enableResizingOfColumns={false}
              data={this.state.data}
              isCustomCheckboxEnabled={true}
              handleCustomRowSelectionChange={this.rowSelectionChange}
              settingsTriDotClick={() => {
                console.log("object");
              }}
            />
            {isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
              />
            ) : null}
          </div>
        </div>
        <div className="bordered mm-configure-pa-auth details-top">
          <div className="header">PRIOR AUTHORIZATION</div>
          <div className="modify-panel">
            <div className="icon">
              <span>P</span>
            </div>
            <div className="switch-box">
              <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
            </div>
            <div className="mini-tabs">
              <FrxMiniTabs
                tabList={miniTabs}
                activeTabIndex={activeMiniTabIndex}
                onClickTab={this.onClickMiniTab}
              />
            </div>
          </div>
          <div className="inner-container mm-configure-pa-auth-grid p-20">
            {gridData.map((drug) => (
              <div className="mm-configure-pa-auth-grid-item">
                <div>
                  <span className="font-style">{drug.formularyName}</span>
                </div>
                {drug.formularyName === "2021Care1234" ? (
                  <div className="mini-flex-container">
                    <div className="input-groups">
                      <label className="uppercase">
                        pa group description &nbsp;
                        <span className="asterisk">*</span>
                      </label>
                      <div className="input-element">
                        <div
                          className="bordered pointer"
                          onClick={this.openGroupDescription}
                        >
                          <span className="inner-font">ADHD PA over 25</span>
                          <img src={EditIcon} alt="EditIcon" />
                        </div>
                      </div>
                    </div>
                    <div className="input-groups">
                      <label className="uppercase">
                        pa type &nbsp;
                        <span className="asterisk">*</span>
                      </label>
                      <div className="input-element">
                        <div className="bordered">
                          <span className="no-inner-font">
                            New Starts Only (2)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="fancy">
                    <span className="fancy-font">
                      Not applicable for this formulary
                    </span>
                  </div>
                )}
              </div>
            ))}

            <div className="button-container-root">
              <span className="white-bg-btn">
                <Button label="Save" onClick={() => {}} />
              </span>
              <Button label="Save & Continue" onClick={() => {}} />
            </div>
          </div>
        </div>
        {isGroupDescPopupEnabled ? (
          <DialogPopup
            showCloseIcon={false}
            positiveActionText=""
            negativeActionText=""
            title="group description"
            children="Group Description Screen #16"
            handleClose={this.closeGroupDescription}
            handleAction={() => {}}
            showActions={false}
            height="80%"
            width="90%"
            open={isGroupDescPopupEnabled}
          />
        ) : null}
      </div>
    );
  }
}

export default MassMaintenancePA;
