import { Button, Card } from "@material-ui/core";
import React, { Component } from "react";
import FormularySearch from "../formulary/Components/FormularySearch/FormularySearch";
import FormularyDetailsTop from "../NewFormulary/DrugDetails/components/FormularyDetailsTop/FormularyDetailsTop";
import DropDown from "../shared/Frx-components/dropdown/DropDown";
import TextBox from "../shared/Frx-components/text-box/TextBox";
import FormularyBody from "./FormularyBody/FormularyBody";
import { getFormularyDetails } from "../../mocks/formulary/formularyDetails";

interface formularyTopData {
  effectiveDate: string;
  formularyID: number;
  formularyName: string;
  terminationDate: string;
}

export default class SetupFormularyGrid extends Component {
  render() {
    return (
      <div>
        <div
          style={{ marginLeft: "60px", marginRight: "60px", marginTop: "50px" }}
          className="FormularyHeading"
        >
          {/* <FormularyHeading/> */}
          <FormularyDetailsTop formularyTopData={getFormularyDetails()} />
        </div>
        <div className="formularyBody">
          <FormularyBody />
        </div>
      </div>
    );
  }
}
