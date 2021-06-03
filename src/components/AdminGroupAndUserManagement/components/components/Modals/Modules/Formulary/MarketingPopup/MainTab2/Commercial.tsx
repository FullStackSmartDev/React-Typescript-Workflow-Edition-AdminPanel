import React, { Component } from "react";
import RadioButton from "../../../../../../../../shared/Frx-components/radio-button/RadioButton";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import { Space, Table } from "antd";

export class Commercial extends Component {
  render() {
    return (
      <div>
        <div className="content-box">
          <header className="content-box-header">
            <p>Alternative Medication Logic</p>
            <span>+</span>
          </header>
          <section className="content-box-body">
            <label className="table-column-title">HOW MANY ALTERNATIVE DRUGS SHOULD DISPLAY?</label>
            <br />
            <input className="input-field" style={{ width: "400px" }} />
          </section>
        </div>

        <br />

        <div className="content-box">
          <header className="content-box-header">
            <p>Formulary/Non-Formulary Alternatives</p>
            <span>+</span>
          </header>
          <section className="content-box-body">
            <label className="table-column-title">
              DO YOU WANT TO INCLUDE NON-FORMULARY PRODUCTS ON THE SEARCH TOOL?
            </label>
            <br />
            <Space size="large">
              <div className="marketing-material radio-group">
                <RadioButton
                  label="Yes"
                  name="add-filter-2"
                  onClick={() => {}}
                  // checked={}
                  // disabled={}
                  // checked={}
                />
                <RadioButton
                  label="No"
                  name="add-filter-2"
                  onClick={() => {}}
                  // checked={}
                  // disabled={}
                  // checked={}
                />
              </div>
            </Space>
          </section>
        </div>

        <br />

        <div className="content-box">
          <header className="content-box-header">
            <p>Search Tool Header</p>
            <span>+</span>
          </header>
          <section className="content-box-body">
            <div style={{ width: "800px", margin: "auto" }}>
              <FroalaEditor tag="textarea" />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Commercial;
