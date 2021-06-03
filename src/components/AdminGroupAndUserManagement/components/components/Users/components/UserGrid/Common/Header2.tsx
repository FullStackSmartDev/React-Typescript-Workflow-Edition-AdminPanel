import React from "react";
import {
  RightOutlined,
  CopyFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Row, Col, Radio, DatePicker } from "antd";
import ArchiveIcon from "@material-ui/icons/Archive";
import { Button } from "@material-ui/core";
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";

import "./Header.scss";

export default class Header2 extends React.Component<any, any> {
  state = {
    value: "",
    newDate: "",
  };
  onChange(e) {
    this.setState({ value: e.target.value });
  }
  onDateChange = (date, dateString) => {
    this.setState({ newDate: dateString });
  };
  render() {
    return (
      <div className="user-container">
        <div className="row2">
          <Row>
            <Col span={3} className="d-flex">
              <button
                type="button"
                className="grid-btn"
                onClick={this.props.openUserGrid}
              >
                User Grid <RightOutlined className="clr" />{" "}
              </button>

              <button type="button" className="add-image">
                + Add Photo
              </button>
            </Col>
            <Col span={7} className="d-flex padding-right">
              <Col span={12}>
                <span className="phn">User Name:</span>
              </Col>
              <Col span={12}>
                <input type="text" className="text-input" />
              </Col>
            </Col>
            <Col span={6} className="padding-left">
              <div className="d-flex">
                <span className="txt-label">Supervisor?</span>
                <Radio.Group
                  onChange={this.onChange.bind(this)}
                  value={this.state.value}
                >
                  <Radio value={"Yes"}>Yes</Radio>
                  <Radio value={"No"}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={8}>
              <div className="end-container">
                <div className="box2">
                  <CopyFilled className="icn3" />{" "}
                  <span className="txt-deco"> Clone</span>
                  <CloseCircleFilled className="icn5" />
                  <span className="txt-deco"> Delete </span>
                  <ArchiveIcon className="icn4" />{" "}
                  <span className="txt-deco"> Archive</span>
                </div>
              </div>
              <span className="r-0">
                <svg
                  width="17"
                  height="14"
                  viewBox="0 0 17 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.98975 0C6.43746 0 5.98975 0.447715 5.98975 1V4C5.98975 4.55228 6.43746 5 6.98975 5H7.98975V9H1.98975C1.43746 9 0.989746 9.44771 0.989746 10V11C0.989746 11.5523 1.43746 12 1.98975 12H15.9897C16.542 12 16.9897 11.5523 16.9897 11V10C16.9897 9.44772 16.542 9 15.9897 9H9.98975V5H10.9897C11.542 5 11.9897 4.55228 11.9897 4V1C11.9897 0.447715 11.542 0 10.9897 0H6.98975ZM1.98975 13.5C1.98975 13.2239 2.2136 13 2.48975 13H15.4897C15.7659 13 15.9897 13.2239 15.9897 13.5C15.9897 13.7761 15.7659 14 15.4897 14H2.48975C2.2136 14 1.98975 13.7761 1.98975 13.5Z"
                    fill="#1D54B4"
                  ></path>
                </svg>
              </span>
            </Col>
          </Row>
        </div>
        <div className="row2">
          <Row>
            <Col span={3} className="d-flex"></Col>
            <Col span={7} className="d-flex padding-right">
              <Col span={12}>
                <span className="title r-0">User Home:</span>
              </Col>
              <Col span={12}>
                <DropDown
                  placeholder="User Home"
                  className="user-dropdown"
                  options={[""]}
                />
              </Col>
            </Col>
            <Col span={4} className="padding-left">
              <span className="title">No of Supervisor's:</span>
              <span> 4</span>
            </Col>
          </Row>
        </div>
        <div className="row2">
          <Row>
            <Col span={3} className="d-flex"></Col>
            <Col span={7} className="d-flex padding-right">
              <Col span={12}>
                <span className="email">Email:</span>
              </Col>
              <Col span={12}>
                <input type="text" className="text-input" />
              </Col>
            </Col>
            <Col span={6} className="padding-left">
              <span className="title">Effective Date:</span>
              <DatePicker
                onChange={this.onDateChange.bind(this)}
                className="date-picker ml-2"
              />
            </Col>
            <Col span={8} className="padding-left">
              <span className="title">Created Date:</span>
            </Col>
          </Row>
        </div>
        <div className="row2">
          <Row>
            <Col span={3} className="d-flex"></Col>
            <Col span={7} className="d-flex padding-right">
              <Col span={12}>
                <span className="phn">Phone Number:</span>
              </Col>
              <Col span={12}>
                <input type="text" className="text-input" />
              </Col>
            </Col>
            <Col span={6} className="padding-left">
              <span className="title">Termination Date:</span>
              <DatePicker
                onChange={this.onDateChange.bind(this)}
                className="date-picker ml"
              />
            </Col>
            <Col span={4} className="padding-left">
              <span className="title">Last Modified Date:</span>
            </Col>
            <Col span={4}>
              <div className="action-btn">
                <Button className="add-new-disaster-override">Save</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
