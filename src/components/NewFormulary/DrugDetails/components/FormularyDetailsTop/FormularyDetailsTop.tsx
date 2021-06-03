import React, { useContext } from "react";
import { connect } from "react-redux";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import DialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FormularyDetailsContext from "../../../FormularyDetailsContext";
import "./FormularyDetailsTop.scss";
import { fetchFormularyHeader } from "../../../../../redux/slices/formulary/header/headerSlice";
import { fetchSelectedFormulary } from "../../../../.././redux/slices/formulary/setup/setupSlice";
import { setLocationHome } from "../../../../.././redux/slices/formulary/application/applicationSlice";

import { createFormularyUsingClone } from "../../../../.././redux/slices/formulary/setup/setupService";
import VersionHistoryPopup from "../FormularySetUp/components/VersionHistoryPopup/VersionHistoryPopup";
import ClonePopup from "../FormularySetUp/components/ClonePopup/ClonePopup";
import DeletePopup from "../FormularySetUp/components/DeletePopup/DeletePopup";
import ArchivePopup from "../FormularySetUp/components/archive/ArchivePopup";
import NewVersionPopup from "../FormularySetUp/components/newVersion/NewVersionPopoup";

import { VersionHistoryData } from "../FormularySetUp/components/VersionHistoryPopup/version-hisory.model";
import { ToastContainer } from "react-toastify";
import showMessage from "../../../Utils/Toast";
import {
  fetchDesignOptions,
  fetchTierOptions,
} from "../../../../.././redux/slices/formulary/setup/setupOptionsSlice";
import moment from "moment";

const mapStateToProps = (state) => {
  return {
    mode: state?.setup?.mode,
    currentFormulary: state.setup.formulary,
    formularyVersionList: state.header.formulary_version_list,
    formularyLobId: state?.application?.formulary_lob_id,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchFormularyVersions: (a) => dispatch(fetchFormularyHeader(a)),
    fetchSelectedFormulary: (a) => dispatch(fetchSelectedFormulary(a)),
    fetchDesignOptions: (a) => dispatch(fetchDesignOptions(a)),
    fetchTierOptions: (a) => dispatch(fetchTierOptions(a)),
    setLocationHome: (a) => dispatch(setLocationHome(a)),
  };
}

class FormularyDetailsTop extends React.Component<any, any> {
  // componentDidMount() {
  //   this.props.fetchFormularyVersions(
  //     this.props.currentFormulary?.id_base_formulary
  //   );
  // }

  state = {
    // to detect if any popup is open
    isAnyPopupOpen: false,
    //toggle flag to show and hide version history popup
    isVersionHistoryPopupOpen: false,
    isClonePopupOpen: false,
    isDeletePopupOpen: false,
    isArchivePopupOpen: false,
    isNewVersionPopupOpen: false,
    dialogTitle: "",

    lastID: 0,
    lastVersion: 0,
  };

  componentDidUpdate() {
    // console.log(this.props.mode);
    // console.log(this.props.currentFormulary);
    if (this.props.mode === "EXISTING" && this.props.currentFormulary) {
      // console.log(
      //   this.state.lastID + " / " + this.props?.currentFormulary?.id_formulary
      // );
      // console.log(
      //   this.state.lastVersion +
      //     " / " +
      //     this.props?.currentFormulary?.formulary_info?.version_number
      // );

      if (
        this.state.lastID !== this.props?.currentFormulary?.id_formulary &&
        this.state !==
          this.props?.currentFormulary?.formulary_info?.version_number
      ) {
        this.props.fetchFormularyVersions(
          this.props.currentFormulary?.id_base_formulary
        );
        this.setState({
          lastID: this.props?.currentFormulary?.id_formulary,
          lastVersion: this.props?.currentFormulary?.formulary_info
            ?.version_number,
        });
      }
    }
  }

  onVersionChangeHandler = (e: any) => {
    const formulary_id = this.props.formularyVersionList.find(
      (el) => el.value === e
    ).id_formulary;
    this.externalInferfaceLoadFormulary(6, formulary_id);
  };

  /**
   * @function onVersionHistoryClick
   * handler for version history button
   * opens the popup with grid showing version historie of the
   * formulary with base id (id_base_formulary in app state)
   *
   * @author Deepak_T
   */
  onVersionHistoryClick = () => {
    console.log("Version history clicked");
    this.setState({
      isAnyPopupOpen: true,
      isVersionHistoryPopupOpen: true,
      dialogTitle: "VERSION HISTORY",
    });
  };

  onCloneClick = () => {
    console.log("Clone button clicked");
    if (this.props.currentFormulary) {
      this.setState({
        isAnyPopupOpen: true,
        isClonePopupOpen: true,
        dialogTitle: "CLONE",
      });
    } else {
      showMessage("Error: Current formulary is not set", "error");
    }
  };

  onDeleteClick = () => {
    console.log("Delete button clicked");
    if (this.props.currentFormulary) {
      this.setState({
        isAnyPopupOpen: true,
        isDeletePopupOpen: true,
        dialogTitle: "DELETE",
      });
    } else {
      showMessage("Error: Current formulary is not set", "error");
    }
  };

  onArchiveClick = () => {
    console.log("Archive button clicked");
    if (this.props.currentFormulary) {
      this.setState({
        isAnyPopupOpen: true,
        isArchivePopupOpen: true,
        dialogTitle: "Archive",
      });
    } else {
      showMessage("Error: Current formulary is not set", "error");
    }
  };

  onNewVersionClick = () => {
    console.log("New Version button clicked");
    if (this.props.currentFormulary) {
      this.setState({
        isAnyPopupOpen: true,
        isNewVersionPopupOpen: true,
        dialogTitle: "New Version",
      });
    } else {
      showMessage("Error: Current formulary is not set", "error");
    }
  };

  //  isNewVersionPopupOpen

  /**
   * @function onClosePopup
   * handler for closing popup
   * @author Deepak_T
   */
  onClosePopup = () => {
    this.setState({
      isAnyPopupOpen: false,
      isVersionHistoryPopupOpen: false,
      isClonePopupOpen: false,
      isDeletePopupOpen: false,
      isArchivePopupOpen: false,
      isNewVersionPopupOpen: false,
      dialogTitle: "",
      //add other popup toggles too if this is reused
    });
  };

  /**
   * @function onActionFromPopup
   * handler for action from popup
   * @param action the action string passed from dialog popup
   * @author Deepak_T
   */
  onActionFromPopup = (action: string) => {
    console.log("Action from popup: ", action);
    //do any action if requiredbased ona ction type and close popup
    this.onClosePopup();
  };

  /**
   * @function onFormularyVersionSelection
   * call back for version selection
   * @param the data item selected
   *
   */
  onFormularyVersionSelection = (data: VersionHistoryData) => {
    // console.log("the selected version ", data);
    // do anything with the data
    this.onClosePopup();
    if (data && data.id_formulary && data.id_formulary > 0) {
      this.externalInferfaceLoadFormulary(6, data.id_formulary);
    }
  };

  // CLONE

  // SetupService - createFormularyUsingClone
  // createFormularyUsingClone(     baseId: number,     payload: any   ): Promise<number | null>
  // base id --- FL base ID
  // number -- new FL no.
  // payload
  // const payload: any = {};
  // payload.formulary_info = {};
  // payload.formulary_info.formulary_name = new_name;
  // payload.formulary_info.effective_date = inew_effective_date;
  // payload.formulary_info.id_lob =  <GET from Store>

  onFormularyCloneInfo = (cloneName, effectiveDate) => {
    console.log("Formulary name:" + cloneName + " Date:" + effectiveDate);
    this.onClosePopup();
    this.handleCloneFormulary(cloneName, effectiveDate);
  };

  onCancel = () => {
    this.onClosePopup();
  };

  handleCloneFormulary = async (cloneName, effectiveDate) => {
    try {
      if (this.props.currentFormulary) {
        const payload: any = {};
        payload.formulary_info = {};
        payload.formulary_info.formulary_name = cloneName;
        payload.formulary_info.effective_date = effectiveDate;
        payload.formulary_info.id_lob = this.props.formularyLobId;

        let newFormularyId = await createFormularyUsingClone(
          this.props.currentFormulary.id_base_formulary,
          payload
        );
        if (newFormularyId) {
          showMessage("Cloned formulary Id:" + newFormularyId, "success");
          this.externalInferfaceLoadFormulary(6, newFormularyId);
        } else {
          showMessage("Error: No response for formulary clone", "error");
        }
      }
    } catch (error) {
      console.log("***** clone - Error");
      console.log(error);
      showMessage("Error while cloning formulary", "error");
    }
  };

  newVersionHandler = (id_formulary: number) => {
    console.log("newVersionHandler ** " + id_formulary);
    this.externalInferfaceLoadFormulary(6, id_formulary);
  };

  //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  // TODO
  // Do not modify this...
  // Add new code above this...
  //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

  externalInferfaceLoadFormulary(type: number, id: number) {
    console.log(" EXTERNAL INTERFACE LOAD FL : " + type + " ID : " + id);

    // this.manageFormularyType(type, id);
    this.props.fetchSelectedFormulary(id);
    this.props.fetchDesignOptions({ type: type, id: id });
    this.props.fetchTierOptions({ type: type, id: id });
  }

  // manageFormularyType(type: number, id: number) {
  //   console.log(" Manage - TYPE : " + type + " ID : " + id);
  //   let defaultType = 4;
  //   if (type === -1) {
  //     this.props.fetchGeneralOptions({ type: defaultType, id: -1 });
  //     return;
  //   }

  //   this.props.fetchGeneralOptions({ type: type, id: id });
  //   this.props.fetchDesignOptions({ type: type, id: id });
  //   this.props.fetchTierOptions({ type: type, id: id });

  //   if (type === 1) {
  //     // MRC...
  //     this.props.fetchMedicareOptions({ type: type, id: id });
  //     this.props.fetchSupplementalOptions({ type: type, id: id });
  //   } else if (type === 2) {
  //     // MMP...
  //     this.props.fetchStatesOptions(type);
  //     this.props.fetchMedicareOptions({ type: type, id: id });
  //     this.props.fetchSupplementalOptions({ type: type, id: id });
  //   } else if (type === 3) {
  //     // TODO ... MEDICADE...
  //     this.props.fetchStatesOptions(0);
  //   } else if (type === 4) {
  //     // TODO ... MEDICADE...
  //     this.props.fetchStatesOptions(0);
  //   } else if (type === 5) {
  //     // EXC...
  //   } else if (type === 6) {
  //     // COMMERCIAL...
  //   }
  //   this.props.fetchSubMthsOptions(2021);
  // }
  formatED(input) {
    console.log("================================");
    if (input) {
      const d = new Date(input);
      const f = moment(d).format("MM-DD-YYYY"); // June 1, 2019
      return f;
    }
  }
  render() {
    let dropDown: any;
    if (this.props.formularyVersionList) {
      dropDown = (
        <DropDown
          className="formulary-type-dropdown formulary-versions"
          placeholder="Formulary Version"
          options={this.props.formularyVersionList.map((e) => e.value)}
          onChange={this.onVersionChangeHandler}
          dropdownClassName="version-dd"
        />
      );
    }

    return (
      <div className="drug-detail-top">
        {/* The popup for version history . Maybe this can be extended for other action buttons too */}
        {this.state.isAnyPopupOpen ? (
          <DialogPopup
            positiveActionText="save"
            negativeActionText="cancel"
            title={this.state.dialogTitle}
            handleClose={this.onClosePopup}
            handleAction={this.onActionFromPopup}
            open={this.state.isAnyPopupOpen}
            showActions={false}
            showCloseIcon={false}
            className="formularydetailstop-root__grid-dialog-popup"
          >
            {this.state.isVersionHistoryPopupOpen && (
              <VersionHistoryPopup
                baseId={this.props.currentFormulary?.id_base_formulary}
                onFormularyVersionSelection={this.onFormularyVersionSelection}
              />
            )}
            {this.state.isClonePopupOpen && (
              <ClonePopup
                currentFormulary={this.props.currentFormulary}
                onFormularyCloneInfo={this.onFormularyCloneInfo}
                onCancel={this.onCancel}
              />
            )}
            {this.state.isDeletePopupOpen && (
              <DeletePopup
                currentFormulary={this.props.currentFormulary}
                onCancel={this.onCancel}
              />
            )}
            {this.state.isArchivePopupOpen && (
              <ArchivePopup
                currentFormulary={this.props.currentFormulary}
                versionList={this.props.formularyVersionList}
                onCancel={this.onCancel}
              />
            )}
            {this.state.isNewVersionPopupOpen && (
              <NewVersionPopup
                currentFormulary={this.props.currentFormulary}
                onCancel={this.onCancel}
                newVersion={this.newVersionHandler}
              />
            )}
          </DialogPopup>
        ) : null}

        {/* End of dialog popup */}

        <div className="breadcrum-sec">
          <div className="breadcrum">
            <span
              className="color-blue"
              // onClick={FormularyDetailsCont.showDetailHandler}
              onClick={() => {
                // window.location.reload();
                this.props.setLocationHome(1);
              }}
            >
              Formulary Grid
            </span>
            <span>&gt;</span>
            <span className="active-state">
              {this.props.currentFormulary?.formulary_info?.formulary_name}
            </span>
          </div>
          {this.props.activeTabIndex === 0 ? (
            <div className="version-wrapper">
              {/* <div className="item-text version-dd" style={{paddingLeft: 0}}>
              {this.props.formularyVersionList.length > 0 ? this.props.formularyVersionList[0].value : ""}
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4" fill="none">
                <path d="M0.471003 0H6.529C6.94809 0 7.15763 0.509932 6.86097 0.808776L3.83315 3.86125C3.64951 4.04625 3.35049 4.04625 3.16685 3.86125L0.139026 0.808776C-0.157635 0.509932 0.051911 0 0.471003 0Z" fill="#F65A1C"/>
              </svg>
            </div> */}
              {dropDown}
              <div>
                <div
                  className="item item--version-history"
                  onClick={this.onVersionHistoryClick}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8281 5.48992C10.8336 8.42555 8.43949 10.826 5.50387 10.8281C4.23597 10.829 3.07134 10.387 2.15613 9.64838C1.91815 9.4563 1.90036 9.09964 2.11662 8.88338L2.35868 8.64132C2.54364 8.45636 2.83892 8.43612 3.04384 8.59869C3.71813 9.13376 4.57147 9.45312 5.5 9.45312C7.68507 9.45312 9.45312 7.68472 9.45312 5.5C9.45312 3.31493 7.68472 1.54688 5.5 1.54688C4.45126 1.54688 3.49875 1.95441 2.79151 2.61963L3.88193 3.71005C4.09849 3.92661 3.94511 4.29688 3.63887 4.29688H0.515625C0.325768 4.29688 0.171875 4.14298 0.171875 3.95312V0.829877C0.171875 0.523639 0.542137 0.370262 0.758699 0.586803L1.81943 1.64753C2.77597 0.733391 4.07241 0.171875 5.5 0.171875C8.43928 0.171875 10.8227 2.55191 10.8281 5.48992ZM6.94134 7.18255L7.15238 6.9112C7.32722 6.68641 7.28673 6.36245 7.06193 6.18763L6.1875 5.5075V3.26562C6.1875 2.98085 5.95665 2.75 5.67187 2.75H5.32812C5.04335 2.75 4.8125 2.98085 4.8125 3.26562V6.18L6.21777 7.273C6.44256 7.44782 6.7665 7.40734 6.94134 7.18255Z"
                      fill="#F65A1C"
                    />
                  </svg>
                  Version History
                </div>
                <div
                  className="item item--version-history"
                  onClick={this.onCloneClick}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7812 0C12.4544 0 13 0.545645 13 1.21875V8.53125C13 9.20436 12.4544 9.75 11.7812 9.75H4.46875C3.79564 9.75 3.25 9.20436 3.25 8.53125V1.21875C3.25 0.545645 3.79564 0 4.46875 0H11.7812ZM4.46875 10.5625C3.34872 10.5625 2.4375 9.65128 2.4375 8.53125V3.25H1.21875C0.545645 3.25 0 3.79564 0 4.46875V11.7812C0 12.4544 0.545645 13 1.21875 13H8.53125C9.20436 13 9.75 12.4544 9.75 11.7812V10.5625H4.46875Z"
                      fill="#F65A1C"
                    />
                  </svg>
                  Clone
                </div>
                <div
                  className="item item--version-history"
                  onClick={this.onNewVersionClick}
                >
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.61523 0C3.47441 0 0.927734 2.54668 0.927734 5.6875C0.927734 8.82832 3.47441 11.375 6.61523 11.375C9.75605 11.375 12.3027 8.82832 12.3027 5.6875C12.3027 2.54668 9.75605 0 6.61523 0ZM9.05273 5.99219C9.05273 6.04805 9.00703 6.09375 8.95117 6.09375H7.02148V8.02344C7.02148 8.0793 6.97578 8.125 6.91992 8.125H6.31055C6.25469 8.125 6.20898 8.0793 6.20898 8.02344V6.09375H4.2793C4.22344 6.09375 4.17773 6.04805 4.17773 5.99219V5.38281C4.17773 5.32695 4.22344 5.28125 4.2793 5.28125H6.20898V3.35156C6.20898 3.2957 6.25469 3.25 6.31055 3.25H6.91992C6.97578 3.25 7.02148 3.2957 7.02148 3.35156V5.28125H8.95117C9.00703 5.28125 9.05273 5.32695 9.05273 5.38281V5.99219Z"
                      fill="#F65A1C"
                    />
                  </svg>
                  New Version
                </div>
                <div
                  className="item item--version-history"
                  onClick={this.onDeleteClick}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5ZM8.14962 3.33713C8.21417 3.27258 8.25043 3.18503 8.25043 3.09375C8.25043 3.00247 8.21417 2.91492 8.14962 2.85037C8.08508 2.78583 7.99753 2.74957 7.90625 2.74957C7.81497 2.74957 7.72742 2.78583 7.66288 2.85037L5.5 5.01394L3.33713 2.85037C3.30516 2.81841 3.26722 2.79306 3.22546 2.77577C3.18371 2.75847 3.13895 2.74957 3.09375 2.74957C3.04855 2.74957 3.00379 2.75847 2.96204 2.77577C2.92028 2.79306 2.88234 2.81841 2.85037 2.85037C2.81841 2.88234 2.79306 2.92028 2.77577 2.96204C2.75847 3.00379 2.74957 3.04855 2.74957 3.09375C2.74957 3.13895 2.75847 3.18371 2.77577 3.22546C2.79306 3.26722 2.81841 3.30516 2.85037 3.33713L5.01394 5.5L2.85037 7.66288C2.78583 7.72742 2.74957 7.81497 2.74957 7.90625C2.74957 7.99753 2.78583 8.08508 2.85037 8.14962C2.91492 8.21417 3.00247 8.25043 3.09375 8.25043C3.18503 8.25043 3.27258 8.21417 3.33713 8.14962L5.5 5.98606L7.66288 8.14962C7.69484 8.18159 7.73278 8.20694 7.77454 8.22423C7.81629 8.24153 7.86105 8.25043 7.90625 8.25043C7.95145 8.25043 7.99621 8.24153 8.03796 8.22423C8.07972 8.20694 8.11766 8.18159 8.14962 8.14962C8.18159 8.11766 8.20694 8.07972 8.22423 8.03796C8.24153 7.99621 8.25043 7.95145 8.25043 7.90625C8.25043 7.86105 8.24153 7.81629 8.22423 7.77454C8.20694 7.73278 8.18159 7.69484 8.14962 7.66288L5.98606 5.5L8.14962 3.33713Z"
                      fill="#F65A1C"
                    />
                  </svg>
                  Delete
                </div>
                <div
                  className="item item--version-history"
                  onClick={this.onArchiveClick}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.6875 9.625C0.6875 10.0053 0.994727 10.3125 1.375 10.3125H9.625C10.0053 10.3125 10.3125 10.0053 10.3125 9.625V3.4375H0.6875V9.625ZM4.125 5.07031C4.125 4.92852 4.24102 4.8125 4.38281 4.8125H6.61719C6.75898 4.8125 6.875 4.92852 6.875 5.07031V5.24219C6.875 5.38398 6.75898 5.5 6.61719 5.5H4.38281C4.24102 5.5 4.125 5.38398 4.125 5.24219V5.07031ZM10.3125 0.6875H0.6875C0.307227 0.6875 0 0.994727 0 1.375V2.40625C0 2.59531 0.154687 2.75 0.34375 2.75H10.6562C10.8453 2.75 11 2.59531 11 2.40625V1.375C11 0.994727 10.6928 0.6875 10.3125 0.6875Z"
                      fill="#F65A1C"
                    />
                  </svg>
                  Archive
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {this.props?.mode === "EXISTING" && (
          <div className="durationInfo d-flex">
            <div className="item">
              <span className="tag purple">
                {
                  this.props.currentFormulary?.formulary_type_info
                    ?.formulary_type
                }
              </span>
            </div>
            <div className="item">
              <span className="label">Formulary ID:</span>{" "}
              {this.props.currentFormulary?.id_formulary}
            </div>
            {/* <div className="item">
              <span className="tag purple">
                {
                  this.props.currentFormulary?.formulary_type_info
                    ?.formulary_type
                }
              </span>
            </div> */}
            {/* <div className="item">
              <span className="label">Formulary ID:</span>{" "}
              {this.props.currentFormulary?.id_formulary}
            </div> */}
            <div className="item">
              <span className="label">Version:</span>{" "}
              {this.props.currentFormulary?.formulary_info?.version_number}
            </div>
            {/* <div className="item">
              <span className="label">Effective Date:</span>{" "}
              {this.props.currentFormulary?.formulary_info?.effective_date}
            </div> */}
            {/* <div className="item">
              <span className="label">Termination Date:</span>{" "}
              {this.props.currentFormulary?.terminationDate}
            </div> */}
            <div className="item">
              <span className="label">Effective Date:</span>{" "}
              {this.formatED(
                this.props.currentFormulary?.formulary_info?.effective_date
              )}
            </div>
            <div className="item">
              <span className="label">Termination Date:</span>{" "}
              {this.props.currentFormulary?.terminationDate}
            </div>
            {/* <div className="item">
              <span className="label">Termination Date:</span>{" "}
              {this.props.currentFormulary?.terminationDate}
            </div> */}
          </div>
        )}
        <ToastContainer />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormularyDetailsTop);
