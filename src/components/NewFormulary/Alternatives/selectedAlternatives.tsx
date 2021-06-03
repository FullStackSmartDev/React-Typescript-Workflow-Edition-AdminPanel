import React from 'react';
import FrxDrugGridContainer from '../../shared/FrxGrid/FrxDrugGridContainer';
import { getDrugDetailsColumn } from "../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { getDrugDetailData } from "../../../mocks/DrugGridMock";
import {Box} from '@material-ui/core';
import Button from '../../shared/Frx-components/button/Button';
import DropDown from '../../shared/Frx-components/dropdown/DropDown';
import AdvancedSearch from '../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch';

class selectedAlternatives extends React.Component<any,any>{
    state = {
        isSearchOpen: false,
        columns: [] as any,
        isFetchingData: false,
        data: [] as any[],
        filteredData: [] as any[]
    }
    
    componentDidMount(){
        const data = getDrugDetailData();
        const columns = getDrugDetailsColumn();
        console.log(data)
        this.setState({
            columns: columns,
            data: data,
            filteredData: data
        });
    }
    handleSearch = (searchObject) => {
        console.log('search')
    };
    advanceSearchClickHandler = (event) => {
        event.stopPropagation();
        this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
    advanceSearchClosekHandler = () =>{
        this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
    render(){
        // const { enableSettings, pinData, scroll } = this.props;
        console.log("",this.props)
        let GridElement = <div>Loading</div>
        if(this.state.data.length > 0){
            GridElement = (
                <div className="border br-5 mb-10">
                    <div className="header space-between">
                        Selected ALTERNATIVES
                        <div className="right-side">
                            <DropDown options={['Exchange']}/>
                            <Button label="Advance Search" className="Button advance-search" onClick={this.advanceSearchClickHandler}/>
                            <Button label="Save" className="Button disabled" />
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                            </svg>
                        </div>
                    </div>
                    {this.state.isSearchOpen ? (
                        <AdvancedSearch
                                category="Grievances"
                                openPopup={this.state.isSearchOpen}
                                onClose={this.advanceSearchClosekHandler}/>
                    ) : (
                        null
                    )}
                    <div className="selected-alternatives">
                        <FrxDrugGridContainer
                            enableSearch={false}
                            enableColumnDrag
                            onSearch={this.handleSearch}
                            fixedColumnKeys={[]}
                            pagintionPosition="topRight"
                            gridName="DRUGSDETAILS"
                            enableSettings={false}
                            isFetchingData={this.state.isFetchingData}
                            columns={this.state.columns}
                            isRowSelectionEnabled={true}
                            isRowSelectorCheckbox={true}
                            isPinningEnabled={false}
                            rowSelection={{
                            columnWidth: 50,
                            fixed: true,
                            type: "checkbox",
                            }}
                            scroll={{ x: 5200, y: 377 }}
                            enableResizingOfColumns
                            data={this.state.filteredData}
                        />
                        <Box display="flex" justifyContent="flex-end">
                            <Button className="Button mr-0" label="Apply" onClick={() => this.props.applyClick()}/>
                        </Box>
                    </div>
                </div>
            )
        }
        return(
            <>
                {GridElement}
            </>
        )
    }
}
export default selectedAlternatives;