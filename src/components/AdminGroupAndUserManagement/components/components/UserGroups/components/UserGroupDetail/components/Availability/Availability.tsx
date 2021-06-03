import { Input } from "@material-ui/core";
import React from "react";
import { Select } from "antd";
import FrxTree from "../../../../../../../../shared/FrxTree";
import Grid from "@material-ui/core/Grid";
import MetaContent from "../../../../../../../../shared/Frx-components/meta-content/MetaContent"
import DropDown from "../../../../../../../../shared/Frx-components/dropdown/DropDown";
import TreeNodeLink from "../../../../../../../../shared/FrxTree/components/TreeNodeLink";
import CheckboxWithLabel from "../../../../../../../../shared/Frx-components/checkbox-with-label/CheckboxWithLabel";
import TreeList from "../../../../../Common/TreeList";
import "./Availability.scss"
const { Option } = Select;
export default class Availability extends React.Component<any, any> {
    state = {
        modalStatus: false,
        type: "",
    };
  renderNodeValue = (data: any = {}) => {
      if(this.props.summary != true)
        return
    return (
      <div className="tree-value-container">
        <div className="rolesDiv">Roles
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.0072 4.39863L2.36434 7.58613C2.11256 7.80645 1.70541 7.80645 1.45631 7.58613L0.850949 7.05645C0.599163 6.83613 0.599163 6.47988 0.850949 6.26191L3.43309 4.00254L0.850949 1.74316C0.599163 1.52285 0.599163 1.1666 0.850949 0.948633L1.45363 0.414258C1.70541 0.193945 2.11256 0.193945 2.36166 0.414258L6.00452 3.60176C6.25898 3.82207 6.25898 4.17832 6.0072 4.39863ZM11.1501 3.60176L7.5072 0.414258C7.25541 0.193945 6.84827 0.193945 6.59916 0.414258L5.99381 0.943945C5.74202 1.16426 5.74202 1.52051 5.99381 1.73848L8.57595 3.99785L5.99381 6.25723C5.74202 6.47754 5.74202 6.83379 5.99381 7.05176L6.59916 7.58144C6.85095 7.80176 7.25809 7.80176 7.5072 7.58144L11.1501 4.39395C11.4018 4.17832 11.4018 3.82207 11.1501 3.60176Z" fill="black"/>
          </svg>
          {data.roles && data.roles.map((role, index) => (
            <div className="role_tabs">{role}</div>  
          ))}
        </div> 
        <div className="userGroupDiv">User Groups
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.0072 4.39863L2.36434 7.58613C2.11256 7.80645 1.70541 7.80645 1.45631 7.58613L0.850949 7.05645C0.599163 6.83613 0.599163 6.47988 0.850949 6.26191L3.43309 4.00254L0.850949 1.74316C0.599163 1.52285 0.599163 1.1666 0.850949 0.948633L1.45363 0.414258C1.70541 0.193945 2.11256 0.193945 2.36166 0.414258L6.00452 3.60176C6.25898 3.82207 6.25898 4.17832 6.0072 4.39863ZM11.1501 3.60176L7.5072 0.414258C7.25541 0.193945 6.84827 0.193945 6.59916 0.414258L5.99381 0.943945C5.74202 1.16426 5.74202 1.52051 5.99381 1.73848L8.57595 3.99785L5.99381 6.25723C5.74202 6.47754 5.74202 6.83379 5.99381 7.05176L6.59916 7.58144C6.85095 7.80176 7.25809 7.80176 7.5072 7.58144L11.1501 4.39395C11.4018 4.17832 11.4018 3.82207 11.1501 3.60176Z" fill="black"/>
          </svg>
          {data.groups && data.groups.map((group, index) => (
            <div className="user_group_tabs">{group}</div>  
          ))}
        </div> 
        <div className="permissionDivUserGroup">Permissions
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.0072 4.39863L2.36434 7.58613C2.11256 7.80645 1.70541 7.80645 1.45631 7.58613L0.850949 7.05645C0.599163 6.83613 0.599163 6.47988 0.850949 6.26191L3.43309 4.00254L0.850949 1.74316C0.599163 1.52285 0.599163 1.1666 0.850949 0.948633L1.45363 0.414258C1.70541 0.193945 2.11256 0.193945 2.36166 0.414258L6.00452 3.60176C6.25898 3.82207 6.25898 4.17832 6.0072 4.39863ZM11.1501 3.60176L7.5072 0.414258C7.25541 0.193945 6.84827 0.193945 6.59916 0.414258L5.99381 0.943945C5.74202 1.16426 5.74202 1.52051 5.99381 1.73848L8.57595 3.99785L5.99381 6.25723C5.74202 6.47754 5.74202 6.83379 5.99381 7.05176L6.59916 7.58144C6.85095 7.80176 7.25809 7.80176 7.5072 7.58144L11.1501 4.39395C11.4018 4.17832 11.4018 3.82207 11.1501 3.60176Z" fill="black"/>
          </svg>
          <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.6802 4.85078C16.9108 1.95754 13.4078 0 9.39685 0C5.38589 0 1.88197 1.95891 0.113528 4.85105C0.0388884 4.97479 0 5.11149 0 5.25014C0 5.38878 0.0388884 5.52549 0.113528 5.64922C1.88294 8.54246 5.38589 10.5 9.39685 10.5C13.4078 10.5 16.9117 8.54109 18.6802 5.64895C18.7548 5.52521 18.7937 5.38851 18.7937 5.24986C18.7937 5.11122 18.7548 4.97451 18.6802 4.85078ZM9.39685 9.1875C8.46759 9.1875 7.55919 8.95657 6.78654 8.52391C6.01389 8.09125 5.41168 7.4763 5.05606 6.75682C4.70045 6.03733 4.60741 5.24563 4.7887 4.48183C4.96999 3.71803 5.41747 3.01644 6.07456 2.46577C6.73164 1.9151 7.56882 1.54009 8.48023 1.38816C9.39164 1.23623 10.3363 1.3142 11.1949 1.61222C12.0534 1.91024 12.7872 2.41492 13.3035 3.06244C13.8197 3.70996 14.0953 4.47124 14.0953 5.25C14.0956 5.76715 13.9743 6.27928 13.7382 6.75711C13.5022 7.23495 13.1562 7.66911 12.7198 8.03479C12.2835 8.40047 11.7654 8.6905 11.1952 8.88829C10.625 9.08608 10.0139 9.18775 9.39685 9.1875ZM9.39685 2.625C9.11727 2.62827 8.8395 2.66313 8.57104 2.72863C8.79233 2.98065 8.89852 3.29079 8.87035 3.6028C8.84219 3.91481 8.68153 4.20802 8.41752 4.42928C8.15351 4.65053 7.80363 4.78517 7.43132 4.80877C7.05902 4.83237 6.68895 4.74338 6.38822 4.55793C6.21698 5.08665 6.24789 5.64705 6.4766 6.16027C6.70532 6.67349 7.12032 7.11369 7.6632 7.41889C8.20607 7.7241 8.84949 7.87895 9.50288 7.86166C10.1563 7.84436 10.7867 7.65578 11.3055 7.32247C11.8244 6.98915 12.2054 6.52789 12.395 6.00359C12.5846 5.47929 12.5732 4.91837 12.3625 4.39977C12.1518 3.88116 11.7523 3.43099 11.2203 3.11262C10.6883 2.79425 10.0506 2.62371 9.39685 2.625Z" fill="#666666"/>
          </svg>
        </div> 
      </div>
    );
  };
    render() {
        const data = [
            {
                id: "1",
                key: "1",
                title: "Future Rx",
                styles: { color: "#684999", marginLeft: "0" },
                value: this.renderNodeValue({roles: ["Role 1","Role 2", "Role 3"], groups: ["User Group 1","User Group 2", "User Group 3"]}),
                children: [
                    {
                        id: "1.1",
                        key: "1.1",
                        title: "Health Net Community Solutions  |  HCN123",
                        styles: { color: "#F65A1C", marginLeft: "0" },
                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                        children: [
                            {
                                id: "1.1.1",
                                key: "1.1.1",
                                title: "HCN PPO  |  HNC3245943303A1",
                                styles: { color: "#1FBBC4", marginLeft: "0" },
                                value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                children: [
                                    {
                                        id: "1.1.1.1",
                                        key: "1.1.1.1",
                                        title: "Choice Enhanced  |  76-41165CPDC",
                                        styles: { color: "#80C483", marginLeft: "0" },
                                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                        children: [
                                            {
                                                id: "1.1.1.1.1",
                                                key: "1.1.1.1.1",
                                                title: "Colorado  |  77701000A2654DC",
                                                styles: { color: "#F4AF64", marginLeft: "0" },
                                                value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                                children: [
                                                    {
                                                        id: "1.1.1.1.1",
                                                        key: "1.1.1.1.1",
                                                        title: "Choice Enanced Dakota County  |  11AB130003PPODC",
                                                        styles: { color: "#F89090", marginLeft: "0" },
                                                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
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
                                value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                children: [
                                    {
                                        id: "1.1.2.1",
                                        key: "1.1.2.1",
                                        title: "Colorado  |  77701000A2654DC",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                    },
                                    {
                                        id: "1.1.2.2",
                                        key: "1.1.2.2",
                                        title: "Colorado  |  77701000A2654DC",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                        children: [
                                            {
                                                id: "1.1.2.2.1",
                                                title: "Choice Enanced Dakota County  |  11AB130003PPODC",
                                                styles: { color: "#F89090", marginLeft: "0" },
                                                value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
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
                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                        children: [
                            {
                                id: "1.1.2",
                                key: "1.1.2",
                                title: "Choice Standard  |  76-411365CPHC",
                                styles: { color: "#80C483", marginLeft: "0" },
                                value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                children: [
                                    {
                                        id: "1.1.2.1",
                                        key: "1.1.2.1",
                                        title: "Florida  |  77701000A2654FL",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
                                    },
                                    {
                                        id: "1.1.2.2",
                                        key: "1.1.2.2",
                                        title: "North Carolina  |  77701000A2654NC",
                                        styles: { color: "#F4AF64", marginLeft: "0" },
                                        value: this.renderNodeValue({roles: ["Role 1","Role 2"], groups: ["User Group 1","User Group 2"]}),
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
                  <div className="UserGrouplist-grid-container">
                    <div className="grid-container-header-wrapper">
                        <div className="search-field-container">
                            <Input
                                className="UserGrouplist-list-search"
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
                        <div className="field-container">
                        <div className="field-container">
                            <DropDown
                                className="UserGrouplist-type-dropdown"
                                placeholder="Owner"
                                options={["Owner", "None"]}
                            />
                        </div>
                            <DropDown
                                className="formulary-type-dropdown"
                                placeholder="Module"
                                options={["Module", "None"]}
                            />
                        </div>
                    </div>
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