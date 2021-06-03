import React, { Fragment } from "react";
import { whiteListIPs } from "../../../../../../../mocks/grid/audit-view-mock";
import { IPWhiteList } from "../../../../../../../utils/grid/columns";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxGridContainer";
import { Button } from "@material-ui/core";
import "./IPConfig.scss";

export default class IPConfig extends React.Component<any, any> {
  state = {
    show:false,
    isHandleActions:false,
    dialogClassName:"common-dialog-action",
    postiveBtn: "Save",
    popUpInd:false,
    negativeBtn: "Cancel",
    isNameClick: false
  }

  ipAddressClick = (id:any) =>{
    console.log("Ip Clicked....");
    // this.setState({isNameClick: true});
  }
  onClose = () => {
    this.setState({ popUpInd: false });
    return true;
  };
  onClick = () => {
    console.log("Yes")
    this.setState({ isHandleActions: true, popUpInd: true });
  }
  processCloseActions = () => {
    this.setState({ show: true });
  };
  triDotDropdownItemClick = () => {
    console.log("Ip Clicked....");
    this.setState({isNameClick: true});
  }
  render() {
    return (
      <Fragment>
      {this.state.isNameClick === false ?
      <div className="ip-override-grid-container">
        <div className="grid-container-header-wrapper">
          <div className="grid-name-fields-wrapper">
            <span className="ipText">whitelist ip configuration</span>
          </div>
          <div className="action-btn">
            <Button
              className="add-new-ip-override marginRight"
            >
              Import White List IP's
            </Button>
            <Button
              className="add-new-ip-override marginRight"
            >
              Export White List IP's
            </Button>
            <Button
              className="add-new-ip-override"
              onClick={this.onClick}
            >
              + Add Custom IP
            </Button>
          </div>
        </div>
        <div className="ip-grid-container">
          <FrxGridContainer
            enableSearch
            enableColumnDrag
            onSearch={() => {}}
            enableSettings
            settingsTriDotDropDownItems={["Edit", "Export"]}
            onsettingsTriDotDropDownItemClick={this.triDotDropdownItemClick}
            fixedColumnKeys={["claimId"]}
            gridName="IPCONFIG"
            isFetchingData={false}
            columns={IPWhiteList(
            {
              ipAddressClick: (id:any) =>
                this.ipAddressClick(id)
            },
            )}
            data={whiteListIPs()}
            pagintionPosition="topRight"
            onSettingsClick="grid-menu"
            scroll={{ x: 0, y: 420 }}
          />
        </div>
      </div>
      : 
      <div>"Hey"</div>
      }
      <DialogPopup
        className={this.state.dialogClassName}
        showCloseIcon={true}
        positiveActionText={this.state.postiveBtn}
        negativeActionText={this.state.negativeBtn}
        title={"ADD CUSTOM IP"}
        handleClose={() => {
          this.onClose();
        }}
        handleAction={() => {
          this.processCloseActions();
        }}
        showActions={this.state.isHandleActions}
        open={this.state.popUpInd}
        popupMaxWidth={"sm"}
      >
       Hey
      </DialogPopup>
      </Fragment>
    );
  }
}
