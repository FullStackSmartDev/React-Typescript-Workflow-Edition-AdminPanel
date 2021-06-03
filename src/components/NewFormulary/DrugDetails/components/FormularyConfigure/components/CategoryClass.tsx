import React from "react";
import { connect } from "react-redux";
import { Grid, Input } from "@material-ui/core";

// import css
import "./Tier.scss";
import "./categoryclass.scss";

import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import {
  getTapList,
  getMiniTabs
} from "../../../../../../mocks/formulary/mock-data";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  categoryCommercialClassColumns,
  categoryClassColumns
} from "../../../../../../utils/grid/columns";
import {
  categoryClassMock,
  categoryCommercialClassMock
} from "../../../../../../mocks/categoryClassMock";
import STPopup from "./STPopup/STpopup";
import FormularyDetailsContext from "../../../../FormularyDetailsContext";
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxGridContainer";
import OverridePopup from "./OverridePopup/OverridePopup";
import { getTier } from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import {
  getClassificationSystems,
  postDrugsCategory,
  getIntelliscenseSearch,
  postDrugsClassCategoryOverride
} from "../../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import * as categoryConstants from "../../../../../../api/http-category-class";
import getLobCode from "../../../../Utils/LobUtils";
import showMessage from "../../../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import * as _ from "lodash";

function mapDispatchToProps(dispatch) {
  return {
    getTier: a => dispatch(getTier(a)),
    getClassificationSystems: a => dispatch(getClassificationSystems(a)),
    postDrugsCategory: a => dispatch(postDrugsCategory(a)),
    getIntelliscenseSearch: a => dispatch(getIntelliscenseSearch(a)),
    postDrugsClassCategoryOverride: a =>
      dispatch(postDrugsClassCategoryOverride(a)),
    setAdvancedSearch: a => dispatch(setAdvancedSearch(a))
  };
}

const mapStateToProps = state => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog
  };
};

interface State {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  materialPopupInd: any;
  show: any;
  isSearchOpen: false;
  columns: any;
  data: any;
  filteredData: any;
  tierOption: any[];
  classificationSystems: any[];
  lobCode: any;
  filter: any[];
  searchData: any[];
  searchNames: any[];
  searchValue: any;
  addedFormularyDrugs: any[];
  fixedSelectedRows: number[];
  selectedRowKeys: number[];
  isFiltered: boolean;
  filteredInfo: any;
  isSelectAll: boolean;
  isRequestFinished: boolean;
  isColumnsChanged: boolean;
  changedColumns: any[];
}

class CategoryClass extends React.Component<any, any> {
  state = {
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: getTapList(),
    materialPopupInd: false,
    show: false,
    isSearchOpen: false,
    popupName: "",
    title: "",
    columns: [] as any,
    data: [] as any,
    filteredData: Array(),
    tierOption: Array(),
    classificationSystems: Array(),
    showActionsInd: false,
    lobCode: "MCR",
    filter: Array(),
    searchData: Array(),
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    overriddenClass: null,
    overriddenCategory: null,
    addedFormularyDrugs: Array(),
    customCategory: false,
    customClass: false,
    selectedRowKeys: Array(),
    index: 0,
    limit: 10,
    sort_by: [{ key: 'drug_label_name', value: 'asc' }],
    hiddenColumns: Array(),
    dataCount: 0,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    quickFilter: Array(),
    fixedSelectedRows: [] as number[],
    isFiltered: false,
    filteredInfo: null,
    isSelectAll: false,
    isRequestFinished: true,
    changedColumns: Array(),
    isColumnsChanged: false,
  };

  static contextType = FormularyDetailsContext;

  resetData = () => {
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {}
    };
    this.props.setAdvancedSearch(payload);
    this.state.filter = Array();
    this.state.quickFilter = Array();
    this.state.sort_by = Array();
    this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    this.state.index = 0;
    this.state.limit = 10;
    this.state.hiddenColumns = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    this.state.searchData = Array();

    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = false;
    this.state.isGridSingleSorted = false;

    this.state.filteredInfo = null;
    this.state.isFiltered = false;
    this.state.selectedRowKeys = Array();
    this.state.isSelectAll = false;
  }

  populateTierDetails = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }
    ];
    const thisRef = this;

    const TierDefinationData = this.props.getTier(apiDetails).then(json => {
      let tmpData = json.payload.data;
      tmpData.map(function (el) {
        var element = Object.assign({}, el);
        thisRef.state.tierOption.push(element);
      });
    });
  };

  populateClassificationDetails = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = categoryConstants.CLASSIFICATION_SYSTEMS;
    apiDetails["pathParams"] =
      this.props?.formulary_type_id + "/" + this.props?.formulary_id;
    const thisRef = this;

    const data = this.props.getClassificationSystems(apiDetails).then(json => {
      let tmpData = json.payload.data;
      tmpData.map(function (el) {
        var element = Object.assign({}, el);
        thisRef.state.classificationSystems.push(element);
      });
    });
  };

  /*onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    console.log(
      "Settings icon handler: Hidden" +
      JSON.stringify(hiddenColumn) +
      " Visible:" +
      JSON.stringify(visibleColumn)
    );
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map(column => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys
      });
    }
  };*/
  onApplyFilterHandler = (filters, filteredInfo) => {
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(element => element['prop'] !== fetchedProps);
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
            values: fetchedValues
          });
        }
      });
      this.setState({
        isFiltered: true,
        filteredInfo: filteredInfo
      }, () => {
        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      });
    } else {
      this.setState({
        filter: Array(),
        isFiltered: false,
        filteredInfo: filteredInfo
      }, () => {
        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      });
    }
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order, sortedInfo) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === "ascend" ? "asc" : "desc";
      this.state.sort_by = this.state.sort_by.filter(
        keyPair => keyPair["key"] !== key
      );
      this.state.sort_by.push({ key: key, value: sortOrder });
    } else {
      this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    }
    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: []
    });
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));
    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null
    });

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map(sortInfo => {
        if (uniqueKeys.includes(sortInfo["columnKey"])) {
        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo["columnKey"]);
        }
      });
      filteredSorter.map(sortInfo => {
        let sortOrder = sortInfo["order"] === "ascend" ? "asc" : "desc";
        this.state.sort_by = this.state.sort_by.filter(
          keyPair => keyPair["key"] !== sortInfo["columnKey"]
        );
        this.state.sort_by.push({
          key: sortInfo["columnKey"],
          value: sortOrder
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
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    if (!isMultiSortOn)
      this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
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
  onPageSize = pageSize => {
    console.log("Page size load");
    this.state.limit = pageSize;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    console.log("Page change load");
    this.state.index = (pageNumber - 1) * this.state.limit;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onClearFilterHandler = () => {
    this.setState({
      filter: Array(),
      isFiltered: false,
      filteredInfo: null
    }, () => {
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    });
  };

  populateGridData = (searchBody = null) => {
    console.log("Populate grid data is called");
    let apiDetails = {};
    apiDetails["apiPart"] = categoryConstants.DRUGS_CATEGORY;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + this.state.lobCode;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: commonConstants.KEY_INDEX, value: this.state.index },
      { key: commonConstants.KEY_LIMIT, value: this.state.limit }
    ];
    apiDetails["messageBody"] = {};

    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    let allFilters = Array();
    let filterProps = Array();
    this.state.filter.map(filterInfo => {
      allFilters.push(filterInfo);
      filterProps.push(filterInfo["prop"]);
    });

    this.state.quickFilter.map(filterInfo => {
      if (!filterProps.includes(filterInfo["prop"]))
        allFilters.push(filterInfo);
    });

    apiDetails["messageBody"]["filter"] = allFilters;

    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map(keyPair => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      apiDetails["messageBody"]["sort_by"] = keys;
      apiDetails["messageBody"]["sort_order"] = values;
    }

    const thisRef = this;

    const drugGridData = this.props.postDrugsCategory(apiDetails).then(json => {
      //debugger;
      if (json.payload && json.payload.result) {
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          gridItem["file_type"] = element.file_type
            ? "" + element.file_type
            : "";
          gridItem["drug_label_name"] = element.drug_label_name
            ? "" + element.drug_label_name
            : "";
          gridItem["ndc"] = "";
          if (thisRef.props.formulary_lob_id == 1) {
            gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
          } else {
            gridItem[
              "drug_descriptor_identifier"
            ] = element.drug_descriptor_identifier
                ? "" + element.drug_descriptor_identifier
                : "";
          }
          gridItem[
            "generic_product_identifier"
          ] = element.generic_product_identifier
              ? "" + element.generic_product_identifier
              : "";
          gridItem["database_category"] = element.database_category
            ? "" + element.database_category
            : "";
          gridItem["database_class"] = element.database_class
            ? "" + element.database_class
            : "";
          gridItem["override_category"] = element.override_category
            ? "" + element.override_category
            : "";
          gridItem["override_class"] = element.override_class
            ? "" + element.override_class
            : "";
          count++;
          return gridItem;
        });
        const columns = this.getColumns();
        this.setState({
          columns: columns,
          data: data,
          filteredData: gridData,
          dataCount: json.payload.count,
          fixedSelectedRows: gridData
            .filter(item => item.isChecked)
            .map(item => item.key),
          selectedRowKeys: gridData
            .filter(item => item.isChecked)
            .map(item => item.key)
        });
      } else {
        const columns = this.getColumns();
        this.setState({
          columns: columns,
          data: Array(),
          filteredData: Array(),
          dataCount: 0,
          fixedSelectedRows: Array(),
          selectedRowKeys: Array()
        });
      }
    });
  };

  onSearchValueChanges = (value, event) => {
    console.log("Search value changed:" + event.value + " " + event.key);
    this.state.searchValue = value;
    this.state.quickFilter = [];
    if (
      this.state.searchData &&
      Array.isArray(this.state.searchData) &&
      this.state.searchData.length > 0
    ) {
      if (event.key < this.state.searchData.length) {
        let propData = this.state.searchData[event.key];
        switch (propData.key) {
          case "drug_descriptor_identifier":
            this.state.quickFilter.push({
              prop: "drug_descriptor_identifier",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "rxcui":
            this.state.quickFilter.push({
              prop: "rxcui",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "ndc":
            this.state.quickFilter.push({
              prop: "ndc",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "generic_product_identifier":
            this.state.quickFilter.push({
              prop: "generic_product_identifier",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "drug_label_name":
            this.state.quickFilter.push({
              prop: "drug_label_name",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "database_class":
            this.state.quickFilter.push({
              prop: "database_class",
              operator: "is_like",
              values: [propData.value]
            });
            break;

          case "database_category":
            this.state.quickFilter.push({
              prop: "database_category",
              operator: "is_like",
              values: [propData.value]
            });
            break;
        }
        this.populateGridData();
      }
    }
  };

  clearSearchFilter = e => {
    this.state.quickFilter = Array();
    this.state.searchData = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    this.populateGridData();
  };

  onInputValueChanged = value => {
    if (value) {
      let requests = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = commonConstants.SEARCH_GPI;
      apiDetails["pathParams"] =
        this.props?.formulary_id + "/" + this.state.lobCode + "/" + "F";
      if (this.state.lobCode === "MCR") {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] +
          "/" +
          (this.props.formulary_type_id === 1 ? "MC" : "MMP");
      } else {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] + "/" + this.state.lobCode;
      }
      apiDetails["keyVals"] = [
        { key: commonConstants.KEY_SEARCH_VALUE, value: value }
      ];
      requests.push({
        key: "generic_product_identifier",
        apiDetails: apiDetails
      });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_NDC;
      requests.push({ key: "ndc", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_LABEL_NAME;
      requests.push({ key: "drug_label_name", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_CLASS;
      requests.push({ key: "database_class", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = commonConstants.SEARCH_CATEGORY;
      requests.push({ key: "database_category", apiDetails: apiDetails });

      if (this.props.formulary_lob_id == 1) {
        apiDetails = Object.assign({}, apiDetails);
        apiDetails["apiPart"] = commonConstants.SEARCH_RXCUI;
        requests.push({ key: "rxcui", apiDetails: apiDetails });
      } else {
        apiDetails = Object.assign({}, apiDetails);
        apiDetails["apiPart"] = commonConstants.SEARCH_DDID;
        requests.push({
          key: "drug_descriptor_identifier",
          apiDetails: apiDetails
        });
      }

      const drugGridData = this.props
        .getIntelliscenseSearch(requests)
        .then(json => {
          //debugger;
          if (
            json.payload &&
            json.payload.data &&
            Array.isArray(json.payload.data) &&
            json.payload.data.length > 0
          ) {
            let tmpData = json.payload.data;
            var data: any[] = [];
            var gridData = tmpData.map(function (el) {
              var element = Object.assign({}, el);
              data.push(element);
              let gridItem = element["value"];
              return gridItem;
            });
            this.setState({
              searchData: data,
              searchNames: gridData
            });
          }
        });
    }
  };

  componentDidMount() {
    this.populateTierDetails();
    this.populateClassificationDetails();

    this.state.lobCode = getLobCode(this.props.formulary_lob_id);

    this.populateGridData();
  }

  getColumns = () => {
    switch (this.props.formulary_lob_id) {
      case 4:
        return categoryCommercialClassColumns();
      case 1:
        return categoryClassColumns();
      default:
        break;
    }
  };

  getColumnsData = () => {
    switch (this.props.formulary_lob_id) {
      case 4:
        return categoryCommercialClassMock();
      case 1:
        return categoryClassMock();
      default:
        break;
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });
  };

  onClose = () => {
    console.log("close");
    this.state.addedFormularyDrugs = Array();
    this.resetData();
    this.setState({ materialPopupInd: false }, () => {
      this.populateGridData();
    });
    return true;
  };
  handleAddFileClick = () => { };

  handlePopupButtonClick = (popupName, title) => {
    if (popupName === "override") {
      if (this.state.addedFormularyDrugs.length > 0) {
        this.setState({
          materialPopupInd: true,
          popupName: popupName,
          title: title
        });

        this.setState({
          showActionsInd: true
        });
      } else {
        showMessage("Choose Drugs to Override Category/Class", "error");
      }
    } else {
      this.setState({
        materialPopupInd: true,
        popupName: popupName,
        title: title
      });

      this.setState({
        showActionsInd: false
      });
    }
  };
  processCloseActions = type => {
    //this.setState({ show: true });
    if (type === "positive") {
      if (
        this.state.overriddenCategory &&
        this.state.overriddenClass &&
        this.state.addedFormularyDrugs.length > 0
      ) {
        this.setState({
          isRequestFinished: false,
        });
        let apiDetails = {};
        apiDetails["apiPart"] = categoryConstants.DRUG_CATEGORY_CLASS;
        apiDetails["pathParams"] =
          this.props?.formulary_id + "/" + this.state.lobCode;
        apiDetails["keyVals"] = [
          {
            key: commonConstants.KEY_ENTITY_ID,
            value: this.props?.formulary_id
          }
        ];
        apiDetails["messageBody"] = {
          category_name: this.state.overriddenCategory,
          class_name: this.state.overriddenClass,
          added_formulary_drugs: this.state.addedFormularyDrugs,
          category_list: "",
          covered: {},
          filter: [],
          is_select_all: false,
          not_covered: {},
          removedformulary_drug_ids: [],
          search_key: "",
          is_custom_category: this.state.customCategory,
          is_custom_class: this.state.customClass
        };
        if (this.props.advancedSearchBody && Object.keys(this.props.advancedSearchBody).length > 0) {
          apiDetails["messageBody"] = Object.assign(apiDetails["messageBody"], this.props.advancedSearchBody);
        }

        apiDetails["messageBody"]['is_select_all'] = this.state.isSelectAll;

        let allFilters = Array();
        let filterProps = Array();
        this.state.filter.map(filterInfo => {
          allFilters.push(filterInfo);
          filterProps.push(filterInfo["prop"]);
        });

        this.state.quickFilter.map(filterInfo => {
          if (!filterProps.includes(filterInfo["prop"]))
            allFilters.push(filterInfo);
        });

        apiDetails["messageBody"]["filter"] = allFilters;
        const postData = this.props
          .postDrugsClassCategoryOverride(apiDetails)
          .then(json => {
            //debugger;
            if (
              json.payload &&
              json.payload.code &&
              json.payload.code === "200"
            ) {
              this.state.addedFormularyDrugs = Array();
            } else {
              this.state.addedFormularyDrugs = Array();
            }
            this.state.isRequestFinished = true;
            this.resetData();
            this.populateGridData();
          });
      }
    } else {
      this.state.addedFormularyDrugs = Array();
      this.state.isRequestFinished = true;
      this.resetData();
      this.populateGridData();
    }
    this.setState({
      materialPopupInd: false,
    });
  };
  handleSearch = searchObject => {
    console.log("search");
  };
  rowSelectionChange = record => {
    console.log("Records:" + record);
    this.state.addedFormularyDrugs = Array();
    if (record && record.length > 0) {
      record.map(row => {
        let checkedIndex = row - 1;
        if (checkedIndex < this.state.data.length) {
          let drug = this.state.data[checkedIndex];
          this.state.addedFormularyDrugs.push(drug["md5_id"]);
        }
      });
    }
  };

  // rowSelectionChangeFromCell = (
  //   key: string,
  //   selectedRow: any,
  //   isSelected: boolean
  // ) => {
  //   console.log(
  //     "data row ",
  //     selectedRow,
  //     isSelected,
  //     selectedRow["isDisabled"]
  //   );
  //   if (!selectedRow["isDisabled"]) {
  //     if (isSelected) {
  //       const data = this.state.filteredData.map((d: any) => {
  //         if (!d["isDisabled"]) {
  //           d["isChecked"] = true;
  //         }
  //         return d;
  //       });
  //       if (!this.state.selectedRowKeys.includes(selectedRow.key)) {
  //         this.state.selectedRowKeys.push(selectedRow.key);
  //       }
  //       this.rowSelectionChange(this.state.selectedRowKeys);
  //       this.setState({ filteredData: data });
  //     } else {
  //       const data = this.state.filteredData.map((d: any) => {
  //         if (!d["isDisabled"]) {
  //           d["isChecked"] = false;
  //         }
  //         return d;
  //       });
  //       // this.state.selectedRowKeys = this.state.selectedRowKeys.filter(rowKey => rowKey !== selectedRow.key);

  //       this.rowSelectionChange(this.state.selectedRowKeys);
  //       this.setState({
  //         filteredData: data,
  //         selectedRowKeys: this.state.selectedRowKeys.filter(
  //           rowKey => rowKey !== selectedRow.key
  //         )
  //       });
  //     }
  //   }
  // };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.filteredData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            // d["rowStyle"] = "table-row--green-font";
          }
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key
        ];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter(
          k => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.rowSelectionChange(selectedRows);

        this.setState({ filteredData: data, selectedRowKeys: selectedRowKeys });
      } else {
        const data = this.state.filteredData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = false;
            if (d["rowStyle"]) delete d["rowStyle"];
          }
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          k => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          k => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        this.rowSelectionChange(selectedRows);
        this.setState({
          filteredData: data,
          selectedRowKeys: selectedRowKeys
        });
      }
    }
  };

  // onSelectAllRows = (isSelected: boolean) => {
  //   const selectedRowKeys: number[] = [];
  //   this.state.selectedRowKeys = Array();
  //   const data = this.state.filteredData.map((d: any) => {
  //     if (!d["isDisabled"]) {
  //       d["isChecked"] = isSelected;
  //       if (isSelected) {
  //         selectedRowKeys.push(d["key"]);
  //         this.state.selectedRowKeys.push(d["key"]);
  //       } else {

  //       }
  //     }
  //     return d;
  //   });
  //   this.rowSelectionChange(selectedRowKeys);
  //   this.setState({filteredData: data});
  // };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.filteredData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          // d["rowStyle"] = "table-row--green-font";
        } else {
          if (d["rowStyle"]) delete d["rowStyle"];
        }
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      k => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.rowSelectionChange(selectedRows);
    this.setState({ filteredData: data, selectedRowKeys: selectedRowKeys, isSelectAll: isSelected });
  };

  onOverrideCategoryClass = (category, classValue) => {
    this.state.overriddenCategory = category;
    this.state.overriddenClass = classValue;

    if (!category && !classValue) {
      this.state.customCategory = false;
      this.state.customClass = false;
    }
  };
  onOverrideCategory = (category, isCustom = false) => {
    this.state.overriddenCategory = category;
    this.state.customCategory = isCustom;
  };
  onOverrideClass = classValue => {
    this.state.overriddenClass = classValue;
    this.state.customClass = true;
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClickHandler = event => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      this.populateGridData(nextProps.advancedSearchBody);
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }
  }
  onColumnChange = (columns: any[]) => {
    console.log("swapped", columns);
    const cols = _.cloneDeep(columns);
    const changedColumns = cols
    this.setState({
      isColumnsChanged: true,
      changedColumns
    });
  };
  render() {
    let gridColumns = this.state.columns;
    if (this.state.hiddenColumns.length > 0) {
      gridColumns = gridColumns.filter(key => !this.state.hiddenColumns.includes(key));
    }
    if(!this.state.isRequestFinished){
      return <FrxLoader />;
    }
    return (
      <div className="drug-detail-LA-root class-category">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader
                      title="Category/Class View And ASSIGNMENT"
                      tooltip="This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details"
                    />
                  </div>
                </div>
                <div className="bordered category-class-root">
                  <div className="header pr-10 category-class-wrapper">
                    <p></p>
                    <div className="category-class-button-wrapper">
                      <div className="header-dropdown">
                        <DropDown
                          value={this.state.searchValue}
                          options={this.state.searchNames}
                          placeholder={this.state.filterPlaceholder}
                          showSearch={true}
                          onSearch={this.onInputValueChanged}
                          onSelect={this.onSearchValueChanges}
                        />
                        {this.state.quickFilter.length > 0 && (
                          <span
                            style={{ marginLeft: 10 }}
                            onClick={this.clearSearchFilter}
                          >
                            Clear
                          </span>
                        )}
                      </div>
                      <div
                        className="add-file-button"
                        onClick={e =>
                          this.handlePopupButtonClick(
                            "override",
                            "CATEGORY AND CLASS ASSIGNMENT"
                          )
                        }
                      >
                        Override
                      </div>
                      <div
                        className="advance-search-button advance-search-btn"
                        onClick={e => this.advanceSearchClickHandler(e)}
                      >
                        Advanced Search
                      </div>
                    </div>
                  </div>
                  <FrxDrugGridContainer
                    className="umair"
                    enableSettings
                    settingsWidth={50}
                    enableSearch={false}
                    enableColumnDrag={false}
                    onSearch={this.handleSearch}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName=""
                    isFetchingData={this.state.isFetchingData}
                    columns={
                      this.state.isColumnsChanged
                        ? this.state.changedColumns
                        : categoryCommercialClassColumns()
                    }
                    isPinningEnabled={false}
                    scroll={{ x: 2000, y: 377 }}
                    enableResizingOfColumns
                    data={this.state.filteredData}
                    rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                    onSelectAllRows={this.onSelectAllRows}
                    customSettingIcon={"FILL-DOT"}
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
                    pageSize={this.state.limit}
                    selectedCurrentPage={
                      this.state.index / this.state.limit + 1
                    }
                    isFiltered={this.state.isFiltered}
                    filteredInfo={this.state.filteredInfo}
                    onColumnChange={this.onColumnChange}
                  /*rowSelection={{
                  columnWidth: 50,
                  fixed: true,
                  type: "checkbox",
                  onChange: this.rowSelectionChange,
                }}
                settingsTriDotClick={() => {
                  console.log("object");
                }}*/
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <DialogPopup
          className="frx-override-result-root"
          showCloseIcon={this.state.showActionsInd}
          positiveActionText="Assign"
          negativeActionText="Cancel"
          title={this.state.title}
          handleClose={() => {
            this.onClose();
          }}
          handleAction={type => {
            this.processCloseActions(type);
          }}
          showActions={this.state.showActionsInd}
          open={this.state.materialPopupInd}
        >
          {this.state.popupName === "override" ? (
            <OverridePopup
              onOverrideCategoryClass={this.onOverrideCategoryClass}
              onOverrideCategory={this.onOverrideCategory}
              onOverrideClass={this.onOverrideClass}
            />
          ) : (
              ""
            )}
        </DialogPopup>
        {this.state.isSearchOpen ? (
          <AdvanceSearchContainer
            openPopup={this.state.isSearchOpen}
            onClose={this.advanceSearchClosekHandler}
            isAdvanceSearch={true}
          />
        ) : null}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryClass);
