import React, { Component } from "react";
import RadioButton from "../../../../shared/Frx-components/radio-button/RadioButton";

import "./CustomDropDown.scss";

const SearchIcon = () => (
    <svg width="11" height="11" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.66 23.3432L19.7915 18.0861C19.5717 17.8488 19.2739 17.717 18.9613 17.717H18.1654C19.5131 15.8557 20.314 13.5145 20.314 10.9677C20.314 4.90909 15.7678 0 10.157 0C4.54623 0 0 4.90909 0 10.9677C0 17.0263 4.54623 21.9354 10.157 21.9354C12.5156 21.9354 14.6837 21.0706 16.4074 19.6153V20.4748C16.4074 20.8122 16.5295 21.1339 16.7493 21.3712L21.6178 26.6283C22.0768 27.1239 22.8191 27.1239 23.2732 26.6283L24.6551 25.136C25.1141 24.6404 25.1141 23.8389 24.66 23.3432ZM10.157 17.717C6.70459 17.717 3.90654 14.7009 3.90654 10.9677C3.90654 7.23972 6.69971 4.21834 10.157 4.21834C13.6094 4.21834 16.4074 7.23445 16.4074 10.9677C16.4074 14.6956 13.6143 17.717 10.157 17.717Z" fill="#C4C4C4" />
    </svg>
)


class CustomDropDown extends Component<any, any> {
    state = {
        isArrowClick: false,
        name: "",
        days: "",
        hours: "",
        optionList: [
            {
                id: 1,
                name: "Medicare WorkFlow",
                days: "Working Days: 7",
                hours: "Working Hours Per Day: 24"
            },
            {
                id: 2,
                name: "Comme SLA Multi M2",
                days: "Working Days: 7",
                hours: "Working Hours Per Day: 24"
            },
            {
                id: 3,
                name: "Comme Test M3",
                days: "Working Days: 7",
                hours: "Working Hours Per Day: 24"
            },
            {
                id: 4,
                name: "SLA Multi M2",
                days: "Working Days: 7",
                hours: "Working Hours Per Day: 24"
            },
        ]
    }

    showOption = () => {
        this.setState({ isArrowClick: !this.state.isArrowClick })
    }

    optionClick = (id) => {
        let selectedItem = this.state.optionList.find(p => p.id === id)
        if (selectedItem != undefined) {
            this.setState({ name: selectedItem.name, days: selectedItem.days, hours: selectedItem.hours, isArrowClick: false })
        }
    }

    getOptions() {
        let optionList = this.state.optionList.map((option, index) => {
            return (
                <div className="options-list">
                    <RadioButton onChange={(e) => this.optionClick(option.id)} />
                    <div><span>{option.name}</span></div>
                    <div><span>{option.days}</span></div>
                    <div><span>{option.hours}</span></div>
                </div>
            )
        })
        return optionList
    }
    render() {
        let optionList = this.getOptions();
        return (
            <div className="custom-dropdown-container">
                <div className="top-section">
                    <div><span>{this.state.name}</span></div>
                    <div><span>{this.state.days}</span></div>
                    <div><span>{this.state.hours}</span></div>
                    <svg onClick={(e) => this.showOption()} width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.681272 0.5H9.44373C10.0499 0.5 10.353 1.12521 9.92391 1.49162L5.54438 5.23418C5.27875 5.461 4.84625 5.461 4.58062 5.23418L0.201091 1.49162C-0.228008 1.12521 0.0750856 0.5 0.681272 0.5Z" fill="#C4C4C4" />
                    </svg>
                </div>
                {this.state.isArrowClick === true &&
                    <div className="options-section">
                        <div className="searchbar">
                            <SearchIcon />
                            <input type="text" placeholder="Search Calender" className="border-none" />
                        </div>
                        {optionList}
                    </div>
                }
            </div>
        );
    }
}

export default CustomDropDown;
