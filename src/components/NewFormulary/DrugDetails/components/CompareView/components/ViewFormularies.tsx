import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { ReactComponent as EditIcon } from "../../../../../../assets/icons/EditIcon.svg";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
// import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";
import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";
import { connect } from "react-redux";

import "./CompareView.scss";

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};

enum PopUpTypes {
  TYPE1 = "SELECTFORMULARY",
  TYPE2 = "VIEWFULLFORMULARY",
}
class ViewFormularies extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    show: false,

    PopUpType: PopUpTypes.TYPE2,

    hidden: false,
    baseFormulary: {},
  };
  onClose = () => {
    console.log("close");
    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = () => {
    if(this.props.handleViewClear){
      this.props.handleViewClear();
    }
    this.setState({ selectFormulary: true });
  };

  selectFormularyClick = (dataRow) => {
    console.log(dataRow);
    if (dataRow) {
      this.state.baseFormulary = dataRow;
    }
    this.setState({ selectFormulary: false });
  };
  render() {
    if (
      !this.state.baseFormulary ||
      Object.keys(this.state.baseFormulary).length === 0
    ) {
      if (this.props.formulary) {
        this.state.baseFormulary = {};
        this.state.baseFormulary["id_formulary"] = this.props.formulary[
          "id_formulary"
        ];
        this.state.baseFormulary["id_base_formulary"] = this.props.formulary[
          "id_base_formulary"
        ];
        this.state.baseFormulary["formulary_name"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["formulary_name"]
          : "";
        this.state.baseFormulary["id_formulary_type"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["id_formulary_type"]
          : "";
        this.state.baseFormulary["version_number"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["version_number"]
          : "";
        this.state.baseFormulary["formulary_type"] = this.props.formulary[
          "formulary_type_info"
        ]
          ? this.props.formulary["formulary_type_info"]["formulary_type"]
          : "";
        this.state.baseFormulary["id_lob"] = this.props.formulary[
          "formulary_type_info"
        ]
          ? this.props.formulary["formulary_type_info"]["id_lob"]
          : "";
        this.state.baseFormulary["number_of_tiers"] = this.props.formulary[
          "formulary_info"
        ]
          ? this.props.formulary["formulary_info"]["number_of_tiers"]
          : "";
      }
    }
    return (
      <div className="compare-formularies-container">
        <h6>Select formulary to view activity</h6>
        <div className="view-formulary-form formulay-label">
          <Grid container>
            <Grid item xs={3}>
              <div className="group select-formulary-name">
                <label>
                  Formulary Name <span className="astrict">*</span>
                </label>

                <div className="input-element">
                  <div className="bordered pointer">
                    <span onClick={(e) => this.handleIconClick()}>
                      {this.state.baseFormulary["formulary_name"]
                        ? this.state.baseFormulary["formulary_name"]
                        : "Select Formulary"}
                    </span>
                    <EditIcon
                      onClick={(e) => this.handleIconClick()}
                      className={this.state.hidden ? "hide-edit-icon" : ""}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                justifyContent="center"
                className="view-formulary-btn"
              >
                <Button
                  label="View"
                  onClick={(event) =>
                    this.props.handleViewBtn(this.state.baseFormulary)
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.selectFormulary ? (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={
              this.state.PopUpType === PopUpTypes.TYPE1
                ? "Select Formulary"
                : "View Full Formulary"
            }
            handleClose={() => {
              this.setState({
                selectFormulary: !this.state.selectFormulary,
              });
            }}
            handleAction={() => {}}
            open={this.state.selectFormulary}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            <CloneFormularyPopup
              type="commercial" // type will be dynamic based on the LOB
              selectFormularyClick={this.selectFormularyClick}
            />
          </DialogPopup>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFormularies);
