import React, { Component } from "react";

import { ReactComponent as SwapIcon } from "../../../../assets/icons/SwapIcon.svg";
import "./AdditionalCriteriaContainer.scss";
import { connect } from "react-redux";
import { getDrugDetailsPOSSettings } from "../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import { Button } from "@material-ui/core";
import { setAdditionalCriteria } from "../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import AdditionalCriteria from "../AdditionalCriteriaContainer/AdditionalCriteria/AdditionalCriteria";

import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete.svg";
import { ReactComponent as AddCircleIcon } from "../../../../assets/icons/addcircle.svg";
import { debug } from "console";

function mapDispatchToProps(dispatch) {
  return {
    getPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getPRSettings: (a) => dispatch(getDrugDetailsPRSettings(a)),

    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    // additional criteria state
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    isNewAdditionalCriteria: state?.additionalCriteria?.isNewAdditionalCriteria,
    populateGrid: state?.additionalCriteria?.populateGrid,
    closeDialog: state?.additionalCriteria?.closeDialog,
    listItemStatus: state?.additionalCriteria?.listItemStatus,

    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
  };
};
interface AdditionalCriteriaContainerState {
  additionalCriteriaArray: any[];
  sequence: number;
}
class AdditionalCriteriaContainer extends Component<
  any,
  AdditionalCriteriaContainerState
> {
  state = {
    additionalCriteriaArray: [],
    sequence: 0,
  };

  componentDidMount() {
    if (this.props.additionalCriteriaBody)
      this.setState({
        additionalCriteriaArray: this.props.additionalCriteriaBody,
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.additionalCriteriaBody)
      this.setState({
        additionalCriteriaArray: this.props.additionalCriteriaBody,
      });
  }

  handleAddNewClick = () => {
    let sequence = this.state.sequence;
    sequence++;
    if (this.state.additionalCriteriaArray.length < 5) {
      this.setState({
        additionalCriteriaArray: [
          ...this.state.additionalCriteriaArray,
          {
            sequence: sequence,
            covered: {},
            not_covered: {},
          },
        ],
        sequence,
      });
    }
  };

  deleteAdditionalCriteria = (additionalCriteriaId: number) => {
    const additionalCriterias = this.state.additionalCriteriaArray.filter(
      (additionalCriteria: any) =>
        additionalCriteria.sequence !== additionalCriteriaId
    );

    this.setState({
      additionalCriteriaArray: additionalCriterias,
    });
  };

  handleChildDataSave = (additionalCriteria) => {
    this.props.handleChildDataSave(additionalCriteria);
  };

  render() {
    const { criteriaList } = this.props;
    return (
      <div
        className={
          this.props.isReadOnly
            ? "__root-additional-criteria-read-only"
            : "__root-additional-criteria"
        }
      >
        {this.state?.additionalCriteriaArray?.length <= 0
          ? !this.props.isReadOnly && (
              <div className="__root-additional-criteria-child-msg">
                <p>Click Add New to create Additional Criteria</p>
              </div>
            )
          : this.state?.additionalCriteriaArray?.map(
              (additionalCriteria: any) => (
                <div
                  className={
                    this.props.isReadOnly
                      ? "__root-additional-criteria-read-only-child"
                      : "__root-additional-criteria-child"
                  }
                  key={additionalCriteria.sequence}
                >
                  <SwapIcon
                    className={
                      this.props.isReadOnly
                        ? "__root-additional-criteria-read-only-child-swapper"
                        : "__root-additional-criteria-child-swapper"
                    }
                  />
                  <div
                    className={
                      this.props.isReadOnly
                        ? "__root-additional-criteria-read-only-child-accordion"
                        : "__root-additional-criteria-child-accordion"
                    }
                  >
                    <AdditionalCriteria
                      criteriaList={criteriaList}
                      additionalCriteria={additionalCriteria}
                      handleChildDataSave={this.handleChildDataSave}
                      isReadOnly={this.props.isReadOnly}
                      editable={this.props.editable}
                    />
                  </div>
                  {!this.props.isReadOnly && (
                    <DeleteIcon
                      className="__root-additional-criteria-child-delete"
                      onClick={
                        this.props.editable
                          ? undefined
                          : () => {
                              this.deleteAdditionalCriteria(
                                additionalCriteria.sequence
                              );
                            }
                      }
                    />
                  )}
                </div>
              )
            )}
        {!this.props.isReadOnly && (
          <div className="__root-additional-criteria-add-new">
            <Button
              // disabled={this.state.additionalCriteriaArray.length > 5}
              className={"Button advanced-grid-search__btn-clear"}
              onClick={() => this.handleAddNewClick()}
              disabled={this.props.editable}
            >
              <AddCircleIcon />
              <span>Add New</span>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalCriteriaContainer);
