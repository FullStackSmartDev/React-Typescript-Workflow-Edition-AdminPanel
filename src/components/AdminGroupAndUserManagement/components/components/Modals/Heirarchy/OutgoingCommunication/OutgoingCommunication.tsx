import React from "react";
import { Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

// import styles
import "./OutgoingCommunication.scss";

import { Row,Col , Input } from "antd";

export default class OutgoingCommunication extends React.Component<any, any> {
  state = {
    file: null,
  };
  handleChange = e => {  
   this.setState({file:e.target.file});
  };
  render() {
    const uploadButton = (
      <div>
         <CloudUploadOutlined />
        <p style={{ marginTop: 8 }}>Drop file or click 
        to upload txt, csv, etc, TXT, CSV, ETC 
        files accepted Max file size: 10MB</p>
      </div>
    );
    return (
      <div className="outgoing-communication-container">
       
        <div className="btn-container">
          <button type="button" className="rename-btn">
            Communication
          </button>
        </div>
        <div className="content-container">
          <div className="mlt">
              <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={this.handleChange}
            >
              {uploadButton}
            </Upload>
          </div>
          <div className="outgoing-communication-fields">
            <p>Outgoing communication</p>
            <Row className="pb">
              <Col span={1}>
                <span>Phone: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>Address: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>City: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>State: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>Zip: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
          </div>
          <div className="outgoing-communication-fields">
            <p>Appeals communication</p>
            <Row className="pb">
              <Col span={1}>
                <span>Phone: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>Fax: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
          </div>
          <div className="outgoing-communication-fields">
            <p>Grievance communication</p>
            <Row className="pb">
              <Col span={1}>
                <span>Phone: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>Fax: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
          </div>
          <div className="outgoing-communication-fields">
            <p>General customer communication</p>
            <Row className="pb">
              <Col span={1}>
                <span>Phone: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
            <Row className="pb">
              <Col span={1}>
                <span>Fax: </span>
              </Col>
              <Col span={4}>
                <Input/>
              </Col>
            </Row>
          </div>
          <div className="outgoing-communication-fields">
            <p>Prior authroization error</p>
            <Row className="pb">
              <Col span={8}>
                <Input/>
              </Col>
            </Row>
          </div>
          <div className="outgoing-communication-fields">
            <p>Custom communication</p>
            <Row>
              <Col span={4} >
                  <Input placeholder="Create new label" className="my" />
                  <Input placeholder="Create new label" className="my"/>
                  <Input placeholder="Create new label" className="my"/>
                  <Input placeholder="Create new label" className="my"/>
                  <Input placeholder="Create new label" className="my"/>
              </Col>
              <Col span={4} >
                <Input placeholder="Phone or Website"  className="my"/>
                <Input placeholder="Phone or Website"  className="my"/>
                <Input placeholder="Phone or Website"  className="my"/>
                <Input placeholder="Phone or Website"  className="my"/>
                <Input placeholder="Phone or Website"  className="my"/>
              </Col>
            </Row>
          </div>
        </div>
        <div className="mlt">
          <button type="button" className="cancel">Cancel</button>
          <button type="button" className="save">Save</button>
        </div>
      </div>
    );
  }
}
