import { Col, Input, Row } from "antd";
import React from "react";
import "./step-listing.scss";


const SearchSvg = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8096 11.7393L11.0832 9.20813C10.9602 9.09389 10.7934 9.03042 10.6184 9.03042H10.1726C10.9274 8.13422 11.3758 7.00698 11.3758 5.78073C11.3758 2.86364 8.82994 0.5 5.68792 0.5C2.54589 0.5 0 2.86364 0 5.78073C0 8.69783 2.54589 11.0615 5.68792 11.0615C7.00872 11.0615 8.22287 10.6451 9.18817 9.94439V10.3582C9.18817 10.5207 9.25654 10.6756 9.37959 10.7898L12.106 13.321C12.363 13.5597 12.7787 13.5597 13.033 13.321L13.8069 12.6025C14.0639 12.3639 14.0639 11.978 13.8096 11.7393ZM5.68792 9.03042C3.75457 9.03042 2.18766 7.57822 2.18766 5.78073C2.18766 3.98579 3.75184 2.53105 5.68792 2.53105C7.62126 2.53105 9.18817 3.98325 9.18817 5.78073C9.18817 7.57568 7.624 9.03042 5.68792 9.03042Z" fill="#999999" />
    </svg>

);

const WarningSvg = () => (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6112 12.0316C15.0847 12.9064 14.4903 14 13.5445 14H1.23257C0.284918 14 -0.306757 12.9047 0.165875 12.0316L6.3219 0.65584C6.79569 -0.219406 7.98235 -0.21782 8.45529 0.65584L14.6112 12.0316ZM7.38859 9.67969C6.7368 9.67969 6.20842 10.2428 6.20842 10.9375C6.20842 11.6322 6.7368 12.1953 7.38859 12.1953C8.04038 12.1953 8.56876 11.6322 8.56876 10.9375C8.56876 10.2428 8.04038 9.67969 7.38859 9.67969ZM6.26812 5.15851L6.45844 8.87726C6.46734 9.05127 6.60234 9.1875 6.76585 9.1875H8.01134C8.17484 9.1875 8.30984 9.05127 8.31875 8.87726L8.50906 5.15851C8.51868 4.97055 8.37827 4.8125 8.20165 4.8125H6.57551C6.39889 4.8125 6.2585 4.97055 6.26812 5.15851Z" fill="#F65A1C" />
    </svg>
)

const EditSvg = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8727 2.27617L13.3086 4.74257C13.4113 4.84648 13.4113 5.01601 13.3086 5.11992L7.41049 11.0918L4.90432 11.3734C4.56944 11.4117 4.28588 11.1246 4.32369 10.7855L4.60185 8.24804L10.5 2.27617C10.6026 2.17226 10.7701 2.17226 10.8727 2.27617ZM15.2477 1.65L13.9298 0.315625C13.5193 -0.0999999 12.8522 -0.0999999 12.439 0.315625L11.483 1.28359C11.3804 1.3875 11.3804 1.55703 11.483 1.66094L13.919 4.12734C14.0216 4.23125 14.189 4.23125 14.2917 4.12734L15.2477 3.15937C15.6582 2.74101 15.6582 2.06562 15.2477 1.65ZM10.3704 9.46757V12.2512H1.72839V3.50117H7.93441C8.02083 3.50117 8.10185 3.46562 8.16397 3.40547L9.24421 2.31172C9.44946 2.1039 9.30363 1.75117 9.01466 1.75117H1.2963C0.580633 1.75117 0 2.33906 0 3.06367V12.6887C0 13.4133 0.580633 14.0012 1.2963 14.0012H10.8025C11.5181 14.0012 12.0988 13.4133 12.0988 12.6887V8.37382C12.0988 8.08124 11.7504 7.93632 11.5451 8.1414L10.4649 9.23515C10.4055 9.29804 10.3704 9.38007 10.3704 9.46757Z" />
    </svg>
)

const TickSvg = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0.761719C4.00289 0.761719 0.761902 4.00271 0.761902 7.99981C0.761902 11.9969 4.00289 15.2379 8 15.2379C11.9971 15.2379 15.2381 11.9969 15.2381 7.99981C15.2381 4.00271 11.9971 0.761719 8 0.761719ZM11.1263 5.63612L7.72372 10.3538C7.67617 10.4202 7.61347 10.4743 7.54084 10.5116C7.46821 10.5489 7.38773 10.5684 7.30608 10.5684C7.22442 10.5684 7.14394 10.5489 7.07131 10.5116C6.99868 10.4743 6.93599 10.4202 6.88843 10.3538L4.87372 7.56197C4.81233 7.47634 4.87372 7.35679 4.97874 7.35679H5.73648C5.90127 7.35679 6.05799 7.43595 6.15493 7.57167L7.30527 9.16793L9.84507 5.64582C9.942 5.51172 10.0971 5.43094 10.2635 5.43094H11.0213C11.1263 5.43094 11.1877 5.55049 11.1263 5.63612Z" fill="#219653" />
    </svg>
)

export class StepsListing extends React.Component<any, any> {

    render() {
        return (
            <div className="left-side-area">
                <Row className="heading-row">
                    <Col span={12}><span className="heading">Steps</span></Col>
                    <Col span={12}>
                        <div><button type="button" className="save-btn">
                            <span className="btn-txt">+ Add New Step</span></button></div>
                    </Col>
                </Row>
                <div className="border"></div>
                <Row className="search-row">
                    <Input placeholder="Search..." suffix={<SearchSvg />} />
                </Row>
                <div className="steps-area">
                    <Row className="step-orange">
                        <Col span={22}> <WarningSvg />
                            <span className="step-txt">Setup</span>
                        </Col>
                        <Col span={2}>
                            <span className="edit-svg"><EditSvg /></span>
                        </Col>
                    </Row>
                    <Row className="step-orange">
                        <Col span={22}> <WarningSvg />
                            <span className="step-txt">Construct</span>
                        </Col>
                        <Col span={2}>
                            <span className="edit-svg"><EditSvg /></span>
                        </Col>
                    </Row>
                    <Row className="step-orange">
                        <Col span={22}> <WarningSvg />
                            <span className="step-txt">Review</span>
                        </Col>
                        <Col span={2}>
                            <span className="edit-svg"><EditSvg /></span>
                        </Col>
                    </Row>
                    <Row className="step-orange">
                        <Col span={22}> <WarningSvg />
                            <span className="step-txt">Audit</span>
                        </Col>
                        <Col span={2}>
                            <span className="edit-svg"><EditSvg /></span>
                        </Col>
                    </Row>
                    <Row className="step-green">
                        <Col span={22}><TickSvg />
                            <span className="step-txt">Completed</span>
                        </Col>
                        <Col span={2}>
                            <span className="edit-svg"><EditSvg /></span>
                        </Col>
                    </Row>
                    <Row className="step-green">
                        <Col span={22}><TickSvg />
                            <span className="step-txt">Cancelled</span>
                        </Col>
                        <Col span={2}>
                            <span className="edit-svg"><EditSvg /></span>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}