import React from "react";
import { Grid } from "@material-ui/core";
import { getUserGroupsUsersList } from "../../../../../../../../../mocks/grid/admin-roles-mock";
import "./Users.scss"
import { Input, InputLabel } from "@material-ui/core";
import { Button } from "antd";
import DropDown from "../../../../../../../../shared/Frx-components/dropdown/DropDown";

const EyeIcon = (props) => (
    <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6802 5.06758C16.9108 2.17434 13.4078 0.216797 9.39685 0.216797C5.38589 0.216797 1.88197 2.1757 0.113528 5.06785C0.0388884 5.19158 0 5.32829 0 5.46693C0 5.60558 0.0388884 5.74228 0.113528 5.86602C1.88294 8.75926 5.38589 10.7168 9.39685 10.7168C13.4078 10.7168 16.9117 8.75789 18.6802 5.86574C18.7548 5.74201 18.7937 5.60531 18.7937 5.46666C18.7937 5.32801 18.7548 5.19131 18.6802 5.06758ZM9.39685 9.4043C8.46759 9.4043 7.55919 9.17337 6.78654 8.74071C6.01389 8.30805 5.41168 7.6931 5.05606 6.97361C4.70045 6.25413 4.60741 5.46243 4.7887 4.69863C4.96999 3.93483 5.41747 3.23323 6.07456 2.68256C6.73164 2.13189 7.56882 1.75688 8.48023 1.60495C9.39164 1.45303 10.3363 1.531 11.1949 1.82902C12.0534 2.12704 12.7872 2.63172 13.3035 3.27924C13.8197 3.92676 14.0953 4.68803 14.0953 5.4668C14.0956 5.98395 13.9743 6.49608 13.7382 6.97391C13.5022 7.45174 13.1562 7.88591 12.7198 8.25159C12.2835 8.61727 11.7654 8.9073 11.1952 9.10509C10.625 9.30287 10.0139 9.40455 9.39685 9.4043ZM9.39685 2.8418C9.11727 2.84507 8.8395 2.87993 8.57104 2.94543C8.79233 3.19745 8.89852 3.50759 8.87035 3.81959C8.84219 4.1316 8.68153 4.42482 8.41752 4.64607C8.15351 4.86733 7.80363 5.00196 7.43132 5.02557C7.05902 5.04917 6.68895 4.96018 6.38822 4.77473C6.21698 5.30344 6.24789 5.86385 6.4766 6.37707C6.70532 6.89029 7.12032 7.33048 7.6632 7.63569C8.20607 7.9409 8.84949 8.09575 9.50288 8.07845C10.1563 8.06116 10.7867 7.87258 11.3055 7.53926C11.8244 7.20595 12.2054 6.74468 12.395 6.22039C12.5846 5.69609 12.5732 5.13517 12.3625 4.61656C12.1518 4.09796 11.7523 3.64779 11.2203 3.32942C10.6883 3.01105 10.0506 2.84051 9.39685 2.8418Z" fill="#666666"/>
</svg> 
);

export default class Users extends React.Component<any, any> {
    state = {
        UsersList: getUserGroupsUsersList()
    }

    addIconClick = (id: number) => {
        let selectedUUsersItem = this.state.UsersList.find(p=>p.id === id);
        if(selectedUUsersItem != undefined){
            selectedUUsersItem.isIconClick = true;
        }
        
        this.setState({UsersList: this.state.UsersList.map(el => (el.id === id ? {...el, selectedUUsersItem}:el))
        
        });
    }

    subtractIconClick = (id: number) => {
        let selectedUUsersItem = this.state.UsersList.find(p=>p.id === id);
        if(selectedUUsersItem != undefined){
            selectedUUsersItem.isIconClick = false;
        }
        
        this.setState({UsersList: this.state.UsersList.map(el => (el.id === id ? {...el, selectedUUsersItem}:el))
        
        });
    }

    getAllUsersList() {
        let UsersList = {};
        UsersList = this.state.UsersList.filter(p => p.isIconClick === false).map((UsersList, index) => {
            return (
                <ul>
                    <li>
                        <div className="top">{UsersList.name}</div>
                        <div className="bottom">{UsersList.company}</div>
                    </li>
                    <li>
                    <EyeIcon />
                        <svg onClick={() => this.addIconClick(UsersList.id)} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.00774 2.16391C0.246501 4.93321 0.246501 9.43934 3.00774 12.2087C5.76898 14.978 10.262 14.978 13.0232 12.2087C15.7845 9.43934 15.7845 4.93322 13.0232 2.16391C10.262 -0.605398 5.76898 -0.605398 3.00774 2.16391ZM11.0972 6.6401C11.1699 6.63823 11.2422 6.65098 11.3099 6.67759C11.3776 6.70419 11.4393 6.74413 11.4914 6.79503C11.5434 6.84593 11.5848 6.90677 11.6131 6.97397C11.6413 7.04116 11.6559 7.11335 11.6559 7.18628C11.6559 7.25921 11.6413 7.33139 11.6131 7.39859C11.5848 7.46579 11.5434 7.52663 11.4914 7.57753C11.4393 7.62843 11.3776 7.66836 11.3099 7.69497C11.2422 7.72158 11.1699 7.73433 11.0972 7.73246L8.56031 7.7327L8.56007 10.277C8.55643 10.4194 8.49746 10.5548 8.39573 10.6542C8.29399 10.7537 8.15755 10.8093 8.01548 10.8093C7.87341 10.8093 7.73697 10.7537 7.63523 10.6542C7.5335 10.5548 7.47452 10.4194 7.47089 10.277L7.47065 7.7327L4.93379 7.73246C4.79177 7.72881 4.65679 7.66967 4.55763 7.56764C4.45847 7.46561 4.40297 7.32876 4.40297 7.18628C4.40297 7.0438 4.45847 6.90695 4.55763 6.80492C4.65679 6.70289 4.79177 6.64374 4.93379 6.6401L7.47065 6.63985L7.47089 4.09559C7.47452 3.95315 7.5335 3.81778 7.63523 3.71833C7.73697 3.61888 7.87341 3.56322 8.01548 3.56322C8.15755 3.56322 8.29399 3.61888 8.39573 3.71833C8.49746 3.81778 8.55643 3.95315 8.56007 4.09559L8.56031 6.63985L11.0972 6.6401Z" fill="#1D54B4" />
                        </svg>
                    </li>
                </ul>
            );
        });
        return UsersList
    }

    getSelectedUsersList() {
        let UsersList = {};
        UsersList = this.state.UsersList.filter(p => p.isIconClick === true).map((UsersList, index) => {
            return (
                <ul>
                    <li>
                        <div className="top">{UsersList.name}</div>
                        <div className="bottom">{UsersList.company}</div>
                    </li>
                    <li>
                    <EyeIcon />
                        <svg onClick={() => this.subtractIconClick(UsersList.id)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.09 14.3216C11.0057 14.3216 14.18 11.1473 14.18 7.2316C14.18 3.3159 11.0057 0.141602 7.09 0.141602C3.1743 0.141602 0 3.3159 0 7.2316C0 11.1473 3.1743 14.3216 7.09 14.3216ZM4.29132 6.85844C3.98218 6.85844 3.73158 7.10905 3.73158 7.41818C3.73158 7.72731 3.98218 7.97792 4.29132 7.97792H10.2618C10.571 7.97792 10.8216 7.72731 10.8216 7.41818C10.8216 7.10905 10.571 6.85844 10.2618 6.85844H4.29132Z" fill="#1F55B6" />
                        </svg>
                    </li>
                </ul>
            );
        });
        return UsersList
    }

    render() {
        const UsersList = this.getAllUsersList();
        const selectedUsersList = this.getSelectedUsersList();
        return <>
            <div className="Users-container">
              <div className='upper-border'>
                <Grid container>
                  <Grid item xs={12} className="customer-user">
                    <div className="action-btn">
                      <Button className="add-new-UserGroup-btn" onClick={this.props.showFormToggle}>
                        + Add New UserGroup
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="button-Contain">
                  <Grid item xs={12}>
            <div className="lower-container customer-con">
                    <div className="UserGrouplist-grid-container">
                    <div className="grid-container-header-wrapper">
                        <div className='role-search field-container first_contain'>
                            <InputLabel htmlFor="role-search">Role Search</InputLabel>
                            <div className="search-field-container">
                                <Input
                                    className="role-search"
                                    placeholder=""
                                    type="text"
                                    disableUnderline={true}
                                    startAdornment={
                                        <svg
                                            className="member-search__icon"
                                            width="20"
                                            height="20"
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
                        </div>
                        <div className='owner-search field-container'>
                            <InputLabel htmlFor="owner-search">Owner Search:</InputLabel>
                            <div className="search-field-container">
                                <Input
                                    className="owner-search"
                                    placeholder=""
                                    type="text"
                                    disableUnderline={true}
                                    startAdornment={
                                        <svg
                                            className="member-search__icon"
                                            width="20"
                                            height="20"
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
                        </div>
                    </div>
                </div>
            </div>
                  </Grid>
                </Grid>
              </div>
                <div className="lower-container">
                <Grid container>
                    <Grid item xs={6}>
                        
                    <span>Available User Groups: </span>
                        <div className="availbale-states scroll-bar">
                            {/* <div className="select-remove-search-all">
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.84766 6.68001C1.84766 3.61072 4.27837 1.1416 7.25357 1.1416C10.2288 1.1416 12.6595 3.61072 12.6595 6.68001C12.6595 9.74931 10.2288 12.2184 7.25357 12.2184C4.27837 12.2184 1.84766 9.74931 1.84766 6.68001ZM7.25357 0.141602C3.70528 0.141602 0.847656 3.07946 0.847656 6.68001C0.847656 10.2806 3.70528 13.2184 7.25357 13.2184C8.84512 13.2184 10.2977 12.6274 11.4158 11.6505L14.7707 15.0807C14.9638 15.2781 15.2803 15.2816 15.4778 15.0885C15.6752 14.8954 15.6787 14.5789 15.4856 14.3815L12.1162 10.9365C13.0789 9.7912 13.6595 8.30293 13.6595 6.68001C13.6595 3.07946 10.8019 0.141602 7.25357 0.141602Z" fill="#999999" />
                                    </svg>
                                    <input type="text" placeholder="Search (customer, client, carrier, account, group)" />
                                </span>
                                <span className="add-remove-all">Add All</span>
                            </div> */}
                            <div className="available-state-list">
                                {UsersList}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        
                    <span>Selected User Groups:</span>
                        <div className="availbale-states scroll-bar">
                            {/* <div className="select-remove-search-all">
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.84766 6.68001C1.84766 3.61072 4.27837 1.1416 7.25357 1.1416C10.2288 1.1416 12.6595 3.61072 12.6595 6.68001C12.6595 9.74931 10.2288 12.2184 7.25357 12.2184C4.27837 12.2184 1.84766 9.74931 1.84766 6.68001ZM7.25357 0.141602C3.70528 0.141602 0.847656 3.07946 0.847656 6.68001C0.847656 10.2806 3.70528 13.2184 7.25357 13.2184C8.84512 13.2184 10.2977 12.6274 11.4158 11.6505L14.7707 15.0807C14.9638 15.2781 15.2803 15.2816 15.4778 15.0885C15.6752 14.8954 15.6787 14.5789 15.4856 14.3815L12.1162 10.9365C13.0789 9.7912 13.6595 8.30293 13.6595 6.68001C13.6595 3.07946 10.8019 0.141602 7.25357 0.141602Z" fill="#999999" />
                                    </svg>
                                    <input type="text" placeholder="Search (customer, client, carrier, account, group)" />
                                </span>
                                <span className="add-remove-all">Remove All</span>
                            </div> */}
                            <div className="available-state-list">
                                {selectedUsersList}
                            </div>
                        </div>
                    </Grid>
                </Grid>
                </div>
            </div>
        </>;
    }
}