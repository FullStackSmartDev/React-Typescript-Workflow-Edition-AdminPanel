import React from "react";
import { RightOutlined, CopyFilled } from "@ant-design/icons";
import { Avatar, Row, Col } from "antd";
import { ReactComponent as UserProfilePhoto } from "../../../../../../../../assets/img/user-profile.svg";
import ArchiveIcon from "@material-ui/icons/Archive";
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";

import "./Header.scss";

export default class Header extends React.Component<any, any> {
  render() {
    return (
      <div className="user-container">
        <div className="header">
          <button type="button" className="grid-btn" onClick={this.props.openUserGrid}>
            User Grid <RightOutlined className="clr" />{" "}
          </button>
          <Avatar size={40} icon={<UserProfilePhoto className="image" />} />
          <span className="name">Matt Sanchez</span>
          <span className="pill1">Active</span>
          <span className="pill2">Supervisor</span>
          <span className="pill3">Admin</span>
          <span className="ml">
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z"
                fill="#1D54B4"
              />
            </svg>
          </span>
          <div className="end-container">
            <div className="box">
              <CopyFilled className="icn" />{" "}
              <span className="txt-deco"> Clone</span>
              <ArchiveIcon className="icn2" />{" "}
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
        </div>
        <div className="row2">
          <Row>
            <Col span={11} className="d-flex">
              <span className="title ml-90">User Home:</span>
              <DropDown
                placeholder="User Home"
                className="user-dropdown"
                options={[""]}
              />
            </Col>
            <Col span={13}>
              <span className="title">No of Supervisor's:</span>
              <span className="underline"> 4</span>
            </Col>
          </Row>
        </div>
        <div className="row2">
          <Row>
            <Col span={11} className="d-flex">
              <span className="title ml-90">Email:</span>
              <span className="underline ml-3"> matt@futurerx.com</span>
            </Col>
            <Col span={7}>
              <span className="title">Effective Date:</span>
              <span className="ml-2"> 01/22/2020</span>
            </Col>
            <Col span={6}>
              <span className="title">Created Date:</span>
              <span className="ml-2"> 09/22/2020</span>
            </Col>
          </Row>
        </div>
        <div className="row2">
          <Row>
            <Col span={11} className="d-flex">
              <span className="title ml-90">Phone Number:</span>
              <span className="ml"> (213)454-7932 </span>
            </Col>
            <Col span={7}>
              <span className="title">Termination Date:</span>
              <span className="ml"> 12/22/2020</span>
            </Col>
            <Col span={6}>
              <span className="title">Last Modified Date:</span>
              <span className="ml"> 09/22/2020</span>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
