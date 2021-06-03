import { Input } from "@material-ui/core";
import React from "react";
import FrxTree from "../../../../../../../../shared/FrxTree";
//import TreeNodeLink from "../../../../../shared/FrxTree/components/TreeNodeLink";
import TreeList from "../../../../../Common/TreeList";
import "./Availability.scss"
export default class Availability extends React.Component<any, any> {
    state = {
        modalStatus: false,
        type: "",
    };
    render() {
        const data = [
            {
                id: "1",
                key: "1",
                title: "Future Rx",
                styles: { color: "#684999", marginLeft: "0" },
                //value: this.renderNodeValue({ serial: "123456" }),
                children: [
                    {
                        id: "1.1",
                        key: "1.1",
                        title: "Health Net Community Solutions  |  HCN123",
                        styles: { color: "#F65A1C", marginLeft: "0" },
                        //value: this.renderNodeValue(),
                        children: [
                            {
                                id: "1.1.1",
                                key: "1.1.1",
                                title: "HCN PPO  |  HNC3245943303A1",
                                styles: { color: "#1FBBC4", marginLeft: "0" },
                                //value: this.renderNodeValue(),
                                children: [
                                    {
                                        id: "1.1.1.1",
                                        key: "1.1.1.1",
                                        title: "Choice Enhanced  |  76-41165CPDC",
                                        styles: { color: "#80C483", marginLeft: "0" },
                                        //value: this.renderNodeValue(),
                                        children: [
                                            {
                                                id: "1.1.1.1.1",
                                                key: "1.1.1.1.1",
                                                title: "Colorado  |  77701000A2654DC",
                                                styles: { color: "#F4AF64", marginLeft: "0" },
                                                //value: this.renderNodeValue(),
                                                children: [
                                                    {
                                                        id: "1.1.1.1.1",
                                                        key: "1.1.1.1.1",
                                                        title: "Choice Enanced Dakota County  |  11AB130003PPODC",
                                                        styles: { color: "#F89090", marginLeft: "0" },
                                                        //value: this.renderNodeValue(),
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            }
                            , {
                                id: "1.1.2",
                                key: "1.1.2",
                                title: "Choice Standard  |  76-411365CPHC",
                                styles: { color: "#80C483", marginLeft: "0" },
                                //value: this.renderNodeValue(),
                                children: [
                                    {
                                        id: "1.1.2.1",
                                        key: "1.1.2.1",
                                        title: "Colorado  |  77701000A2654DC",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        //value: this.renderNodeValue(),
                                    },
                                    {
                                        id: "1.1.2.2",
                                        key: "1.1.2.2",
                                        title: "Colorado  |  77701000A2654DC",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        //value: this.renderNodeValue(),
                                        children: [
                                            {
                                                id: "1.1.2.2.1",
                                                title: "Choice Enanced Dakota County  |  11AB130003PPODC",
                                                styles: { color: "#F89090", marginLeft: "0" },
                                                //value: this.renderNodeValue(),
                                            },
                                        ],
                                    },
                                ],
                            }
                        ],
                    },
                    {
                        id: "1.2",
                        key: "1.2",
                        title: "HCN EPO  |  HNC3245943303A1",
                        styles: { color: "#F65A1C", marginLeft: "0" },
                        //value: this.renderNodeValue(),
                        children: [
                            {
                                id: "1.1.2",
                                key: "1.1.2",
                                title: "Choice Standard  |  76-411365CPHC",
                                styles: { color: "#80C483", marginLeft: "0" },
                                //value: this.renderNodeValue(),
                                children: [
                                    {
                                        id: "1.1.2.1",
                                        key: "1.1.2.1",
                                        title: "Florida  |  77701000A2654FL",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        //value: this.renderNodeValue(),
                                    },
                                    {
                                        id: "1.1.2.2",
                                        key: "1.1.2.2",
                                        title: "North Carolina  |  77701000A2654NC",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        //value: this.renderNodeValue(),
                                        children: [],
                                    },
                                ],
                            }
                        ]

                    }
                ],
            },
        ];
        return (
            <>
                <div className="availability-container">

                    <div className="search-field-container">
                        <Input
                            className="rolelist-list-search"
                            placeholder="Search"
                            type="text"
                            disableUnderline={true}
                            startAdornment={
                                <svg
                                    className="member-search__icon"
                                    width="11"
                                    height="11"
                                    viewBox="0 0 11 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                        fill="#999999"
                                    />
                                </svg>
                            }
                        />
                    </div>

                    <div className="availibilty-tree-container">
                        <div className="identificationTable">
                            <div className="identificationTable-header">
                                <span>All</span>
                            </div>
                            <TreeList />
                        </div>

                        <div className="availibilty-tree">
                            <FrxTree checkable={true} data={data} />
                        </div>

                    </div>
                </div>
            </>
        )
    }
}