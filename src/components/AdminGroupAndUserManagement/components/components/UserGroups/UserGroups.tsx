import React from "react";
import ModuleUserGroupList from "./components/ModuleWiseUserGroupList/ModuleUserGroupList";
import UserGroupList from "./components/UserGroupList/UserGroupList";
import UserGroupDetail from "./components/UserGroupDetail/UserGroupDetail";

export default class UserGroups extends React.Component<any, any> {
    state = {
        showForm: false
    };
    showFormToggle = () => {
    	var showForm1 = !this.state.showForm;
        this.setState({ showForm:  showForm1});
    }
    render() {
        return <div className="user-groups">
        	{ this.state.showForm ? <UserGroupDetail/> : (<div>
        	        		<ModuleUserGroupList />
        	             	<UserGroupList showFormToggle={this.showFormToggle} />
        	             	</div>)
         	}
            </div>;
    }
}