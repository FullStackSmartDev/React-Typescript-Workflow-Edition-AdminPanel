import { Input } from "@material-ui/core";
import { Button } from "antd";
import React, { Fragment } from "react";
import { getUserGroupListData } from "../../../../../../../mocks/grid/admin-usergroup-mock";
import { UserGroupsListGridColumns } from "../../../../../../../utils/grid/columns";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import PanelHeader from "../../../../../../shared/Frx-components/panel-header/PanelHeader";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxGridContainer";

import "./UserGroupsList.scss"

export default class UserGroupList extends React.Component<any, any> {
    state = {
        isUserGroupClick: false,
        UserGroupListData: getUserGroupListData()
    };
    onUserGroupNameClick = (id: any) => {
        this.setState({ isUserGroupClick: true });
    };
    onUserNameClick = (id: any) => {
       console.log("Name Click");
    };
    render() {
        return (
            <Fragment>
                {this.state.isUserGroupClick === false ? (

                    <div className="UserGrouplist-grid-container">
                        <div className="grid-container-header-wrapper">
                            <div className="grid-name-fields">
                                <PanelHeader
                                    title="UserGroup List"
                                    tooltip="UserGroup List"
                                    className="UserGrouplist-grid-panel-header"
                                />
                            </div>
                            <div className="field-container">
                                <DropDown
                                    className="UserGrouplist-type-dropdown"
                                    placeholder="All"
                                    options={["All", "None"]}
                                />
                            </div>
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
                                <DropDown
                                    className="formulary-type-dropdown"
                                    placeholder="Active"
                                    options={["Active", "Inactive"]}
                                />
                            </div>
                            <div className="action-btn">
                    <Button className="add-new-UserGroup-btn" onClick={this.props.showFormToggle}>
                      + Add New UserGroup
                    </Button>
                  </div>
                            {/* <label>Search Customer: </label>
                    <input />
                    <div className="search-customer">
                      <Button className="search-customer-btn">
                        
                      </Button>
                    </div> */}
                            {/* <div className="action-btn">
                    <Button className="add-new-customer-btn">
                      Add New Customer
                    </Button>
                  </div> */}
                        </div>
                        <div className="UserGrouplist-grid-inner-container">
                            <FrxGridContainer
                                enableSearch
                                enableColumnDrag
                                onSearch={() => { }}
                                enableSettings
                                fixedColumnKeys={["claimId"]}
                                gridName=""
                                isFetchingData={false}
                                columns={UserGroupsListGridColumns({
                                    onUserGroupNameClick: (id: any) =>
                                        this.onUserGroupNameClick(id),
                                })}
                                data={this.state.UserGroupListData}
                                pagintionPosition="topRight"
                                onSettingsClick="grid-menu"
                                scroll={{ x: 0, y: 420 }}
                                totalRowsCount={50}
                                expandable={{
                                    isExpandable: true,
                                    expandIconColumnIndex:
                                    UserGroupsListGridColumns({}).length + 1,
                                    expandedRowRender: (props) => (
                                      <div></div>
                                    ),
                                    expandCloseIcon: (
                                      <span>
                                        <svg
                                          width="9"
                                          height="5"
                                          viewBox="0 0 9 5"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                                            fill="#999999"
                                          />
                                        </svg>
                                      </span>
                                    ),
                                    expandOpenIcon: (
                                      <span>
                                        <svg
                                          width="5"
                                          height="9"
                                          viewBox="0 0 5 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                                            fill="#323C47"
                                          />
                                        </svg>
                                      </span>
                                    ),
                              }}
                            />
                        </div>
                        <div className="grid-container-footer-wrapper">
                            <div className="btnwrapper">
                                <Button className="close-btn">
                                    {/* <Link to="/bazaar-partner">
                                        Close
                                        </Link> */}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div></div>
                    )
                }
            </Fragment>
        );
    }
}