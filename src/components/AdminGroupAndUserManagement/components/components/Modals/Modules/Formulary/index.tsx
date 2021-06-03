import React from "react";
import FrxDialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxTree from "../../../../../../shared/FrxTree";
import TreeNodeLink from "../../../../../../shared/FrxTree/components/TreeNodeLink";
import TreeList from "../../../Common/TreeList";

import "../styles.scss";
import CmsSubmissionCalendar from "./CmsSubmissionCalendar/CmsSubmissionCalendar";
import MarketingPopup  from "./MarketingPopup/MarketingPopup";
import MedicareReasonCode from "./MedicareReasonCode/MedicareReasonCode";
const marginLeft = 19;

export default class Formulary extends React.Component<any, any> {
  state = {
    modalStatus: false,
    type: "",
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
    this.setState({ type }, () => {
      this.handleOpenModal();
    });
  };

  renderNodeModalsBody = () => {
    const { type } = this.state;

    switch (type) {
      case "1":
        return <CmsSubmissionCalendar />;
        break;
      case "2":
        return <MedicareReasonCode />;
        break;
      case "3":
        return <MarketingPopup />;
        break;

      default:
        return <div></div>;
        break;
    }
  };

  renderNodeValue = (data: any = {}) => {
    return (
      <div className="tree-value-container">
        <TreeNodeLink
          label="CMS Submission CalendaR"
          iconColor="#E76262"
          onClick={() => this.renderNodeModals("1")}
        />
        <TreeNodeLink
          label="Medicare Reason Codes"
          onClick={() => this.renderNodeModals("2")}
        />
        <TreeNodeLink
          label="Marketing Materials Configuration"
          onClick={() => this.renderNodeModals("3")}
        />
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
                ],
              },
              {
                id: "1.1.2",
                key: "1.1.2",
                title: "Choice Standard  |  76-411365CPHC",
                styles: { color: "#80C483", marginLeft: "0" },
                value: this.renderNodeValue(),
                children: [
                  {
                    id: "1.1.2.1",
                    key: "1.1.2.1",
                    title: "Florida  |  77701000A2654FL",
                    styles: { color: "#F4AF64", marginLeft: "0" },
                    value: this.renderNodeValue(),
                  },
                  {
                    id: "1.1.2.2",
                    key: "1.1.2.2",
                    title: "North Carolina |  77701000A2654NC",
                    styles: { color: "#F4AF64", marginLeft: "0" },
                    value: this.renderNodeValue(),
                    children: [
                      {
                        id: "1.1.2.2.1",
                        title: "Choice Standard NC1 |  11AB130003PPONC1",
                        styles: { color: "#F89090", marginLeft: "0" },
                        value: this.renderNodeValue(),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="formulary-tree-container">
        <div className="identificationTable">
          <TreeList />
        </div>
        <div className="formulary-tree">
          <FrxTree data={data} />
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title="Advance Search"
            handleClose={this.handleCloseModal}
            handleAction={() => console.log("no action")}
            open={this.state.modalStatus}
            showActions={false}
            className="drug-grid-advance-search member-notes-popup-root"
            height="100%"
            width="90%"
          >
            {this.renderNodeModalsBody()}
          </FrxDialogPopup>
        </div>
      </div>
    );
  }
}
