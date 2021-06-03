import React, { Component } from "react";
import DropDown from "../../../../../../../../shared/Frx-components/dropdown/DropDown";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    tier_number: "Tier 0",
    tier_description: "Tier Description",
    cost_share: ["Copay", "Co-Insurance"],
    value: "Co-Insurance",
  },
  {
    key: "2",
    tier_number: "Tier 0",
    tier_description: "Tier Description",
    cost_share: ["Copay", "Co-Insurance"],
    value: "",
  },
  {
    key: "3",
    tier_number: "Tier 0",
    tier_description: "Tier Description",
    cost_share: ["Copay", "Co-Insurance"],
    value: "",
  },
  {
    key: "4",
    tier_number: "Tier 0",
    tier_description: "Tier Description",
    cost_share: ["Copay", "Co-Insurance"],
    value: "",
  },
  {
    key: "5",
    tier_number: "Tier 0",
    tier_description: "Tier Description",
    cost_share: ["Copay", "Co-Insurance"],
    value: "",
  },
];

const columns = [
  {
    title: <p className="table-column-title">TIER NUMBER</p>,
    dataIndex: "tier_number",
    key: "tier_number",
  },
  {
    title: <p className="table-column-title">TIER DESCRIPTION</p>,
    dataIndex: "tier_description",
    key: "tier_description",
  },
  {
    title: <p className="table-column-title">COST SHARE</p>,
    dataIndex: "cost_share",
    key: "cost_share",
    width: 250,
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
    title: <p className="table-column-title">VALUE</p>,
    dataIndex: "value",
    key: "value",
    width: 350,
    render(values) {
      return {
        children: (
          <>
            <input className="input-field" /> <span>&nbsp;%</span>
          </>
        ),
      };
    },
  },
];

export class Commercial extends Component {
  render() {
    return (
      <div>
        <div className="content-box">
          <header className="content-box-header"></header>
          <section className="">
            <Table dataSource={dataSource} columns={columns} bordered={true} pagination={false} size="middle" />
          </section>
        </div>
      </div>
    );
  }
}

export default Commercial;
