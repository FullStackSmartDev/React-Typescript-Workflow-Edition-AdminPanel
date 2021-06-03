import React, { Component } from "react";
import FrxTabs from "../../../../../../shared/FrxTabs/FrxTabs";
import FrxDialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import Header from "./Common/Header";
import Header2 from "./Common/Header2";
import Access from "./Access/Access";
import Roles from "./Roles/Roles";
import UserGroup from "./UserGroups/UserGroups";
import Summary from "./Summary/Summary";
import Notes from "./Notes/notes";

import "./UserGrid.scss";

const tabs = [
  { id: 1, text: "Access" },
  { id: 2, text: "Roles" },
  { id: 3, text: "User Group" },
  { id: 4, text: "Summary" },
  
];

export class UserGrid extends Component<any,any> {
  state = {
    tabs: tabs,
    activeTabIndex: 0,
    modalStatus: false,
    type:"",
    modalTitle: "Notes",
  };

  onClickTab = (selectedTabIndex: number) => {
    this.setState({ activeTabIndex: selectedTabIndex });
  };
  selectHeader =()=>{
    const currentTab = this.state.activeTabIndex;
    if(this.props.customContent ===true){
      return  <Header openUserGrid={this.props.openUserGrid} />;
    }else{
      return <Header2 openUserGrid={this.props.openUserGrid} />
    }
  }
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    switch (tabIndex) {
      case 0:
        return <Access />;
      case 1:
        return <Roles />;
      case 2:
        return <UserGroup />;
      case 3:
        return <Summary />;
    }
  };
  handleOpenModal = () => {
    this.setState({
      modalStatus: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalStatus: false,
      type: "",
    });
  };
 
  render() {
    return (
      <div style={{ backgroundColor: "#EEF3F7" }}>
        {this.selectHeader()}
        <div className="d-flex">
          <div className="fxrtabs-container">
            <FrxTabs
              tabList={this.state.tabs}
              typeCard={"line"}
              activeTabIndex={this.state.activeTabIndex}
              onClickTab={this.onClickTab}
            />
          </div>
          <div className="icons">
          <span className="icn">
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
            <span className="icn">
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
            <span className="icn" onClick={this.handleOpenModal.bind(this)}>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.26284 0L11.4128 3.5H8.26293V4.66667H11.4128V13C11.4128 13.5523 10.9651 14 10.4128 14H1.91284C1.36056 14 0.912842 13.5523 0.912842 13V1C0.912842 0.447716 1.36056 0 1.91284 0H7.21283V4.66667H8.26283V0H8.26284Z" fill="#1d54b4"/>
              </svg>
            </span>
            <span className="icn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
              </svg>
            </span>
          </div>
        </div>
        
          <div className="frxtabs-body">{this.renderActiveTabContent()}</div>
          <FrxDialogPopup
            showCloseIcon={true}
            positiveActionText=""
            negativeActionText=""
            title={this.state.modalTitle}
            handleClose={this.handleCloseModal}
            handleAction={() => console.log("no action")}
            open={this.state.modalStatus}
            showActions={true}
            className="modulesModalContainer"
          >
            <Notes/>
          </FrxDialogPopup>
      </div>
    );
  }
}

export default UserGrid;
