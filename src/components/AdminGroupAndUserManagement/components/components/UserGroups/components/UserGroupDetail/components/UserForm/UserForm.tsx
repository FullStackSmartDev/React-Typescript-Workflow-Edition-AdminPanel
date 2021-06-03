import React from "react";
import "./UserForm.scss";
import { DatePicker, Input } from 'antd';
import moment from "moment";

const dateFormat = 'MM/DD/YYYY';

export default class UserForm extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state={ disable:true, val:"username"}
      }
      handleClick(e){
        this.setState({disable:!this.state.disable})
      }
    render() {

        return (
        <div className="user-group-form">
            {/* <div className="wrapper">
                <input type="text" disabled={this.state.disable} value={this.state.val}/>
                <input type="button" value="Enable/Disable" onClick={this.handleClick.bind(this)}/>
            </div> */}


            <div className="user-top-container">
                <div className="breadcrum-wrapper">
                    <span className="header-group">User Group Grid</span>
                    <sub>&gt;</sub>
                    <h3>Formulary Group</h3>
                    <span className="green header-group">Active</span>
                    <span className="grey header-group">Admin</span>
                    <span className='edit-button header-group'>
                        <i className="fas fa-edit" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>
                    </span>
                </div>
                <div className="lob-date-wrapper">
                    <div></div>
                    <div className="name-date-domain-wrapper">
                        <div className="group">
                            <h4>Effective Date:</h4>
                            <DatePicker defaultValue={moment('09/22/2020', dateFormat)} format={dateFormat} disabled={this.state.disable}
                                style={{ width: 135, height: 35 }}
                            />
                        </div>
                        <div className="group">
                            <h4>Domain:</h4>
                            {/* <h5>4</h5> */}
                            <Input placeholder="4" type="number" defaultValue="4" disabled={this.state.disable}/>
                        </div>
                    </div>
                    <div className="termination-date-wrapper">
                        <div className="group">
                            <h4>Termination Date:</h4>
                            <DatePicker defaultValue={moment('09/22/2020', dateFormat)} format={dateFormat} disabled={this.state.disable}
                                style={{ width: 135, height: 35 }}/>
                        </div>
                        <div className="group">
                            <h4>Managed By:</h4>
                            <Input placeholder="Full Name" type="text" defaultValue="Full Name" disabled={this.state.disable}/>
                        </div>
                    </div>
                    <div className="created-date-address-wrapper">
                        <div className="group">
                            <h4>Created Date:</h4>
                            <DatePicker defaultValue={moment('09/22/2020', dateFormat)} format={dateFormat} disabled={this.state.disable}
                                style={{ width: 135, height: 35 }} 
                            />
                        </div>
                        <div className="group">
                            <h4>Number of Users:</h4>
                            <Input placeholder="20" type="number" defaultValue="20" disabled={this.state.disable}/>
                        </div>
                    </div>
                    <div className="last-modified-wrapper">
                        <div className="group">
                            <h4>Last Modified Date:</h4>
                            <DatePicker defaultValue={moment('09/22/2020', dateFormat)} format={dateFormat} disabled={this.state.disable}
                                style={{ width: 135, height: 35 }}
                            />
                        </div>
                        <div className="group">
                            <h4>Number of Roles:</h4>
                            <Input placeholder="20" type="number" defaultValue="20" disabled={this.state.disable}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}