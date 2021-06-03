import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { filter } from "lodash";
import { Table } from "antd";
import { ToastContainer } from "react-toastify";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import CustomizedSwitches from "./CustomizedSwitches";
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import NotesPopup from "../../../../../member/MemberNotesPopup";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import { getDrugDetailsColumnSO } from "../DrugGridColumn";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import { getDrugDetailsSOSummary, getDrugDetailsSOList, getSOCriteriaList, postRemoveSODrug, postReplaceSODrug } from "../../../../../../redux/slices/formulary/drugDetails/so/soActionCreation";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import * as soConstants from "../../../../../../api/http-drug-details";
import getLobCode from "../../../../Utils/LobUtils";
import AdvanceSearchContainer from "../../../../NewAdvanceSearch/AdvanceSearchContainer";
import showMessage from "../../../../Utils/Toast";
import { setAdvancedSearch } from "../../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsSOSummary: (a) => dispatch(getDrugDetailsSOSummary(a)),
    getDrugDetailsSOList: (a) => dispatch(getDrugDetailsSOList(a)),
    getSOCriteriaList: (a) => dispatch(getSOCriteriaList(a)),
    postRemoveSODrug: (a) => dispatch(postRemoveSODrug(a)),
    postReplaceSODrug: (a) => dispatch(postReplaceSODrug(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

interface SOState {
  isSearchOpen: boolean,
  panelGridTitle1: any[],
  panelTitleAlignment1: any[],
  panelGridValue1: any[],
  isNotesOpen: false,
  activeTabIndex: number,
  columns: any,
  data: any[],
  tabs: any[],
  showGrid: boolean,
  udfs: any[],
  selectedDrugs: any[],
  drugData: any[],
  listCount: number,
  hiddenColumns: any[],
  selectedRowKeys: any[],
  fixedSelectedRows: any[],
  sort_by: any[],
  isGridSingleSorted: boolean;
  gridSingleSortInfo: any;
  isGridMultiSorted: boolean;
  gridMultiSortedInfo: any[];
  isSelectAll: boolean;
  otherData: any[],
  selectedCriteria: any[],
  otherColumns: any[],
}

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
}

const columnFilterMapping = {
  is_la: 'is_la',
  tier_value: 'tier_value',
  file_type: 'file_type',
  data_source: 'data_source',
  drug_descriptor_identifier: 'drug_descriptor_identifier',
  rxcui: 'rxcui',
  tty: 'tty',
  generic_product_identifier: 'generic_product_identifier',
  drug_label_name: 'drug_label_name',
  trademark_code: 'trademark_code',
  database_category: 'database_category',
  database_class: 'database_class',
  created_by: 'created_by',
  created_date: 'created_date',
  modified_by: 'modified_by',
  modified_date: 'modified_date',
  pa_group_description: 'pa_group_description',
  pa_type: 'pa_type',
  st_group_description: 'st_group_description',
  st_type: 'st_type',
  st_value: 'st_value',
  ql_type: 'ql_type',
  ql_quantity: 'ql_quantity',
  ql_days: 'ql_days',
  is_mo: 'is_mo',
  is_nm: 'is_nm',
  is_ssm: 'is_ssm',
  is_ibf: 'is_ibf',
  me_shcui: 'me_shcui',
  is_pgc: 'is_pgc',
  is_fff: 'is_fff',
  is_hi: 'is_hi',
  is_vbid: 'is_vbid',
  is_cb: 'is_cb',
  cb_quanity: 'cb_quanity',
  cb_days: 'cb_days',
  is_lis: 'is_lis',
  lis_cost_sharing_amount: 'lis_cost_sharing_amount',
  is_pbst: 'is_pbst',
  is_abr_formulary: 'is_abr_formulary',
  is_user_defined_1: 'is_user_defined_1',
  is_user_defined_2: 'is_user_defined_2',
  is_user_defined_3: 'is_user_defined_3',
  is_user_defined_4: 'is_user_defined_4',
  is_user_defined_5: 'is_user_defined_5',
};

class SO extends React.Component<any, any> {
  state:SOState = {
    isSearchOpen: false,
    panelGridTitle1: [
      "Medicare User Defined Field",
      "Number of Drugs",
      "added drugs",
      "removed drugs",
    ],
    panelTitleAlignment1: ["left", "center", "center", "center"],
    panelGridValue1: [],
    isNotesOpen: false,
    activeTabIndex: 0,
    columns: null,
    data: [],
    selectedCriteria: [],
    tabs: [
      { id: 1, text: "Replace", disabled: false },
      { id: 2, text: "Append", disabled: true },
      { id: 3, text: "Remove", disabled: false },
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    showGrid: false,
    udfs: [],
    listCount: 0,
    hiddenColumns: Array(),
    selectedRowKeys: [],
    fixedSelectedRows: [],
    sort_by: Array(),
    isGridSingleSorted: false,
    gridSingleSortInfo: null,
    isGridMultiSorted: false,
    gridMultiSortedInfo: [],
    isSelectAll: false,
    otherData: [],
    otherColumns: [
      {
        title: "User Defined Field",
        dataIndex: "udf",
        key: "udf",
      },
    ],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  }

  rpSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    id_supplemental_benefit: "",
    breadcrumb_code_value: "",//SBOTH1
    selected_criteria_ids: [],
    filter: [],
    search_key: ""
  }

  rmSavePayload: any = {    
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],//"SBOTH1"
    filter: [],
    search_key: ""
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    
    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    if(activeTabIndex === 0 || activeTabIndex === 1) {
      this.setState({ otherData: [], selectedCriteria: [] }, () => this.getSOSummary());
      
    } else if(activeTabIndex === 2) {
      this.setState({ otherData: [], selectedCriteria: [] }, () => this.getSOCriteriaList());
    }

    if(this.props.configureSwitch) {
      this.getSODrugList();
    }

    this.clearSearch();

    this.setState({ tabs, activeTabIndex, showGrid: false,}, () => console.log("THe Selected Criteria = ", this.state.selectedCriteria));

    // const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
    //   if (index === selectedTabIndex) {
    //     activeTabIndex = index;
    //   }
    //   return tab;
    // });

    // if(activeTabIndex === 2) {
    //   this.getSOCriteriaList();
    // }

    // this.setState({ tabs, activeTabIndex, showGrid: false, udfs: [] }, () => this.getSOSummary());
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
    if (this.state.selectedDrugs && this.state.selectedDrugs.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = soConstants.APPLY_SO_DRUG;
      apiDetails["keyVals"] = [
        { key: soConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};

      if (this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
        this.rpSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rpSavePayload.is_select_all = this.state.isSelectAll
        apiDetails["messageBody"] = this.rpSavePayload;
        let triggerType = (this.state.activeTabIndex === 0) ? soConstants.TYPE_REPLACE : soConstants.TYPE_APPEND
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + triggerType;
        console.log("The API Details - ", apiDetails);

        // Replace Drug method call
        this.props.postReplaceSODrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getSOSummary();
            this.getSODrugList();
          } else {
            showMessage("Failure", "error");
          }
        });

      } else if(this.state.activeTabIndex === 2) {
        this.rmSavePayload.selected_drug_ids = this.state.selectedDrugs
        this.rmSavePayload.is_select_all = this.state.isSelectAll
        apiDetails["messageBody"] = this.rmSavePayload;
        apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) + "/" + soConstants.TYPE_REMOVE;
        console.log("The API Details - ", apiDetails);

        // Remove Drug method call
        this.props.postRemoveSODrug(apiDetails).then((json) => {
          if (json.payload && json.payload.code && json.payload.code === "200") {
            showMessage("Success", "success");
            this.getSOSummary();
            this.getSOCriteriaList();
            this.getSODrugList();
          } else {
            showMessage("Failure", "error");
          }
        });

      }
    }
  };

  onPageSize = (pageSize) => {
    this.listPayload.limit = pageSize
    this.getSODrugList({ limit: this.listPayload.limit });
  }

  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.getSODrugList({ index: this.listPayload.index, limit: this.listPayload.limit, listPayload: this.listPayload });
  }

  onClearFilterHandler = () => {
    this.listPayload.index = 0;
    this.listPayload.limit = 10;
    this.listPayload.filter = [];
    this.getSODrugList({ index: defaultListPayload.index, limit: defaultListPayload.limit });
  }

  onSelectedTableRowChanged = (selectedRowKeys) => {
    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys]
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let selDrugs = selectedRowKeys.map(ele => {
        return this.state.drugData[ele - 1]['md5_id'] ? this.state.drugData[ele - 1]['md5_id'] : ""
      });

      this.setState({ selectedDrugs: selDrugs })
    } else {
      this.setState({ selectedDrugs: [] })
    }
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({selectedCriteria: []}, () => {

      // this.state.selectedCriteria = [];
      if (selectedRowKeys && selectedRowKeys.length > 0) {
        console.log("The Selectetd Rows = ", selectedRowKeys);
        console.log("The other data = ", this.state.otherData);
        console.log("The Selected Row Keys Code value = ", selectedRowKeys[0], "   The Other data find = ", this.state.otherData.find(e => e.key === selectedRowKeys[0]))
  
        if(this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
          let codeValue = "", idEdit = "";
          for(let i=0; i<this.state.otherData.length; i++) {
            if(this.state.otherData[i].key === selectedRowKeys[0]) {
              console.log("The State code value = ", this.state.otherData[i].code_value)
              codeValue = this.state.otherData[i].code_value;
              idEdit = this.state.otherData[i].key;
            }
          }
  
          this.rpSavePayload.breadcrumb_code_value = codeValue;
          this.rpSavePayload.id_supplemental_benefit = idEdit;
          this.rmSavePayload.selected_criteria_ids = [];
          console.log("The Codevalue = ", codeValue, "---THe REPLACE Save Payload = ", this.rpSavePayload);
  
        } else if(this.state.activeTabIndex === 2) {
          let criteriaIds: any[] = [];
          for(let i=0; i<this.state.otherData.length; i++) {
            if(this.state.otherData[i].key === selectedRowKeys[i]) {
              console.log("The State code value = ", this.state.otherData[i].code_value)
              criteriaIds.push(this.state.otherData[i].code_value);
            }
          }
  
          this.rmSavePayload.selected_criteria_ids = criteriaIds;
          this.rpSavePayload.breadcrumb_code_value = "";
          this.rpSavePayload.id_supplemental_benefit = "";
          console.log("The criteriaIds = ", criteriaIds, "---THe REMOVE Save Payload = ", this.rmSavePayload);
        }
        
        this.setState({selectedCriteria: selectedRowKeys.map(otId => otId)});
        selectedRowKeys = [];
      }
    });
  }

  getSOSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = soConstants.GET_DRUG_SUMMARY_SO;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: soConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getDrugDetailsSOSummary(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["supplemental_benefit_name"],
          ele["total_drug_count"],
          ele["added_drug_count"],
          ele["removed_drug_count"],
        ];
        return curRow;
      });


      console.log("THe Rows = ", rows);
      let drpDwnList = tmpData.map(e => e.supplemental_benefit_name);
      console.log("THe DropDown List = ", drpDwnList);

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          "key": ele["id_supplemental_benefit"],
          "udf": ele["supplemental_benefit_name"],
          "code_value": ele["code_value"]
        };
        return curRow;
      });

      if(this.state.activeTabIndex === 2) {
        this.setState({
          panelGridValue1: rows,
          udfs: drpDwnList,
        });
      } else {
        this.setState({
          panelGridValue1: rows,
          udfs: drpDwnList,
          otherData: settingsRows,
        });
      }
    });
  }

  getSOCriteriaList = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = soConstants.GET_SO_CRITERIA_LIST
    apiDetails["pathParams"] = this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: soConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];

    this.props.getSOCriteriaList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      console.log("The Criteria List = ", tmpData);

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          "key": ele["id_supplemental_benefit"],
          "udf": ele["supplemental_benefit_name"],
          "code_value": ele["code_value"]
        };
        return curRow;
      });

      this.setState({
        otherData: settingsRows,
        // showGrid: false,
      });
    });
  }

  arraysEqual = (a, b) => {
    if(a.length !== b.length) return false;
    
    return a.sort().toString() == b.sort().toString();
  }

  getSODrugList = ({index = 0, limit = 10, listPayload = {}, searchBody = {}} = {}) => {
    let apiDetails = {};
    apiDetails["apiPart"] = soConstants.GET_SO_FORMULARY_DRUGS;
    apiDetails["pathParams"] =
      this.props?.formulary_id + "/" + getLobCode(this.props.formulary_lob_id);
    apiDetails["keyVals"] = [
      { key: soConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: soConstants.KEY_INDEX, value: index },
      { key: soConstants.KEY_LIMIT, value: limit },
    ];
    apiDetails['messageBody'] = listPayload;
    
    if (searchBody) {
      console.log("THe Search Body = ", searchBody, " and List Payload = ", listPayload);
      let merged = {...listPayload, ...searchBody};
      console.log("Merged Body = ", merged);
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        merged
      );
    }

    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map(keyPair => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      let tempKeys: any[] = [];
      keys.forEach(e => {
        tempKeys.push(columnFilterMapping[e]);
      })

      apiDetails["messageBody"]["sort_by"] = tempKeys;
      apiDetails["messageBody"]["sort_order"] = values;
    }

    if(this.state.activeTabIndex === 2) {
      apiDetails['messageBody']['selected_criteria_ids'] = this.rmSavePayload.selected_criteria_ids;
    }

    let listCount = 0;
    const thisRef = this;
    this.props.getDrugDetailsSOList(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.result ? json.payload.result : [];
      listCount = json.payload?.count;
      var data: any[] = [];
      let count = 1;
      var gridData = tmpData.map((el) => {
        var element = Object.assign({}, el);
        data.push(element);
        let gridItem = {};
        gridItem["id"] = count;
        gridItem["key"] = count;

        // for preseelct items with selected tier value
        if(this.state.activeTabIndex !== 2) {
          if(element.user_defined) {
            let gridSel = this.state.selectedCriteria;
            let selectionsValues: any[] = [];
            let userDefinedVals = element.user_defined ? "" + element.user_defined : "";
            let userDefinedList = userDefinedVals.split(',').map(e => e.trim());
            for(let i=0; i<gridSel.length; i++) {
              if(this.state.otherData.length > 0) {
                let tempValue = gridSel[i].key;
                
                for(let j=0; j<this.state.otherData.length; j++) {
                  if(tempValue === this.state.otherData[j].key) {
                    selectionsValues.push(this.state.otherData[j].udf);
                  }
                }
              }
            }

            let arrEqRes = thisRef.arraysEqual(selectionsValues, userDefinedList);
            if(arrEqRes) {
              gridItem["isChecked"] = true;
              gridItem["isDisabled"] = true;
              gridItem["rowStyle"] = "table-row--blue-font";
            }
          }
        }
        
        if (thisRef.props.configureSwitch) {
          gridItem["isDisabled"] = true;
          gridItem["rowStyle"] = "table-row--disabled-font";
        }
        
        gridItem["user_defined"] = element.user_defined ? "" + element.user_defined : "";
        gridItem["is_la"] = element.is_la ? "" + element.is_la : "";
        gridItem["tier_value"] = element.tier_value ? "" + element.tier_value : "";
        gridItem["file_type"] = element.file_type ? "" + element.file_type : "";
        gridItem["data_source"] = element.data_source ? "" + element.data_source : "";
        gridItem["ndc"] = "";
        gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
        gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
        gridItem["tty"] = element.tty ? "" + element.tty : "";
        gridItem["generic_product_identifier"] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
        gridItem["drug_label_name"] = element.drug_label_name ? "" + element.drug_label_name : "";
        gridItem["trademark_code"] = element.trademark_code ? "" + element.trademark_code : "";
        gridItem["database_category"] = element.database_category ? "" + element.database_category : "";
        gridItem["database_class"] = element.database_class ? "" + element.database_class : "";
        gridItem["created_by"] = element.created_by ? "" + element.created_by : "";
        gridItem["created_date"] = element.created_date ? "" + element.created_date : "";
        gridItem["modified_by"] = element.modified_by ? "" + element.modified_by : "";
        gridItem["modified_date"] = element.modified_date ? "" + element.modified_date : "";
        gridItem["pa_group_description"] = element.pa_group_description ? "" + element.pa_group_description : "";
        gridItem["pa_type"] = element.pa_type ? "" + element.pa_type : "";
        gridItem["st_group_description"] = element.st_group_description ? "" + element.st_group_description : "";
        gridItem["st_type"] = element.st_type ? "" + element.st_type : "";
        gridItem["st_value"] = element.st_value ? "" + element.st_value : "";
        gridItem["ql_type"] = element.ql_type ? "" + element.ql_type : "";
        gridItem["ql_quantity"] = element.ql_quantity ? "" + element.ql_quantity : "";
        gridItem["ql_days"] = element.ql_days ? "" + element.ql_days : "";
        gridItem["is_mo"] = element.is_mo ? "" + element.is_mo : "";
        gridItem["is_nm"] = element.is_nm ? "" + element.is_nm : "";
        gridItem["is_ssm"] = element.is_ssm ? "" + element.is_ssm : "";
        gridItem["is_ibf"] = element.is_ibf ? "" + element.is_ibf : "";
        gridItem["me_shcui"] = element.me_shcui ? "" + element.me_shcui : "";
        gridItem["is_pgc"] = element.is_pgc ? "" + element.is_pgc : "";
        gridItem["is_fff"] = element.is_fff ? "" + element.is_fff : "";
        gridItem["is_hi"] = element.is_hi ? "" + element.is_hi : "";
        gridItem["is_vbid"] = element.is_vbid ? "" + element.is_vbid : "";
        gridItem["is_cb"] = element.is_cb ? "" + element.is_cb : "";
        gridItem["cb_quanity"] = element.cb_quanity ? "" + element.cb_quanity : "";
        gridItem["cb_days"] = element.cb_days ? "" + element.cb_days : "";
        gridItem["is_lis"] = element.is_lis ? "" + element.is_lis : "";
        gridItem["lis_red"] = "";
        gridItem["lis_cost_sharing_amount"] = element.lis_cost_sharing_amount ? "" + element.lis_cost_sharing_amount : "";
        gridItem["is_pbst"] = element.is_pbst ? "" + element.is_pbst : "";
        gridItem["is_abr_formulary"] = element.is_abr_formulary ? "" + element.is_abr_formulary : "";
        gridItem["is_user_defined_1"] = element.is_user_defined_1 ? "" + element.is_user_defined_1 : "";
        gridItem["is_user_defined_2"] = element.is_user_defined_2 ? "" + element.is_user_defined_2 : "";
        gridItem["is_user_defined_3"] = element.is_user_defined_3 ? "" + element.is_user_defined_3 : "";
        gridItem["is_user_defined_4"] = element.is_user_defined_4 ? "" + element.is_user_defined_4 : "";
        gridItem["is_user_defined_5"] = element.is_user_defined_5 ? "" + element.is_user_defined_5 : "";
        gridItem["md5_id"] = element.md5_id ? "" + element.md5_id : "";

        count++;
        return gridItem;
      });
      this.setState({
        drugData: data,
        data: gridData,
        listCount: listCount,
        showGrid: true,
        fixedSelectedRows: gridData
          .filter(item => item.isChecked)
          .map(item => item.key),
        selectedRowKeys: gridData
          .filter(item => item.isChecked)
          .map(item => item.key)
      });
    });
  }

  componentDidMount() {
    this.getSOSummary();
  }

  handleNoteClick = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  handleCloseNote = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  settingFormApplyHandler = () => {
    this.getSODrugList();
  };

  onUDFSChangeHandler = (e: any) => {
    let selDrpdwn: any = this.state.otherData.filter(a => a.udf === e);
  
    this.rpSavePayload.breadcrumb_code_value = selDrpdwn[0].code_value;
    this.rpSavePayload.id_supplemental_benefit = selDrpdwn[0].key;
    this.rmSavePayload.selected_criteria_ids = [];
    console.log("The Codevalue = ", this.rpSavePayload.breadcrumb_code_value, "---THe REPLACE Save Payload = ", this.rpSavePayload);
    this.setState({selectedCriteria: selDrpdwn, showGrid: false });
  };

  clearSearch = () => {
    let payload = { advancedSearchBody: {}, populateGrid: false, closeDialog: false, listItemStatus: {} };
    this.props.setAdvancedSearch(payload);
  }

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
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
  };

  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.data.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            d["rowStyle"] = this.state.activeTabIndex === 2 ? "table-row--red-font" : "table-row--green-font";
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
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ data: data });
      } else {
        const data = this.state.data.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = false;
            if (d["rowStyle"])
              delete d["rowStyle"];
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

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          data: data
        });
      }
    }
  };

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.data.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          d["rowStyle"] = this.state.activeTabIndex === 2 ? "table-row--red-font" : "table-row--green-font";
        } else {
          if (d["rowStyle"])
            delete d["rowStyle"]
        }
      }
      
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      k => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ data: data, isSelectAll: isSelected });
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
    if (this.props.advancedSearchBody) {
      this.getSODrugList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getSODrugList();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      this.getSODrugList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getSODrugList();
    }
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));
		
		this.setState(  {
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
      this.getSODrugList({ searchBody: this.props.advancedSearchBody });
    } else {
      this.getSODrugList();
    }
  };
  
  onApplyFilterHandler = (filters) => {
    this.listPayload.filter = Array();
    if (filters && filter.length > 0) {
      const fetchedKeys = Object.keys(filters);
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps] && columnFilterMapping[fetchedProps]) {
          const fetchedOperator = filters[fetchedProps][0].condition === 'is like' ? 'is_like' :
            filters[fetchedProps][0].condition === 'is not' ? 'is_not' :
              filters[fetchedProps][0].condition === 'is not like' ? 'is_not_like' :
                filters[fetchedProps][0].condition === 'does not exist' ? 'does_not_exist' :
                  filters[fetchedProps][0].condition;
          
          let fetchedPropsValue;
          if(filters[fetchedProps][0].value !== '') {
            const fetchedPropsValueNum = Number(filters[fetchedProps][0].value.toString());
            fetchedPropsValue = isNaN(fetchedPropsValueNum) ? filters[fetchedProps][0].value.toString() : fetchedPropsValueNum
          }
          const fetchedValues = filters[fetchedProps][0].value !== '' ? [fetchedPropsValue] : [];
          this.listPayload.filter.push({ prop: columnFilterMapping[fetchedProps], operator: fetchedOperator, values: fetchedValues });
        }
      });
      console.log('Filters:'+JSON.stringify(this.listPayload.filter));
      this.getSODrugList({ listPayload: this.listPayload });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("-----Component Will Receive Props------", nextProps);

    if (nextProps.configureSwitch){
      this.setState({
        tabs:[
          { id: 1, text: "Replace", disabled: true },
          { id: 2, text: "Append", disabled: false },
          { id: 3, text: "Remove", disabled: true },
        ],
        activeTabIndex: 0,
      });

      this.getSODrugList();
    } else {
      this.setState({
        tabs:[
          { id: 1, text: "Replace", disabled: false },
          { id: 2, text: "Append", disabled: true },
          { id: 3, text: "Remove", disabled: false },
        ]
      });
    }

    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      console.log("-----Inside Advance search Body if Condition-----advancedSearchBody ", nextProps.advancedSearchBody);
      console.log("-----Inside Advance search Body if Condition-----populateGrid ", nextProps.advancedSearchBody);
      this.getSODrugList({ listPayload: this.listPayload, searchBody: nextProps.advancedSearchBody});
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

      console.log("---_Set Advanced Search payload = ", payload);
      this.props.setAdvancedSearch(payload);
    }
  }

  render() {
    const searchProps = {
      lobCode: this.props.lobCode,
      pageType: 0,
    };
    let dataGrid = <FrxLoader />;
    let columns = getDrugDetailsColumnSO();
    if (this.state.hiddenColumns.length > 0) {
      columns = columns.filter(key => !this.state.hiddenColumns.includes(key));
    }
    if (this.state.data) {
      dataGrid = (
        <div className="tier-grid-container">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            settingsWidth={30}
            onSearch={() => { }}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={columns}
            scroll={{ x: 9000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={this.state.data}
            rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
            onSelectAllRows={this.onSelectAllRows}
            customSettingIcon={"FILL-DOT"}
            totalRowsCount={this.state.listCount}
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
          />
        </div>
      );
    }

    let dropDown: any;
    if (this.state.udfs.length > 0) {
      console.log("THe UDFS = ", this.state.udfs)
      dropDown = (
        <DropDown
          placeholder=""
          options={this.state.udfs}
          onChange={this.onUDFSChangeHandler}
        />
      );
    }

    let rowSelection = {
      selectedRowKeys: this.state.selectedCriteria,
      onChange: this.onSelectedRowKeysChange,
    }

    return (
      <>
        <div className="bordered mb-10">
          <PanelHeader
            title="User Defined Fields"
            tooltip="User Defined Fields"
          />
          <div className="inner-container bg-light-grey">
            <div className="mb-10">
              <PanelGrid
                panelGridTitle={this.state.panelGridTitle1}
                panelGridValue={this.state.panelGridValue1}
                panelTitleAlignment={this.state.panelTitleAlignment1}
              />
            </div>

            <div className="modify-wrapper bordered white-bg">
              <div className="header-with-notes">
                <PanelHeader title="USER DEFINED FIELD SETTINGS" />
                <svg
                  onClick={this.handleNoteClick}
                  className="note-icon"
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                    fill="#2055B5"
                  ></path>
                </svg>
                {this.state.isNotesOpen ? (
                  <NotesPopup
                    category="Grievances"
                    openPopup={this.state.isNotesOpen}
                    onClose={this.handleCloseNote}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="modify-panel">
                <div className="icon">
                  <span>P</span>
                </div>
                <div className="switch-box">
                  <CustomizedSwitches
                    leftTitle="Modify"
                    rightTitle="view all"
                  />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                    disabled={this.props.configureSwitch}
                  />
                </div>
              </div>

              <div className="settings-form">
              {this.state.activeTabIndex === 2 ? (
                <Grid item xs={5}>
                  <div className="tier-grid-remove-container other-removed-sec">
                    <Table
                      columns={this.state.otherColumns}
                      dataSource={this.state.otherData}
                      pagination={false}
                      rowSelection={rowSelection}
                    />
                  </div>
                </Grid>
                ) : (
                <Grid container spacing={8}>
                  <Grid item xs={4}>
                    <div className="group">
                      <label>
                        User Defined Field <span className="astrict">*</span>
                      </label>
                      {dropDown}
                    </div>
                  </Grid>
                </Grid>
              )}

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    label="Apply"
                    onClick={this.settingFormApplyHandler}
                    disabled={!(this.state.selectedCriteria.length > 0)}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
        {this.state.showGrid ? (
          <div className="bordered">
            <div className="header space-between pr-10">
              Drug Grid
              <div className="button-wrapper">
                <Button
                  className="Button normal"
                  label="Advance Search"
                  onClick={this.advanceSearchClickHandler}
                />
                <Button label="Save" onClick={this.saveClickHandler} disabled={!(this.state.selectedDrugs.length > 0)} />
              </div>
            </div>
            {dataGrid}
            {this.state.isSearchOpen ? (
              <AdvanceSearchContainer
                {...searchProps}
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler}
                isAdvanceSearch={true}
              />
            ) : null}
          </div>
        ) : null}
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SO);
