import { Checkbox } from "antd";
import React from "react";
import "./HierarchyExpandedMenu.scss";
export default class HierarchyInformation extends React.Component<any, any> {
    state ={
        isLevelGroupChecked: true
    }
    onLevelGroupCheck = (element:any) =>{
        this.setState({isLevelGroupChecked: !this.state.isLevelGroupChecked});
    }
    render(){
        return(
            <div className="hierarchyInformationContainer">
                <div className="basicInfoWrapper">
                    <div className="coln-1">Name:</div>
                    <div className="coln-2 boldText">HCN PPO</div>
                </div>
                <div className="setTopMargin basicInfoWrapper">
                    <div className="coln-1">Level ID:</div>
                    <div className="coln-2 boldText">HNC3245943303A1</div>

                    <div className="coln-3">This level is a group</div>
                    <div className="coln-1"> 
                        <Checkbox 
                        className="custom-checkbox" 
                        onChange={(e) => this.onLevelGroupCheck(e)}                         
                        checked={this.state.isLevelGroupChecked}                         
                         />                            
                    </div>
                </div>
                <div className="info-lob-detail-wrapper">
                    <div className="infoDetailsWrapper">
                        <div className="typeRowWrapper">
                            <div className="coln-1">Contract Type:</div>
                            <div className="coln-2 boldText">Service Provider</div>
                        </div>
                        <div className="setTopMargin typeRowWrapper">
                            <div className="coln-1">Customer Type:</div>
                            <div className="coln-2 boldText">Self-Administered</div>
                        </div>
                        <div className="setTopMargin effectiveDateRowWrapper">
                            <div className="coln-1">Effective Date:</div>
                            <div className="coln-2 boldText">01/22/2020</div>
                        </div>
                        <div className="setMargin effectiveDateRowWrapper">
                            <div className="coln-1">Termination Date:</div>
                            <div className="coln-2 boldText">12/22/2020</div>
                        </div>
                        <div className="primaryInfoLabel">
                            PRIMARY CONTACT:
                        </div>
                        <div className="primaryInfoWrapper">
                            <div className="coln-1">Name:</div>
                            <div className="coln-2 boldText">Jane Doe</div>
                        </div>
                        <div className="setTopMargin primaryInfoWrapper">
                            <div className="coln-1">Phone:</div>
                            <div className="coln-2 boldText">(855) 455-2345</div>
                        </div>
                        <div className="setTopMargin primaryInfoWrapper">
                            <div className="coln-1">Address:</div>
                            <div className="coln-2 boldText">1234 Powell Ave.</div>
                        </div>
                        <div className="setTopMargin primaryInfoWrapper">
                            <div className="coln-1">City:</div>
                            <div className="coln-2 boldText">Sacramento</div>
                        </div>
                        <div className="setTopMargin primaryInfoWrapper">
                            <div className="coln-1">State:</div>
                            <div className="coln-2 boldText">California</div>
                        </div>
                        <div className="setTopMargin primaryInfoWrapper">
                            <div className="coln-1">ZIP:</div>
                            <div className="coln-2 boldText">87655</div>
                        </div>
                    

                    </div>
                    <div className="lobDetailsWrapper">
                        <div className="lob">
                            <div className="group">
                                <h4>LOB:</h4>
                            </div>
                            <span className="purple">MEDICARE</span>
                            <span className="yellow">EXCHANGE</span>
                            <span className="pink">MEDICARE</span>
                            <span className="grey">COMMERCIAL</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}