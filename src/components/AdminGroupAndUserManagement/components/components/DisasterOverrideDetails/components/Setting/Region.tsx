import React from "react";
import State from "./State";
import County from "./County";
import ZipCode from "./ZipCode";

import "./Setting.scss"

export default class Region extends React.Component<any, any> {
    state = {
        selectedStateList: [],
        selectedCountyList: [],
        selectedZipCodeList: []
    }

    selectedStateItemClick = (selectedStateItem:any) => {
         this.setState({selectedStateList: [...this.state.selectedStateList, selectedStateItem] })

    }
    selectedCountyItemClick = (selectedCountyItem:any) => {
         this.setState({selectedCountyList: [...this.state.selectedCountyList, selectedCountyItem] })
    }
    selectedZipItemClick = (selectedZipItem:any) => {
        this.setState({selectedZipCodeList: [...this.state.selectedCountyList, selectedZipItem] })
   }
    
  render() {
    return (
        <>
            <div className="region-main-heading">
                <h3>Region</h3>
            </div>
            <div className="region-container">
                <State selectedStateItemClick = {this.selectedStateItemClick}/>
                <County selectedStateList = {this.state.selectedStateList} selectedCountyItemClick = {this.selectedCountyItemClick}/>
                <ZipCode selectedStateList = {this.state.selectedStateList} selectedCountyList = {this.state.selectedCountyList} selectedZipItemClick = {this.selectedZipItemClick} />
            </div>
        </>
    );
  }
}
