import React from "react";
import FrxTree, { ConnectedColors, NodeIcon } from "../../../../shared/FrxTree";
import TreeList from "../../../../shared/FrxTree/components/TreeList";

import "./styles.scss";

class Hierarchy extends React.Component<any, any> {
  state = {
    modalStatus: false,
    type: "",
    modalTitle: "",
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
                  {
                    id: "1.1.1.2",
                    key: "1.1.1.2",
                    title: "Choice Standard  |  76-411365CPHC",

                    styles: { color: "#80C483", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.1.2.1",
                        key: "1.1.1.2.1",
                        title: "Colorado  |  77701000A2654DC",

                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                      },
                      {
                        id: "1.1.1.2.2",
                        key: "1.1.1.2.2",
                        title: "Colorado  |  77701000A2654DC",

                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                        children: [
                          {
                            id: "1.1.1.2.2.1",
                            key: "1.1.1.2.2.1",
                            title:
                              "Choice Enanced Dakota County  |  11AB130003PPODC",

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
                title: "HCN EPO  |  HNC3245943303A1",

                styles: { color: "#1FBBC4", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.2.1",
                    key: "1.1.2.1",
                    title: "EPO Enhanced  |  76-411365EPOE",

                    styles: { color: "#80C483", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.2.1.1",
                        key: "1.1.2.1.1",
                        title: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |  77701000A2654FL",

                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                      },
                      {
                        id: "1.1.2.1.2",
                        key: "1.1.2.1.2",
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
        ],
      },
    ];

    return (
      <div className="module-management-container formulary-tree-container">
        <div className="identificationTable">
          <TreeList type="expectationLevelData"/>
        </div>
        <div className="formulary-tree">
          <FrxTree
            checkable={true}
            connectorColor={ConnectedColors.Grey}
            nodeIcon={NodeIcon.Expandable}
            data={data}
          />
        </div>
      </div>
    );
  }
}

export default Hierarchy;
