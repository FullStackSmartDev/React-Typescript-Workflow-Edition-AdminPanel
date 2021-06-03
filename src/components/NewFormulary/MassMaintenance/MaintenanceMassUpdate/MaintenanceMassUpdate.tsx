import React, { Component } from "react";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
//   ../../../shared/FrxGrid/FrxDrugGridContainer";
import { getDrugDetailsColumn } from "../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
// "../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getMaintenacneMassUpdateColumns } from "./components/MaintenanceMassUpdateColumn";
import { getDrugDetailData } from "../../../../mocks/DrugGridMock";
// ("../../../mocks/DrugGridMock");
import { getMaintenanceMassMedicareData,getMaintenanceMassCommercialData } from "../../../../mocks/MaintenanceMassUpdateMockData";

import { Box } from "@material-ui/core";
import Button from "../../../shared/Frx-components/button/Button";
// "../../shared/Frx-components/button/Button";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";
// ("../../shared/Frx-components/dropdown/DropDown");
import AdvancedSearch from "../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
// "../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import "./MaintenanceMassUpdate.scss";
import SearchBox from "../../../shared/Frx-components/search-box/SearchBox";
interface Props {
  onClickAddNew: (id:any) => any;
  lob_type:any;
}
interface State {}

class MaintenanceMassUpdate extends Component<Props, State> {
  state = {
    isSearchOpen: false,
    columns: [] as any,
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
  };

  getGridData(){
    debugger;
    if(this.props.lob_type == "commercial")
    {
      return getMaintenanceMassCommercialData();
    }
    else if(this.props.lob_type == "medicare")
    {
      return getMaintenanceMassMedicareData();
    }
  }
  componentDidMount() {  
    const data = this.getGridData(); 
    const columns = getMaintenacneMassUpdateColumns(); 
    console.log(data);
    this.setState({
      columns: columns,
      data: data,
      filteredData: data,
    });
  }
  handleSearch = (searchObject) => {
    console.log("search");
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  rowSelectionChange = (record) => {
    console.log(record);
  };

  render() {
    // const { enableSettings, pinData, scroll } = this.props;
    console.log("", this.props);
    let hiddenColumns = [];
    let GridElement = <div>Loading</div>;
    if (this.state.data.length > 0) {
      GridElement = (
        <div className="MaintenanceMassUpdate ">
          <div className="header-container ">
            <span className="header">MAINTENANCE MASS UPDATE</span>
            <div className="dropdown-button-container ">
            <div className="field-container">
                <SearchBox iconPosition="left" placeholder="Search"/>
              </div>
              <DropDown
                options={["Active", "Archive"]}
                defaultValue="Active"
                className="dropdown-input"
              />
              {/* <Button
                label="Advance Search"
                className="Button advance-search"
                onClick={this.advanceSearchClickHandler}
              /> */}
              <Button
                label="+ Add New"
                className="addNewButton "
                onClick={this.props.onClickAddNew}
              />
              {/* <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z"
                  fill="#1D54B4"
                />
              </svg> */}
            </div>
          </div>
          {/* {this.state.isSearchOpen ? (
            <AdvancedSearch
              category="Grievances"
              openPopup={this.state.isSearchOpen}
              onClose={this.advanceSearchClosekHandler}
            />
          ) : null} */}
          <div className="mass-maintenance-update-grid">
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag={false}
              onSearch={this.handleSearch}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName=""
              enableSettings={true}
              isFetchingData={this.state.isFetchingData}
              columns={getMaintenacneMassUpdateColumns(
                {
                  onFormularyNameClick: (id: any) =>
                    this.props.onClickAddNew(id),
                },
                hiddenColumns
              )}
              isPinningEnabled={false}
              scroll={{ x: 0, y: 377 }}
              enableResizingOfColumns={false}
              data={this.state.filteredData}
              isCustomCheckboxEnabled={true}
              handleCustomRowSelectionChange={this.rowSelectionChange}
              settingsTriDotClick={() => {
                console.log("object");
              }}
            />
          </div>
        </div>
      );
    }
    return <>{GridElement}</>;
  }
}

export default MaintenanceMassUpdate;
