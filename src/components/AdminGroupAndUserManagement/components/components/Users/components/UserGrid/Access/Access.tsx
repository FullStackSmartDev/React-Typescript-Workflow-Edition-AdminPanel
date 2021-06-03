import React, { Component } from "react";
import FrxTree from "../../../../../../../shared/FrxTree";
import { Button } from "@material-ui/core";
import { SearchOutlined } from "@ant-design/icons";
import "./Access.scss";

const data = [
  {
    id: "1",
    key: "1",
    title: "Future Rx",
    styles: { color: "#684999", marginLeft: "0" },
    value: "",
    children: [
      {
        id: "1.1",
        key: "1.1",
        title: "Health Net Community Solutions  |  HCN123",
        styles: { color: "#F65A1C", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.1.1",
            key: "1.1.1",
            title: "HCN PPO  |  HNC3245943303A1",
            styles: { color: "#1FBBC4", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.1.1",
                key: "1.1.1.1",
                title: "Choice Enhanced  |  76-41165CPDC",
                styles: { color: "#80C483", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.1.1.1",
                    key: "1.1.1.1.1",
                    title: "Colorado  |  77701000A2654DC",
                    styles: { color: "#F4AF64", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.1.1.1.1",
                        key: "1.1.1.1.1.1",
                        title: "Choice Enhanced C1  |  11AB30001PPO2C1",
                        styles: { color: "#F89090", marginLeft: "0" },
                        value: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "1.1.2",
            key: "1.1.2",
            title: "Choice Standard  |  76-411365CPHC",
            styles: { color: "#80C483", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.2.1",
                key: "1.1.2.1",
                title: "Florida  |  77701000A2654FL",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
              {
                id: "1.1.2.2",
                key: "1.1.2.2",
                title: "North Carolina |  77701000A2654NC",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.2.2.1",
                    key: "1.1.2.2.1",
                    title: "Choice Standard NC1 |  11AB130003PPONC1",
                    styles: { color: "#F89090", marginLeft: "0" },
                    value: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        key: "1.2",
        title: "HCN EPO   |  HNC324594330EPO",
        styles: { color: "#684999", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.2.1",
            key: "1.2.1",
            title: "EPO Enhanced  |  76-411365EPOE",
            styles: { color: "#80C483", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.2.1.1",
                key: "1.2.1.1",
                title:
                  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |  77701000A2654FL",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
              {
                id: "1.2.1.2",
                key: "1.2.1.2",
                title: "South Carolina  |  77701000A2654SC",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
            ],
          },
        ],
      },
    ],
  },
];

export class Access extends Component {
  render() {
    return (
      <div className="access-container">
        <div className="access-topbar">
          <form className="example">
            <span>
              <SearchOutlined />
              <input type="text" name="search2" placeholder="Search" />
            </span>
          </form>
        </div>
        <div className="access-main">
          <div className="access-sidebar">
            <h6>All</h6>
            <div>
              <p>
                <span style={{ color: "#684999" }}>&#x25cf;</span> FutureRX
              </p>
              <p>
                <span style={{ color: "#F65A1C" }}>&#x25cf;</span> Customer
              </p>
              <p>
                <span style={{ color: "#3CBBC4" }}>&#x25cf;</span> Client
              </p>
              <p>
                <span style={{ color: "#80C483" }}>&#x25cf;</span> Carrier
              </p>
              <p>
                <span style={{ color: "#F4AF64" }}>&#x25cf;</span> Account
              </p>
              <p>
                <span style={{ color: "#F89090" }}>&#x25cf;</span> Group
              </p>
            </div>
          </div>
          <div className="access-body">
            <div className="formulary-tree-container">
              <div className="formulary-tree">
                <FrxTree checkable={false} data={data} />
              </div>
            </div>
            <div className="action-btn">
              <Button className="add-new-disaster-override">Save</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Access;
