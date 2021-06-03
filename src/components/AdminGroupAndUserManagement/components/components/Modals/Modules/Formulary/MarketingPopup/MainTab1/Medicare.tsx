import React, { Component } from "react";
import RadioButton from "../../../../../../../../shared/Frx-components/radio-button/RadioButton";
import DropDown from "../../../../../../../../shared/Frx-components/dropdown/DropDown";

import { Space, Table } from "antd";

const dataSource = [
  {
    key: "1",
    formulary_criteria: "Tier 0",
    legend_abbreviation: "",
    legend_display_text: "Tier0",
    special_characters: "",
    dns: ["Show All", "Show One"],
    special_tool: ["Show All", "Show One"],
    icon_selection: "Image",
  },
  {
    key: "2",
    formulary_criteria: "Tier 0",
    legend_abbreviation: "",
    legend_display_text: "Tier0",
    special_characters: "",
    dns: ["Show All", "Show One"],
    special_tool: ["Show All", "Show One"],
    icon_selection: "Image",
  },
  {
    key: "3",
    formulary_criteria: "Tier 0",
    legend_abbreviation: "",
    legend_display_text: "Tier0",
    special_characters: "",
    dns: ["Show All", "Show One"],
    special_tool: ["Show All", "Show One"],
    icon_selection: "Image",
  },
  {
    key: "4",
    formulary_criteria: "Tier 0",
    legend_abbreviation: "",
    legend_display_text: "Tier0",
    special_characters: "",
    dns: ["Show All", "Show One"],
    special_tool: ["Show All", "Show One"],
    icon_selection: "Image",
  },
  {
    key: "5",
    formulary_criteria: "Tier 0",
    legend_abbreviation: "",
    legend_display_text: "Tier0",
    special_characters: "",
    dns: ["Show All", "Show One"],
    special_tool: ["Show All", "Show One"],
    icon_selection: "Image",
  },
];

const columns = [
  {
    title: <p className="table-column-title">FORMULARY CRITERIA</p>,
    dataIndex: "formulary_criteria",
    key: "formulary_criteria",
  },
  {
    title: <p className="table-column-title">LEGEND ABBREVIATION</p>,
    dataIndex: "legend_abbreviation",
    key: "legend_abbreviation",
  },
  {
    title: <p className="table-column-title">LEGEND DISPLAY TEXT</p>,
    dataIndex: "legend_display_text",
    key: "legend_display_text",
  },
  {
    title: <p className="table-column-title">SPECIAL CHARACTERS</p>,
    dataIndex: "special_characters",
    key: "special_characters",
  },
  {
    title: <p className="table-column-title">DNS</p>,
    dataIndex: "dns",
    key: "dns",
    render(values) {
      return {
        children: (
          <DropDown
            placeholder="Classification"
            className="pa-info__input--dropdown"
            // dropdownClassName="formulary-service-year-dropdown"
            defaultValue={values[0]}
            options={values}
            // onSelect={this.onSelectforMedicare}
          />
        ),
      };
    },
  },
  {
    title: <p className="table-column-title">SPECIAL TOOL</p>,
    dataIndex: "special_tool",
    key: "special_tool",
    render(values) {
      return {
        children: (
          <DropDown
            placeholder="Classification"
            className="pa-info__input--dropdown"
            // dropdownClassName="formulary-service-year-dropdown"
            defaultValue={values[0]}
            options={values}
            // onSelect={this.onSelectforMedicare}
          />
        ),
      };
    },
  },
  {
    title: <p className="table-column-title">ICON SELECTION</p>,
    dataIndex: "icon_selection",
    key: "icon_selection",
  },
];

export class Medicare extends Component {
  render() {
    return (
      <div>
        <div className="content-box">
          <header className="content-box-header">
            <p>Title</p>
            <span>+</span>
          </header>
          <section className="">
            <Table dataSource={dataSource} columns={columns} bordered={true} pagination={false} size="middle" />
          </section>
        </div>
        <br />
        <div className="content-box">
          <header className="content-box-header">
            <p>Title</p>
            <span>+</span>
          </header>
          <section className="content-box-body">
            <label className="table-column-title">
              DO YOU WANT TO INCLUDE THE GENERIC NAME OF A DRUG NEXT TO THE BRAND NAME?
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
      </div>
    );
  }
}

export default Medicare;
