import React, { Component } from "react";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import "./WorkFlowSettingTop.scss";

export default class WorkFlowSettingTop extends Component<any, any> {
    state = {
        formularyVersionList: [],
    }
    componentDidMount() {
        this.setState({ formularyVersionList: ["Version 1", "Version 2"] });
    }
    render() {
        let dropDown: any;
        dropDown = (
            <DropDown
                className="formulary-type-dropdown formulary-versions-green"
                placeholder="Component Version 1"
                options={this.state.formularyVersionList.map((e) => e)}
                dropdownClassName="version-dd"
            />
        );
        return (
            <div className="workflow-setting-container">
                <div className="heading-menu-wrapper">
                    <div className="heading-wrapper">
                        <h4>workflow sla settings</h4>
                    </div>
                    <div className="menu-wrapper">
                        <div className="version-wrapper-green">
                            {dropDown}
                            <div className="item">
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.8281 5.48992C10.8336 8.42555 8.43949 10.826 5.50387 10.8281C4.23597 10.829 3.07134 10.387 2.15613 9.64838C1.91815 9.4563 1.90036 9.09964 2.11662 8.88338L2.35868 8.64132C2.54364 8.45636 2.83892 8.43612 3.04384 8.59869C3.71813 9.13376 4.57147 9.45312 5.5 9.45312C7.68507 9.45312 9.45312 7.68472 9.45312 5.5C9.45312 3.31493 7.68472 1.54688 5.5 1.54688C4.45126 1.54688 3.49875 1.95441 2.79151 2.61963L3.88193 3.71005C4.09849 3.92661 3.94511 4.29688 3.63887 4.29688H0.515625C0.325768 4.29688 0.171875 4.14298 0.171875 3.95312V0.829877C0.171875 0.523639 0.542137 0.370262 0.758699 0.586803L1.81943 1.64753C2.77597 0.733391 4.07241 0.171875 5.5 0.171875C8.43928 0.171875 10.8227 2.55191 10.8281 5.48992ZM6.94134 7.18255L7.15238 6.9112C7.32722 6.68641 7.28673 6.36245 7.06193 6.18763L6.1875 5.5075V3.26562C6.1875 2.98085 5.95665 2.75 5.67187 2.75H5.32812C5.04335 2.75 4.8125 2.98085 4.8125 3.26562V6.18L6.21777 7.273C6.44256 7.44782 6.7665 7.40734 6.94134 7.18255Z" fill="#11861A" />
                                </svg>
              Version History
            </div>
                            <div className="item">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7812 0C12.4544 0 13 0.545645 13 1.21875V8.53125C13 9.20436 12.4544 9.75 11.7812 9.75H4.46875C3.79564 9.75 3.25 9.20436 3.25 8.53125V1.21875C3.25 0.545645 3.79564 0 4.46875 0H11.7812ZM4.46875 10.5625C3.34872 10.5625 2.4375 9.65128 2.4375 8.53125V3.25H1.21875C0.545645 3.25 0 3.79564 0 4.46875V11.7812C0 12.4544 0.545645 13 1.21875 13H8.53125C9.20436 13 9.75 12.4544 9.75 11.7812V10.5625H4.46875Z" fill="#11861A" />
                                </svg>
              Clone
            </div>
                            <div className="item">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.61597 0C3.47515 0 0.928467 2.54668 0.928467 5.6875C0.928467 8.82832 3.47515 11.375 6.61597 11.375C9.75679 11.375 12.3035 8.82832 12.3035 5.6875C12.3035 2.54668 9.75679 0 6.61597 0ZM9.05347 5.99219C9.05347 6.04805 9.00776 6.09375 8.9519 6.09375H7.02222V8.02344C7.02222 8.0793 6.97651 8.125 6.92065 8.125H6.31128C6.25542 8.125 6.20972 8.0793 6.20972 8.02344V6.09375H4.28003C4.22417 6.09375 4.17847 6.04805 4.17847 5.99219V5.38281C4.17847 5.32695 4.22417 5.28125 4.28003 5.28125H6.20972V3.35156C6.20972 3.2957 6.25542 3.25 6.31128 3.25H6.92065C6.97651 3.25 7.02222 3.2957 7.02222 3.35156V5.28125H8.9519C9.00776 5.28125 9.05347 5.32695 9.05347 5.38281V5.99219Z" fill="#11861A" />
                                </svg>
              New Version
            </div>
                            <div className="item">
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.6875 9.625C0.6875 10.0053 0.994727 10.3125 1.375 10.3125H9.625C10.0053 10.3125 10.3125 10.0053 10.3125 9.625V3.4375H0.6875V9.625ZM4.125 5.07031C4.125 4.92852 4.24102 4.8125 4.38281 4.8125H6.61719C6.75898 4.8125 6.875 4.92852 6.875 5.07031V5.24219C6.875 5.38398 6.75898 5.5 6.61719 5.5H4.38281C4.24102 5.5 4.125 5.38398 4.125 5.24219V5.07031ZM10.3125 0.6875H0.6875C0.307227 0.6875 0 0.994727 0 1.375V2.40625C0 2.59531 0.154687 2.75 0.34375 2.75H10.6562C10.8453 2.75 11 2.59531 11 2.40625V1.375C11 0.994727 10.6928 0.6875 10.3125 0.6875Z" fill="#11861A" />
                                </svg>
              Archive
            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}