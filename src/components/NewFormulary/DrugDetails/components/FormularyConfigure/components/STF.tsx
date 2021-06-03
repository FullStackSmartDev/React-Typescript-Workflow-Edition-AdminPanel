import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { TabInfo } from "../../../../../../models/tab.model";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDownMap";
import RadioButton from "../../../../../shared/Frx-components/radio-button/RadioButton";

import "./STF.scss";
import * as constants from "../../../../../../api/http-commons";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { stColumns } from "../../../../../../utils/grid/columns";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import { Row, Col, Space } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";
import { ReactComponent as EditIcon } from "../../../../../../assets/icons/EditIcon.svg";
import { setAdditionalCriteria } from "../../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import {
  getStSummary,
  getStGrouptDescriptions,
  getStGrouptDescription,
  getStTypes,
  getDrugLists,
  postFormularyDrugST,
  getStGrouptDescriptionVersions,
  postApplyFormularyDrugST,
  getLobFormularies,
} from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import GPM from "./GPM";

function mapDispatchToProps(dispatch) {
  return {
    getStSummary: (a) => dispatch(getStSummary(a)),
    getStGrouptDescriptions: (a) => dispatch(getStGrouptDescriptions(a)),
    getStGrouptDescription: (a) => dispatch(getStGrouptDescription(a)),
    getStTypes: (a) => dispatch(getStTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
    postFormularyDrugST: (a) => dispatch(postFormularyDrugST(a)),
    getStGrouptDescriptionVersions: (a) =>
      dispatch(getStGrouptDescriptionVersions(a)),
    postApplyFormularyDrugST: (a) => dispatch(postApplyFormularyDrugST(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
    getLobFormularies: (a) => dispatch(getLobFormularies(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    client_id: state.application.clientId,
    configureSwitch: state.switchReducer.configureSwitch,
    applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};
class STF extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    panelGridTitle1: [
      "Value Based Insurance",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "left", "left", "left"],
    panelGridValue1: [],
    isNotesOpen: false,
    stGroupDescription: [],
    stTypes: [],
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "Replace" },
      { id: 2, text: "Append" },
      { id: 3, text: "Remove" },
    ],
    tierGridContainer: false,
    showStConfiguration: false,
    isSearchOpen: false,
    selectedLobFormulary: {},
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedGroupDescription: null,
    selectedStType: null,
    selectedLastestedVersion: null,
    fileType: null,
    lobFormularies: [],
    stValue: null,
    groupDescriptionProp: "",
    isAdditionalCriteriaOpen: false,
    additionalCriteriaState: null,
    is_additional_criteria_defined: false,
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[],
    index: 0,
    limit: 10,
    filter: Array(),
    dataCount: 0,
    quickFilter: Array(),
    sort_by: Array(),
    hiddenColumns: Array(),
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    searchData: Array(),
    showStGroupDescription: false,
    selectedGroupDescriptionObj: {},
    isSelectAll: false,
  };

  // onSelectedTableRowChanged = (selectedRowKeys) => {
  //   this.state.selectedDrugs = [];
  //   if (selectedRowKeys && selectedRowKeys.length > 0) {
  //     this.state.selectedDrugs = selectedRowKeys.map((tierId) => this.state.drugData[tierId - 1]["md5_id"]);
  //   }
  // };

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.state.selectedRowKeys = [];

    if (this.state.selectedGroupDescription === null) {
      showMessage("Group Description is required", "info");
      return;
    }

    if (this.state.selectedStType === null) {
      showMessage("ST Type is required", "info");
      return;
    }

    if (this.state.stValue === null) {
      showMessage("ST Value is required", "info");
      return;
    }

    if (
      this.state.showStConfiguration &&
      this.state.selectedLobFormulary["id_formulary"] === undefined
    ) {
      showMessage("Related Formulary is required", "info");
      return;
    }
    this.populateGridData();
  };

  dropDownSelectHandlerLob = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedLobFormulary: tmp_value });
  };

  onClose = () => {

    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = () => {
    this.setState({ selectFormulary: true });
  };

  onPageSize = (pageSize) => {

    this.state.limit = pageSize;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onGridPageChangeHandler = (pageNumber: any) => {

    this.state.index = (pageNumber - 1) * this.state.limit;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onClearFilterHandler = () => {
    this.state.filter = Array();
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  selectFormularyClick = (dataRow) => {

    if (dataRow) {
      this.state.selectedLobFormulary = dataRow;
      // if(this.state.currentPopupType === this.POPUP_TYPE_BASE){
      //  // this.state.baseFormulary = dataRow;
      // }else if(this.state.currentPopupType === this.POPUP_TYPE_REFERENCE){
      //   //this.state.referenceFormulary = dataRow;
      // }
    }
    this.setState({ selectFormulary: false });
  };

  handleSave = () => {
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      // apiDetails['apiPart'] = constants.APPLY_TIER;
      apiDetails["lob_type"] = this.props.formulary_lob_id;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.fileType +
        "/" +
        this.props.tab_type;
      apiDetails["keyVals"] = [
        { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {
        covered: {},
        filter: [],
        is_select_all: false,
        not_covered: {},
        search_key: "",
        drug_list: "",
        prev_formulary: "",
      };
      if (
        this.props.advancedSearchBody &&
        Object.keys(this.props.advancedSearchBody).length > 0
      ) {
        apiDetails["messageBody"] = Object.assign(
          apiDetails["messageBody"],
          this.props.advancedSearchBody
        );
      }

      apiDetails["messageBody"]["is_select_all"] = this.state.isSelectAll;

      let allFilters = Array();
      let filterProps = Array();
      this.state.filter.map((filterInfo) => {
        allFilters.push(filterInfo);
        filterProps.push(filterInfo["prop"]);
      });

      this.state.quickFilter.map((filterInfo) => {
        if (!filterProps.includes(filterInfo["prop"]))
          allFilters.push(filterInfo);
      });

      apiDetails["messageBody"]["filter"] = allFilters;
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["base_st_group_description_id"] = Number(
        this.state.selectedGroupDescription
      );
      apiDetails["messageBody"][
        "id_st_group_description"
      ] = this.state.selectedLastestedVersion;
      apiDetails["messageBody"]["id_st_type"] = Number(
        this.state.selectedStType
      );
      apiDetails["messageBody"]["search_key"] = "";
      apiDetails["messageBody"]["st_value"] = Number(this.state.stValue);

      if (
        this.state.additionalCriteriaState != null &&
        this.state.is_additional_criteria_defined
      ) {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = true;
        apiDetails["messageBody"][
          "um_criteria"
        ] = this.state.additionalCriteriaState;
      } else {
        apiDetails["messageBody"]["is_custom_additional_criteria"] = false;
        apiDetails["messageBody"]["um_criteria"] = [];
      }

      const saveData = this.props
        .postApplyFormularyDrugST(apiDetails)
        .then((json) => {

          if (json?.payload && json?.payload?.code === "200") {
            this.state.drugData = [];
            this.state.drugGridData = [];
            this.populateGridData();
            this.props.getStSummary(this.props?.formulary_id).then((json) => {
              this.setState({ tierGridContainer: true });
            });
          }
        });
    }
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  componentWillReceiveProps(nextProps) {
    //this.initialize(nextProps);
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }
    if (nextProps.additionalCriteriaBody) {
      this.setState({
        additionalCriteriaState: nextProps.additionalCriteriaBody,
      });
    }
    if (nextProps.configureSwitch) {
      this.setState({
        showStConfiguration: false,
        selectedGroupDescription: null,
        selectedStType: null,
        is_additional_criteria_defined: false,
      });
      this.populateGridData(null, nextProps.configureSwitch);
    } else {
      this.setState({ tierGridContainer: false });
    }
  }
  dropDownSelectHandlerGroupDescription = (tmp_value, event) => {
    // let tmp_index = event.key;
    // let tmp_value = event.value;

    this.setState({ selectedGroupDescription: tmp_value });
    let apiDetails = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + tmp_value;
    this.state.showStGroupDescription = false;
    let selected = this.state.stGroupDescription.filter(
      (obj) => obj[this.state.groupDescriptionProp] == tmp_value
    )[0];
    this.setState({
      selectedGroupDescriptionObj: selected,
    });
    this.props.getStGrouptDescriptionVersions(apiDetails).then((json) => {
      if (json?.payload && json?.payload?.data?.length > 0) {
        let data = json.payload.data;
        let ftype = "";
        switch (this.props.formulary_lob_id) {
          case 1:
            ftype = data[0].file_type;
            break;
          case 4:
            ftype = "COMM";
            break;
          default:
            break;
        }
        let latestVersionId = -1;
        data.forEach((element) => {
          if (element.id_st_group_description > latestVersionId) {
            latestVersionId = element.id_st_group_description;
          }
        });
        let tmp_additionalCriteria = false;
        let tmp_selectedStType = null;
        this.props
          .getStGrouptDescription({
            lob_type: this.props.formulary_lob_id,
            pathParams: "/" + latestVersionId,
          })
          .then((json) => {
            this.props.setAdditionalCriteria([]);
            if (json?.payload && json?.payload?.code === "200") {
              if (
                json.payload.data["um_criteria"] != null &&
                json.payload.data["um_criteria"].length > 0
              ) {
                let payload: any = {};
                payload.additionalCriteriaBody = json.payload.data["um_criteria"];
                this.props.setAdditionalCriteria(payload);
                tmp_additionalCriteria = true;
              }
              tmp_selectedStType=json?.payload?.data?.id_st_type;
            }
            this.setState({
              is_additional_criteria_defined: tmp_additionalCriteria,
              selectedStType: tmp_selectedStType,
            });
          });
        this.setState({
          selectedLastestedVersion: latestVersionId,
          fileType: ftype,
        });
        this.setState({
          tierGridContainer: false,
          gridData: [],
          drugGridData: [],
        });
      }
    });
  };

  dropDownSelectHandlerStType = (value, event) => {
    let tmp_index = event.key;
    let tmp_value = event.value;
    this.setState({ selectedStType: tmp_value });
    this.setState({
      tierGridContainer: false,
      gridData: [],
      drugGridData: [],
    });
  };

  st_configurationChange = (event, value) => {
    let tmp_index = event.target.key;
    let tmp_value = event.target.value;

    if (tmp_value == "true") {
      this.setState({ showStConfiguration: true });
    } else {
      this.setState({ showStConfiguration: false });
    }
  };

  handleChange = (e: any) => {
    let tmp_value = e.target.value;
    let tmp_key = e.target.name;
    if (e.target.value == "true") {
      tmp_value = true;
    } else if (e.target.value == "false") {
      tmp_value = false;
    }
    this.setState({ [tmp_key]: tmp_value });
  };

  populateGridData = (searchBody = null, switchState = false) => {

    let apiDetails = {};
    apiDetails["messageBody"] = {};
    apiDetails["lob_type"] = this.props.formulary_lob_id;
    // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);
    let tmp_fileType: any = "";
    if (!(this.props.configureSwitch || switchState)) {
      apiDetails["messageBody"][
        "base_st_group_description_id"
      ] = this.state.selectedGroupDescription;
      apiDetails["messageBody"]["id_st_type"] = this.state.selectedStType;
      apiDetails["messageBody"]["st_value"] = this.state.stValue;
      tmp_fileType = this.state.fileType;
    } else {
      switch (this.props.formulary_lob_id) {
        case 1:
          tmp_fileType = "MCR";
          break;
        case 4:
          tmp_fileType = "COMM";
          break;
        default:
          break;
      }
    }

    let allFilters = Array();
    let filterProps = Array();
    this.state.filter.map((filterInfo) => {
      allFilters.push(filterInfo);
      filterProps.push(filterInfo["prop"]);
    });

    this.state.quickFilter.map((filterInfo) => {
      if (!filterProps.includes(filterInfo["prop"]))
        allFilters.push(filterInfo);
    });

    apiDetails["messageBody"]["filter"] = allFilters;

    // if (this.state.sort_by && this.state.sort_by.length ==0){
    //   this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    // }

    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map((keyPair) => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      apiDetails["messageBody"]["sort_by"] = keys;
      apiDetails["messageBody"]["sort_order"] = values;
    }

    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + tmp_fileType + "/";
    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: constants.KEY_INDEX, value: this.state.index },
      { key: constants.KEY_LIMIT, value: this.state.limit },
    ];

    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    const drugGridDate = this.props
      .postFormularyDrugST(apiDetails)
      .then((json) => {
        if (json?.payload != null && json?.payload?.code === "200") {
          let tmpData = json.payload.result;
          var data: any[] = [];
          let count = 1;
          let selected = this.state.stGroupDescription.filter(
            (obj) =>
              obj[this.state.groupDescriptionProp] ==
              this.state.selectedGroupDescription
          )[0];
          let thisRef = this;
          var gridData = tmpData.map(function (el) {
            var element = Object.assign({}, el);
            data.push(element);
            let gridItem = {};
            gridItem["id"] = count;
            gridItem["key"] = count;
            if (
              selected &&
              selected["st_group_description_name"] ===
              element.st_group_description
            ) {

              gridItem["isChecked"] = true;
              gridItem["isDisabled"] = true;
              // decide on class names based on data properties conditionally
              // the required styles are added under each classNames in FrxGrid.scss (towards the end)
              //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
              gridItem["rowStyle"] = "table-row--blue-font";
            }
            if (thisRef.props.configureSwitch) {
              gridItem["isDisabled"] = true;
              gridItem["rowStyle"] = "table-row--disabled-font";
            }
            gridItem["tier"] = element.tier_value;
            gridItem["is_um_criteria"] = element.is_um_criteria;
            gridItem["st_group_description"] = element.st_group_description;
            gridItem["st_type"] = element.st_type;
            gridItem["st_value"] = element.st_value;
            gridItem["file_type"] = element.file_type
              ? "" + element.file_type
              : "";
            gridItem["data_source"] = element.data_source
              ? "" + element.data_source
              : "";
            gridItem["drug_label_name"] = element.drug_label_name
              ? "" + element.drug_label_name
              : "";
            gridItem["ndc"] = "";
            gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
            gridItem[
              "generic_product_identifier"
            ] = element.generic_product_identifier
                ? "" + element.generic_product_identifier
                : "";
            gridItem["trademark_code"] = element.trademark_code
              ? "" + element.trademark_code
              : "";
            gridItem["database_category"] = element.database_category
              ? "" + element.database_category
              : "";
            count++;
            return gridItem;
          });
          this.setState({
            drugData: data,
            drugGridData: gridData,
            dataCount: json.payload.count,
          });
        } else {
          this.setState({
            drugData: Array(),
            drugGridData: Array(),
            dataCount: 0,
          });
        }
      });
    this.setState({ tierGridContainer: true });
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order, sortedInfo) => {

    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === "ascend" ? "asc" : "desc";
      this.state.sort_by = this.state.sort_by.filter(
        (keyPair) => keyPair["key"] !== key
      );
      this.state.sort_by.push({ key: key, value: sortOrder });
    }

    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: [],
    });
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onApplyFilterHandler = (filters) => {

    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(
            (element) => element["prop"] !== fetchedProps
          );
          const fetchedOperator =
            filters[fetchedProps][0].condition === "is like"
              ? "is_like"
              : filters[fetchedProps][0].condition === "is not"
                ? "is_not"
                : filters[fetchedProps][0].condition === "is not like"
                  ? "is_not_like"
                  : filters[fetchedProps][0].condition === "does not exist"
                    ? "does_not_exist"
                    : filters[fetchedProps][0].condition;
          const fetchedValues =
            filters[fetchedProps][0].value !== ""
              ? [filters[fetchedProps][0].value.toString()]
              : [];
          this.state.filter.push({
            prop: fetchedProps,
            operator: fetchedOperator,
            values: fetchedValues,
          });
        }
      });
    } else {
      this.state.filter = Array();
    }

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
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
  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };
  settingFormApplyHandler = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];

    this.populateGridData();
  };
  componentDidMount() {
    switch (this.props.formulary_lob_id) {
      case 1:
        this.setState({
          groupDescriptionProp: "id_st_group_description",
        });
        break;
      case 4:
        this.setState({
          groupDescriptionProp: "id_st_group_description",
        });
        break;
      default:
        break;
    }
    let apiDetails_1 = {};
    apiDetails_1["lob_type"] = this.props.formulary_lob_id;
    apiDetails_1["pathParams"] = "/" + this.props?.client_id;
    this.props.getStGrouptDescriptions(apiDetails_1).then((json) => {

      let result = json?.payload?.data.filter(
        (obj) => !obj.is_archived && obj.is_setup_complete
      );
      this.setState({
        stGroupDescription: result,
      });
    });

    this.props.getStTypes(this.props.formulary_lob_id).then((json) => {
      this.setState({
        stTypes: json?.payload?.data,
      });
    });
    let apiDetails = {
      formulary_type_id: this.props?.formulary_type_id,
      formulary_lob_id: this.props?.formulary_lob_id,
    };
    this.props.getLobFormularies(apiDetails).then((json) => {
      this.setState({
        lobFormularies: json?.payload?.result,
      });
    });
  }
  // additional criteria toggle
  closeAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: false });
  };
  openAdditionalCriteria = () => {
    this.setState({ isAdditionalCriteriaOpen: true });
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {


    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    });

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map((sortInfo) => {
        if (uniqueKeys.includes(sortInfo["columnKey"])) {
        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo["columnKey"]);
        }
      });
      filteredSorter.map((sortInfo) => {
        let sortOrder = sortInfo["order"] === "ascend" ? "asc" : "desc";
        this.state.sort_by = this.state.sort_by.filter(
          (keyPair) => keyPair["key"] !== sortInfo["columnKey"]
        );
        this.state.sort_by.push({
          key: sortInfo["columnKey"],
          value: sortOrder,
        });
      });
    }

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {

    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {

    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            d["rowStyle"] = "table-row--green-font";
          }
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];

        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = false;
            if (d["rowStyle"]) delete d["rowStyle"];
          }
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          drugGridData: data,
        });
      }
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {


    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys],
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) => {
        return this.state.drugData[tierId - 1]["md5_id"];
      });
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) selectedRowKeys.push(d["key"]);
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      (k) => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ drugGridData: data, isSelectAll: isSelected });
  };
  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    const { isAdditionalCriteriaOpen } = this.state;
    return (
      <div className="stf-root">
        <div className="modify-wrapper  white-bg">
          <div className="settings-form">
            <Grid container>
              <Grid item xs={4}>
                <div className="group mb-20">
                  <label>
                    ST GROUP DESCRIPTION<span className="astrict">*</span>
                  </label>
                  {/* <DropDown
                    options={this.state.stGroupDescription}
                    valueProp={this.state.groupDescriptionProp}
                    dispProp="text"
                    onSelect={this.dropDownSelectHandlerGroupDescription}
                    disabled={this.props.configureSwitch}
                    value={this.state.selectedGroupDescription}
                  /> */}

                  <div className="input-element">
                    <div className="bordered pointer bg-green">
                      <span
                        onClick={(e) => {
                          this.setState({ showStGroupDescription: true });
                        }}
                        className="inner-font"
                      >
                        {this.state.selectedGroupDescriptionObj[
                          "st_group_description_name"
                        ]
                          ? this.state.selectedGroupDescriptionObj[
                          "st_group_description_name"
                          ]
                          : "Select Group Description"}
                      </span>
                      <EditIcon
                        onClick={(e) => {
                          this.setState({ showStGroupDescription: true });
                        }}
                        className={"hide-edit-icon"}
                      />
                    </div>
                  </div>
                </div>

                <div className="group mb-20">
                  <label>
                    view existing ST configurations in another formulary?
                    <span className="astrict">*</span>
                  </label>
                  <Space size="large">
                    <div className="marketing-material radio-group">
                      <RadioButton
                        label="Yes"
                        name="add-filter-1"
                        // checked={isAdditionalCriteriaOpen}
                        onClick={() =>
                          this.setState({ showStConfiguration: true })
                        }
                        disabled={this.props.editable}
                      />
                      <RadioButton
                        label="No"
                        name="add-filter-1"
                        // checked={!isAdditionalCriteriaOpen}
                        onClick={() =>
                          this.setState({ showStConfiguration: false })
                        }
                        disabled={this.props.editable}
                      />
                    </div>
                  </Space>

                  <div className="group mb-20">
                    <label>
                      do you want to add additional criteria?{" "}
                      <span className="astrict">*</span>
                    </label>
                    <Space size="large">
                      <div className="marketing-material radio-group">
                        <RadioButton
                          label="Yes"
                          name="add-filter"
                          // checked={isAdditionalCriteriaOpen}
                          onClick={() => {
                            this.setState({ isAdditionalCriteriaOpen: true });
                            this.setState({
                              is_additional_criteria_defined: true,
                            });
                          }}
                          disabled={this.props.editable}
                        />
                        <RadioButton
                          label="No"
                          name="add-filter"
                          // checked={!isAdditionalCriteriaOpen}
                          onClick={() => {
                            this.setState({
                              is_additional_criteria_defined: false,
                            });
                          }}
                          disabled={this.props.editable}
                        />
                      </div>
                    </Space>
                  </div>

                  {isAdditionalCriteriaOpen ? (
                    <AdvanceSearchContainer
                      openPopup={isAdditionalCriteriaOpen}
                      onClose={this.closeAdditionalCriteria}
                      isAdvanceSearch={false}
                    />
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="group mb-20">
                  <label>
                    ST Type <span className="astrict">*</span>
                  </label>
                  <DropDown
                    options={this.state.stTypes}
                    valueProp="id_st_type"
                    dispProp="st_type_name"
                    onSelect={this.dropDownSelectHandlerStType}
                    disabled={this.props.configureSwitch}
                    value={this.state.selectedStType}
                  />
                </div>
                {this.state.showStConfiguration ? (
                  <div className="group mb-20">
                    <label>
                      Select Related Formulary to View Existing configuration?{" "}
                      <span className="astrict">*</span>
                    </label>
                    {/* <DropDown options={this.state.lobFormularies} valueProp="id_formulary" dispProp="formulary_name" onSelect={this.dropDownSelectHandlerLob} disabled={this.props.configureSwitch}/> */}
                    <div className="input-element">
                      <div className="bordered pointer bg-green">
                        <span
                          onClick={(e) => this.handleIconClick()}
                          className="inner-font"
                        >
                          {this.state.selectedLobFormulary["formulary_name"]
                            ? this.state.selectedLobFormulary["formulary_name"]
                            : "Select Formulary"}
                        </span>
                        <EditIcon
                          onClick={(e) => this.handleIconClick()}
                          className={"hide-edit-icon"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                    ""
                  )}
              </Grid>

              <Grid item xs={4}>
                <div className="group mb-20">
                  <label>
                    ST Value <span className="astrict">*</span>
                  </label>
                  <input
                    type="text"
                    name="stValue"
                    onChange={this.handleChange}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button
                label="Apply"
                onClick={this.settingFormApplyHandler}
                disabled={this.props.configureSwitch}
              />
            </Box>
          </div>

          {this.state.tierGridContainer && (
            <div className="select-drug-from-table">
              <div className="bordered white-bg">
                <div className="header align-end pr-10">
                  <div className="button-wrapper">
                    <Button
                      className="Button normal"
                      label="Advance Search"
                      onClick={this.advanceSearchClickHandler}
                      disabled={this.props.configureSwitch}
                    />
                    {!this.props.configureSwitch && (
                      <Button label="Save" onClick={this.handleSave} />
                    )}
                  </div>
                </div>

                <div className="tier-grid-container">
                  <FrxDrugGridContainer
                    isPinningEnabled={false}
                    enableSearch={false}
                    enableColumnDrag
                    onSearch={() => { }}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName="TIER"
                    enableSettings
                    columns={stColumns()}
                    scroll={{ x: 2000, y: 377 }}
                    isFetchingData={false}
                    enableResizingOfColumns
                    data={this.state.drugGridData}
                    rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                    onSelectAllRows={this.onSelectAllRows}
                    customSettingIcon={"FILL-DOT"}
                    settingsWidth={30}
                    pageSize={this.state.limit}
                    selectedCurrentPage={
                      this.state.index / this.state.limit + 1
                    }
                    totalRowsCount={this.state.dataCount}
                    getPerPageItemSize={this.onPageSize}
                    onGridPageChangeHandler={this.onGridPageChangeHandler}
                    clearFilterHandler={this.onClearFilterHandler}
                    applyFilter={this.onApplyFilterHandler}
                    applySort={this.onApplySortHandler}
                    isSingleSorted={this.state.isGridSingleSorted}
                    sortedInfo={this.state.gridSingleSortInfo}
                    applyMultiSort={this.applyMultiSortHandler}
                    isMultiSorted={this.state.isGridMultiSorted}
                    multiSortedInfo={this.state.gridMultiSortedInfo}
                    onMultiSortToggle={this.onMultiSortToggle}
                    getColumnSettings={this.onSettingsIconHandler}
                  // rowSelection={{
                  //   columnWidth: 50,
                  //   fixed: true,
                  //   type: "checkbox",
                  //   onChange: this.onSelectedTableRowChanged,
                  // }}
                  />
                </div>
              </div>
              {this.state.isSearchOpen ? (
                <AdvanceSearchContainer
                  {...searchProps}
                  openPopup={this.state.isSearchOpen}
                  onClose={this.advanceSearchClosekHandler}
                  isAdvanceSearch={true}
                />
              ) : null}
            </div>
          )}
        </div>
        {this.state.selectFormulary ? (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Formulary"}
            handleClose={() => {
              this.setState({
                selectFormulary: !this.state.selectFormulary,
              });
            }}
            handleAction={() => { }}
            open={this.state.selectFormulary}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <CloneFormularyPopup
              type="commercial" // type will be dynamic based on the LOB
              selectFormularyClick={this.selectFormularyClick}
            />
          </DialogPopup>
        ) : null}
        {this.state.showStGroupDescription && (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={"Select Group Description"}
            handleClose={() => {
              this.setState({
                showStGroupDescription: !this.state.showStGroupDescription,
              });
            }}
            handleAction={() => { }}
            open={this.state.showStGroupDescription}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <GPM
              isPopUpView={true}
              selectGroupDescriptionClick={
                this.dropDownSelectHandlerGroupDescription
              }
            />
          </DialogPopup>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(STF);
