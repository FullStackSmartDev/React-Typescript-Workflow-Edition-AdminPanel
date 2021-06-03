import React from "react";
import { Box } from "@material-ui/core";
import { getAdditionalCriteria } from "../advanceSearchMock";
import FrxDialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";
import AdditionalCriteriaBuilder from "../../../shared/Frx-components/additional-criteria-builder";

interface AdditionalCriteriaPopupProps {
  openPopup: boolean;
  onClose: () => void;
  category: string;
}

interface CategoryData {
  id: number;
  category: string;
}

interface AdditionalCriteria {
  id: number;
  title: string;
  formArray: any;
}

interface AdditionalCriteriaPopupState {
  categoriesData: Array<CategoryData>;
  activeCategoryIndex: number;
  activeCategoryTitle: string;
  formCount: number;
  checkBoxOpt: any;
  additionalCriterias: Array<AdditionalCriteria>;
}

class AdditionalCriteriaPopup extends React.Component<
  AdditionalCriteriaPopupProps,
  AdditionalCriteriaPopupState
> {
  state: AdditionalCriteriaPopupState = {
    categoriesData: getAdditionalCriteria(),
    activeCategoryIndex: 0,
    activeCategoryTitle: "",
    additionalCriterias: [],
    formCount: 0,
    checkBoxOpt: {
      1: [
        { id: 1, text: "Formulary File" },
        { id: 2, text: "Prior Authorization File" },
        { id: 3, text: "Step Therapy File" },
        { id: 4, text: "Indication-Based Coverage File" },
      ],
      2: [
        { id: 1, text: "Tire1" },
        { id: 2, text: "Tire2" },
        { id: 3, text: "Tire3" },
        { id: 4, text: "Tire4" },
        { id: 5, text: "Tire5" },
        { id: 6, text: "Tire6" },
      ],
    },
  };

  handleAddNewClick = () => {
    this.setState({
      additionalCriterias: [
        ...this.state.additionalCriterias,
        {
          id: this.state.additionalCriterias.length,
          title: `ADDITIONAL CRITERIA ${
            this.state.additionalCriterias.length + 1
          }`,
          formArray: [],
        },
      ],
    });
  };

  onClose = () => {
    this.props.onClose();
  };

  action = () => {
    console.log("no action to perform");
  };

  handleListItemClick = (
    category: CategoryData,
    additionalCriteriaId: number
  ) => {
    const title = category.category;
    const catid = category.id;
    let additionalCriterias = [...this.state.additionalCriterias];
    let additionalCriteria = additionalCriterias.find(
      (additionalCriteria) => additionalCriteria.id === additionalCriteriaId
    );
    if (additionalCriteria) {
      let form = additionalCriteria.formArray.find((v) => v.title === title);
      if (!form) {
        additionalCriteria.formArray = [
          ...additionalCriteria.formArray,
          { title: title, id: catid },
        ];
        this.setState({
          additionalCriterias: additionalCriterias,
        });
      }
    }
  };

  deleteFormHandler = (id: number, additionalCriteriaId: number) => {
    let additionalCriterias = [...this.state.additionalCriterias];
    let additionalCriteria = additionalCriterias.find(
      (additionalCriteria) => additionalCriteria.id === additionalCriteriaId
    );
    if (additionalCriteria) {
      let formArray = additionalCriteria.formArray.filter((v) => v.id !== id);
      additionalCriteria.formArray = formArray;
      this.setState({
        additionalCriterias: additionalCriterias,
      });
    }
  };

  deleteAdditionalCriteria = (additionalCriteriaId: number) => {
    const additionalCriterias = this.state.additionalCriterias.filter(
      (additionalCriteria) => additionalCriteria.id !== additionalCriteriaId
    );
    this.setState({
      additionalCriterias: additionalCriterias,
    });
  };

  clearSelected = (additionalCriteriaId: number) => {
    let additionalCriterias = [...this.state.additionalCriterias];
    let additionalCriteria = additionalCriterias.find(
      (additionalCriteria) => additionalCriteria.id === additionalCriteriaId
    );
    if (additionalCriteria) {
      additionalCriteria.formArray = [];
    }
    this.setState({
      additionalCriterias: additionalCriterias,
    });
  };

  render() {
    return (
      <div className="root-additional-criteria-builder">
        <React.Fragment>
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title="ADDITIONAL CRITERIA"
            handleClose={this.onClose}
            handleAction={this.action}
            open={this.props.openPopup}
            showActions={false}
            className="drug-grid-additional-criteria-builder"
            height="80%"
            width="90%"
          >
            <AdditionalCriteriaBuilder
              activeCategoryIndex={0}
              activeCategoryTitle={""}
              categoriesData={this.state.categoriesData}
              checkBoxOpt={this.state.checkBoxOpt}
              deleteFormHandler={this.deleteFormHandler}
              deleteAdditionalCriteria={this.deleteAdditionalCriteria}
              clearSelected={this.clearSelected}
              handleListItemClick={this.handleListItemClick}
              additionalCriterias={this.state.additionalCriterias}
              handleAddNewClick={this.handleAddNewClick}
              className={""}
            />
            <Box
              display="flex"
              justifyContent="flex-end"
              className="outer-button-wrapper"
            >
              <button className="Button member-notes-popup-root__dialog__category-notes_form__submit-btn">
                Apply
              </button>
            </Box>
          </FrxDialogPopup>
        </React.Fragment>
      </div>
    );
  }
}

export default AdditionalCriteriaPopup;
