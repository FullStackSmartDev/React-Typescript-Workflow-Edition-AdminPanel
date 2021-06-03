import React from "react";
import { Input, Select } from "antd";

import FrxDialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxTree from "../../../../../../shared/FrxTree";
import TreeNodeLink from "../../../../../../shared/FrxTree/components/TreeNodeLink";
import TreeList from "../../../Common/TreeList";

import "../styles.scss";
import AdjuctionInfo from "./AdjuctionInfo/AdjuctionInfo";
import HistoricalClaimProcessing from "./HistoricalClaimProcessing/HistoricalClaimProcessing";
import CheckboxWithLabel from "../../../../../../shared/Frx-components/checkbox-with-label/CheckboxWithLabel";
import MetaContent from "../../../../../../shared/Frx-components/meta-content/MetaContent";

const { Option } = Select;
const marginLeft = 19;

export default class Formulary extends React.Component<any, any> {
  state = {
    modalStatus: false,
    type: "",
    modalTitle: "",
  };

  handleOpenModal = () => {
    this.setState({
      modalStatus: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalStatus: false,
      type: "",
    });
  };

  renderNodeModals = (type) => {
    this.setState(
      {
        type,
        modalTitle:
          type === "1"
            ? "ADJUDICATION PACKAGE"
            : "HISTORICAL CLAIM PROCESSING WINDOW",
      },
      () => {
        this.handleOpenModal();
      }
    );
  };

  renderNodeModalsBody = () => {
    const { type } = this.state;

    switch (type) {
      case "1":
        return <AdjuctionInfo />;
        break;
      case "2":
        return <HistoricalClaimProcessing />;
        break;
      default:
        return <div></div>;
        break;
    }
  };

  renderNodeValue = (data: any = {}) => {
    return (
      <div className="tree-value-container">
        {/* {data && data.serial && <div>{data.serial}</div>} */}

        <div className="tree-meta-information">
          <MetaContent label="BIN" value="1234567" />
          <MetaContent label="PCN" value="" />
        </div>

        <div className="tree-meta-information">
          <div className="meta-info-input">
            <MetaContent label="Medicaid Submitter ID" />
            <Input className="meta-info-input__field"></Input>
          </div>

          <div className="meta-info-dropdown">
            <MetaContent label="State" />
            <Select
              style={{ width: "170px", height: "22px" }}
              onChange={(value) => console.log(value)}
            >
              <Option value="option-1">Option 1</Option>
              <Option value="option-2">Option 2</Option>
              <Option value="option-3">Option 3</Option>
            </Select>
          </div>
        </div>

        <div className="tree-checkbox-list" style={{ marginBottom: "4px" }}>
          <CheckboxWithLabel>SUSPEND ADJUDICATION</CheckboxWithLabel>
          <CheckboxWithLabel>use as submitted group</CheckboxWithLabel>
        </div>

        <div className="tree-node-link-container">
          <TreeNodeLink
            label="Adjudication info"
            iconColor="#E76262"
            onClick={() => this.renderNodeModals("1")}
          />
        </div>
        
        <div className="tree-node-link-container">
          <TreeNodeLink
            label="Historical Claim Processing"
            onClick={() => this.renderNodeModals("2")}
          />
        </div>
      </div>
    );
  };

  render() {
    /**
     * {
     *  id: "string",
     *  key: "string",
     *  title: "string",
     *  styles: { color:"" },
     *  value: string | React Component,
     *
     * }
     */
    const data = [
      {
        id: "1",
        key: "1",
        title: "Future Rx",
        styles: { color: "#684999", marginLeft: "0" },
        value: this.renderNodeValue({ serial: "123456" }),
        children: [
          {
            id: "1.1",
            key: "1.1",
            title: "Health Net Community Solutions  |  HCN123",
            styles: { color: "#F65A1C", marginLeft: "0" },
            value: this.renderNodeValue(),
            children: [
              {
                id: "1.1.1",
                key: "1.1.1",
                title: "HCN PPO  |  HNC3245943303A1",
                styles: { color: "#1FBBC4", marginLeft: "0" },
                value: this.renderNodeValue(),
                children: [
                  {
                    id: "1.1.1.1",
                    key: "1.1.1.1",
                    title: "Choice Enhanced  |  76-41165CPDC",
                    styles: { color: "#80C483", marginLeft: "0" },
                    value: this.renderNodeValue(),
                    children: [
                      {
                        id: "1.1.1.1.1",
                        key: "1.1.1.1.1",
                        title: "Colorado  |  77701000A2654DC",
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: this.renderNodeValue(),
                        children: [
                          {
                            id: "1.1.1.1.1",
                            key: "1.1.1.1.1",
                            title: "Choice Enhanced C1  |  11AB30001PPO2C1",
                            styles: { color: "#F89090", marginLeft: "0" },
                            value: this.renderNodeValue(),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "1.1.1.2",
                    key: "1.1.1.2",
                    title: "Choice Standard  |  76-411365CPHC",
                    styles: { color: "#80C483", marginLeft: "0" },
                    value: this.renderNodeValue(),
                    children: [
                      {
                        id: "1.1.1.2.1",
                        key: "1.1.1.2.1",
                        title: "Florida  |  77701000A2654FL",
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: this.renderNodeValue(),
                      },
                      {
                        id: "1.1.1.2.2",
                        key: "1.1.1.2.2",
                        title: "Florida  |  77701000A2654FL",
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: this.renderNodeValue(),
                        children: [
                          {
                            id: "1.1.1.2.2.1",
                            key: "1.1.1.2.2.1",
                            title: "Choice Enhanced C1  |  11AB30001PPO2C1",
                            styles: { color: "#F89090", marginLeft: "0" },
                            value: this.renderNodeValue(),
                          }
                        ]
                      }
                    ]
                  }
                ],
              },
              {
                id: "1.1.2",
                key: "1.1.2",
                title: "HCN PPO  |  HNC3245943303A1",
                styles: { color: "#1FBBC4", marginLeft: "0" },
                value: this.renderNodeValue(),
                children: [
                  {
                    id: "1.1.2.1",
                    key: "1.1.2.1",
                    title: "Choice Standard  |  76-411365CPHC",
                    styles: { color: "#80C483", marginLeft: "0" },
                    value: this.renderNodeValue(),
                    children: [
                      {
                        id: "1.1.2.1.1",
                        key: "1.1.2.1.1",
                        title: "Florida  |  77701000A2654FL",
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: this.renderNodeValue(),
                      },
                      {
                        id: "1.1.2.1.2",
                        key: "1.1.2.1.2",
                        title: "Florida  |  77701000A2654FL",
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: this.renderNodeValue(),
                      }
                    ]
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="adjudication-container formulary-tree-container">
        <div className="identificationTable">
          <TreeList />
        </div>
        <div className="formulary-tree">
          <FrxTree data={data} />
          <FrxDialogPopup
            showCloseIcon={true}
            positiveActionText="Save"
            negativeActionText=""
            title={this.state.modalTitle}
            handleClose={this.handleCloseModal}
            handleAction={() => console.log("no action")}
            open={this.state.modalStatus}
            showActions={true}
            className="modulesModalContainer"
          >
            {this.renderNodeModalsBody()}
          </FrxDialogPopup>
        </div>
      </div>
    );
  }
}
