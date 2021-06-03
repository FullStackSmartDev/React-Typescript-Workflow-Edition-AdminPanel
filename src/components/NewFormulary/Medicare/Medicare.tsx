import React from "react";
import { connect } from "react-redux";

import { TabInfo } from "../../../models/tab.model";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import { formularyDetailsGridColumns } from "../../../utils/grid/columns";
import FrxGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import FormularyExpandedDetails from "../../FormularyExpandedDetails/FormularyExpandedDetails";
import Alternatives from "../Alternatives/Alternatives";
import FrxLoader from "../.././shared/FrxLoader/FrxLoader";
import MaintenanceMassUpdate from "../MassMaintenance/MaintenanceMassUpdate/MaintenanceMassUpdate";
import PanelHeader from "../../shared/Frx-components/panel-header/PanelHeader";
import SearchBox from "../../shared/Frx-components/search-box/SearchBox";
import "./Medicare.scss";
import { Popover, Button } from "antd";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import DropDownMap from "../../shared/Frx-components/dropdown/DropDownMap";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import * as _ from "lodash";
import { getSearchCategoryOptions } from "../Utils/SearchCategory";

import {
  homeSearchOptions,
  searchFormularyData,
} from "../../../redux/slices/formulary/homeSearch/searchSlice";
import AdvanceSearchContainer from "../NewAdvanceSearch/AdvanceSearchContainer";
import { AnyARecord, AnyCnameRecord, AnySrvRecord } from "dns";
import { Column } from "../../../models/grid.model";
interface State {
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
  gridData: any;
  gridColumn: any;
  searchType: any;
  searchSubType: any;
  searchSubCategory: any;
  gridSingleSortInfo: any;
  isGridSignleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  isFiltered: boolean;
  filteredInfo: any;
  staticData: string[];
  isColumnsChanged: boolean;
  changedColumns: Column<any>[];
}

const miniTabs = [
  { id: 1, text: "Formulary" },
  { id: 2, text: "Mass Maintenance" },
  { id: 3, text: "Alternatives" },
  {
    id: 4,
    text: "Decision Tree",
  },
  { id: 5, text: "Group Description Management" },
];

// const searchCategory = [
//   { key: "", value: "All" },
//   { key: "associated-contracts", value: "Associated Contracts" },
//   { key: "breadcrumbs", value: "Breadcrumb" },
//   { key: "formulary-types", value: "Formulary Type" },
//   { key: "medicare-contract-types", value: "Medicare Contract Type" },
//   { key: "client-states", value: "State" },
//   { key: "tier-descriptions", value: "Tier Description" },
//   { key: "none", value: "None" },
// ];

const searchCategory = (currentLob) => {
  switch (currentLob) {
    case 4 | 3:
      return [
        { key: "", value: "All" },
        { key: "associated-contracts", value: "Associated Contracts" },
        { key: "breadcrumbs", value: "Breadcrumb" },
        // { key: "formulary-types", value: "Formulary Type" },
        { key: "medicare-contract-types", value: "Medicare Contract Type" },
        { key: "client-states", value: "State" },
        { key: "tier-descriptions", value: "Tier Description" },
        { key: "none", value: "None" },
      ];

    default:
      return [
        { key: "", value: "All" },
        { key: "associated-contracts", value: "Associated Contracts" },
        { key: "breadcrumbs", value: "Breadcrumb" },
        { key: "formulary-types", value: "Formulary Type" },
        { key: "medicare-contract-types", value: "Medicare Contract Type" },
        { key: "client-states", value: "State" },
        { key: "tier-descriptions", value: "Tier Description" },
        { key: "none", value: "None" },
      ];
  }
};

const steps = [
  "Setup",
  "Construct",
  "Compare",
  "Validation",
  "Complete",
  "Bazaar",
];

const top100Films: any = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
class Medicare extends React.Component<any, any> {
  state = {
    miniTabs: miniTabs,
    activeMiniTabIndex: 0,
    gridData: [],
    gridColumn: [],
    searchType: "",
    searchSubType: "",
    searchCategory: [], //searchCategory(this.props.lob_type),
    searchSubCategory: [],
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    isFiltered: false,
    filteredInfo: null,
    staticData: [],
    isColumnsChanged: false,
    changedColumns: [],
  };

  onColumnChange = (columns: Column<any>[]) => {
    console.log("swapped", columns);
    const cols = _.cloneDeep(columns);
    // const changedColumns = cols.filter(
    //   (c: Column<any>) => c.key !== "settings"
    // );
    const changedColumns = cols;
    this.setState({
      isColumnsChanged: true,
      changedColumns,
    });
  };

  defaultHTML = () => {
    return (
      <div className="formulary-grid default-height">
        <div className="bordered">
          <div className="formulary-grid-panel-header-container">
            <PanelHeader
              title="FORMULARY LIST"
              tooltip="FORMULARY LIST"
              className="formulary-grid-panel-header"
            />
            <div className="fields-container">
              <div className="field-container">
                <DropDownMap
                  className="formulary-type-dropdown"
                  placeholder="All"
                  options={this.state.searchCategory}
                  onChange={this.getFormularyType}
                  valueProp={"key"}
                  dispProp={"value"}
                  value={this.state.searchType}
                />
              </div>
              {/* <div className="field-container">
                <SearchBox iconPosition="left"/>
              </div> */}
              <div className="field-container">
                <DropDownMap
                  className="formulary-type-dropdown"
                  placeholder="Active"
                  options={this.state.searchSubCategory}
                  valueProp={"code_value"}
                  dispProp={"label"}
                  onChange={this.searchFormularyList}
                  value={this.state.searchSubType}
                />
              </div>
            </div>
            <div className="panel-divider"></div>

            <Popover content={""} trigger="click" placement="bottom">
              <div className="add-new-formulary-button">
                + Add New Formulary
              </div>
            </Popover>
          </div>
          <div className="inner-container">
            <FrxLoader />
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => {}}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName="MEDICARE"
              enableSettings
              columns={
                this.state.isColumnsChanged
                  ? this.state.changedColumns
                  : formularyDetailsGridColumns()
              }
              scroll={{ y: 630 }}
              isFetchingData={false}
              enableResizingOfColumns
              getPerPageItemSize={this.props.onPageSize}
              onGridPageChangeHandler={this.props.onPageChangeHandler}
              clearFilterHandler={this.props.onClearFilterHandler}
              totalRowsCount={this.props.dashboardGrid.count}
              pageSize={this.props.pageSize}
              selectedCurrentPage={this.props.selectedCurrentPage}
              applyFilter={this.applyFilterHandler}
              getColumnSettings={this.props.getColumnSettings}
              onColumnChange={this.onColumnChange}
              data={[]}
              expandable={{
                isExpandable: true,
                expandIconColumnIndex: this.state.isColumnsChanged
                  ? this.state.changedColumns.filter(
                      (c: Column<any>) => !c.hidden
                    ).length + 1
                  : formularyDetailsGridColumns({}).length + 1,
                expandedRowRender: (record: any) => (
                  <FormularyExpandedDetails
                    rowData={record}
                    drugDetailClick={this.props.drugDetailClick}
                  />
                ),
                expandCloseIcon: (
                  <span>
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                        fill="#999999"
                      />
                    </svg>
                  </span>
                ),
                expandOpenIcon: (
                  <span>
                    <svg
                      width="5"
                      height="9"
                      viewBox="0 0 5 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                        fill="#323C47"
                      />
                    </svg>
                  </span>
                ),
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  onClickMiniTab = (selectedTabIndex: number) => {
    let activeMiniTabIndex = 0;

    const tabs = this.state.miniTabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        if (selectedTabIndex === 3) {
          // window.location.href = "http://localhost:3001";
          window.open(
            "http://vertx-dev-staging-01.ap.futurerx.com:3001",
            "_blank"
          );
        }
        activeMiniTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeMiniTabIndex });
  };
  getVariant(label: any, type: any) {
    if (label === "N/A" && type === "block") {
      return 4;
    }
    if (label === "Sell" && type === "block") {
      return 2;
    }
    if (label === "Selling" && type === "block") {
      return 1;
    }

    if (label === "Purchased" && type === "pill") {
      return 6;
    }

    if (label === "Imported" && type === "pill") {
      return 2;
    }
    if (label === "Created" && type === "pill") {
      return 1;
    }
  }

  getStepName(stepNumber: any) {
    if (stepNumber === 1) {
      return "Work in progress";
    }
    if (stepNumber === 2) {
      return "Review";
    }
    if (stepNumber === 3) {
      return "Approved";
    }
    if (stepNumber === 4) {
      return "In production";
    }
  }
  renderActiveMiniTabContent = () => {
    const miniTabIndex = this.state.activeMiniTabIndex;
    switch (miniTabIndex) {
      case 0:
        return this.props.dashboardGrid.isLoading
          ? this.defaultHTML()
          : this.getGridData();
      case 1:
        return (
          <div>
            <MaintenanceMassUpdate
              onClickAddNew={this.props.onMassMaintenanceCLick}
              lob_type={this.props.lob_type}
            />
            {/* <div onClick={this.props.onMassMaintenanceCLick}>
              Mass Maintenance
            </div> */}
          </div>
        );
      case 2:
        return <Alternatives />;
      case 3:
        break;
      case 4:
        return <div>Group Description Management</div>;
    }
  };
  updateHiddenGridColumn = (hiddenColumns) => {
    const getKey = hiddenColumns.map((e) => e.key);
    const updatedFormularyDetailsGridColumns = formularyDetailsGridColumns();
    console.log(updatedFormularyDetailsGridColumns);
    const updatedColumns = updatedFormularyDetailsGridColumns.map((e) => {
      if (getKey.indexOf(e.key) !== -1) {
        e.hidden = true;
      }
      return e;
    });
    return updatedColumns;
  };

  clearFilterHandler = () => {
    this.setState(
      {
        isFiltered: false,
        filteredInfo: null,
      },
      () => {
        this.props.onClearFilterHandler();
      }
    );
  };

  applyFilterHandler = (filters, filteredInfo) => {
    console.log("medicare filters ", filters);
    const filterInfoKeys = Object.keys(filteredInfo);
    this.setState(
      {
        isFiltered: filterInfoKeys && filterInfoKeys.length > 0 ? true : false,
        filteredInfo: filteredInfo,
        // gridSingleSortInfo: null,
        // isGridSingleSorted: false,
        // gridMultiSortedInfo: [],
        // isGridMultiSorted: false
      },
      () => {
        this.props.applyFilter(filters);
      }
    );
  };

  applySortHandler = (key, order, sortedInfo) => {
    console.log("sorted info for single sorting ", sortedInfo);
    this.setState(
      {
        gridSingleSortInfo: sortedInfo,
        isGridSingleSorted: true,
        isGridMultiSorted: false,
        gridMultiSortedInfo: [],
      },
      () => {
        this.props.applySortHandler(key, order);
      }
    );

    // this.props.fetchFormularies(this.listPayload);
  };
  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    this.setState(
      {
        isGridMultiSorted: true,
        isGridSingleSorted: false,
        gridMultiSortedInfo: multiSortedInfo,
        gridSingleSortInfo: null,
      },
      () => {
        this.props.applyMultiSortHandler(sorter);
      }
    );
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.setState({
      gridSingleSortInfo: null,
      isGridSingleSorted: false,
      isGridMultiSorted: isMultiSortOn,
      gridMultiSortedInfo: [],
    });
  };
  checkStaticData = (ob: any) => {
    const title: string = ob.label;
    const getSelected: any = [...this.state.staticData];
    return getSelected.indexOf(title) > -1;
  };
  renderCheckboxDropdown = () => {
    let htmlElement = (
      <DropDownMap
        className="formulary-type-dropdown"
        placeholder="All"
        options={[]}
        onChange={() => {}}
        valueProp={""}
        dispProp={""}
        value={""}
      />
    );
    const fetchedData: any = [...this.state.searchSubCategory];
    if (fetchedData.length > 0) {
      htmlElement = (
        <Select
          className="custom-multi-select"
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={this.state.staticData}
          onChange={this.searchFormularyList}
          input={<Input disableUnderline />}
          renderValue={(obj) => this.state.staticData.join(", ")}
          MenuProps={MenuProps}
        >
          {fetchedData.map((e) => (
            <MenuItem key={e.label} value={e.label}>
              <Checkbox checked={this.checkStaticData(e)} />
              <ListItemText primary={e.label} />
            </MenuItem>
          ))}
        </Select>
      );
    }
    return htmlElement;
  };
  topSearch = () => {
    // debugger;
    console.log("topSearch");
    const getFetchedData: any = [...this.state.searchSubCategory];
    let categoryObj = {
      "associated-contracts": "",
      breadcrumbs: "breadcrumb",
      "formulary-types": "ft",
      "medicare-contract-types": "mct",
      "client-states": "state",
      "tier-descriptions": "td",
    }[this.state.searchType];
    const selectedData: any = [...this.state.staticData];
    const values = getFetchedData
      .filter((el) => selectedData.indexOf(el.label) > -1)
      .map((e) => e.code_value);

    this.props.formularyListSearch(categoryObj, values);
  };
  getGridData = () => {
    const baseData = [...this.props.dashboardGrid.list];
    let hiddenColumns = [];
    if (this.props.dashboardGrid.grid_settings.hiddenColumns.length > 0) {
      hiddenColumns = this.props.dashboardGrid.grid_settings.hiddenColumns.map(
        (e) => e.key
      );
    }
    // this.updateGridColumns
    const gridData = baseData.map((e, index: any) => {
      return {
        id: index + 1,
        key: index + 1,
        contract_year: e.contract_year,
        bazaar: {
          label: "N/A",
          type: "block",
          variant: this.getVariant("N/A", "block"),
          fill: "fill",
        },
        origin: {
          label: "Purchased",
          type: "pill",
          variant: this.getVariant("Purchased", "pill"),
          fill: "fill",
        },
        formulary_name: e.formulary_name,
        id_formulary: e.id_formulary.toString(),
        version_number: e.version_number.toString(),
        timeRemaining: {
          text: "09/04/2020  @ 9:00 AM",
          progress: 25,
        },
        step: {
          step_name: this.getStepName(steps.indexOf(e.step) + 1),
          step: steps.indexOf(e.step) + 1,
        },
      };
    });
    const addNewButtonDDContent = (
      <div className="add-new-dd">
        <p>Buy from Bazaar</p>
        <p onClick={this.props.addNewFormulary}>Add New Formulary</p>
      </div>
    );
    return (
      <div className="formulary-grid">
        <div className="bordered">
          <div className="formulary-grid-panel-header-container">
            <PanelHeader
              title="FORMULARY LIST"
              tooltip="FORMULARY LIST"
              className="formulary-grid-panel-header"
            />
            <div className="fields-container top-search-wrapper">
              <div className="field-container">
                <DropDownMap
                  className="formulary-type-dropdown"
                  placeholder="All"
                  options={this.state.searchCategory}
                  onChange={this.getFormularyType}
                  valueProp={"key"}
                  dispProp={"value"}
                  value={this.state.searchType}
                />
              </div>
              {/* <div className="field-container">
                <SearchBox iconPosition="left"/>
              </div> */}
              <div className="field-container multiSelectCheck">
                {this.renderCheckboxDropdown()}
                <span className="search-btn" onClick={this.topSearch}>
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.8096 11.2393L11.0832 8.70813C10.9602 8.59389 10.7934 8.53042 10.6184 8.53042H10.1726C10.9274 7.63422 11.3758 6.50698 11.3758 5.28073C11.3758 2.36364 8.82994 0 5.68792 0C2.54589 0 0 2.36364 0 5.28073C0 8.19783 2.54589 10.5615 5.68792 10.5615C7.00872 10.5615 8.22287 10.1451 9.18817 9.44439V9.85822C9.18817 10.0207 9.25654 10.1756 9.37959 10.2898L12.106 12.821C12.363 13.0597 12.7787 13.0597 13.033 12.821L13.8069 12.1025C14.0639 11.8639 14.0639 11.478 13.8096 11.2393ZM5.68792 8.53042C3.75457 8.53042 2.18766 7.07822 2.18766 5.28073C2.18766 3.48579 3.75184 2.03105 5.68792 2.03105C7.62126 2.03105 9.18817 3.48325 9.18817 5.28073C9.18817 7.07568 7.624 8.53042 5.68792 8.53042Z"
                      fill="#1D54B4"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="panel-divider"></div>

            <Popover
              content={addNewButtonDDContent}
              trigger="click"
              placement="bottom"
            >
              <div className="add-new-formulary-button">
                + Add New Formulary
              </div>
            </Popover>
          </div>
          <div className="inner-container">
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => {}}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName="MEDICARE"
              enableSettings
              applySort={this.applySortHandler}
              isSingleSorted={this.state.isGridSingleSorted}
              sortedInfo={this.state.gridSingleSortInfo}
              applyMultiSort={this.applyMultiSortHandler}
              isMultiSorted={this.state.isGridMultiSorted}
              multiSortedInfo={this.state.gridMultiSortedInfo}
              onMultiSortToggle={this.onMultiSortToggle}
              isFiltered={this.state.isFiltered}
              filteredInfo={this.state.filteredInfo}
              // isCustomCheckboxEnabled={false}
              // handleCustomRowSelectionChange={()=>{}}
              columns={
                this.state.isColumnsChanged
                  ? this.state.changedColumns
                  : formularyDetailsGridColumns(
                      {
                        onFormularyNameClick: (id: any) =>
                          this.props.drugDetailClick(id),
                      },
                      hiddenColumns
                    )
              }
              // columns={
              //   this.state.isColumnsChanged
              //     ? this.state.changedColumns
              //     : formularyDetailsGridColumns()
              // }
              scroll={{ x: 1600, y: 630 }}
              isFetchingData={false}
              enableResizingOfColumns
              getPerPageItemSize={this.props.onPageSize}
              onGridPageChangeHandler={this.props.onPageChangeHandler}
              clearFilterHandler={this.clearFilterHandler}
              totalRowsCount={this.props.dashboardGrid.count}
              pageSize={this.props.pageSize}
              selectedCurrentPage={this.props.selectedCurrentPage}
              applyFilter={this.applyFilterHandler}
              getColumnSettings={this.props.getColumnSettings}
              data={gridData}
              onColumnChange={this.onColumnChange}
              expandable={{
                isExpandable: true,
                expandIconColumnIndex: this.state.isColumnsChanged
                  ? this.state.changedColumns.filter(
                      (c: Column<any>) => !c.hidden
                    ).length + 1
                  : formularyDetailsGridColumns({}).length + 1,
                // expandedRowRender: (props) => <FormularyExpandedDetails />,
                expandedRowRender: (record: any) => (
                  <FormularyExpandedDetails
                    rowData={record}
                    drugDetailClick={this.props.drugDetailClick}
                  />
                ),
                expandCloseIcon: (
                  <span>
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                        fill="#999999"
                      />
                    </svg>
                  </span>
                ),
                expandOpenIcon: (
                  <span>
                    <svg
                      width="5"
                      height="9"
                      viewBox="0 0 5 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                        fill="#323C47"
                      />
                    </svg>
                  </span>
                ),
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  getFormularyType = (searchCategory) => {
    // debugger;
    if (searchCategory == "") {
      this.setState({
        searchType: "All",
        searchSubType: "",
        staticData: [],
      });
      this.props.formularyListSearch("", "");
    }
    let requestData = {};
    requestData["category"] = searchCategory;
    requestData["lob_type"] = this.props.formulary_lob_id;
    requestData["pathParams"] = searchCategory + "/" + this.props.client_id;
    this.props.homeSearchOptions(requestData).then((json) => {
      if (json.payload && json.payload.success.data.code === "200") {
        let tmpData =
          json?.payload?.success?.data?.data ||
          json?.payload?.success?.data?.result;
        let categoryObj = {
          "associated-contracts": "",
          breadcrumbs: {
            code: "code_value",
            label: "breadcrumb_name",
          },
          "formulary-types": {
            code: "code_value",
            label: "formulary_type",
          },
          "medicare-contract-types": {
            code: "code_value",
            label: "medicare_contract_type",
          },
          "client-states": {
            code: "id_state",
            label: "state_name",
          },
          "tier-descriptions": {
            code: "state_code",
            label: "tier_label_name",
          },
          none: "",
        }[searchCategory];
        if (tmpData && Array.isArray(tmpData) && tmpData.length > 0) {
          console.log("[tmpData]:", tmpData);
          let filterTempData = [...tmpData];
          if (searchCategory === "formulary-types")
            filterTempData = tmpData.filter(
              (ele) => this.props.mode_lob === ele.id_lob
            );

          var result = filterTempData.map(function (el) {
            var element = {};
            element["code_value"] = el[categoryObj.code];
            element["label"] = el[categoryObj.label];
            console.log(element);
            return element;
          });
          this.setState({
            searchSubCategory: result,
            searchType: searchCategory,
            searchSubType: "",
            staticData: [],
          });
        }
      } else {
        //showMessage('Failure', 'error');
      }
    });
  };

  // searchFormularyList = subCat => {
  //   let requestData = {};
  //   let categoryObj = {
  //     "associated-contracts": "",
  //     breadcrumbs: "breadcrumb",
  //     "formulary-types": "ft",
  //     "medicare-contract-types": "mct",
  //     "client-states": "state",
  //     "tier-descriptions": "td"
  //   }[this.state.searchType];

  //   this.setState({
  //     searchSubType: subCat
  //   });

  //   this.props.formularyListSearch(categoryObj, subCat);
  // requestData["category"] = categoryObj;
  // requestData["lob_type"] = this.props.formulary_lob_id;
  // requestData['pathParams'] = this.state.searchType+'/'+this.props.client_id;

  // requestData["messageBody"] = {};
  // requestData["messageBody"]["filter"] = []
  // requestData["messageBody"]["search_key"] = '';
  // requestData["messageBody"]["sort_by"] = [
  //   "contract_year",
  //   "lob_name",
  //   "formulary_name",
  //   "status"
  // ];
  // requestData["messageBody"]["sort_order"] = [
  //   "asc",
  //   "asc",
  //   "asc",
  //   "asc"
  // ];
  // requestData["messageBody"]["id_lob"] = null;
  // requestData["messageBody"]["search_by"] = categoryObj;
  // requestData["messageBody"]["search_value"] = [subCat];
  // searchFormularyList = (subCat) => {
  //   let requestData = {};
  //   let categoryObj = {
  //     "associated-contracts": "",
  //     breadcrumbs: "breadcrumb",
  //     "formulary-types": "ft",
  //     "medicare-contract-types": "mct",
  //     "client-states": "state",
  //     "tier-descriptions": "td",
  //   }[this.state.searchType];

  //   this.setState({
  //     searchSubType: subCat,
  //   });

  //   this.props.formularyListSearch(categoryObj, subCat);
  // };
  searchFormularyList = (event: React.ChangeEvent<{ value: unknown }>) => {
    const val = event.target.value as string[];
    this.setState({
      staticData: val,
    });
  };
  componentDidMount() {
    console.log("****** Component Did Mount", this.props.dashboardGrid);
  }

  componentDidUpdate(prevProps) {
    // console.log("MSG : " + this.props.mode_lob);
    //console.log(prevProps.message + " > " + this.props.message);
    if (
      prevProps.mode_lob !== this.props.mode_lob ||
      this.state.searchCategory.length === 0
    ) {
      // searchCategory(this.props.mode_lob)

      this.setState({
        searchType: "",
        staticData: [],
        searchSubCategory: [],
        searchCategory: getSearchCategoryOptions(this.props.mode_lob),
      });
    }
  }

  render() {
    console.log("[this.props.lob_type]:", this.props.lob_type);

    return (
      <>
        <FrxMiniTabs
          tabList={this.props.tabs ? this.props.tabs : this.state.miniTabs}
          activeTabIndex={this.state.activeMiniTabIndex}
          onClickTab={this.onClickMiniTab}
        />
        <div className="formulary-mini-tabs-info">
          {this.renderActiveMiniTabContent()}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dashboardGrid: {
      count: state.dashboard.formulary_count,
      list: state.dashboard.formulary_list,
      isLoading: state.dashboard.isLoading,
      grid_settings: state.gridSettings,
    },
    formulary_id: state.application.formulary_id,
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    mode_lob: state.application.mode_lob,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    homeSearchOptions: (data) => dispatch(homeSearchOptions(data)),
    searchFormularyData: (data) => dispatch(searchFormularyData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Medicare);
