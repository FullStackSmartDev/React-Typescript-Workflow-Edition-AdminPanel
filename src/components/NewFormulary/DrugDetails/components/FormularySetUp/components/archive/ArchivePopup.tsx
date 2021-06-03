import { Box, Grid } from "@material-ui/core";
import { version } from "moment";
import React from "react";
import { connect } from "react-redux";
import Button from "../../../../../../shared/Frx-components/button/Button";
import "../CommercialPopup.scss";
import { archiveFormularies } from "../../../../../../../redux/slices/formulary/setup/setupService";
import showMessage from "../../../../../Utils/Toast";
import { initArchiveFormularies } from "../../../../../../../redux/slices/formulary/setup/setupSlice";

class ArchivePopup extends React.Component<any, any> {
  onCancelClicked = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  initFormularyArchive = async (full: boolean = false, versions) => {
    console.log(" ARC : " + full, versions);
    let formularyIDs: number[] = [];
    if (full) {
      if (versions && versions.length > 0) {
        let id_list: number[] = [];
        versions.forEach((v: any) => {
          id_list.push(v.id_formulary);
        });
        formularyIDs = id_list;
      }
    } else {
      formularyIDs.push(this.props?.currentFormulary?.id_formulary);
    }

    console.log(" formularyIDs :: " + formularyIDs);

    this.props.initArchiveFormularies(formularyIDs);
    this.props.onCancel();


    // try {
    //   let response = await archiveFormularies(formularyIDs);

    //   console.log(response);

    //   if (response && response.status && response.status === 200) {
    //     if (formularyIDs && formularyIDs.length > 1) {
    //       showMessage("Full Formulary Archived", "success");
    //     } else {
    //       showMessage("Formulary Archived", "success");
    //     }
    //     // TODO
    //     // this.refreshApp();
    //   } else {
    //     showMessage("Failed to archive formulary", "error");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   showMessage("Error while archiving formulary ", "error");
    // }
  };

  render() {
    const { versionList } = this.props;

    return (
      <div className="popup-container">
        <Grid container>
          <Grid item xs={12}>
            <p>
              Do you want to archive the version or the full formulary:{" "}
              <span>
                {this.props?.currentFormulary?.formulary_info?.formulary_name
                  ? this.props?.currentFormulary?.formulary_info?.formulary_name
                  : ""}
              </span>
            </p>
          </Grid>
          <Grid item xs={12}>
            <div className="action-btn">
              <Button
                label="Cancel"
                htmlFor="upload-file"
                className="upload-button cancel-btn"
                onClick={this.onCancelClicked}
              />
              <Button
                label="Archive Version"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={() => this.initFormularyArchive(false, versionList)}
              />
              <Button
                label="Archive Full Formulary"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={() => this.initFormularyArchive(true, versionList)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    initArchiveFormularies: (a) => dispatch(initArchiveFormularies(a)),
  };
}

export default connect(null, mapDispatchToProps)(ArchivePopup);
