import React from "react";
import {
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import DropDown from "../dropdown/DropDown";
import CheckboxLabels from "../../../NewFormulary/DrugDetails/components/FormularyConfigure/components/search/CheckBox";
import { ReactComponent as Include } from "./assets/include.svg";
import { ReactComponent as Exclude } from "./assets/exclude.svg";
import { ReactComponent as UpDownArrowIcon } from "./assets/updownarrow.svg";
import { ReactComponent as AngleUpIcon } from "./assets/angleup.svg";
import { ReactComponent as InfoCircleIcon } from "./assets/infocircle.svg";
import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
interface Props {
  clear?: any;
  title: string;
  deleteField?: any;
  index?: any;
  checkBoxOpt?: any;
  catid?: number;
  isReadOnly?: boolean;
}

const IncludeExcludeOptions = [
  <Box display='flex' alignItems='center'>
    <Include />
    <Box ml={1}> include</Box>
  </Box>,
  <Box display='flex' alignItems='center'>
    <Exclude />
    <Box ml={1}> exculed </Box>
  </Box>,
];

export default class CategoryForm extends React.Component<Props, any> {
  render() {
    return (
      <div className='main-wrapper'>
        <div className='row-wrapper'>
          <div className='arrow-wrapper'>
            <Box component='span' display='block'>
              <UpDownArrowIcon />
            </Box>
          </div>
          <div className='search-wrapper include'>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<AngleUpIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <span>{this.props.title}</span>

                <div className='panel-tooltip'>
                  <Tooltip
                    classes={{
                      tooltip: "custom-tooltip panel-tooltip",
                    }}
                    title={this.props.title}
                    placement='top-start'
                    arrow
                  >
                    <InfoCircleIcon />
                  </Tooltip>
                </div>
                <span
                  className='additional-criteria-builder-copy'
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                >
                  <DropDown
                    value={IncludeExcludeOptions[0]}
                    options={IncludeExcludeOptions}
                  />
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <div className='search-form'>
                  <div className='from-panel'>
                    <span>Select the formulary file:</span>
                    {this.props.catid === 2 && (
                      <Button variant='contained'>Select all</Button>
                    )}
                  </div>
                  <CheckboxLabels checkBoxOpt={this.props.checkBoxOpt} />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='delete-wrapper'>
            {!this.props.isReadOnly ? (
              <Box
                component='span'
                display='block'
                onClick={() => this.props.deleteField(this.props.index)}
              >
                <DeleteIcon />
              </Box>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
