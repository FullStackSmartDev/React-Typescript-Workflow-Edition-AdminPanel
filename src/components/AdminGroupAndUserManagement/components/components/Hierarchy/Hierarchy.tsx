import React from "react";
import { hierarchyDetailsGridColumns } from "../../../../../utils/grid/columns";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import FrxGridContainer from "../../../../shared/FrxGrid/FrxGridContainer";
import { Input } from "@material-ui/core";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";

import ExpandedDetails from "./components/ExpandedDetails/ExpandedDetails";
import HierarchyTop from "./components/HierarchyTop/HierarchyTop";
import FrxTree from "../../../../shared/FrxTree";
import DialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";

import "./Hierarchy.scss";
import Note from "./components/NotesPopUp/Note";
import AddLob from "./components/AddEditLob/AddLob";

const data = [
  {
    id: "1",
    key: "1",
    title: "Future Rx",
    styles: { color: "#684999", marginLeft: "0" },
    value: "",
    children: [
      {
        id: "1.1",
        key: "1.1",
        title: "Health Net Community Solutions  |  HCN123",
        styles: { color: "#F65A1C", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.1.1",
            key: "1.1.1",
            title: "HCN PPO  |  HNC3245943303A1",
            styles: { color: "#1FBBC4", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.1.1",
                key: "1.1.1.1",
                title: "Choice Enhanced  |  76-41165CPDC",
                styles: { color: "#80C483", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.1.1.1",
                    key: "1.1.1.1.1",
                    title: "Colorado  |  77701000A2654DC",
                    styles: { color: "#F4AF64", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.1.1.1.1",
                        key: "1.1.1.1.1.1",
                        title: "Choice Enhanced C1  |  11AB30001PPO2C1",
                        styles: { color: "#F89090", marginLeft: "0" },
                        value: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "1.1.2",
            key: "1.1.2",
            title: "Choice Standard  |  76-411365CPHC",
            styles: { color: "#80C483", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.2.1",
                key: "1.1.2.1",
                title: "Florida  |  77701000A2654FL",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
              {
                id: "1.1.2.2",
                key: "1.1.2.2",
                title: "North Carolina |  77701000A2654NC",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.2.2.1",
                    key: "1.1.2.2.1",
                    title: "Choice Standard NC1 |  11AB130003PPONC1",
                    styles: { color: "#F89090", marginLeft: "0" },
                    value: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        key: "1.2",
        title: "HCN EPO   |  HNC324594330EPO",
        styles: { color: "#684999", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.2.1",
            key: "1.2.1",
            title: "EPO Enhanced  |  76-411365EPOE",
            styles: { color: "#80C483", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.2.1.1",
                key: "1.2.1.1",
                title:
                  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |  77701000A2654FL",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
              {
                id: "1.2.1.2",
                key: "1.2.1.2",
                title: "South Carolina  |  77701000A2654SC",
                styles: { color: "#F4AF64", marginLeft: "0" },
                value: "",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default class Hierarchy extends React.Component<any, any> {

    state = {
        isTreeView: "grid",
        show: false,
        popUpInd: false,
        paramIndicator: "",
        title: ""
    }
    componentDidMount() {
        console.log(this.props.baseData);
    }

    viewAllBtnHandler = () => {
        this.setState({isTreeView: "tree"})
    }

    noteClickHandler = (param, title) => {
      this.setState({ popUpInd: true, paramIndicator: param, title: title });
    }

    onClose = () => {
      this.setState({ popUpInd: false });
      return true;
    }

    processCloseActions = () => {
      this.setState({ show: true });
    }

    treeNodeClickHander = () => {
      this.setState({isTreeView: "treeNode"})
    }
  render() {
    return (
      <>
        <HierarchyTop />
        <div className="paddingDiv"></div>
        <div className="hierarchy-container">
            <div className="bordered">
            {this.state.isTreeView === "tree" &&
            <>
            <div className="formulary-grid-panel-header-container">
            <div className="header-fields">
            <PanelHeader
              title="HIERARCHY"
              tooltip="HIERARCHY"
              className="formulary-grid-panel-header"
            />
            </div>
            </div>
            <div className="header-bottom-fields-btns">
                <div className="fields-container">
                <div className="field-container input-field-search-hierarchy">
                <Input
                  className="formulary-list-search"
                  placeholder="Search"
                  type="text"
                  disableUnderline={true}
                  startAdornment={
                    <svg
                      className="member-search__icon"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                        fill="#999999"
                      />
                    </svg>
                  }
                />
              </div>
                <div className="field-container">
                <DropDown
                  className="formulary-type-dropdown"
                  placeholder="Owner"
                  options={["All", "None"]}
                />
              </div>
              <div className="field-container">
                <DropDown
                  className="formulary-type-dropdown"
                  placeholder="Module"
                  options={["module 1", "module 2"]}
                />
              </div>
                </div>
                <div className="action-btn">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                    </svg>
                  </span>
                  <span>
                    <svg onClick={(e) => this.noteClickHandler("note", "NOTES")} width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4 0L12 4H8.4001V5.33333H12V15C12 15.5523 11.5523 16 11 16H1C0.447715 16 0 15.5523 0 15V1C0 0.447715 0.447715 0 1 0H7.19999V5.33333H8.39998V0H8.4Z" fill="#2055B5"/>
                    </svg>
                  </span>
                  <span>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C5.44772 0 5 0.447715 5 1V4C5 4.55228 5.44772 5 6 5H7V9H1C0.447715 9 0 9.44771 0 10V11C0 11.5523 0.447715 12 1 12H15C15.5523 12 16 11.5523 16 11V10C16 9.44772 15.5523 9 15 9H9V5H10C10.5523 5 11 4.55228 11 4V1C11 0.447715 10.5523 0 10 0H6ZM1 13.5C1 13.2239 1.22386 13 1.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H1.5C1.22386 14 1 13.7761 1 13.5Z" fill="#2055B5"/>
                    </svg>
                  </span>
                  <span>
                    <svg onClick={(e) => this.noteClickHandler("edit", "LINE OF BUSINESS")} width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#1D54B4"/>
                    </svg>
                  </span>
                </div>
            </div>
            <DialogPopup
              className="notes-popup"
              showCloseIcon={false}
              positiveActionText=""
              negativeActionText=""
              title={this.state.title}
              handleClose={() => {
                this.onClose();
              }}
              handleAction={() => {
                this.processCloseActions();
              }}
              showActions={false}
              open={this.state.popUpInd}
              popupMaxWidth={"sm"}
            >
              {this.state.paramIndicator === "note" ?
              <Note /> :
              <AddLob />
              }
            </DialogPopup>
            </>
            }
            {this.state.isTreeView === "grid" &&
            <div className="formulary-grid-panel-header-container">
            <div className="header-fields">
            <PanelHeader
              title="HIERARCHY"
              tooltip="HIERARCHY"
              className="formulary-grid-panel-header"
            />
            <div className="fields-container">
              <div className="field-container">
                <DropDown
                  className="formulary-type-dropdown"
                  placeholder="All"
                  options={["All", "None"]}
                />
              </div>
              <div className="field-container">
                <Input
                  className="formulary-list-search"
                  placeholder="Search"
                  type="text"
                  disableUnderline={true}
                  startAdornment={
                    <svg
                      className="member-search__icon"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                        fill="#999999"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="field-container">
                <DropDown
                  className="formulary-type-dropdown"
                  placeholder="Active"
                  options={["Active", "Inactive"]}
                />
              </div>
            </div>
            </div>
            <div className="action-btn">
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                    </svg>
                </span>
                <div className="view-all-button" onClick={(e) => this.viewAllBtnHandler()}>
                    View All
                </div>
            </div>
          </div>
        }
        {this.state.isTreeView === "grid" ?
            <div className="grid-tree-container inner-container">
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => {}}
              fixedColumnKeys={["claimId"]}
              pagintionPosition="topRight"
              gridName="MEDICARE"
              enableSettings
              columns={hierarchyDetailsGridColumns({
                onFormularyNameClick: (id: any) =>
                  this.props.drugDetailClick(id),
              })}
              scroll={{ y: 377 }}
              isFetchingData={false}
              enableResizingOfColumns
              data={this.props.baseData}
              // data={this.state.gridData}
              expandable={{
                isExpandable: true,
                expandIconColumnIndex:
                hierarchyDetailsGridColumns({}).length + 1,
                expandedRowRender: (props) => (
                  <ExpandedDetails selectedModule={""} />
                ),
                expandCloseIcon: (
                  <span>
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                        fill="#999999"
                      />
                    </svg>
                  </span>
                ),
                expandOpenIcon: (
                  <span>
                    <svg
                      width="5"
                      height="9"
                      viewBox="0 0 5 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                        fill="#323C47"
                      />
                    </svg>
                  </span>
                ),
              }}
            />
            </div>
            :
            this.state.isTreeView === "tree" ?
            <div className="hierarchy-tree-container">
        <div className="hierarchy-tree-wrapper">
          <div className="hierarchy-tree-sidebar">
            <h6>All</h6>
            <div className="side-bar-options">
              <div>
                <span style={{ color: "#684999" }}>&#x25cf;</span> <span className="text">FutureRX</span>
              </div>
              <div>
                <span style={{ color: "#F65A1C" }}>&#x25cf;</span> <span className="text">Customer</span>
              </div>
              <div>
                <span style={{ color: "#3CBBC4" }}>&#x25cf;</span> <span style={{ cursor: "pointer" }} onClick={(e) => this.treeNodeClickHander()} className="text">Client</span>
              </div>
              <div>
                <span style={{ color: "#80C483" }}>&#x25cf;</span> <span className="text">Carrier</span>
              </div>
              <div>
                <span style={{ color: "#F4AF64" }}>&#x25cf;</span> <span className="text">Account</span>
              </div>
              <div>
                <span style={{ color: "#F89090" }}>&#x25cf;</span> <span className="text">Group</span>
              </div>
            </div>
          </div>
          <div className="hierarchy-tree-body">
              <div className="hierarchy-tree">
                <FrxTree checkable={false} data={data} />
              </div>
          </div>
        </div>
      </div>
      :
      <>
      <div className="formulary-grid-panel-header-container">
        <div className="header-fields">
        <PanelHeader
          title="HIERARCHY"
          tooltip="HIERARCHY"
          className="formulary-grid-panel-header"
        />
        </div>
        <div className="action-btn">
          <div className="view-all-button">
            View All
          </div>
        </div>
      </div>
      <ExpandedDetails />
      </>
            }
            </div>
        </div>
        </>
    )
  }
}
