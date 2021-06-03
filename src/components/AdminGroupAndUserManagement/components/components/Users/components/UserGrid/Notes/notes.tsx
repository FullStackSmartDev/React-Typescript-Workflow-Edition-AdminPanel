import React, { Component } from "react";
import { Avatar,Input,Row,Col } from 'antd';
import { ReactComponent as UserProfilePhoto } from "../../../../../../../../assets/img/user-profile.svg";

import "./notes.scss";

const { TextArea } = Input;

export default class Notes extends Component {
    state={
        detail:"",
        data:[
            {
                image:"",
                date:"01/02/2021",
                name:"Justin Sckena",
                detail:"Member Has no transplant schedualed.Post-date attribute term.",
            },
            {
                image:"",
                date:"01/02/2021",
                name:"Justin Sckena",
                detail:"Member Has no transplant schedualed.Post-date attribute term.",
            },
        ],
    }
    addNotes(){
        var obj = { 
            image:"",
            date : "01/02/2021",
            name:"Matt Schnaz",
            detail:this.state.detail,
        };
        var temp =[...this.state.data];
        temp.push(obj);
        this.setState({data:temp});
    }
    changeText(e){
        this.setState({detail: e.target.value});
    }
   
    render(){
        return(
            <div className="notes-conatiner">
             <h3 className="title">COMMENT</h3>
             <TextArea rows={4} size={"large"} className="w-100" onChange={this.changeText.bind(this)}/>
             <button  className="add-btn" onClick={this.addNotes.bind(this)}>Add</button>
             <div className="comments">
                {this.state.data.map((d)=>( 
                        <div className="notes">
                            <Row>
                                <Col span={4}>
                                    <Avatar size={40} icon={<UserProfilePhoto className="image" />} className="avt"/>
                                </Col>
                                <Col span={20}>
                                    <h3>{d.name} <span className="date">{d.date}</span></h3>
                                    <p>{d.detail}</p>
                                </Col>
                            </Row>
                        </div>
                ))}
             </div>
            </div>
        )
    }
}
