import React, { Component } from "react";
import { Table } from "antd";
import { ReactComponent as IconCheck } from "../../../../../assets/icons/IconCheck.svg";
import UserGrid from "./components/UserGrid/UserGrid";
import UserTablePage from "./components/UserTablePage/UserTablePage";
import "./Users.scss";

const dataSource = [
  {
    key: "1",
    domains: "Futer Rx",
    total_users: 10,
    admin: 2,
    logout: 4,
    icon: "",
  },
  {
    key: "2",
    domains: "Xerox.com",
    total_users: 8,
    admin: 3,
    logout: 4,
    icon: "",
  },
  {
    key: "3",
    domains: "Star PBM",
    total_users: 12,
    admin: 4,
    logout: 4,
    icon: "",
  },
  {
    key: "4",
    domains: "Care Health Plan",
    total_users: 5,
    admin: 5,
    logout: 4,
    icon: "",
  },
  {
    key: "5",
    domains: "Futer Rx",
    total_users: 10,
    admin: 2,
    logout: 4,
    icon: "",
  },
];

const columns = [
  {
    title: "Domains",
    dataIndex: "domains",
    key: "domains",
    width: "10px",
  },
  {
    title: "Total Users",
    dataIndex: "total_users",
    key: "total_users",
    width: "10px",
  },
  {
    title: "ADMIN",
    dataIndex: "admin",
    key: "admin",
    width: "10px",
  },
  {
    title: "USER NOT LOGGING IN",
    dataIndex: "logout",
    key: "logout",
    width: "10px",
  },
  {
    title: "",
    dataIndex: "",
    key: "icon",
    width: "10px",
    render() {
      return <IconCheck className="chk-icon" />;
    },
  },
];

export default class Users extends React.Component<any, any> {
  state = {
    render: false,
    customContent: true,
  };
  onUserIdClick = (id: any) => {
    this.setState({ render: true,customContent : true});
  };

  triDotDropdownItemClick = (dataRow: any, item: any) => {
    this.setState({ render: true });
  };
  openUserGrid(){
    this.setState({render:false});
  }
  renderHeaderContent(){
    this.setState({render: true,customContent : false});
  }
  render() {
    return (
      <div>
        {this.state.render === false ? (
          <div className="user-container">
            <div className="table-container">
              <Table
                dataSource={dataSource}
                className="my-table"
                columns={columns}
                bordered={true}
                pagination={false}
                size="middle"
              />
            </div>
            <br />
            <div className="new-container">
              <UserTablePage
                onUserIdClick={this.onUserIdClick.bind(this)}
                triDotDropdownItemClick={this.triDotDropdownItemClick.bind(
                  this
                )}
                renderHeaderContent={this.renderHeaderContent.bind(this)}
              />
            </div>
          </div>
        ) : (
          <UserGrid 
           openUserGrid={this.openUserGrid.bind(this)}
            customContent={this.state.customContent}
           />
        )}
      </div>
    );
  }
}
