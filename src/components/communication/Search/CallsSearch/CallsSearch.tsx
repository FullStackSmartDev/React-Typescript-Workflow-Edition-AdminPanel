//react imports
import { Input, Button } from "@material-ui/core";
//ant and materil imports
import { DatePicker, Select } from "antd";
//3rd party imports
import { Moment } from "moment";
import * as React from "react";
//style imports
import "./CallsSearch.scss";
//Components
import CustomDatePicker from "../../../shared/Frx-components/date-picker/CustomDatePicker";

const { Option } = Select;

interface CallsSearchState {
    classification: string;
    callStartDate: Moment | null | undefined;
    callEndDate: Moment | null | undefined;
    callerType: string;
}

interface CallsSearchProps {
    onSearch: (searchObject: CallsSearchState) => void;
}

interface CallsSearchProps { }

class CallsSearch extends React.Component<
    CallsSearchProps,
    CallsSearchState
    > {
    state = {
        classification: "",
        callStartDate: undefined,
        callEndDate: undefined,
        callerType: "",
    };

    /**
     * @function handleCallStartDate
     * start date picker change handler
     * @author Muthu
     */
    handleCallStartDate = date => {
        this.setState({ callStartDate: date });
    };

    /**
     * @function handleCallEndDate
     * end date picker change handler
     * @author Muthu
     */
    handleCallEndDate = date => {
        console.log(typeof date);
        this.setState({ callEndDate: date });
    };

    /**
     * @function onSelectCallerType
     * callertype drop down change handler
     * @author Muthu
     */

    onSelectCallerType = (value: string) => {
        this.setState({ callerType: value });
    };

    /**
     * @function onSelectClassification
     * classification drop down change handler
     * @author Muthu
     */

    onSelectClassification = (value: string) => {
        this.setState({ classification: value });
    };

    /**
     * @function onSearch
     * handler for search button
     * @author Muthu
     */
    onSearch = () => {
        console.log("search for ", this.state);
        this.props.onSearch({ ...this.state });
    };

    render() {
        const callerTypes: string[] = ["Member", "Pharmacy", "Prescriber", "Parent/Caretaker", "AOR/Attorney", "Third Party", "Others"]
        const classification: string[] = [
            "Inquiry",
            "Coverage Determination (Medicare) ",
            "Part B Drug Organizational Determination",
            "Prior Authorization (Commercial)",
            "Appeal",
            "First Call Resolution Grievance/Complaint",
            "Grievance/Complaint",
            "Quality of care grievance",
            "Client customized Primary classifications",
            "Others"
        ]
        return (
            <div className="calls-search">
                <div className="calls-search__first-row">
                    <CustomDatePicker
                        className="calls-search__input calls-search__input--date"
                        onChange={this.handleCallStartDate}
                        value={this.state.callStartDate}
                        placeholder="Call Date Start"
                    />
                    <CustomDatePicker
                        className="calls-search__input calls-search__input--date"
                        onChange={this.handleCallEndDate}
                        value={this.state.callEndDate}
                        placeholder="Call Date End"
                    />
                    <Select
                        placeholder="Caller Type"
                        //value={this.state.callerType}
                        onChange={this.onSelectCallerType}
                        className="calls-search__input calls-search__input--dropdown"
                        suffixIcon={
                            <svg
                                className="ant-select-suffix"
                                width="6"
                                height="3"
                                viewBox="0 0 6 3"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                                    fill="#999999"
                                />
                            </svg>
                        }
                    >

                        {
                            callerTypes.map((type) => {
                                return (
                                    <Option value={type}>{type}</Option>
                                )
                            })
                        }
                    </Select>
                    <Select
                        placeholder="Classification"
                        //value={this.state.classification}
                        onChange={this.onSelectClassification}
                        className="calls-search__input calls-search__input--dropdown"
                        suffixIcon={
                            <svg
                                className="ant-select-suffix"
                                width="6"
                                height="3"
                                viewBox="0 0 6 3"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                                    fill="#999999"
                                />
                            </svg>
                        }
                    >
                        {
                            classification.map((type) => {
                                return (
                                    <Option value={type}>{type}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <Button className="calls-search__btn">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                        <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
                    </svg>
                    <span>Clear</span>
                </Button>
                <Button
                    className="calls-search__btn-field"
                    onClick={e => this.onSearch()}
                >
                    Search
                    </Button>
            </div>
        );
    }
}

export default CallsSearch;
