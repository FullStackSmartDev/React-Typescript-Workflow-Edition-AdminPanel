import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import { ReactComponent as InfoCircle } from "./assets/infocircle.svg";

export default class FormularyExpandedFormularyDesignlDetails extends React.Component<
  any,
  any
> {
  render() {
    return (
      <div className="formulary-expanded-details-right__content_2">
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?
            <InfoCircle style={{ marginLeft: "0.5em" }} />
          </div>
          <div className="formulary-info-field__value">
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 1"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 2"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 3"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="N/A"
              labelPlacement="end"
            />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS?
            <span className="formulary-info-field__required">*</span>
            <InfoCircle style={{ marginLeft: "0.5em" }} />
          </div>
          <div className="formulary-info-field__value">
            {" "}
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-type-material-radio"
            />
            <RadioButton label="No" name="pa-type-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?
            <span className="formulary-info-field__required">*</span>
            <InfoCircle style={{ marginLeft: "0.5em" }} />
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-theray-type-material-radio"
            />
            <RadioButton label="No" name="pa-theray-type-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 1"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 2"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="N/A"
              labelPlacement="end"
            />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?
            <span className="formulary-info-field__required">*</span>
            <InfoCircle style={{ marginLeft: "0.5em" }} />
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-restricted-material-radio"
            />
            <RadioButton label="No" name="pa-restricted-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?
            <span className="formulary-info-field__required">*</span>
            <InfoCircle style={{ marginLeft: "0.5em" }} />
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-included-material-radio"
            />
            <RadioButton label="No" name="pa-included-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-expedited-material-radio"
            />
            <RadioButton label="No" name="pa-expedited-material-radio" />
          </div>
        </div>
        <div className="formulary-info-field">
          <button
            onClick={() => this.props.formularyToggle()}
            className="Button select-formulary-popup-root__submit-btn"
          >
            View Full Formulary
          </button>
        </div>
      </div>
    );
  }
}
