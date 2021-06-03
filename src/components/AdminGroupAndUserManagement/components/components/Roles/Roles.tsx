import React from "react";
import ModuleRoleList from "./components/ModuleWiseRoleList/ModuleRoleList";
import RoleUpdate from "./components/RoleDetail/components/RoleUpdate/RoleUpdate";
import RoleList from "./components/RoleList/RoleList";

export default class Roles extends React.Component<any, any> {

    state = {
        showModuleRoleList: true,
        addRoleCheck: false
    };

    roleClickFunc = (val) => {
        this.setState({ showModuleRoleList: false });
    }

    addRoleClickFunc= (val) => {
        this.setState({
            showModuleRoleList: false,
            addRoleCheck: true
        });
    }

    addRoleSaveClickFunc= () => {
        this.setState({
            showModuleRoleList: true,
            addRoleCheck: false
        });
    }

    render() {
        return <div>
            {this.state.showModuleRoleList === true ? (
                < ModuleRoleList />
            ): <RoleUpdate addRole={this.state.addRoleCheck} addRoleSaveClickEvent={this.addRoleSaveClickFunc} expandModeInd={false} />}
            <RoleList roleClick={this.state.addRoleCheck}  roleClickEvent={this.roleClickFunc} addRoleClickEvent={this.addRoleClickFunc} />
            </div>;
    }
}