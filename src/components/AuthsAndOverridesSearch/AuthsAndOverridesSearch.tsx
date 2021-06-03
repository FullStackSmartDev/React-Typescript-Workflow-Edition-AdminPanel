//react imports
import { Input, Button } from "@material-ui/core";
//ant and materil imports
import {  DatePicker } from "antd";
//3rd party imports
import { Moment } from "moment";
import * as React from "react";
//style imports
import "./AuthsAndOverridesSearch.scss";
//Components 
import CustomDatePicker from  "../shared/Frx-components/date-picker/CustomDatePicker";

interface AuthsAndOverridesSearchState {
    authOverrideId: string;
    drugLabel: string;
    startDate:  Moment | null | undefined;
    endDate:  Moment | null | undefined;
    isOpen: boolean
}

interface AuthsAndOverridesSearchProps {
    onSearch: (searchObject: AuthsAndOverridesSearchState) => void;
}

interface AuthsAndOverridesSearchProps { }

class ClaimsSearch extends React.Component<
    AuthsAndOverridesSearchProps,
    AuthsAndOverridesSearchState
    > {
    state = {
        authOverrideId: "",
        status: undefined,
        drugLabel: "",
        startDate: undefined,
        endDate: undefined,
        isOpen: true
    };

    /**
     * @function handleStartDate
     * start date picker change handler
     * @author Deepak_T
     */
    handleStartDate = date => {
        this.setState({ startDate: date });
    };

    /**
     * @function handleEndDate
     * end date picker change handler
     * @author Deepak_T
     */
    handleEndDate = date => {
        console.log(typeof date);
        this.setState({ endDate: date });
    };

    /**
     * @function handleInputChange
     * claim id input change handler
     * @author Deepak_T
     */
    handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (
            (e && e.target && e.target.value) ||
            (e && e.target && e.target.value === "")
        ) {
            const key = e.currentTarget.name;
            let value = e.target.value;

            if (Object.keys(this.state).includes(key)) {
                this.setState({ ...this.state, [key]: value } as Pick<
                    AuthsAndOverridesSearchState,
                    keyof AuthsAndOverridesSearchState
                >);
            }
        }
        // this.setState({ [e.target.name]: e.target.value });
    };

    /**
     * @function onSearch
     * handler for search button
     * @author Deepak_T
     */
    onSearch = () => {
        console.log("search for ", this.state);
        this.props.onSearch({ ...this.state });
    };
      
    onOk(value) {
        console.log('onOk: ', value);
    }

    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    closeDatepicker = () => {
        this.setState({isOpen : !this.state.isOpen})
    }

    render() {
        return (
            <div className="auth-override-search">
                    <div className="auth-override-search__first-row">
                        <Input
                            className="auth-override-search__input"
                            placeholder="Auth or Override ID"
                            type="text"
                            name="authOverrideId"
                            value={this.state.authOverrideId}
                            onChange={e => this.handleInputChange(e)}
                        />
                        <Input
                            className="auth-override-search__input"
                            placeholder="Drug Label"
                            name="drugLabel"
                            type="text"
                            value={this.state.drugLabel}
                            onChange={e => this.handleInputChange(e)}
                        />
                        <CustomDatePicker
                            className="auth-override-search__input auth-override-search__input--date"
                            onChange={this.handleStartDate}
                            value={this.state.startDate}
                            placeholder="Start Date Time"
                        />
                        <CustomDatePicker
                            className="auth-override-search__input auth-override-search__input--date"
                            onChange={this.handleEndDate}
                            value={this.state.endDate}
                            placeholder="End Date Time"
                        />
                    </div>
                <Button className="auth-override-search__btn-clear">
                    <svg className="auth-override-search__btn-clear--clearicon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                        <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
                    </svg>
                    <span>Clear</span>
                </Button>
                <Button
                    className="auth-override-search__btn-search"
                    onClick={e => this.onSearch()}
                >
                    Search
                </Button>
            </div>
        );
    }
}

export default ClaimsSearch;
