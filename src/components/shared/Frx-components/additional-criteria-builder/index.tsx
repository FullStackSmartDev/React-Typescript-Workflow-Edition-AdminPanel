import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import SearchCategory from "./SearchCategory";
import CategoryForm from "./CategoryForm";
import { ReactComponent as UpDownArrowIcon } from "./assets/updownarrow.svg";
import { ReactComponent as AngleUpIcon } from "./assets/angleup.svg";
import { ReactComponent as CopyIcon } from "./assets/copy.svg";
import { ReactComponent as ClearIcon } from "./assets/clearcircle.svg";
import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import { ReactComponent as AddCircleIcon } from "./assets/addcircle.svg";
import "./style.scss";

interface CategoryData {
  id: number;
  category: string;
}

interface AdditionalCriteria {
  id: number;
  title: string;
  formArray: any;
}

interface AdditionalCriteriaBuilderProps {
  categoriesData: Array<CategoryData>;
  activeCategoryIndex: number;
  activeCategoryTitle: string;
  additionalCriterias: Array<AdditionalCriteria>;
  checkBoxOpt: any;
  className?: string;
  isReadOnly?: boolean;
  deleteFormHandler(data: number, additionalCriteriaId: number): any;
  clearSelected(additionalCriteriaId: number): any;
  handleListItemClick(
    category: CategoryData,
    additionalCriteriaId: number
  ): any;
  handleAddNewClick(): any;
  deleteAdditionalCriteria(additionalCriteriaId: number): any;
}

interface AdditionalCriteriaBuilderState {}

export default class AdditionalCriteriaBuilder extends React.Component<
  AdditionalCriteriaBuilderProps,
  any
> {
  getFormContent = (item: AdditionalCriteria) => {
    let formContent = (
      <div className='noForms'>
        Drag the file type(s) from the list on the left to create a filter.
      </div>
    );
    if (item.formArray && item.formArray.length !== 0) {
      formContent = item.formArray.map((a, index: number) => (
        <CategoryForm
          key={a.id}
          isReadOnly={this.props.isReadOnly}
          title={a.title}
          index={index}
          deleteField={() => this.props.deleteFormHandler(a.id, item.id)}
          checkBoxOpt={this.props.checkBoxOpt[a.id]}
          catid={a.id}
        />
      ));
    }
    return formContent;
  };

  getAdditionalCriterias = (additionalCriterias: any) => {
    let formContent = (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        className='noAdditionalCriteria'
      >
        Click Add New
      </Box>
    );
    if (additionalCriterias && additionalCriterias.length !== 0) {
      formContent = additionalCriterias.map(
        (item: AdditionalCriteria, i: number) => (
          <div key={item.id} className='main-wrapper'>
            <div className='row-wrapper'>
              <div className='arrow-wrapper'>
                <Box component='span' display='block'>
                  <UpDownArrowIcon />
                </Box>
              </div>
              <div className='search-wrapper'>
                <Accordion
                  defaultExpanded={true}
                  className='additional-criteria-builder-accordion'
                >
                  <AccordionSummary
                    className='additional-criteria-builder-accordionsummary'
                    expandIcon={<AngleUpIcon />}
                    aria-label='Expand'
                    aria-controls='additional-actions1-content'
                    id='additional-actions1-header'
                  >
                    <Typography
                      className='additional-criteria-builder-accordion-header'
                      onClick={(event) => event.stopPropagation()}
                      onFocus={(event) => event.stopPropagation()}
                    >
                      {item.title}
                    </Typography>
                    {!this.props.isReadOnly ? (
                      <span
                        className='additional-criteria-builder-copy'
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                      >
                        <CopyIcon />
                      </span>
                    ) : null}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      spacing={0}
                      alignContent='flex-start'
                      className='drug-grid-popup-root__dialog'
                    >
                      <Grid
                        xs={3}
                        className='member-notes-popup-root__dialog__categories'
                        key={0}
                        item
                      >
                        <SearchCategory
                          handleListItemClick={this.props.handleListItemClick}
                          additionalCriteriaId={item.id}
                          categoriesData={this.props.categoriesData}
                          activeCategoryIndex={this.props.activeCategoryIndex}
                        />
                      </Grid>
                      <Grid
                        className='form-wrapper-root member-notes-popup-root__dialog__category-notes'
                        item
                        xs={9}
                      >
                        <Box className='right-content'>
                          <div className='formWrappers '>
                            <div className='formWrappers-content'>
                              {this.getFormContent(item)}
                            </div>

                            <Box
                              display='flex'
                              justifyContent='flex-end'
                              className='button-wrapper'
                            >
                              {!this.props.isReadOnly ? (
                                <Button
                                  className='Button advanced-grid-search__btn-clear'
                                  onClick={() =>
                                    this.props.clearSelected(item.id)
                                  }
                                >
                                  <ClearIcon />
                                  <span>Clear</span>
                                </Button>
                              ) : null}
                              {!this.props.isReadOnly ? (
                                <button className='Button member-notes-popup-root__dialog__category-notes_form__submit-btn'>
                                  Save
                                </button>
                              ) : null}
                            </Box>
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className='delete-wrapper'>
                {!this.props.isReadOnly ? (
                  <Box
                    component='span'
                    display='block'
                    onClick={() => this.props.deleteAdditionalCriteria(item.id)}
                  >
                    <DeleteIcon />
                  </Box>
                ) : null}
              </div>
            </div>
          </div>
        )
      );
    }
    return formContent;
  };

  render() {
    const { className = "" } = this.props;

    return (
      <div className={`custom-additional-criteria-builder ${className}`}>
        {this.getAdditionalCriterias(this.props.additionalCriterias)}
        <Box
          display='flex'
          justifyContent='flex-start'
          className='outer-button-wrapper'
        >
          {!this.props.isReadOnly ? (
            <Button
              className='Button advanced-grid-search__btn-clear'
              onClick={() => this.props.handleAddNewClick()}
            >
              <AddCircleIcon />
              <span>Add New</span>
            </Button>
          ) : null}
        </Box>
      </div>
    );
  }
}
