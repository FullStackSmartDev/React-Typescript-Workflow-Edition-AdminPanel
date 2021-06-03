import React from "react";
import Grid from "@material-ui/core/Grid";
import { getStateList } from "../../../../../../../mocks/StateMock";

export default class State extends React.Component<any, any> {

    state = {
        stateList: getStateList()
      }

    addIconClick = (id:number) => {
        let selectedStateItem = this.state.stateList.find(p=>p.id === id);
        if(selectedStateItem != undefined){
            selectedStateItem.isIconClick = true;
        }
        
        this.setState({stateList: this.state.stateList.map(el => (el.id === id ? {...el, selectedStateItem}:el))
        
        }, () =>{ this.props.selectedStateItemClick(this.state.stateList.find(p=>p.id === id))});
    }

    subtractIconClick = (id:number) => {
        let selectedStateItem = this.state.stateList.find(p=>p.id === id);
        if(selectedStateItem != undefined){
            selectedStateItem.isIconClick = false;
        }
        
        this.setState({stateList: this.state.stateList.map(el => (el.id === id ? {...el, selectedStateItem}:el))
        
        });
    }

    getAllStateList(){
        let stateList = {};
        stateList = this.state.stateList.filter(p=>p.isIconClick === false).map((statesList, index) => {
                        return(
                            <ul>
                                <li>{statesList.name}</li>
                                <li>
                                    <svg onClick={() => this.addIconClick(statesList.id)} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.00774 2.16391C0.246501 4.93321 0.246501 9.43934 3.00774 12.2087C5.76898 14.978 10.262 14.978 13.0232 12.2087C15.7845 9.43934 15.7845 4.93322 13.0232 2.16391C10.262 -0.605398 5.76898 -0.605398 3.00774 2.16391ZM11.0972 6.6401C11.1699 6.63823 11.2422 6.65098 11.3099 6.67759C11.3776 6.70419 11.4393 6.74413 11.4914 6.79503C11.5434 6.84593 11.5848 6.90677 11.6131 6.97397C11.6413 7.04116 11.6559 7.11335 11.6559 7.18628C11.6559 7.25921 11.6413 7.33139 11.6131 7.39859C11.5848 7.46579 11.5434 7.52663 11.4914 7.57753C11.4393 7.62843 11.3776 7.66836 11.3099 7.69497C11.2422 7.72158 11.1699 7.73433 11.0972 7.73246L8.56031 7.7327L8.56007 10.277C8.55643 10.4194 8.49746 10.5548 8.39573 10.6542C8.29399 10.7537 8.15755 10.8093 8.01548 10.8093C7.87341 10.8093 7.73697 10.7537 7.63523 10.6542C7.5335 10.5548 7.47452 10.4194 7.47089 10.277L7.47065 7.7327L4.93379 7.73246C4.79177 7.72881 4.65679 7.66967 4.55763 7.56764C4.45847 7.46561 4.40297 7.32876 4.40297 7.18628C4.40297 7.0438 4.45847 6.90695 4.55763 6.80492C4.65679 6.70289 4.79177 6.64374 4.93379 6.6401L7.47065 6.63985L7.47089 4.09559C7.47452 3.95315 7.5335 3.81778 7.63523 3.71833C7.73697 3.61888 7.87341 3.56322 8.01548 3.56322C8.15755 3.56322 8.29399 3.61888 8.39573 3.71833C8.49746 3.81778 8.55643 3.95315 8.56007 4.09559L8.56031 6.63985L11.0972 6.6401Z" fill="#1D54B4"/>
                                    </svg>
                                </li>
                            </ul>
                        );
        });
        return stateList
    }

    getSelectedStateList(){
        let stateList = {};
        stateList = this.state.stateList.filter(p=>p.isIconClick === true).map((statesList, index) => {
                        return(
                            <ul>
                                <li>{statesList.name}</li>
                                <li>
                                    <svg onClick={() => this.subtractIconClick(statesList.id)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.09 14.3216C11.0057 14.3216 14.18 11.1473 14.18 7.2316C14.18 3.3159 11.0057 0.141602 7.09 0.141602C3.1743 0.141602 0 3.3159 0 7.2316C0 11.1473 3.1743 14.3216 7.09 14.3216ZM4.29132 6.85844C3.98218 6.85844 3.73158 7.10905 3.73158 7.41818C3.73158 7.72731 3.98218 7.97792 4.29132 7.97792H10.2618C10.571 7.97792 10.8216 7.72731 10.8216 7.41818C10.8216 7.10905 10.571 6.85844 10.2618 6.85844H4.29132Z" fill="#1F55B6"/>
                                    </svg>
                                </li>
                            </ul>
                        );
        });
        return stateList
    }

    
  render() {
      const stateList = this.getAllStateList();
      const selectedStateList = this.getSelectedStateList();
    return (
            <div className="region-wrapper">
                <h3>States</h3>
                <div className="states-container">
                    <Grid container>
                        <Grid item xs={6}>
                        <div className="availbale-states scroll-bar">
                                <div className="select-remove-search-all">
                                    <span>available STATES</span>
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.84766 6.68001C1.84766 3.61072 4.27837 1.1416 7.25357 1.1416C10.2288 1.1416 12.6595 3.61072 12.6595 6.68001C12.6595 9.74931 10.2288 12.2184 7.25357 12.2184C4.27837 12.2184 1.84766 9.74931 1.84766 6.68001ZM7.25357 0.141602C3.70528 0.141602 0.847656 3.07946 0.847656 6.68001C0.847656 10.2806 3.70528 13.2184 7.25357 13.2184C8.84512 13.2184 10.2977 12.6274 11.4158 11.6505L14.7707 15.0807C14.9638 15.2781 15.2803 15.2816 15.4778 15.0885C15.6752 14.8954 15.6787 14.5789 15.4856 14.3815L12.1162 10.9365C13.0789 9.7912 13.6595 8.30293 13.6595 6.68001C13.6595 3.07946 10.8019 0.141602 7.25357 0.141602Z" fill="#999999"/>
                                        </svg>
                                        <input type="text" placeholder="Search (customer, client, carrier, account, group)" />
                                    </span>
                                    <span className="add-remove-all">Add All</span>
                                </div>
                                <div className="available-state-list">
                                    {stateList}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="availbale-states scroll-bar">
                                <div className="select-remove-search-all">
                                    <span>selected STATES</span>
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.84766 6.68001C1.84766 3.61072 4.27837 1.1416 7.25357 1.1416C10.2288 1.1416 12.6595 3.61072 12.6595 6.68001C12.6595 9.74931 10.2288 12.2184 7.25357 12.2184C4.27837 12.2184 1.84766 9.74931 1.84766 6.68001ZM7.25357 0.141602C3.70528 0.141602 0.847656 3.07946 0.847656 6.68001C0.847656 10.2806 3.70528 13.2184 7.25357 13.2184C8.84512 13.2184 10.2977 12.6274 11.4158 11.6505L14.7707 15.0807C14.9638 15.2781 15.2803 15.2816 15.4778 15.0885C15.6752 14.8954 15.6787 14.5789 15.4856 14.3815L12.1162 10.9365C13.0789 9.7912 13.6595 8.30293 13.6595 6.68001C13.6595 3.07946 10.8019 0.141602 7.25357 0.141602Z" fill="#999999"/>
                                        </svg>
                                        <input type="text" placeholder="Search (customer, client, carrier, account, group)" />
                                    </span>
                                    <span className="add-remove-all">Remove All</span>
                                </div>
                                <div className="available-state-list">
                                    {selectedStateList}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
    );
  }
}
