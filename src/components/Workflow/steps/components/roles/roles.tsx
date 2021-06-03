import { Grid } from "@material-ui/core";
import { Col, Input, Row } from "antd";
import React from "react";
import { getRolesList } from "../../../../../mocks/grid/roles-mock";
import "./roles.scss";

const SearchSvg = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8096 11.7393L11.0832 9.20813C10.9602 9.09389 10.7934 9.03042 10.6184 9.03042H10.1726C10.9274 8.13422 11.3758 7.00698 11.3758 5.78073C11.3758 2.86364 8.82994 0.5 5.68792 0.5C2.54589 0.5 0 2.86364 0 5.78073C0 8.69783 2.54589 11.0615 5.68792 11.0615C7.00872 11.0615 8.22287 10.6451 9.18817 9.94439V10.3582C9.18817 10.5207 9.25654 10.6756 9.37959 10.7898L12.106 13.321C12.363 13.5597 12.7787 13.5597 13.033 13.321L13.8069 12.6025C14.0639 12.3639 14.0639 11.978 13.8096 11.7393ZM5.68792 9.03042C3.75457 9.03042 2.18766 7.57822 2.18766 5.78073C2.18766 3.98579 3.75184 2.53105 5.68792 2.53105C7.62126 2.53105 9.18817 3.98325 9.18817 5.78073C9.18817 7.57568 7.624 9.03042 5.68792 9.03042Z" fill="#999999" />
    </svg>

);

export default class Roles extends React.Component<any, any> {

    state = {
        rolesList: getRolesList()
    }

    addIconClick = (id: number) => {
        let selectedUserItem = this.state.rolesList.find(p=>p.id === id);
        if(selectedUserItem != undefined){
            selectedUserItem.isIconClick = true;
        }
        
        this.setState({
            rolesList: this.state.rolesList.map(el => 
                (el.id === id ? {...el, selectedUserItem}:el)
            )
        });
    }

    addAllOnClick = () => {
        this.state.rolesList.forEach(el => {
            el.isIconClick = true;
        })
        this.setState({
            rolesList: this.state.rolesList
        });
    }

    removeAllOnClick = () => {
        this.state.rolesList.forEach(el => {
            el.isIconClick = false;
        })
        this.setState({
            rolesList: this.state.rolesList
        });
    }

    subtractIconClick = (id: number) => {
        let selectedUserItem = this.state.rolesList.find(p=>p.id === id);
        if(selectedUserItem != undefined){
            selectedUserItem.isIconClick = false;
        }
        
        this.setState({rolesList: this.state.rolesList.map(el => (el.id === id ? {...el, selectedUserItem}:el))
        
        });
    }

    getAllRolesList() {
        let rolesList = {};
        rolesList = this.state.rolesList.filter(p => p.isIconClick === false).map((rolesList, index) => {
            return (
                <ul>
                   <li>
                        <div className="top">{rolesList.name}</div>
                    </li>
                    <li>
                        <svg onClick={() => this.addIconClick(rolesList.id)} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.00774 2.16391C0.246501 4.93321 0.246501 9.43934 3.00774 12.2087C5.76898 14.978 10.262 14.978 13.0232 12.2087C15.7845 9.43934 15.7845 4.93322 13.0232 2.16391C10.262 -0.605398 5.76898 -0.605398 3.00774 2.16391ZM11.0972 6.6401C11.1699 6.63823 11.2422 6.65098 11.3099 6.67759C11.3776 6.70419 11.4393 6.74413 11.4914 6.79503C11.5434 6.84593 11.5848 6.90677 11.6131 6.97397C11.6413 7.04116 11.6559 7.11335 11.6559 7.18628C11.6559 7.25921 11.6413 7.33139 11.6131 7.39859C11.5848 7.46579 11.5434 7.52663 11.4914 7.57753C11.4393 7.62843 11.3776 7.66836 11.3099 7.69497C11.2422 7.72158 11.1699 7.73433 11.0972 7.73246L8.56031 7.7327L8.56007 10.277C8.55643 10.4194 8.49746 10.5548 8.39573 10.6542C8.29399 10.7537 8.15755 10.8093 8.01548 10.8093C7.87341 10.8093 7.73697 10.7537 7.63523 10.6542C7.5335 10.5548 7.47452 10.4194 7.47089 10.277L7.47065 7.7327L4.93379 7.73246C4.79177 7.72881 4.65679 7.66967 4.55763 7.56764C4.45847 7.46561 4.40297 7.32876 4.40297 7.18628C4.40297 7.0438 4.45847 6.90695 4.55763 6.80492C4.65679 6.70289 4.79177 6.64374 4.93379 6.6401L7.47065 6.63985L7.47089 4.09559C7.47452 3.95315 7.5335 3.81778 7.63523 3.71833C7.73697 3.61888 7.87341 3.56322 8.01548 3.56322C8.15755 3.56322 8.29399 3.61888 8.39573 3.71833C8.49746 3.81778 8.55643 3.95315 8.56007 4.09559L8.56031 6.63985L11.0972 6.6401Z" fill="#1D54B4" />
                        </svg>
                    </li>
                </ul>
            );
        });
        return rolesList
    }

    getSelectedRolesList() {
        let rolesList = {};
        rolesList = this.state.rolesList.filter(p => p.isIconClick === true).map((rolesList, index) => {
            return (
                <ul>
                    <li>
                        <div className="top">{rolesList.name}</div>
                    </li>
                    <li>
                        <svg onClick={() => this.subtractIconClick(rolesList.id)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.09 14.3216C11.0057 14.3216 14.18 11.1473 14.18 7.2316C14.18 3.3159 11.0057 0.141602 7.09 0.141602C3.1743 0.141602 0 3.3159 0 7.2316C0 11.1473 3.1743 14.3216 7.09 14.3216ZM4.29132 6.85844C3.98218 6.85844 3.73158 7.10905 3.73158 7.41818C3.73158 7.72731 3.98218 7.97792 4.29132 7.97792H10.2618C10.571 7.97792 10.8216 7.72731 10.8216 7.41818C10.8216 7.10905 10.571 6.85844 10.2618 6.85844H4.29132Z" fill="#1F55B6" />
                        </svg>
                    </li>
                </ul>
            );
        });
        return rolesList
    }

    render() {
        const rolesList = this.getAllRolesList();
        const selectedRolesList = this.getSelectedRolesList();
        return <>
            <div className="users-container">
                <Grid container>
                    <Grid item xs={6} className="add-grid">
                        <div className="heading-area">
                            <span className="heading">Available Roles:</span>
                            <span className="search-input"><Input placeholder="Search..." prefix={<SearchSvg />} /></span>
                            <button type="button" className="save-btn" onClick={this.addAllOnClick}><span className="txt">Add All</span></button>
                        </div>
                        <div className="available-states scroll-bar">
                            <div className="available-state-list">
                                {rolesList}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className="remove-grid">
                        <div className="heading-area">
                            <span className="heading">Selected Roles:</span>
                            <span className="search-input"><Input placeholder="Search..." prefix={<SearchSvg />} /></span>
                            <button type="button" className="save-btn" onClick={this.removeAllOnClick}><span className="txt">Remove All</span></button>
                        </div>
                        <div className="available-states scroll-bar">
                            <div className="available-state-list">
                                {selectedRolesList}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>;
    }
}