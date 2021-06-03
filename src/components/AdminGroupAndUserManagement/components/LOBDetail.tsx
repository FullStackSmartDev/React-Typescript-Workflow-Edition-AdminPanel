import React from "react";
import Hierarchy from "./components/Hierarchy/Hierarchy";
import Roles from "./components/Roles/Roles";
import Users from "./components/Users/Users";
import UserGroups from "./components/UserGroups/UserGroups";
import ModuleManagement from './components/ModuleManagement';

export default class LOBDetail extends React.Component<any, any> {
  renderSelectedLOBContent = () => {
    let selectedLOB = this.props.currentSelectedModule;
    switch (selectedLOB) {
      case "hierarchy":
        return <Hierarchy baseData={this.props.baseData} />;
      case "module management":
        return <ModuleManagement/>;
      case "users":
        return <Users />;
      case "roles":
        return <Roles />;
      default:
        return <UserGroups />;
    }
  };
  render() {
    return <div>{this.renderSelectedLOBContent()}</div>;
  }
}
