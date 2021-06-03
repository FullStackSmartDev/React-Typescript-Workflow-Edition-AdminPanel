import React from "react";
import TreeList from "../../../Common/TreeList";
import {Row, Col, Checkbox} from "antd";

import "./renameLevel.scss";

export default class RenameLevel extends React.Component<any, any> {
 

  state = {
    checked: true,
    future:"",
    customer:"",
    client:"",
    carrier:"",
    account:"",
    group:"",
  }
  onChange() {
    this.setState({checked: !this.state.checked});
  }
  handleFuture(e){
    this.setState({future:e.target.value})
  }
  handleCustomer(e){
    this.setState({customer:e.target.value})
  }
  handleClient(e){
    this.setState({client:e.target.value})
  }
  handleCarrier(e){
    this.setState({carrier:e.target.value})
  }
  handleAccount(e){
    this.setState({account:e.target.value})
  }
  handleGroup(e){
    this.setState({group:e.target.value})
  }
  render() {
    return( 
      <div className="rename-container">
        <div className="btn-container">
          <button type="button" className="rename-btn">
            Rename Level
          </button>
        </div>
        <div className="content-container">
          <Row>
            <Col span={24} className="mlt">
              <span>
                USER DEFAULT LEVEL NAMES
              </span>
              <Checkbox onChange={this.onChange.bind(this)} className="mlt"checked={this.state.checked}/> 
            </Col>
          </Row>
          <div className="mlt">
          <Row>
            <Col span={4} className="mlt">Default</Col>
           {this.state.checked === false ? <Col span={4} className="mlt center">Rename Levels</Col>: null}
          </Row>
          <Row>
              <Col span={4} className="mlt-2">
                <TreeList/>
              </Col>
              {this.state.checked === false ?
              <Col span={4} className="mlt">
                <Row className="mlt pb">
                  <Col span={24}>
                   <input type="text" className="rename-input" onChange={this.handleFuture.bind(this)}/>
                  </Col>
                </Row>
                <Row className="mlt pb">
                  <Col span={24}>
                   <input type="text" className="rename-input" onChange={this.handleCustomer.bind(this)}/>
                  </Col>
                </Row>
                <Row className="mlt pb">
                  <Col span={24}>
                   <input type="text" className="rename-input" onChange={this.handleClient.bind(this)}/>
                  </Col>
                </Row>
                <Row className="mlt pb">
                  <Col span={24}>
                   <input type="text" className="rename-input"onChange={this.handleCarrier.bind(this)}/>
                  </Col>
                </Row>
                <Row className="mlt pb">
                  <Col span={24}>
                   <input type="text" className="rename-input" onChange={this.handleAccount.bind(this)}/>
                  </Col>
                </Row>
                <Row className="mlt pb">
                  <Col span={24}>
                   <input type="text" className="rename-input" onChange={this.handleGroup.bind(this)}/>
                  </Col>
                </Row>
              </Col>:null}
            </Row>
          </div>  
        </div>
      </div>);
  }
}
