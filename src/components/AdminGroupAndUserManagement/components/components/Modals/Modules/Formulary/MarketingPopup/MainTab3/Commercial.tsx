import React, { Component } from "react";
import DropDown from "../../../../../../../../shared/Frx-components/dropdown/DropDown";

import { Grid } from "@material-ui/core";

import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    category: "Override Category",
    category_descriptor: "",
    class: "Override Class",
    class_descriptor: "",
  },
  {
    key: "2",
    category: "Override Category",
    category_descriptor: "",
    class: "Override Class",
    class_descriptor: "",
  },
  {
    key: "3",
    category: "Override Category",
    category_descriptor: "",
    class: "Override Class",
    class_descriptor: "",
  },
  {
    key: "4",
    category: "Override Category",
    category_descriptor: "",
    class: "Override Class",
    class_descriptor: "",
  },
  {
    key: "5",
    category: "Override Category",
    category_descriptor: "Text Field",
    class: "Override Class",
    class_descriptor: "Class Descriptor",
  },
  {
    key: "6",
    category: "Override Category",
    category_descriptor: "Text Field",
    class: "Override Class",
    class_descriptor: "Class Descriptor",
  },
  {
    key: "7",
    category: "Override Category",
    category_descriptor: "Text Field",
    class: "Override Class",
    class_descriptor: "Class Descriptor",
  },
  {
    key: "8",
    category: "Override Category",
    category_descriptor: "Text Field",
    class: "Override Class",
    class_descriptor: "Class Descriptor",
  },
  {
    key: "9",
    category: "Override Category",
    category_descriptor: "Text Field",
    class: "Override Class",
    class_descriptor: "Class Descriptor",
  },
  {
    key: "10",
    category: "Override Category",
    category_descriptor: "Text Field",
    class: "Override Class",
    class_descriptor: "Class Descriptor",
  },
];

const columns = [
  {
    title: <p className="table-column-title">CATEGORY</p>,
    dataIndex: "category",
    key: "category",
  },
  {
    title: <p className="table-column-title">CATEGORY DESCRIPTOR</p>,
    dataIndex: "category_descriptor",
    key: "category_descriptor",
    render(values) {
      return {
        children: <input className="input-field" />,
      };
    },
  },
  {
    title: <p className="table-column-title">CLASS</p>,
    dataIndex: "class",
    key: "class",
  },
  {
    title: <p className="table-column-title">CLASS DESCRIPTOR</p>,
    dataIndex: "class_descriptor",
    key: "class_descriptor",
    render(values) {
      return {
        children: <input className="input-field" />,
      };
    },
  },
];

export class Commercial extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            <label className="table-column-title">LIST NAMES</label>
            <br />
            <Grid container>
              <Grid item xs={8}>
                <input className="input-field" />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "left" }}>
                <div className="button-styling">
                  <button>Create List</button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <label className="table-column-title">SELECTED LIST</label>
            <br />
            <Grid container>
              <Grid item xs={7}>
                <DropDown
                  placeholder="Classification"
                  className="pa-info__input--dropdown"
                  // dropdownClassName="formulary-service-year-dropdown"
                  // defaultValue={}
                  options={["value1", "value2"]}
                  // onSelect={this.onSelectforMedicare}
                />
              </Grid>
              <Grid item xs={3}>
                <div className="button-styling">
                  <button>Apply</button>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="button-styling">
                  <button>Clone</button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <div className="content-box">
          <section className="">
            <Table dataSource={dataSource} columns={columns} bordered={true} pagination={false} size="middle" />
          </section>
        </div>
      </div>
    );
  }
}

export default Commercial;
