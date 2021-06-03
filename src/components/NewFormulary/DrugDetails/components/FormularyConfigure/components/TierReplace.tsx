import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import "./Tier.scss";

import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  tierColumns,
  tierColumnsNonMcr
} from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
//import AdvancedSearch from './search/AdvancedSearch';
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import {
  postTierApplyInfo,
  getTier,
} from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import pageTypes from "../../../../../../constants/PageTypes";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import showMessage from "../../../../Utils/Toast";
import SearchBox from "../../../../../shared/Frx-components/search-box/SearchBox";
import getLobCode from "../../../../Utils/LobUtils";
import { getIntelliscenseSearch } from "../../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import * as _ from "lodash";

import "./TierReplace.scss";

interface tabsState {
  tierGridContainer: boolean;
  isSearchOpen: boolean;
  fileTypes: any[];
  tierValues: any[];
  selectedTier: any;
  selectedFileKey: any;
  selectedFileType: any;
  drugData: any[];
  drugGridData: any[];
  selectedDrugs: any[];
  selectedRowKeys: number[];
  fixedSelectedRows: number[];
  hiddenColumns: any[];
  dataCount: any;
  gridSingleSortInfo: any;
  isGridSingleSorted: boolean;
  gridMultiSortedInfo: any[];
  isGridMultiSorted: boolean;
  searchNames: any[];
  filterPlaceholder: any;
  searchValue: any;
  searchData: any[];
  isFiltered: boolean;
  filteredInfo: any;
  filter: any[];
  isSelectAll: boolean;
  isRequestFinished: boolean;
  isColumnsChanged: boolean;
  changedColumns: any[];
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    //applyData: state.tierSliceReducer.applyData,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postTierApplyInfo: a => dispatch(postTierApplyInfo(a)),
    getTier: a => dispatch(getTier(a)),
    setAdvancedSearch: a => dispatch(setAdvancedSearch(a)),
    getIntelliscenseSearch: a => dispatch(getIntelliscenseSearch(a))
  };
}

class TierReplace extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    isSearchOpen: false,
    tierValues: Array(),
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedDrugs: Array(),
    selectedTier: -1,
    selectedFileKey: "",
    selectedFileType: "Full Formulary",
    fileTypes: [
      { type: "FRF", key: "FRF" },
      { type: "ORF/ERF", key: "OTC" },
      { type: "Non FRF Products", key: "NONFRF" },
      { type: "FRF Change Report", key: "FRFCR" },
      { type: "Full Formulary", key: "MCR" },
    ],
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[],
    index: 0,
    limit: 10,
    filter: Array(),
    quickFilter: Array(),
    sort_by: [{ key: 'drug_label_name', value: 'asc' }],
    hiddenColumns: Array(),
    dataCount: 0,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    searchData: Array(),
    isFiltered: false,
    filteredInfo: null,
    isSelectAll: false,
    isRequestFinished: true,
    changedColumns: Array(),
    isColumnsChanged: false,
  };

  constructor(props) {
    super(props);
    console.log(
      "Tier Replace constructor called. Props:" + JSON.stringify(props)
    );

    this.initialize(this.props, true);
  }

  /*onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    console.log(
      "Settings icon handler: Hidden" +
      JSON.stringify(hiddenColumn) +
      " Visible:" +
      JSON.stringify(visibleColumn)
    );
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };*/
  onApplyFilterHandler = (filters, filteredInfo) => {
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
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
            values: fetchedValues,
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
  onPageSize = (pageSize) => {
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

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));


    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    })

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

  componentDidMount() {
    console.log("componentDidMount");
    this.initialize(this.props, true);
    if (this.props.configureSwitch) {
      this.state.selectedFileKey = getLobCode(this.props.formulary_lob_id);
      this.state.selectedFileType = "Full Formulary";
      this.state.tierGridContainer = true;
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    }
  }

  initialize = (props, initFileKey = false) => {
    var tierOptions = Array();
    let lobCode = getLobCode(this.props.formulary_lob_id);
    console.log("Initialize called:" + lobCode);
    if (props.tierOptions) {
      props.tierOptions.map((tier) => {
        tierOptions.push(tier.tier_value);
      });
    }
    if (lobCode === "MCR") {
      let fileTypesModified: any[] = [];
      if (
        lobCode === "MCR" &&
        props.formulary_type_id &&
        props.formulary_type_id == 2
      ) {
        fileTypesModified.push({ type: "ADD", key: "ADD" });
        fileTypesModified.push({ type: "Full Formulary", key: lobCode });
      } else {
        this.state.fileTypes.map((fileType) => {
          if (fileType.type === "Full Formulary") {
            fileType.key = lobCode;
          }
          fileTypesModified.push(fileType);
        });
      }
      this.state.fileTypes = fileTypesModified;
    } else if (lobCode === "COMM") {
      let fileTypesModified: any[] = [];
      fileTypesModified.push({ type: "Drug Table", key: "COMMDF" });
      fileTypesModified.push({ type: "Full Formulary", key: lobCode });
      this.state.fileValues = Array();

      this.state.fileValues.push("Drug Table");
      this.state.fileValues.push("Full Formulary");

      this.state.fileTypes = fileTypesModified;
    }
    this.state.tierValues = tierOptions;
    if (initFileKey) {
      if (lobCode === "COMM") {
        this.state.selectedFileKey = "COMMDF";
        this.state.selectedFileType = "Drug Table";
      } else {
        this.state.selectedFileKey = lobCode;
        this.state.selectedFileType = "Full Formulary";
      }
    }
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
        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      }
    }
  };

  clearSearchFilter = e => {
    this.state.quickFilter = Array();
    this.state.searchData = Array();
    this.state.searchNames = Array();
    this.state.filterPlaceholder = "Search";
    this.state.searchValue = "";
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onInputValueChanged = value => {
    if (value) {
      let lobCode = getLobCode(this.props.formulary_lob_id);
      let requests = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = this.state.selectedFileKey === 'COMMDF' ? commonConstants.SEARCH_GPI_FULL : commonConstants.SEARCH_GPI;
      apiDetails["pathParams"] =
        this.props?.formulary_id + "/" + this.state.selectedFileKey + "/" + "F";
      if (lobCode === "MCR") {
        apiDetails["pathParams"] =
          apiDetails["pathParams"] +
          "/" +
          (this.props.formulary_type_id === 1 ? "MC" : "MMP");
      } else {
        apiDetails["pathParams"] = apiDetails["pathParams"] + "/" + lobCode;
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
      apiDetails["apiPart"] = this.state.selectedFileKey === 'COMMDF' ? commonConstants.SEARCH_LABEL_NAME_FULL : commonConstants.SEARCH_LABEL_NAME;
      requests.push({ key: "drug_label_name", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = this.state.selectedFileKey === 'COMMDF' ? commonConstants.SEARCH_CLASS_FULL : commonConstants.SEARCH_CLASS;
      requests.push({ key: "database_class", apiDetails: apiDetails });

      apiDetails = Object.assign({}, apiDetails);
      apiDetails["apiPart"] = this.state.selectedFileKey === 'COMMDF' ? commonConstants.SEARCH_CATEGORY_FULL : commonConstants.SEARCH_CATEGORY;
      requests.push({ key: "database_category", apiDetails: apiDetails });

      if (this.props.formulary_lob_id == 1) {
        apiDetails = Object.assign({}, apiDetails);
        apiDetails["apiPart"] = this.state.selectedFileKey === 'COMMDF' ? commonConstants.SEARCH_RXCUI_FULL : commonConstants.SEARCH_RXCUI;
        requests.push({ key: "rxcui", apiDetails: apiDetails });
      } else {
        apiDetails = Object.assign({}, apiDetails);
        apiDetails["apiPart"] = this.state.selectedFileKey === 'COMMDF' ? commonConstants.SEARCH_DDID_FULL : commonConstants.SEARCH_DDID;
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

  populateGridData = (searchBody = null) => {
    console.log("Populate grid data is called:" + this.state.selectedFileKey);
    let apiDetails = {};
    apiDetails["apiPart"] =
      this.state.selectedFileKey === this.props.lobCode
        ? tierConstants.FORMULARY_DRUGS_TIER
        : tierConstants.DRUGS_TIER;
    apiDetails["pathParams"] =
      this.props?.formulary_id +
      "/" +
      this.state.selectedFileKey +
      "/" +
      commonConstants.TYPE_REPLACE;
    apiDetails["keyVals"] = [
      { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: commonConstants.KEY_INDEX, value: this.state.index },
      { key: commonConstants.KEY_LIMIT, value: this.state.limit },
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

    const { selectedTier } = this.state;
    const thisRef = this;
    const drugGridDate = this.props.postTierApplyInfo(apiDetails).then(json => {
      //debugger;
      if (json.payload && json.payload.result) {
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map(function (el, idx) {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;
          //for preseelct items with selected tier value
          if (selectedTier === parseInt(element.tier_value)) {
            console.log(
              "element value tier ",
              selectedTier,
              element.tier_value
            );
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
          //end
          gridItem["tier_value"] = element.tier_value;
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
          if (thisRef.props.lobCode === "MCR") {
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
          fixedSelectedRows: gridData
            .filter(item => item.isChecked)
            .map(item => item.key),
          selectedRowKeys: gridData
            .filter(item => item.isChecked)
            .map(item => item.key)
        });
      } else {
        this.setState({
          drugData: Array(),
          drugGridData: Array(),
          dataCount: 0,
          fixedSelectedRows: Array(),
          selectedRowKeys: Array()
        });
      }
    });
  };

  handleSave = () => {
    console.log(" selected drugs ", this.state.selectedDrugs);
    if (
      this.state.selectedDrugs &&
      this.state.selectedDrugs.length > 0 &&
      this.state.selectedTier !== -1
    ) {
      this.setState({
        isRequestFinished: false,
      });
      let apiDetails = {};
      apiDetails["apiPart"] = tierConstants.APPLY_TIER;
      apiDetails["pathParams"] =
        this.props?.formulary_id +
        "/" +
        this.state.selectedFileKey +
        "/" +
        commonConstants.TYPE_REPLACE;
      apiDetails["keyVals"] = [];
      apiDetails["messageBody"] = {
        category_list: "",
        covered: {},
        filter: [],
        is_select_all: false,
        not_covered: {},
        removedformulary_drug_ids: [],
        search_key: "",
      };
      apiDetails["messageBody"]["selected_drug_ids"] = this.state.selectedDrugs;
      apiDetails["messageBody"]["id_tier"] = this.state.selectedTier;

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

      const saveData = this.props.postTierApplyInfo(apiDetails).then((json) => {
        console.log("Save response is:" + JSON.stringify(json));
        if (json.payload && json.payload.code && json.payload.code === "200") {
          showMessage("Success", "success");
        } else {
          showMessage("Failure", "error");
        }
        this.state.drugData = [];
        this.state.drugGridData = [];
        this.resetData();
        this.populateGridData();

        apiDetails = {};
        apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
        apiDetails["pathParams"] = this.props?.formulary_id;
        apiDetails["keyVals"] = [
          {
            key: commonConstants.KEY_ENTITY_ID,
            value: this.props?.formulary_id,
          },
        ];

        const TierDefinationData = this.props
          .getTier(apiDetails)
          .then((json) => {
            this.setState({
              tierGridContainer: true,
              isRequestFinished: true,
            });
          });
      });
    }
  };

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
    //this.state.hiddenColumns = Array();
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
    this.state.isSelectAll = false;
  }

  componentWillReceiveProps(nextProps) {
    console.log("TIER REPLACE: componentWillReceiveProps");
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
    if (this.props.configureSwitch !== nextProps.configureSwitch) {
      this.initialize(nextProps, true);
      this.resetData();

      if (nextProps.configureSwitch) {
        this.state.selectedFileKey = this.props.lobCode;
        this.state.selectedFileType = "Full Formulary";
        this.state.selectedTier = -1;

        if (!this.state.tierGridContainer) {
          this.state.tierGridContainer = true;
        }

        if (this.props.advancedSearchBody) {
          this.populateGridData(this.props.advancedSearchBody);
        } else {
          this.populateGridData();
        }
      } else {
        this.state.selectedFileKey = "COMMDF";
        this.state.selectedFileType = "Drug Table";

        if (this.state.selectedTier != -1) {
          if (this.props.advancedSearchBody) {
            this.populateGridData(this.props.advancedSearchBody);
          } else {
            this.populateGridData();
          }
        } else {
          this.setState({
            tierGridContainer: false,
          });
        }
      }
    } else {
      this.initialize(nextProps, false);
    }
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    console.log("selected row ", selectedRowKeys);

    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys],
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) => {
        let item = {};
        if (
          this.state.drugData[tierId - 1]["formulary_drug_id"] &&
          this.state.drugData[tierId - 1]["drug_id"]
        ) {
          item = {
            formulary_drug_id: this.state.drugData[tierId - 1][
              "formulary_drug_id"
            ],
            drug_id: this.state.drugData[tierId - 1]["drug_id"],
          };
        } else if (this.state.drugData[tierId - 1]["formulary_drug_id"]) {
          item = {
            formulary_drug_id: this.state.drugData[tierId - 1][
              "formulary_drug_id"
            ],
          };
        } else if (this.state.drugData[tierId - 1]["drug_id"]) {
          item = {
            drug_id: this.state.drugData[tierId - 1]["drug_id"],
            formulary_drug_id: this.state.drugData[tierId - 1][
              "formulary_drug_id"
            ],
          };
        }
        return item;
      });
    }
  };

  tierDropDownSelectHandler = (value, event) => {
    let tierIndex = event.key;
    let tierValue = event.value;

    if (this.props.lobCode === "MCR") {
      this.state.fileValues = [];
      this.state.selectedFileKey = this.props.lobCode;
      if (this.props.tierOptions && tierIndex < this.props.tierOptions.length) {
        let tierObject = this.props.tierOptions[tierIndex];
        if (
          this.props.lobCode === "MCR" &&
          this.props.formulary_type_id &&
          this.props.formulary_type_id == 2
        ) {
          this.state.fileTypes.map((fileType) => {
            this.state.fileValues.push(fileType.type);
          });
        } else {
          if (tierObject.tier_label && tierObject.tier_label === "OTC") {
            this.state.fileValues.push("ORF/ERF");
            this.state.fileValues.push("Full Formulary");
          } else {
            this.state.fileTypes.map((fileType) => {
              this.state.fileValues.push(fileType.type);
            });
          }
        }
      }
    } else if (this.props.lobCode === "COMM") {
      this.state.selectedFileKey = "COMMDF";
      this.state.selectedFileType = "Drug Table";
    }
    this.resetData();
    this.setState({ selectedTier: tierValue, tierGridContainer: false });
  };

  fileTypeDropDownSelectHandler = (value, event) => {
    let fileType = event.value.toString().trim();
    let fileKey = this.props.lobCode;

    if (fileType) {
      let filtered = this.state.fileTypes.filter(
        (fileObject) => fileObject.type.toString().trim() === fileType
      );
      if (filtered && filtered.length > 0) {
        fileKey = filtered[0].key;
      }
    }
    console.log("Selected file key is:" + fileKey);
    this.state.selectedFileKey = fileKey;
    this.state.selectedFileType = fileType;
    //this.setState({ selectedFileKey: fileKey });

    this.resetData();

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  openTierGridContainer = () => {
    if (this.state.selectedTier !== -1) {
      this.state.drugData = [];
      this.state.drugGridData = [];
      this.setState({ tierGridContainer: true });
      if (this.props.advancedSearchBody) {
        this.populateGridData(this.props.advancedSearchBody);
      } else {
        this.populateGridData();
      }
    }
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
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
        console.log("selected row keys ", selectedRowKeys);
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

  onColumnChange = (columns: any[]) => {
    console.log("swapped", columns);
    const cols = _.cloneDeep(columns);
    const changedColumns = cols
    this.setState({
      isColumnsChanged: true,
      changedColumns
    });
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          d["rowStyle"] = "table-row--green-font";
        } else {
          if (d["rowStyle"]) delete d["rowStyle"];
        }
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
      pageType: pageTypes.TYPE_TIER,
    };
    /*let columns =
      this.props.lobCode === "MCR" ? tierColumns() : tierColumnsNonMcr();
    if (this.state.hiddenColumns.length > 0) {
      columns = columns.filter(
        (key) => !this.state.hiddenColumns.includes(key)
      );
    }*/
    console.log('Render selected file type is:' + this.state.selectedFileType);
    if (!this.state.isRequestFinished) {
      return <FrxLoader />;
    }
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Grid container>
            <Grid item xs={4}>
              <label>
                TIER <span className="astrict">*</span>
              </label>
              <DropDown
                value={
                  this.state.selectedTier !== -1 ? this.state.selectedTier : ""
                }
                options={this.state.tierValues}
                disabled={this.props.configureSwitch}
                onSelect={this.tierDropDownSelectHandler}
              />
            </Grid>
            <Grid item xs={8}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  label="Apply"
                  onClick={this.openTierGridContainer}
                  disabled={this.props.configureSwitch}
                />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.tierGridContainer && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header remove-btn-wrapper pr-10">
                {(this.props.lobCode === "MCR" ||
                  this.props.lobCode === "COMM") && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ marginRight: 10 }}>Select Drugs From</span>
                      <DropDown
                        options={this.state.fileValues}
                        disabled={this.props.configureSwitch}
                        onSelect={this.fileTypeDropDownSelectHandler}
                        defaultValue={this.state.selectedFileType}
                      />
                    </div>
                  )}
                <div className="header remove-btn-wrapper pr-10">
                  <div className="header pr-10">
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
                    <Button
                      className="Button normal"
                      label="Advance Search"
                      onClick={this.advanceSearchClickHandler}
                    />
                    <Button
                      label="Save"
                      onClick={this.handleSave}
                      disabled={this.props.configureSwitch}
                    />
                  </div>
                </div>
              </div>

              <div className="tier-grid-container tier-replace-root">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  settingsWidth={50}
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="TIER"
                  enableSettings
                  columns={
                    this.state.isColumnsChanged
                      ? this.state.changedColumns
                      : tierColumnsNonMcr()
                  }
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
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
                  selectedCurrentPage={this.state.index / this.state.limit + 1}
                  isFiltered={this.state.isFiltered}
                  filteredInfo={this.state.filteredInfo}
                  onColumnChange={this.onColumnChange}
                // rowSelection={{
                //   columnWidth: 50,
                //   selectedRowKeys: this.state.selectedRowKeys,
                // 	fixed: true,

                //   type: "checkbox",
                //   onChange: this.onSelectedTableRowChanged
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
                fileType={this.state.selectedFileKey}
              />
            ) : null}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TierReplace);
