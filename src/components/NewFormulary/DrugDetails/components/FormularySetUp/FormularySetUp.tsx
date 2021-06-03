import React from "react";
import { connect } from "react-redux";
import "./FormularySetUp.scss";
import GeneralInformation from "./components/GeneralInformation";
import FormularyDesign from "./components/FormularyDesign";
import FormularyDesignCommercial from "./components/FormularyDesignCommercial";
import FormularyTiers from "./components/FormularyTiers";
import MedicareInformation from "./components/MedicareInformation";
import SupplementalModels from "./components/SupplementalModels";
import Box from "@material-ui/core/Box";
import Button from "../../../../shared/Frx-components/button/Button";
import FrxLoader from "../../../../shared/FrxLoader/FrxLoader";
import {
  fetchSelectedFormulary,
  verifyFormularyName,
  saveFormulary,
  initCreateUsingClone
} from "../../../../.././redux/slices/formulary/setup/setupSlice";
import { Formulary } from "../../../../../redux/slices/formulary/setup/formulary";
import {
  fetchGeneralOptions,
  fetchMedicareOptions,
  fetchDesignOptions,
  fetchSupplementalOptions,
  fetchTierOptions,
  fetchSubMthsOptions,
  fetchStatesOptions,
  fetchResemblingFlsOptions
} from "../../../../.././redux/slices/formulary/setup/setupOptionsSlice";
import { setLocation } from "../../../../.././redux/slices/formulary/application/applicationSlice";

import { ToastContainer } from "react-toastify";
import showMessage from "../../../Utils/Toast";
import { trim, throttle } from "lodash";
import { Save } from "@material-ui/icons";
import { postMessage } from "../../../../.././redux/slices/formulary/messaging/messagingSlice";

class FormularySetUp extends React.Component<any, any> {
  state = {
    isUpdate: false,
    generalInformation: {
      type: "",
      type_id: "" as any,
      name: "",
      abbreviation: "",
      effective_date: "",
      method: "",
      service_year: "",
      description: "",
      classification_system: "",
      is_closed_formulary: null,
      isState: false,
      selectedState: "",
      state_id: (null as unknown) as number,
      medicare_types_ref_other: false,
      selectedResemblanceFormulary: null,      
    },
    medicareInfo: {
      medicare_contract_types: []
    },
    medicare_contract_type_info: {
      medicare_contract_types: [],
      custom_medicare_contract_type: {
        id_medicare_contract_type: null,
        id_formulary_medicare_contract: "",
        medicare_contract_type: ""
      },
      removed_formulary_medicare_contracts: []
    },
    supplemental_benefit_info: {
      supplemental_benefits: [] as any
    },
    designOptions: [],
    tiers: [],
    edit_info: {
      edits: [],
      edits_no: [],
      custom_edits: [],
      removed_formulary_edits: []
    },
    setupOptions: {},
    errorObj: {
      formularyType: false,
      formularyName: false,
      effectiveDate: false,
      bildMethod: false,
      serviceYear: false,
      classificaton: false
    },
    saveInProgress: false
  };

  componentDidMount() {
    if (this.props.mode === "EXISTING") {
      this.manageFormularyType(
        this.props.formulary_type_id,
        this.props.formulary_id
      );
      this.props.fetchSelectedFormulary(this.props.formulary_id);
    } else {
      this.manageFormularyType(-1, -1);
      this.props.fetchSelectedFormulary(-1);
    }
  }

  manageFormularyType(type: number, id: number) {
    console.log(" Manage - TYPE : " + type + " ID : " + id);
    let defaultType = 4;
    if (type === -1) {
      this.props.fetchGeneralOptions({ type: defaultType, id: -1 });
      return;
    }

    this.props.fetchGeneralOptions({ type: type, id: id });
    this.props.fetchDesignOptions({ type: type, id: id });
    this.props.fetchTierOptions({ type: type, id: id });

    if (type === 1) {
      // MRC...
      this.props.fetchResemblingFlsOptions({ type: type, id: id });
      this.props.fetchMedicareOptions({ type: type, id: id });
      this.props.fetchSupplementalOptions({ type: type, id: id });
    } else if (type === 2) {
      // MMP...
      this.props.fetchResemblingFlsOptions({ type: type, id: id });
      this.props.fetchStatesOptions(type);
      this.props.fetchMedicareOptions({ type: type, id: id });
      this.props.fetchSupplementalOptions({ type: type, id: id });
    } else if (type === 3) {
      // TODO ... MEDICADE...
      this.props.fetchStatesOptions(0);
    } else if (type === 4) {
      // TODO ... MEDICADE...
      this.props.fetchStatesOptions(0);
    } else if (type === 5) {
      // EXC...
    } else if (type === 6) {
      // COMMERCIAL...
    }
    this.props.fetchSubMthsOptions(2021);
  }

  UNSAFE_componentWillReceiveProps = newProps => {
    // console.log("# - - - - - - - - - ");
    // console.log("# 1 *FL       : " + (newProps?.formulary ? "" : "X"));
    // console.log("# 2  ST       : " + (newProps?.setupOptions ? "" : "X"));
    // console.log(
    //   "# 3  ST.GI    : " + (newProps?.setupOptions?.generalOptions ? "" : "X")
    // );

    // console.log(
    //   "# 4  ST.GI.TY : " +
    //     (newProps?.setupOptions?.generalOptions?.formularyType ? "" : "X")
    // );
    // console.log(
    //   "# 5  ST.GI.CY : " +
    //     (newProps?.setupOptions?.generalOptions?.contractYear ? "" : "X")
    // );
    // console.log(
    //   "# 6  ST.GI.CS : " +
    //     (newProps?.setupOptions?.generalOptions?.classification_systems
    //       ? ""
    //       : "X")
    // );

    // console.log(
    //   "# 7  ST.DN    : " + (newProps?.setupOptions?.designOptions ? "" : "X")
    // );
    // console.log(
    //   "# 8  ST.TR    : " + (newProps?.setupOptions?.tierOptions ? "" : "X")
    // );

    if (
      newProps.formulary &&
      newProps.setupOptions.generalOptions &&
      newProps.setupOptions.designOptions &&
      newProps.setupOptions.tierOptions
    ) {
      const medeicareContract = { ...this.state.medicare_contract_type_info };
      medeicareContract.medicare_contract_types = newProps.formulary?.medicare_contract_types?.map(
        e => e.id_medicare_contract_type
      );

      const classificationSystem =
        newProps.formulary.formulary_info.id_classification_system;
      // console.log(classificationSystem);
      this.setState({
        isUpdate: true,
        generalInformation: {
          type: newProps.formulary.formulary_type_info.formulary_type,
          type_id: newProps.formulary.formulary_type_info.id_formulary_type,
          name: newProps.formulary.formulary_info.formulary_name,
          abbreviation: newProps.formulary.formulary_info.abbreviation,
          effective_date: newProps.formulary.formulary_info.effective_date,
          method: newProps.formulary.formulary_info.formulary_build_method,
          service_year: newProps.formulary.formulary_info.contract_year,
          description: newProps.formulary.formulary_info.formulary_description,
          classification_system: classificationSystem,
          is_closed_formulary:
            newProps.formulary.formulary_info.is_closed_formulary,
          medicare_types_ref_other: false,
          selectedResemblanceFormulary: newProps.formulary.formulary_info.resemble_formulary_id
        },
        medicare_contract_type_info: medeicareContract,
        supplemental_benefit_info: {
          supplemental_benefits: newProps.formulary.supplemental_benefits?.map(
            el => el.id_supplemental_benefit
          )
        },
        tiers: [...newProps.formulary.tiers],
        fetchedEditInfo: newProps.formulary.edit_info,
        edit_info: this.getEditInfo(
          newProps.formulary.edit_info,
          newProps.setupOptions?.designOptions
        ),
        designOptions: [...newProps.setupOptions?.designOptions],
        setupOptions: newProps.setupOptions
      });
    }
    if (newProps.mode === "NEW" && newProps.setupOptions.generalOptions) {
      const classificationSystem =
        newProps.setupOptions.generalOptions.classification_systems?.length ===
          1 &&
        newProps.setupOptions.generalOptions.classification_systems[0]
          .id_classification_system === 10
          ? 10
          : "";
      const defaultDesignId = newProps.setupOptions?.designOptions
        ?.filter(e => e.edit_name === "N/A")
        ?.map(e => e.id_edit);
      const newEditInfo: any = { ...this.state.edit_info };
      const newGeneralOption: any = { ...this.state.generalInformation };
      newGeneralOption.classification_system = classificationSystem;
      newEditInfo.edits =
        defaultDesignId !== undefined ? [...defaultDesignId] : [];
      this.setState({
        isUpdate: true,
        generalInformation: newGeneralOption,
        supplemental_benefit_info: {
          supplemental_benefits: []
        },
        edit_info: newEditInfo,
        tiers: []
      });
    }
  };
  getEditInfo = (editInfo: any[], options: any[]) => {
    let editTrue = editInfo
      .filter(obj => obj.id_checked === true)
      .map(e => e.id_edit);
    const editFalse = editInfo
      .filter(obj => obj.id_checked === false)
      .map(e => e.id_edit);
    // let customEdit: any = "";
    let customEdit: any[] = [];

    if (this.props.formulary_type_id === 6) {
      // console.log(options);
      customEdit = options.filter(e => e.is_custom === true);
      // console.log(customEdit);
      const customEditId = customEdit.map(e => e.id_edit);
      editTrue = editTrue.filter(e => customEditId.indexOf(e) === -1);
    }
    const newObj = {
      edits: editTrue,
      edits_no: editFalse,
      custom_edits: customEdit,
      removed_formulary_edits: []
    };
    return newObj;
  };
  formularyDesignCommercialCheckHandler = (getObj: any) => {
    // console.log("------------------- FD");
    // console.log(getObj);
    const receivedObj = { ...getObj };
    // console.log(receivedObj);
    const customId = this.props.setupOptions.designOptions
      .filter(e => e.is_custom)
      .map(e => e.id_edit);
    // console.log(customId);
    const received_customId = receivedObj.custom_edits.map(e => e.id_edit);
    const staticFId = this.props.setupOptions.designOptions
      .filter(e => !e.is_custom)
      .map(e => e.id_edit);
    let staticRemovedID = this.props.formulary?.edit_info
      ?.filter(e => customId.indexOf(e.id_edit) === -1)
      .filter(e => receivedObj.edits.indexOf(e.id_edit) === -1)
      .map(e => e.id_formulary_edit);
    let customRemovedId = this.props.formulary?.edit_info
      ?.filter(e => staticFId.indexOf(e.id_edit) === -1)
      .filter(e => received_customId.indexOf(e.id_edit) === -1)
      .map(e => e.id_formulary_edit);
    staticRemovedID = staticRemovedID === undefined ? [] : staticRemovedID;
    customRemovedId = customRemovedId === undefined ? [] : customRemovedId;
    const finalRemovedID = [...staticRemovedID, ...customRemovedId];
    receivedObj.removed_formulary_edits = [...finalRemovedID];
    this.setState({
      edit_info: receivedObj
    });
  };
  formularyRadioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any,
    type
  ) => {
    // console.log(event.target.value, id);
    // console.log(this.state.edit_info);
    let checked = event.target.value;
    const updatedEditInfo: any = { ...this.state.edit_info };
    if (type === "checkbox") {
      let index = updatedEditInfo.edits.indexOf(id);
      index === -1
        ? updatedEditInfo.edits.push(id)
        : updatedEditInfo.edits.splice(index, 1);
    } else {
      if (checked === "true") {
        if (updatedEditInfo.edits_no.indexOf(id) !== -1) {
          let index = updatedEditInfo.edits_no.indexOf(id);
          updatedEditInfo.edits_no.splice(index, 1);
        }
        updatedEditInfo.edits.push(id);
      } else {
        if (updatedEditInfo.edits.indexOf(id) !== -1) {
          let index = updatedEditInfo.edits.indexOf(id);
          updatedEditInfo.edits.splice(index, 1);
        }
        updatedEditInfo.edits_no.push(id);
      }
    }
    this.setState({
      edit_info: updatedEditInfo
    });
  };
  updateInputField = e => {
    const newObj = { ...this.state.generalInformation };
    newObj[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      generalInformation: newObj
    });
    if (e.currentTarget.name === "name" && this.props.mode === "NEW") {
      this.props.verifyFormularyName(e.currentTarget.value);
    }
  };

  onOtherMedicareHandler = e => {
    const custom = { ...this.state.medicare_contract_type_info };
    custom.custom_medicare_contract_type.medicare_contract_type =
      e.currentTarget.value;
    this.setState({
      medicare_contract_type_info: custom
    });
  };
  formularyTypeChanged = type => {
    const generalInfo = { ...this.state.generalInformation };
    const typeID = this.props.setupOptions.generalOptions.formularyType.find(
      e => e.formulary_type === type
    ).id_formulary_type;
    generalInfo.type = type;
    generalInfo.type_id = parseInt(typeID);
    this.setState(
      {
        generalInformation: generalInfo
      },
      () => this.manageFormularyType(typeID, -1)
    );
  };

  onDropdownChange = (value, section, stateProp) => {
    const selectedSection = { ...this.state[section] };
    selectedSection[stateProp] = value;
    if (stateProp === "service_year") {
      selectedSection.isState = true;
    }
    if (stateProp === "selectedState") {
      const stateId = this.props.setupOptions.generalOptions.states.find(
        e => e.state_name === value
      ).id;
      selectedSection.state_id = stateId;
    }
    this.setState({
      [section]: selectedSection
    });
  };
  onRadioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    _section
  ) => {
    const newObj = { ...this.state.generalInformation };
    const val =
      event.target.value === "true"
        ? true
        : event.target.value === "false"
        ? false
        : event.target.value;
    newObj[event.target.name] = val;
    this.setState({
      generalInformation: newObj
    });
  };
  onDatePickerChangeHandler = (e, section, stateProp) => {
    const date = `${e._d.getFullYear()}-${e._d.getMonth() +
      1}-${e._d.getDate()}`;
    const newObj = { ...this.state[section] };
    newObj[stateProp] = date;
    this.setState({
      [section]: newObj
    });
  };
  medicareCheck = (getObject: any) => {
    this.setState({
      medicare_contract_type_info: getObject
    });
  };
  onMedicareOtherCheck = (getObject: any) => {
    this.setState({
      generalInformation: getObject
    });
  };
  supplementalCheck = (getObject: any) => {
    this.setState({
      supplemental_benefit_info: getObject
    });
  };

  tierCheck = () => {
    // console.log(this.state);
    return true;
  };
  onCheckUncheckAllSupplementalHandler = val => {
    if (val === "uncheck") {
      this.setState({
        supplemental_benefit_info: {
          supplemental_benefits: []
        }
      });
    } else {
      const allSupplemental = this.props.setupOptions.supplementalOptions.map(
        e => e.id_supplemental_benefit
      );
      this.setState({
        supplemental_benefit_info: {
          supplemental_benefits: allSupplemental
        }
      });
    }
  };
  selectTierHandler = e => {
    const updatedTiers: any = [...this.state.tiers];
    const tiersLength = updatedTiers.length;
    if (tiersLength > e) {
      updatedTiers.length = e;
    } else {
      for (let i = 1; i <= e - tiersLength; i++) {
        const newObj = {
          id_formulary_tier: null,
          id_tier: tiersLength + i,
          id_tier_label: null,
          tier_name: `Tier ${tiersLength + i}`,
          is_custom: null,
          tier_label_name: ""
        };
        updatedTiers.push(newObj);
      }
    }
    this.setState({
      tiers: updatedTiers
    });
  };

  // changeTierValueHandler = (e, val) => {
  //   const updatedTiers: any = [...this.state.tiers];
  //   const ind = updatedTiers.findIndex((el) => el.tier_name === val);
  //   const getObj = { ...updatedTiers[ind] };
  //   const getId = this.props.setupOptions.tierOptions.find(
  //     (el) => el.tier_label === e
  //   ).id_tier_label;
  //   getObj.id_tier_label = getId;
  //   updatedTiers[ind] = getObj;
  //   this.setState({
  //     tiers: updatedTiers,
  //   });
  // };

  changeTierValueHandler = (e, val) => {
    // console.log(" ------------------- ");
    // console.log(" > : " + e + " , " + val);
    // Preferred , Tier 1
    // Add New , Tier 2
    const updatedTiers: any = [...this.state.tiers];
    // console.log(updatedTiers);
    const ind = updatedTiers.findIndex(el => el.tier_name === val);
    const getObj = { ...updatedTiers[ind] };
    // console.log(ind, getObj);
    const OBJ = this.props.setupOptions.tierOptions.find(
      el => el.tier_label === e
    );
    if (e === "Add New") {
      getObj.id_tier_label = null;
      getObj.is_custom = true;
      // getObj.tier_label_name="";
    } else {
      getObj.id_tier_label = OBJ.id_tier_label;
    }

    updatedTiers[ind] = getObj;
    this.setState({
      tiers: updatedTiers
    });
  };

  handleCustomTierChange = (e, tierID) => {
    // console.log(" handleCustomTierChange : " + e.currentTarget.value);
    const updatedTiers: any = [...this.state.tiers];
    // console.log(updatedTiers);
    const ind = updatedTiers.findIndex(el => el.tier_name === tierID);
    const getObj = { ...updatedTiers[ind] };
    // console.log(ind, getObj);
    getObj.tier_label_name = e.currentTarget.value;
    updatedTiers[ind] = getObj;
    this.setState({
      tiers: updatedTiers
    });
  };

  deleteCustomTier = tierID => {
    // console.log(" DELETE : " + tierID);
    const updatedTiers: any = [...this.state.tiers];
    // console.log(updatedTiers);
    const ind = updatedTiers.findIndex(el => el.tier_name === tierID);
    const getObj = { ...updatedTiers[ind] };
    // console.log(ind, getObj);
    //getObj.tier_label_name = e.currentTarget.value;
    getObj.id_tier_label = null;
    getObj.tier_label_name = null;
    getObj.is_custom = false;

    updatedTiers[ind] = getObj;
    this.setState({
      tiers: updatedTiers
    });
  };

  setDefaultClassificationHandler = id => {
    let newObj: any = { ...this.state.generalInformation };
    newObj.classification_system = parseInt(id);
    this.setState({
      generalInformation: newObj
    });
  };
  scrollToError = () => {
    const errorElement = document.querySelector(".error-true");
    errorElement?.scrollIntoView();
  };
  onSave = e => {
    console.log(
      "++++++++++++++++++++++++++++++++ SAVE - (" +
        e +
        ") Mode: " +
        this.props.mode +
        ", Method : " +
        this.state.generalInformation.method
    );
    let msg: string[] = [];
    const errorObj = {
      formularyType: false,
      formularyName: false,
      effectiveDate: false,
      bildMethod: false,
      serviceYear: false,
      classificaton: false
    };
    if (this.props.mode === "NEW") {
      if (this.state.generalInformation.method === "C") {
        msg.push(
          "Formulary Build Method is Clone. Selected Formulary Type, Enter Name, Effective Date and click Clone Formulary link to select clone source. "
        );
        errorObj.bildMethod = true;
        this.setState(
          {
            errorObj: errorObj
          },
          () => {
            this.scrollToError();
          }
        );
      }
      if (this.state.generalInformation.type_id === "") {
        msg.push("Formulary Type is required.");
        // errorObj.formularyType = true;
        // this.setState({
        //   errorObj: errorObj
        // },() => {
        //   this.scrollToError()
        // })
      }
      if (trim(this.state.generalInformation.name) === "") {
        msg.push("Formulary Name is required.");
        // errorObj.formularyName = true;
        // this.setState({
        //   errorObj: errorObj
        // },() => {
        //   this.scrollToError()
        // })
      }
      if (this.state.generalInformation.method === "") {
        msg.push("Formulary Build Method is required.");
      }
      if (this.state.generalInformation.effective_date === "") {
        msg.push("Formulary Effective Date is required.");
      }
      if (this.state.generalInformation.service_year === "") {
        msg.push("Formulary Service year is required.");
      }
      // if(this.tierCheck()){
      //   msg.push("Formulary Service year is required.");
      // }

      if (msg.length > 0) {
        msg.forEach(m => {
          // showMessage(m, "info");
        });
        this.props.postMessage({ message: msg[0], type: "warning" });
        return;
      }
    }
    const input = {
      MODE: this.props.mode,
      CONTINUE: e,
      formulary_id: -1,
      is_setup_complete: false,
      GENERAL_INFO: this.state.generalInformation,
      edit_info: this.state.edit_info,
      supplemental_benefit_info: this.state.supplemental_benefit_info,
      medicare_contract_type_info: this.state.medicare_contract_type_info,
      tiers: this.state.tiers
    };

    if (this.props.mode === "EXISTING") {
      input.formulary_id = this.props.formulary_id;
      input.is_setup_complete = this.props?.formulary?.formulary_info?.is_setup_complete;
    } else {
      input.formulary_id = -1;
      input.is_setup_complete = false;
    }
    console.log(" +++ saveInProgress :: " + this.state.saveInProgress);
    if (this.state.saveInProgress) {
      return;
    }
    this.setState({
      saveInProgress: true
    });
    this.props.saveFormulary(input).then(arg => {
      this.setState({
        saveInProgress: false
      });
      console.log(
        "++++++++++++++++++++++++++++++++ SAVE Callback ",
        arg?.payload
      );
      if (
        arg &&
        arg.payload &&
        arg?.payload?.type > 0 &&
        arg?.payload?.id > 0
      ) {
        console.log(
          "REFRESH.... TYPE : " +
            arg?.payload?.type +
            " ID : " +
            arg?.payload?.id +
            " CONTINUE : " +
            arg?.payload?.continue +
            " EARLIER MODE : " +
            arg?.payload?.earlier_mode
        );
        this.manageFormularyType(arg?.payload?.type, arg?.payload?.id);
        this.props.fetchSelectedFormulary(arg?.payload?.id);
        let msgStr = "";
        if (arg?.payload?.earlier_mode === "NEW") {
          // showMessage(`Formulary Created. ID:${arg?.payload?.id}`, "success");=
          msgStr = `Formulary Created ID: ${arg?.payload?.id}`;
        } else if (arg?.payload?.earlier_mode === "EXISTING") {
          // showMessage(`Formulary Updated. ID: ${arg?.payload?.id}`, "success");
          msgStr = `Formulary Updated ID: ${arg?.payload?.id}`;
        }
        this.props.postMessage({ message: msgStr, type: "success" });

        if (arg?.payload?.continue) {
          //this.props.saveAndContinue(1);
          this.props.setLocation(1);
        }
      }
    });
  };

  handleCloneSource = (row: any) => {
    // console.log("handleCloneSource ", row);
    if (row && row.id_base_formulary) {
      // console.log(" CLONE SRC : " + row.id_base_formulary);

      this.handleCreateUsingClone(row.id_base_formulary);
    }
  };

  handleSelectFormulary = (row: any) => {
    // console.log("selected formulary ", row);
    if (row) {
      this.setState({
        generalInformation: {
          ...this.state.generalInformation,
          selectedResemblanceFormulary: row.id_base_formulary,
        }
      });
    }
  };

  handleCreateUsingClone = (baseID: number) => {
    //  console.log(
    //   "create FL using clone......" + this.state.generalInformation.method
    // );
    if (this.props.mode === "NEW") {
      let msg: string[] = [];
      if (this.state.generalInformation.method !== "C") {
        // msg.push("Formulary Build Method is Clone. Selected Formulary Type, Enter Name, Effective Date and click Clone Formulary link to select clone source. ");
        msg.push("Formulary Build Method should be Clone.");
      }
      if (this.state.generalInformation.type_id === "") {
        msg.push("Formulary Type is required.");
      }
      if (trim(this.state.generalInformation.name) === "") {
        msg.push("Formulary Name is required.");
      }
      if (this.state.generalInformation.effective_date === "") {
        msg.push("Formulary Effective Date is required.");
      }
      if (msg.length > 0) {
        // msg.forEach((m) => {
        //   showMessage(m, "info");
        // });
        // console.log("MSG LIST ", msg);
        this.props.postMessage({ message: msg[0], type: "warning" });
        return;
      }
      const input = {
        GENERAL_INFO: this.state.generalInformation,
        SRC_BASE_ID: baseID
      };
      this.props.initCreateUsingClone(input).then(arg => {
        // console.log("CLONE Callback ", arg?.payload);
        if (
          arg &&
          arg.payload &&
          arg?.payload?.type > 0 &&
          arg?.payload?.id > 0
        ) {
          console.log(
            "REFRESH.... TYPE : " +
              arg?.payload?.type +
              " ID : " +
              arg?.payload?.id
          );
          this.manageFormularyType(arg?.payload?.type, arg?.payload?.id);
          this.props.fetchSelectedFormulary(arg?.payload?.id);
          // showMessage(`Formulary Created. ID:${arg?.payload?.id}`, "success");
          let msgStr = `Formulary Created ID: ${arg?.payload?.id}`;
          this.props.postMessage({ message: msgStr, type: "success" });
        }
      });
    }
  };

  overrideNave() {
    this.props.setLocation(1);
  }

  render() {
    return (
      <div>
        {this.state.isUpdate ? (
          <>
            <GeneralInformation
              generalInfo={this.state.generalInformation}
              setupOptions={this.state.setupOptions}
              updateInputField={this.updateInputField}
              onRadioChange={this.onRadioChangeHandler}
              onDropdownChange={this.onDropdownChange}
              formularyTypeChanged={this.formularyTypeChanged}
              datePickerChange={this.onDatePickerChangeHandler}
              cloneFormularyClick={this.handleCloneSource}
              selectFormularyClick={this.handleSelectFormulary}
              errorObj={this.state.errorObj}
              selectedResemblanceFormulary={
                this.state.generalInformation.selectedResemblanceFormulary
              }
            />
            {this.state.generalInformation.type !== "" ? (
              <>
                {this.state.generalInformation.type === "Medicare" ? (
                  <MedicareInformation
                    allMedicareOptions={this.state.medicare_contract_type_info}
                    medicareOptions={
                      this.state.medicare_contract_type_info
                        .medicare_contract_types
                    }
                    medicareCheck={this.medicareCheck}
                    generalInfo={this.state.generalInformation}
                    onMedicareOtherCheck={this.onMedicareOtherCheck}
                    otherMedicareInfo={this.onOtherMedicareHandler}
                  />
                ) : null}
                {this.state.generalInformation.type !== "Commercial" ? (
                  <FormularyDesign
                    edit_info={this.state.edit_info}
                    formularyRadioChange={this.formularyRadioChangeHandler}
                  />
                ) : null}
                {this.state.generalInformation.type === "Commercial" ? (
                  <FormularyDesignCommercial
                    edit_info={this.state.edit_info}
                    formularyDesignCommercialCheck={
                      this.formularyDesignCommercialCheckHandler
                    }
                    formularyRadioChange={this.formularyRadioChangeHandler}
                  />
                ) : null}
                <FormularyTiers
                  tiers={this.state.tiers}
                  generalInfo={this.state.generalInformation}
                  selectTier={this.selectTierHandler}
                  changeTierValue={this.changeTierValueHandler}
                  customTierChange={this.handleCustomTierChange}
                  deleteCustomTier={this.deleteCustomTier}
                />
                {this.state.generalInformation.type === "Medicare" ? (
                  <SupplementalModels
                    supplemental={this.state.supplemental_benefit_info}
                    supplementalCheck={this.supplementalCheck}
                    checkUncheckAllSupplemental={
                      this.onCheckUncheckAllSupplementalHandler
                    }
                  />
                ) : null}
              </>
            ) : null}

            <div className="btn-action">
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-btn"
              >
                <Button label="Save" onClick={() => this.onSave(false)} />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-and-continue-btn"
              >
                <Button
                  label="Save & Continue"
                  onClick={() => this.onSave(true)}
                />
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                className="save-and-continue-btn"
              >
                <Button
                  className="tempBtn"
                  label=">"
                  onClick={() => this.overrideNave()}
                />
              </Box>
            </div>
          </>
        ) : (
          <FrxLoader />
        )}

        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mode: state?.application?.mode,
    formulary_id: state?.application?.formulary_id,
    formulary_type_id: state?.application?.formulary_type_id,
    formulary: state?.setup?.formulary,
    setupOptions: state?.setupOptions
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSelectedFormulary: a => dispatch(fetchSelectedFormulary(a)),
    fetchGeneralOptions: a => dispatch(fetchGeneralOptions(a)),
    fetchResemblingFlsOptions: a => dispatch(fetchResemblingFlsOptions(a)),
    fetchMedicareOptions: a => dispatch(fetchMedicareOptions(a)),
    fetchDesignOptions: a => dispatch(fetchDesignOptions(a)),
    fetchTierOptions: a => dispatch(fetchTierOptions(a)),
    fetchSupplementalOptions: a => dispatch(fetchSupplementalOptions(a)),
    fetchSubMthsOptions: a => dispatch(fetchSubMthsOptions(a)),
    fetchStatesOptions: a => dispatch(fetchStatesOptions(a)),
    verifyFormularyName: a => dispatch(verifyFormularyName(a)),
    saveFormulary: a => dispatch(saveFormulary(a)),
    initCreateUsingClone: a => dispatch(initCreateUsingClone(a)),
    setLocation: a => dispatch(setLocation(a)),
    postMessage: a => dispatch(postMessage(a))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularySetUp);
