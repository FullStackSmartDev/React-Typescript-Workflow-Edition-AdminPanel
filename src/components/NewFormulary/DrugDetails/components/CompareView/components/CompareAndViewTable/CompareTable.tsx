import React, { Component } from "react";
import PureAccordion from "../../../../../../shared/Frx-components/accordion/PureAccordion";
import { ReactComponent as HideIcon } from "../../../../../../../assets/icons/HideIcon.svg";
import { ReactComponent as ShowIcon } from "../../../../../../../assets/icons/ShowIcon.svg";
import "./CompareTable.scss";
import InnerGrid from "./InnerGrid";
import Button from "../../../../../../shared/Frx-components/button/Button";
import FrxLoader from "../../../../../../shared/FrxLoader/FrxLoader";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { getCompareNonMcrFormularyViewAllGridColumns } from "../../../../../../../mocks/formulary-grid/FormularyGridColumn";
import {
  getMainComparison,
  getViewAllDrugs,
  getViewAllDrugsReject,
  postDrugRejection,
} from "../../../../../../../redux/slices/formulary/compareView/compareViewService";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as compareConstants from "../../../../../../../api/http-compare-view";
import { connect } from "react-redux";
import showMessage from "../../../../../Utils/Toast";
import getLobCode from "../../../../../Utils/LobUtils";
import { textFilters } from "../../../../../../../utils/grid/filters";

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    clientId: state?.application?.clientId,
  };
};

const TYPE_SINGLE = 0;
const TYPE_IN_BASE_NOT_REF = 1;
const TYPE_IN_REF_NOT_BASE = 2;

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  sort_by: [],
  sort_order: []
};

class CompareTable extends Component<any, any> {
  state = {
    showCheckbox: false,
    toggleAllAccordion: true,
    showViewAll: false,
    showViewAllNonMatch: false,
    columns: Array(),
    data: Array(),
    gridData: Array(),
    scroll: {
      x: 8000,
      y: 500,
    },
    formularyTypesGridData: Array(),
    baseFormularyId: "",
    reformularyId: "",
    viewAllType: TYPE_SINGLE,
    dataCount: 0,
    isRowSelectionEnabled: false,
    hiddenColumns: Array(),
    rejectedKeys: Array(),
    rejectedDrugIds: Array(),
    isRequestFinished: false,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    sort_by: Array(),
    isFiltered: false,
    filteredInfo: null,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    sort_by: [],
    sort_order: []
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };
  onApplyFilterHandler = (filters, filteredInfo) => {
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys.length > 0) {
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps]) {
          this.listPayload.filter = this.listPayload.filter.filter(element => element['prop'] !== fetchedProps);
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
          this.listPayload.filter.push({
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
        this.populateViewAllData(
          this.listPayload,
          this.state.baseFormularyId,
          this.state.reformularyId,
          this.state.viewAllType
        );
      });
    }else{
      this.listPayload.filter = Array();
      this.setState({
        isFiltered: false,
        filteredInfo: filteredInfo
      }, () => {
        this.populateViewAllData(
          this.listPayload,
          this.state.baseFormularyId,
          this.state.reformularyId,
          this.state.viewAllType
        );
      });
    }
    console.log("Filters:" + JSON.stringify(this.listPayload.filter));
    /*this.setState({
      isRequestFinished: false
    });*/
  };
  onPageSize = (pageSize) => {
    if (this.state.viewAllType === TYPE_SINGLE) {
      this.listPayload = { ...defaultListPayload };
      this.listPayload.limit = pageSize;
      /*this.setState({
        isRequestFinished: false
      });*/
      this.populateViewAllData(
        this.listPayload,
        this.state.baseFormularyId,
        this.state.reformularyId,
        this.state.viewAllType
      );
    }
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    if (this.state.viewAllType === TYPE_SINGLE) {
      this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
      /*this.setState({
        isRequestFinished: false
      });*/
      this.populateViewAllData(
        this.listPayload,
        this.state.baseFormularyId,
        this.state.reformularyId,
        this.state.viewAllType
      );
    }
  };
  onClearFilterHandler = () => {
    if (this.state.viewAllType === TYPE_SINGLE) {
      this.listPayload = { ...defaultListPayload };
      this.listPayload.filter = Array();
      /*this.setState({
        isRequestFinished: false
      });*/
      this.setState({
        isFiltered: false,
        filteredInfo: null
      }, () => {
        this.populateViewAllData(
          this.listPayload,
          this.state.baseFormularyId,
          this.state.reformularyId,
          this.state.viewAllType
        );
      });
    }
  };
  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log('Multisort info:' + JSON.stringify(sorter));
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
        if (uniqueKeys.includes(sortInfo['columnKey'])) {

        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo['columnKey']);
        }
      });
      filteredSorter.map(sortInfo => {
        let sortOrder = sortInfo['order'] === 'ascend' ? 'asc' : 'desc';
        this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== sortInfo['columnKey']);
        this.state.sort_by.push({ key: sortInfo['columnKey'], value: sortOrder });
      })

      let keys = Array();
      let values = Array();

      this.state.sort_by.map(keyPair => {
        keys.push(keyPair['key']);
        values.push(keyPair['value']);
      });

      this.listPayload.sort_by = keys;
      this.listPayload.sort_order = values;
    }

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateViewAllData(
      this.listPayload,
      this.state.baseFormularyId,
      this.state.reformularyId,
      this.state.viewAllType
    );
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.listPayload.sort_by = Array();
    this.listPayload.sort_order = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateViewAllData(
      this.listPayload,
      this.state.baseFormularyId,
      this.state.reformularyId,
      this.state.viewAllType
    );
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order, sortedInfo) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    this.listPayload.sort_by = Array();
    this.listPayload.sort_order = Array();
    if (order) {
      let sortOrder = order === 'ascend' ? 'asc' : 'desc';
      this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== key);
      this.state.sort_by.push({ key: key, value: sortOrder });
    }
    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: []
    });

    let keys = Array();
    let values = Array();

    this.state.sort_by.map(keyPair => {
      keys.push(keyPair['key']);
      values.push(keyPair['value']);
    });

    this.listPayload.sort_by = keys;
    this.listPayload.sort_order = values;

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateViewAllData(
      this.listPayload,
      this.state.baseFormularyId,
      this.state.reformularyId,
      this.state.viewAllType
    );
  };

  rowSelectionChange = (data: any, event) => {
    console.log("Main Table: Drug selected:" + JSON.stringify(data));
    if (event.target.checked) {
      let filtered = this.state.data.filter(
        (drugItem) =>
          drugItem["formulary_drug_id"] === data["formulary_drug_id"]
      );
      if (filtered.length > 0) {
        let drugId = filtered[0]["md5_id"];
        if (!this.state.rejectedDrugIds.includes(drugId)) {
          this.state.rejectedDrugIds.push(drugId);
        }
      }
    } else {
      let filtered = this.state.data.filter(
        (drugItem) =>
          drugItem["formulary_drug_id"] === data["formulary_drug_id"]
      );
      if (filtered.length > 0) {
        let drugId = filtered[0]["md5_id"];
        if (!this.state.rejectedDrugIds.includes(drugId)) {
          this.state.rejectedDrugIds = this.state.rejectedDrugIds.filter(
            (item) => item !== drugId
          );
        }
      }
    }
  };

  onDialogAction = (type) => {
    console.log(
      "Reject clicked:" +
      type +
      " " +
      JSON.stringify(this.state.rejectedDrugIds)
    );
    if (type === "positive" && this.state.rejectedDrugIds.length > 0) {
      console.log(
        "Rejected drugs:" + JSON.stringify(this.state.rejectedDrugIds)
      );
      let apiBody = {
        user_id: 1,
        attributes: Array(),
      };
      this.state.rejectedDrugIds.map((attributeData) => {
        let newTemplate = {
          attribute_field_name: "",
          drug_key: "",
          attribute_current_value: "",
          is_single_update: false,
          file_type: getLobCode(this.props.formulary_lob_id),
          multi_update_type:
            this.state.viewAllType === TYPE_IN_BASE_NOT_REF ? "delete" : "copy",
        };
        newTemplate.drug_key = attributeData;
        apiBody.attributes.push(newTemplate);
      });
      this.onRejectClicked(apiBody);
      this.toggleShowViewAll(null, null, TYPE_SINGLE, true);
    }
  };

  toggleShowViewAll = (
    baseFormularyId = null,
    reformularyId = null,
    type = TYPE_SINGLE,
    isClose = false,
    checkBoxEnabled = false
  ) => {
    if (isClose) {
      this.listPayload = {
        index: 0,
        limit: 10,
        filter: [],
        sort_by: [],
        sort_order: []
      };
      this.setState({
        showViewAll: !this.state.showViewAll,
        columns: Array(),
        data: Array(),
        gridData: Array(),
        dataCount: 0,
        isRowSelectionEnabled: false,
        viewAllType: TYPE_SINGLE,
        baseFormularyId: "",
        reformularyId: "",
        hiddenColumns: Array(),
        rejectedKeys: Array(),
        rejectedDrugIds: Array(),
        gridSingleSortInfo: null,
        gridMultiSortedInfo: [],
        isGridMultiSorted: false,
        isGridSingleSorted: false,
        isFiltered: false,
        filteredInfo: null
      });
    } else {
      this.state.showViewAll = !this.state.showViewAll;
      this.state.isRowSelectionEnabled = checkBoxEnabled;
      this.listPayload = { ...defaultListPayload };
      this.setState({
        isRequestFinished: false
      });
      this.populateViewAllData(
        this.listPayload,
        baseFormularyId,
        reformularyId,
        type
      );
    }
  };

  getBackgroundColor = (type) => {
    switch (type) {
      case "Tier":
        return "rgba(31, 187, 196, 0.4)";

      case "Category/Class":
        return "rgba(10, 123, 225, 0.4)";

      case "Prior Authorization (PA)":
        return "#FFF5F0";

      case "Step Therpay (ST)":
        return "rgba(244, 175, 100, 0.4)";

      case "Quantity Limits (QL)":
        return "rgba(213, 255, 215, 0.5)";

      case "Drug Details":
        return "rgba(224, 237, 81, 0.4)";

      case "User Defined":
        return "#ECF5FA";
    }
  };

  getGridColumns = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];

    let lastSectionColumns = [...columns];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tier",
              displayTitle: "Tier",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "category",
            displayTitle: "Category",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "class",
            displayTitle: "Class",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paType",
              displayTitle: "PA Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescription",
              displayTitle: "PA Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stType",
              displayTitle: "ST Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescription",
              displayTitle: "ST Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValue",
              displayTitle: "ST Value",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlType",
              displayTitle: "QL Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDays",
              displayTitle: "QL Days",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantity",
              displayTitle: "QL Quantity",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "covered",
                  displayTitle: "Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCovered",
                  displayTitle: "Not Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefined",
              displayTitle: "User Defined",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;
    }
    return Array();
  };

  getGridColumnsNonMatch = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];

    let lastSectionColumns = [...columns];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tier",
              displayTitle: "Tier Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tierRef",
              displayTitle: "Tier Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "category",
            displayTitle: "Category Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "class",
            displayTitle: "Class Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 3,
            position: 3,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "categoryRef",
            displayTitle: "Category Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 4,
            position: 4,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "classRef",
            displayTitle: "Class Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescriptionRef",
            displayTitle: "Group Description Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paType",
              displayTitle: "PA Type Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescription",
              displayTitle: "PA Group Description Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paTypeRef",
              displayTitle: "PA Type Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescriptionRef",
              displayTitle: "PA Group Description Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stType",
              displayTitle: "ST Type Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescription",
              displayTitle: "ST Group Description Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValue",
              displayTitle: "ST Value Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stTypeRef",
              displayTitle: "ST Type Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescriptionRef",
              displayTitle: "ST Group Description Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValueRef",
              displayTitle: "ST Value Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescriptionRef",
            displayTitle: "Group Description Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlType",
              displayTitle: "QL Type Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDays",
              displayTitle: "QL Days Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantity",
              displayTitle: "QL Quantity Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 11,
              position: 11,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlTypeRef",
              displayTitle: "QL Type Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 12,
              position: 12,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDaysRef",
              displayTitle: "QL Days Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 13,
              position: 13,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTimeRef",
              displayTitle: "QL Period of Time Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 14,
              position: 14,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantityRef",
              displayTitle: "QL Quantity Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 15,
              position: 15,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowedRef",
              displayTitle: "Fills Allowed Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 16,
              position: 16,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriodRef",
              displayTitle: "Full Limit Period of Time Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 13,
                  position: 13,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredRef",
                  displayTitle: "Minimum Age [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 14,
                  position: 14,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredRef",
                  displayTitle: "Maximum Age [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 15,
                  position: 15,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCondRef",
                  displayTitle: "Minimum Condition [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 16,
                  position: 16,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCondRef",
                  displayTitle: "Maximum Condition [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 17,
                  position: 17,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredRef",
                  displayTitle: "Minimum Age [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 18,
                  position: 18,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredRef",
                  displayTitle: "Maximum Age [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 19,
                  position: 19,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCondRef",
                  displayTitle: "Minimum Condition [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 20,
                  position: 20,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCondRef",
                  displayTitle: "Maximum Condition [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];

            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "covered",
                  displayTitle: "Covered Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCovered",
                  displayTitle: "Not Covered Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "coveredRef",
                  displayTitle: "Covered Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCoveredRef",
                  displayTitle: "Not Covered Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];

            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefined",
              displayTitle: "User Defined Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefinedRef",
              displayTitle: "User Defined Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;
    }
    return Array();
  };

  areAllNull = (type) => {
    switch (type) {
      case "Category/Class":
        return true;

      case "Drug Details":
        return true;

      case "User Defined":
        return true;

      default:
        return false;
    }
  };

  areOnlyLastThreeNull = (type) => {
    switch (type) {
      case "Tier":
        return true;

      case "Prior Authorization (PA)":
        return true;

      case "Step Therpay (ST)":
        return true;

      case "Quantity Limits (QL)":
        return true;

      default:
        return false;
    }
  };

  populateComparisionData = async () => {
    if (this.props.formulary_lob_id && this.props.formulary_lob_id === 4) {
      let formularyTypesGridData = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = compareConstants.COMMERCIAL_COMPARE_ALL;
      apiDetails["pathParams"] =
        this.props.baseformulary["id_formulary"] +
        "/" +
        this.props.referenceformulary["id_formulary"];

      try {
        const data = await getMainComparison(apiDetails);
        if (data && data.length > 0) {
          let idCount = 1;
          data.map((value) => {
            let header = {
              id: idCount,
              title: value["attribute_type"],
              titleBG: this.getBackgroundColor(value["attribute_type"]),
              attribute_type: value["attribute_type"],
              file_type: value["file_type"],
              gridColumns: [
                "Tier",
                "Prior Authorization (PA)",
                "Step Therpay (ST)",
                "Quantity Limits (QL)",
              ].includes(value["attribute_type"])
                ? this.getGridColumns(value["attribute_type"])
                : Array(),
              headDrugsCount: {
                baseFormulary: null,
                referenceFormulary: null,
                baseOnly: null,
                referenceOnly: null,
                nonMatch: null,
              },
              formularies: Array(),
            };
            if (!this.areAllNull(value["attribute_type"])) {
              if (this.areOnlyLastThreeNull(value["attribute_type"])) {
                header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
                header.headDrugsCount.referenceFormulary =
                  value["total_reference_drugs_count"];
                header.headDrugsCount.baseOnly =
                  value["total_drugs_in_base_not_in_reference"];
                header.headDrugsCount.referenceOnly =
                  value["total_drugs_in_reference_not_in_base"];
                header.headDrugsCount.nonMatch =
                  value["total_matching_formulary_drugs_count"];
              } else {
                header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
                header.headDrugsCount.referenceFormulary =
                  value["total_reference_drugs_count"];
              }
            }
            let valueId = 1;
            if (value["values"] && value["values"].length > 0) {
              value["values"].map((subValue) => {
                let gridColumns: any[] = Array();
                let gridColumnsNonMatch: any[] = Array();
                if (
                  subValue["attribute_name"] === "PA Group Descriptions" ||
                  subValue["attribute_name"] === "ST Group Descriptions"
                ) {
                  gridColumns = this.getGridColumns(subValue["attribute_name"]);
                  gridColumnsNonMatch = this.getGridColumnsNonMatch(
                    subValue["attribute_name"]
                  );
                } else if (value["attribute_type"] === "Drug Details") {
                  gridColumns = this.getGridColumns(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                  gridColumnsNonMatch = this.getGridColumnsNonMatch(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                } else {
                  gridColumns = this.getGridColumns(value["attribute_type"]);
                  gridColumnsNonMatch = this.getGridColumnsNonMatch(
                    value["attribute_type"]
                  );
                }
                let subItem = {
                  name: subValue["attribute_name"],
                  baseFormulary: subValue["base_formulary_drugs_count"],
                  referenceFormulary:
                    subValue["reference_formulary_drugs_count"],
                  baseOnly: subValue["drugs_in_base_not_in_reference"],
                  referenceOnly: subValue["drugs_in_reference_not_in_base"],
                  nonMatch: subValue["matching_formulary_drugs_count"],
                  attribute_type: value["attribute_type"],
                  file_type: value["file_type"],
                  attribute_field_data_type:
                    subValue["attribute_field_data_type"],
                  attribute_field_name: subValue["attribute_field_name"],
                  attribute_field_value: subValue["attribute_field_value"],
                  attribute_name: subValue["attribute_name"],
                  source: subValue["source"],
                  gridColumns: gridColumns,
                  gridColumnsNonMatch: gridColumnsNonMatch,
                };
                header.formularies.push(subItem);
                valueId++;
              });
            }
            formularyTypesGridData.push(header);
            idCount++;
          });
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            columns: Array(),
            data: Array(),
            gridData: Array(),
            isRequestFinished: true
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            columns: Array(),
            data: Array(),
            gridData: Array(),
            isRequestFinished: true
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          formularyTypesGridData: formularyTypesGridData,
          columns: Array(),
          data: Array(),
          gridData: Array(),
          isRequestFinished: true
        });
      }
    } else {
      this.setState({
        formularyTypesGridData: formularyTypesGridData,
        columns: Array(),
        data: Array(),
        gridData: Array(),
        isRequestFinished: true
      });
    }
  };

  populateViewAllData = async (
    payload,
    baseFormularyId: any,
    reformularyId: any = null,
    type = TYPE_SINGLE
  ) => {
    if (this.props.formulary_lob_id && this.props.formulary_lob_id === 4) {
      let lobCode = getLobCode(this.props.formulary_lob_id);
      let gridData = Array();
      let mainData = Array();
      let columns = getCompareNonMcrFormularyViewAllGridColumns();
      let apiDetails = {};
      if (type === TYPE_SINGLE) {
        apiDetails["apiPart"] = compareConstants.COMMERCIAL_FORMULARY_ALL_DRUGS;
      } else {
        apiDetails["apiPart"] =
          type === TYPE_IN_BASE_NOT_REF
            ? compareConstants.COMMERCIAL_FORMULARY_IN_BASE_NOT_REF
            : compareConstants.COMMERCIAL_FORMULARY_IN_REF_NOT_BASE;
      }
      if (type === TYPE_SINGLE) {
        apiDetails["pathParams"] = baseFormularyId + "/" + lobCode;
      } else {
        apiDetails["pathParams"] = baseFormularyId + "/" + reformularyId;
      }

      if (type === TYPE_SINGLE) {
        apiDetails["keyVals"] = [];
        apiDetails["keyVals"].push({
          key: commonConstants.KEY_LIMIT,
          value: payload["limit"],
        });
        apiDetails["keyVals"].push({
          key: commonConstants.KEY_INDEX,
          value: payload["index"],
        });

        apiDetails["messageBody"] = {};
        apiDetails["messageBody"]["attribute_field_data_type"] = "";
        apiDetails["messageBody"]["attribute_field_name"] = "";
        apiDetails["messageBody"]["attribute_field_value"] = "";
        apiDetails["messageBody"]["attribute_name"] = "";
        apiDetails["messageBody"]["file_type"] = "";
        apiDetails["messageBody"]["filter"] = payload["filter"];
        apiDetails["messageBody"]["sort_by"] = payload["sort_by"];
        apiDetails["messageBody"]["sort_order"] = payload["sort_order"];
      }

      apiDetails["type"] = type;

      try {
        let data: any = null;

        if (type === TYPE_SINGLE) {
          data = await getViewAllDrugs(apiDetails);
        } else {
          data = await getViewAllDrugsReject(apiDetails);
        }
        if (data && data.list && data.list.length > 0) {
          data.list.map((value, index) => {
            let dataValue = Object.assign({}, value);
            mainData.push(dataValue);

            let gridItem = {};
            gridItem["id"] = index + 1;
            gridItem["key"] = index + 1;

            columns.map((columnData) => {
              if (Object.keys(dataValue).includes(columnData["key"])) {
                gridItem[columnData["key"]] =
                  dataValue[columnData["key"]] === null
                    ? ""
                    : dataValue[columnData["key"]];
              }
            });
            gridItem["md5"] = dataValue["md5_id"];
            gridData.push(gridItem);
          });
          this.setState({
            columns: columns,
            data: mainData,
            gridData: gridData,
            viewAllType: type,
            baseFormularyId: baseFormularyId,
            reformularyId: reformularyId,
            dataCount: data["count"],
            isRequestFinished: true
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            columns: Array(),
            data: Array(),
            gridData: Array(),
            viewAllType: type,
            baseFormularyId: baseFormularyId,
            reformularyId: reformularyId,
            dataCount: 0,
            isRequestFinished: true
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          columns: Array(),
          data: Array(),
          gridData: Array(),
          viewAllType: type,
          baseFormularyId: baseFormularyId,
          reformularyId: reformularyId,
          dataCount: 0,
          isRequestFinished: true
        });
      }
    } else {
      this.setState({
        columns: Array(),
        data: Array(),
        gridData: Array(),
        viewAllType: type,
        baseFormularyId: baseFormularyId,
        reformularyId: reformularyId,
        dataCount: 0,
        isRequestFinished: true
      });
    }
  };

  componentDidMount() {
    if (
      this.props.baseformulary &&
      this.props.referenceformulary &&
      this.props.baseformulary["id_formulary"] &&
      this.props.referenceformulary["id_formulary"]
    ) {
      this.setState({
        isRequestFinished: false,
      });
      this.populateComparisionData();
    }
  }

  onRejectClicked = async (apiBody) => {
    let apiDetails = {};
    apiDetails["apiPart"] = compareConstants.COMMERCIAL_DRUG_REJECTION;
    apiDetails["pathParams"] =
      this.props.baseformulary["id_formulary"] +
      "/" +
      this.props.referenceformulary["id_formulary"];
    apiDetails["messageBody"] = apiBody;

    let response = await postDrugRejection(apiDetails);
    if (response) {
      if (response.code && response.code === "200") {
        showMessage("Drugs Rejection Successful", "success");
        this.setState({
          isRequestFinished: false,
        });
        this.populateComparisionData();
      } else {
        if (response.message) {
          showMessage(response.message, "error");
        } else {
          showMessage("Drugs Rejection Failure", "error");
        }
      }
    }
  };

  render() {
    let gridColumns = [...this.state.columns];
    if (this.state.columns.length > 0 && this.state.hiddenColumns.length > 0)
      gridColumns = this.state.columns.filter(
        (column) => !this.state.hiddenColumns.includes(column["key"])
      );
    const {
      showCheckbox,
      toggleAllAccordion,
      showViewAll,
      showViewAllNonMatch,
      scroll,
      data,
      columns,
      formularyTypesGridData,
    } = this.state;
    if (!this.state.isRequestFinished) {
      return <FrxLoader />;
    }
    return (
      <>
        <div className="bordered-grid">
          <div className="__root_compare-grid-container">
            <div className="__root_compare-grid-container-parent-el">
              {/* Top Header Grid*/}
              <div className="border-bottom accordion-section-wrapper-first-col">
                <div className="header-first-child-container">
                  <div
                    className="header-first-child-container-child"
                    onClick={() =>
                      this.setState({
                        showCheckbox: !this.state.showCheckbox,
                      })
                    }
                  >
                    {showCheckbox ? (
                      <HideIcon
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                      />
                    ) : (
                        <ShowIcon
                          style={{
                            margin: "2px 3px 0 0",
                          }}
                        />
                      )}
                    <p>{showCheckbox ? "Hide" : "Show"} Checkboxes</p>
                  </div>
                  <div
                    className="header-first-child-container-child"
                    onClick={(event) => {
                      // event.stopPropagation();
                      this.setState({
                        toggleAllAccordion: !toggleAllAccordion,
                      });
                    }}
                  >
                    <p>{!toggleAllAccordion ? "Expand All" : "Collapse All"}</p>
                  </div>
                </div>
              </div>
              <div className="border-bottom font-style bg-grey">
                <span>BASE FORMULARY</span>
              </div>
              <div className="border-bottom font-style bg-green">
                <span>reference FORMULARY</span>
              </div>
              <div className="border-bottom font-style">
                <span>BASE ONLY</span>
              </div>
              <div className="border-bottom font-style">
                <span>reference only</span>
              </div>
              <div className="border-bottom font-style no-border">
                <span>non-match base & reference</span>
              </div>
            </div>
            {/* First Accordion Grid */}
            {/* <div className="tier-header"> */}
            {formularyTypesGridData.map((accordionHeader) => (
              <div key={accordionHeader.id}>
                <PureAccordion
                  tableType={"COMPARE"}
                  title={accordionHeader.title}
                  titleBG={accordionHeader.titleBG}
                  showCheckbox={showCheckbox}
                  baseformulary={this.props.baseformulary}
                  referenceformulary={this.props.referenceformulary}
                  gridColumns={accordionHeader.gridColumns}
                  fileType={accordionHeader.file_type}
                  formularyLobId={this.props.formulary_lob_id}
                  sectionSelected={this.props.sectionSelected}
                  headerData={accordionHeader.headDrugsCount}
                  toggleAllAccordion={toggleAllAccordion}
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"COMPARE"}
                        clientId={this.props.clientId}
                        dataArr={accordionHeader.formularies}
                        formularyType={accordionHeader.title}
                        baseformulary={this.props.baseformulary}
                        referenceformulary={this.props.referenceformulary}
                        formularyLobId={this.props.formulary_lob_id}
                        onRejectClicked={this.onRejectClicked}
                      />
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="__root_compare-grid-footer-container">
            <div className="border-none"></div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.baseformulary["id_formulary"],
                    null,
                    TYPE_SINGLE,
                    false,
                    false
                  );
                }}
              />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.referenceformulary["id_formulary"],
                    null,
                    TYPE_SINGLE,
                    false,
                    false
                  );
                }}
              />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.baseformulary["id_formulary"],
                    this.props.referenceformulary["id_formulary"],
                    TYPE_IN_BASE_NOT_REF,
                    false,
                    true
                  );
                }}
              />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.baseformulary["id_formulary"],
                    this.props.referenceformulary["id_formulary"],
                    TYPE_IN_REF_NOT_BASE,
                    false,
                    true
                  );
                }}
              />
            </div>
          </div>
        </div>
        {showViewAll ? (
          <DialogPopup
            showCloseIcon={this.state.isRowSelectionEnabled}
            positiveActionText="Reject"
            negativeActionText=""
            title="view all"
            handleClose={() => {
              this.toggleShowViewAll(null, null, TYPE_SINGLE, true);
            }}
            handleAction={(type) => {
              this.onDialogAction(type);
            }}
            showActions={this.state.isRowSelectionEnabled}
            height="80%"
            width="80%"
            open={showViewAll}
            className="dialog-popup clone-dialog-popup"
          >
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => { }}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName=""
              isFetchingData={false}
              columns={gridColumns}
              scroll={scroll}
              enableResizingOfColumns={false}
              data={data}
              // pinning columns
              isPinningEnabled={true}
              // setting gear 1st column
              enableSettings={true}
              // checkbox 2nd column
              customSettingIcon={
                this.state.isRowSelectionEnabled ? null : "NONE"
              }
              isRowSelectionEnabled={this.state.isRowSelectionEnabled}
              // settingsWidth
              settingsWidth={15}
              isRowSelectorCheckbox
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
              pageSize={this.listPayload.limit}
              selectedCurrentPage={
                this.listPayload.index / this.listPayload.limit + 1
              }
              totalRowsCount={this.state.dataCount}
              rowSelectionChange={this.rowSelectionChange}
              isFiltered={this.state.isFiltered}
              filteredInfo={this.state.filteredInfo}
              isDataLoaded={this.state.isRowSelectionEnabled}
            />
          </DialogPopup>
        ) : null}
      </>
    );
  }
}

const temporaryObj1 = {
  baseFormulary: 11,
  referenceFormulary: 25,
  baseOnly: null,
  referenceOnly: null,
  nonMatch: null,
};

const temporaryObj2 = {
  baseFormulary: 11,
  referenceFormulary: null,
  baseOnly: 10,
  referenceOnly: null,
  nonMatch: 50,
};

const temporaryObj3 = {
  baseFormulary: 11,
  referenceFormulary: null,
  baseOnly: 22,
  referenceOnly: 45,
  nonMatch: 20,
};

const temporaryObj4 = {
  baseFormulary: null,
  referenceFormulary: null,
  baseOnly: null,
  referenceOnly: null,
  nonMatch: null,
};

export const formularyTypesGridData = [
  {
    id: 1,
    title: "TIER",
    titleBG: "rgba(31, 187, 196, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "Tier 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "Tier 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "Tier 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "Tier 4",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 2,
    title: "CATEGORY/VIEW",
    titleBG: "rgba(10, 123, 225, 0.4)",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "TX category",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "TX Class",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
    ],
  },
  {
    id: 3,
    title: "PRIOR AUTHORIZATION (PA)",
    titleBG: "#FFF5F0",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "pa type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "pa type 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "pa type 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "pa group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 4,
    title: "STEP THERAPY (ST)",
    titleBG: "rgba(244, 175, 100, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "st type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "st type 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "st group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 1",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 2",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 5,
    title: "QUANTITY LIMITS (QT)",
    titleBG: "rgba(213, 255, 215, 0.5)",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "ql type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "ql type 2",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 6,
    title: "ADDITIONAL DEMONSTRATION DURGS (ADD)",
    titleBG: "rgba(248, 144, 144, 0.4)",
    headDrugsCount: temporaryObj2,
    formularies: [
      {
        name: "mmp ql",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "mmp capped benefits",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "mmp pa",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp pa group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp st",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp st group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 7,
    title: "DRUG DETAILS",
    titleBG: "rgba(224, 237, 81, 0.4)",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 8,
    title: "OVER-THE-COUNTER",
    titleBG: "rgba(104, 73, 153, 0.2)",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "otc general um program (not st)",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "otc formal st",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "otc group descriptions",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 9,
    title: "EXCLUDED DRUGS",
    titleBG: "rgba(128, 196, 131, 0.4)",
    headDrugsCount: temporaryObj2,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 10,
    title: "VALUE-BASED INSURANCE DESIGN (VBID)",
    titleBG: "rgba(112, 118, 131, 0.3)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 11,
    title: "LIS COST-SHARING REDUCTION",
    titleBG: "rgba(146, 178, 235, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 12,
    title: "USER DEFINED",
    titleBG: "#ECF5FA",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(CompareTable);
