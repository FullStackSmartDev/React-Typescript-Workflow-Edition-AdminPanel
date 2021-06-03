import { Container } from "@material-ui/core";
import React, { Component } from "react";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion";
import "./SearchToolConfiguration.scss";
import "../../NewFormulary/MassMaintenance/setup/MassMaintenanceSetup.scss";
import { Input } from "antd";
import RadioButton from "../../shared/Frx-components/radio-button/RadioButton";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorButton from "react-froala-wysiwyg/FroalaEditorButton";
import Button from "../../shared/Frx-components/button/Button";

class SearchToolConfiguration extends Component {
  state = {
    headerModel: "",
    saveHeaderModel: "",
    footerModel: "",
    saveFooterModel: "",
  };

  handleHeaderModelChange = (model) => {
    this.setState({
      headerModel: model,
    });
  };

  saveOnClickHeaderBtn = () => {
    this.setState({
      saveHeaderModel: this.state.headerModel,
    });
  };

  handleFooterModelChange = (model) => {
    this.setState({
      footerModel: model,
    });
  };
  saveOnClickFooterBtn = () => {
    this.setState({
      saveFooterModel: this.state.footerModel,
    });
  };
  render() {
    const { headerModel, footerModel } = this.state;

    const config = {
      placeholderText: "",
    };
    return (
      <div className="__search-tool-configuration">
        <div className="m-t-20 m-b-20">
          <CustomAccordion name="Alternative Medication Logic">
            <Container>
              <label className="all-label">
                how many alternative drugs should display?
              </label>
              <div className="root-container">
                <Input placeholder="" className="alternate-drugs" />
              </div>
            </Container>
          </CustomAccordion>
          <CustomAccordion name="Formulary/Non-Formulary Alternatives">
            <Container>
              <label className="all-label">
                do you want to include non-formulary products on the search
                tool?
              </label>
              <div className="root-container">
                <RadioButton label="Yes" name="search-tool" checked />
                <RadioButton label="No" name="search-tool" />
              </div>
            </Container>
          </CustomAccordion>
          <CustomAccordion name="Search Tool Header">
            <Container>
              <FroalaEditor
                tag="textarea"
                config={config}
                model={headerModel}
                onModelChange={this.handleHeaderModelChange}
              />
              <div className="move-right">
                <Button label={"Save"} onClick={this.saveOnClickHeaderBtn} />
              </div>
            </Container>
          </CustomAccordion>
          <CustomAccordion name="Search Tool Footer">
            <Container>
              <FroalaEditor
                tag="textarea"
                config={config}
                model={footerModel}
                onModelChange={this.handleFooterModelChange}
              />
              <div className="move-right">
                <Button label={"Save"} onClick={this.saveOnClickFooterBtn} />
              </div>
            </Container>
          </CustomAccordion>
        </div>
      </div>
    );
  }
}

export default SearchToolConfiguration;
