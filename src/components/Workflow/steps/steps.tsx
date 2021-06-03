import { Checkbox, Col, DatePicker, Input, Row, Select } from 'antd';
import React from 'react';
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import TaskAssignment from "./TaskAssignment";
import { WorkflowTopBar } from "./components/workflowTopBar/workflow-topbar";
import Roles from "./components/roles/roles";
import { RoutingActions } from "./components/routing-actions/routing-actions";
import { SetupComponent } from "./components/setup/setup";
import { StepsListing } from "./components/step-listing/step-listing";
import UserGroups from "./components/userGroups/userGroups";
import './steps.scss';

const { Option } = Select;

const DeleteSvg = () => (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.74992 13.0417C1.74992 13.9125 2.46242 14.625 3.33325 14.625H9.66658C10.5374 14.625 11.2499 13.9125 11.2499 13.0417V3.54167H1.74992V13.0417ZM12.0416 1.16667H9.27075L8.47908 0.375H4.52075L3.72909 1.16667H0.958252V2.75H12.0416V1.16667Z" fill="#707683" />
    </svg>
)

const InfoSvg = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.16772 3.66683H7.49926V5.00016H6.16772V3.66683ZM6.16772 6.3335H7.49926V10.3335H6.16772V6.3335ZM6.83349 0.333496C3.15843 0.333496 0.175781 3.32016 0.175781 7.00016C0.175781 10.6802 3.15843 13.6668 6.83349 13.6668C10.5085 13.6668 13.4912 10.6802 13.4912 7.00016C13.4912 3.32016 10.5085 0.333496 6.83349 0.333496ZM6.83349 12.3335C3.89744 12.3335 1.50732 9.94016 1.50732 7.00016C1.50732 4.06016 3.89744 1.66683 6.83349 1.66683C9.76954 1.66683 12.1597 4.06016 12.1597 7.00016C12.1597 9.94016 9.76954 12.3335 6.83349 12.3335Z" fill="#1D54B4" />
    </svg>
)

export class StepComponent extends React.Component<any, any> {

    setupAreaHtml() {
        const NotificationSettingHtml = this.NotificationSettingHtml();
        return (
            <>
                <Row className="heading-row">
                    <Col span={24}><span className="heading">Setup/Add Explanation</span></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className="input-label">Reason Title<span className="star"> *</span></Col>
                    <Col span={17}><Input className="input-control" defaultValue="Test 101" /></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className="input-label">Explanation<span className="star"> *</span></Col>
                    <Col span={17}><Input className="input-control" defaultValue="Test of workflow for product demonstration" /></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className="input-label">Destination<span className="star"> *</span></Col>
                    <Col span={8}>
                        <Select className="select" defaultValue="lucy" placeholder="Select...">
                            <Option value="jack">Setup</Option>
                            <Option value="lucy">Construct</Option>
                            <Option value="jack">Review</Option>
                            <Option value="jack">Audit</Option>
                            <Option value="jack">Completed</Option>
                            <Option value="jack">Cancelled</Option>
                        </Select>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2} className="input-label">Clock<span className="star"> *</span></Col>
                    <Col span={6}>
                        <Select className="select" defaultValue="Continue" placeholder="Select...">
                            <Option value="jack">Continue</Option>
                            <Option value="lucy">Restart</Option>
                            <Option value="jack">Stop</Option>
                        </Select>
                    </Col>
                </Row>
                {NotificationSettingHtml}
                <Row className="btn-row">
                    <Col span={10}><button type="button" className="save-btn">
                        <span className="btn-txt">Delete</span></button>
                    </Col>
                    <Col span={14} className="btn-col">
                        <button type="button" className="blue-btn"><span className="btn-txt">Save</span></button>
                        <button type="button" className="save-btn"><span className="btn-txt">Cancel</span></button>
                        <button type="button" className="green-btn"><span className="btn-txt">Add Notification</span></button>
                    </Col>
                </Row>
            </>
        )
    }
    NotificationSettingHtml() {
        return (
            <div className="notification-area">
                <Row className="heading-row">
                    <Col span={24}><span className="heading">Notification Settings</span></Col>
                </Row>
                <div className="notification-area-inner">
                    <Row className="input-label">Notification Name</Row>
                    <Row>
                        <Col span={12}><Input className="input-control" defaultValue="Test 101" /></Col>
                        <Col span={12}><button type="button" className="save-btn"><span className="btn-txt">Delete Notification</span></button></Col>
                    </Row>
                    <Row>
                        <Col span={12} className="input-label">Effective date</Col>
                        <Col span={1}></Col>
                        <Col span={11} className="input-label">Termination date</Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DatePicker
                                className="input-date-control"
                                placeholder=""
                                suffixIcon={
                                    <svg
                                        width="18"
                                        height="20"
                                        viewBox="0 0 18 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ant-picker-suffix"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                            fill="#C4C4C4"
                                        />
                                    </svg>
                                }
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <DatePicker
                                className="input-date-control"
                                placeholder=""
                                suffixIcon={
                                    <svg
                                        width="18"
                                        height="20"
                                        viewBox="0 0 18 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ant-picker-suffix"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                            fill="#C4C4C4"
                                        />
                                    </svg>
                                }
                            />
                        </Col>
                    </Row>
                    <Row className="input-label">Target Audience<span className="info-svg"><InfoSvg /></span></Row>
                    <Row>
                        <Col span={5}>
                            <Checkbox checked={true}><span className="checkbox-label">Member</span></Checkbox>
                        </Col>
                        <Col span={5}>
                            <Checkbox checked={true}><span className="checkbox-label">Prescriber</span></Checkbox>
                        </Col>
                        <Col span={6}>
                            <Checkbox checked={true}><span className="checkbox-label">Pharmacies</span></Checkbox>
                        </Col>
                        <Col span={4}>
                            <Checkbox checked={true}><span className="checkbox-label">User</span></Checkbox>
                        </Col>
                        <Col span={4}>
                            <Checkbox checked={true}><span className="checkbox-label">Formulary</span></Checkbox>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    render() {
        const setupAreaHtml = this.setupAreaHtml();
        return (
            <div className="step-main-container">
                <WorkflowTopBar />
                <Row>
                    <Col span={8}>
                        <StepsListing />
                    </Col>
                    <Col span={16}>
                        <div className="right-side-area">
                            <div className="setup-area">
                                <SetupComponent />
                            </div>

                            <div className="step-action-area">
                                <Row className="heading-row">
                                    <Col span={24}><span className="heading">Step Actions</span></Col>
                                </Row>
                                <div className="border"></div>
                                <div className="action-list-area">
                                    <div className="action">
                                        <Row>
                                            <Col span={16} className="txt">Actions: <span className="action-name">Completed</span></Col>
                                            <Col span={7}><div><button type="button" className="save-btn">
                                                <span className="btn-txt">+ Add New Reason</span></button></div>
                                            </Col>
                                            <Col span={1} className="deleteSvg-col"><DeleteSvg /></Col>
                                        </Row>
                                    </div>

                                    <div className="action-notification">
                                        <Row>
                                            <Col span={5} className="txt">Reason Title: <span className="action-name">Test 101</span></Col>
                                            <Col span={5} className="txt">Destination: <span className="action-name">Setup</span></Col>
                                            <Col span={4} className="txt">Clock: <span className="action-name">Continue</span></Col>
                                            <Col span={4} className="txt">Notification: <span className="action-name">On</span></Col>
                                            <Col span={5}><div><button type="button" className="save-btn">
                                                <span className="btn-txt">View</span></button></div>
                                            </Col>
                                            <Col span={1} className="deleteSvg-col"><DeleteSvg /></Col>
                                        </Row>
                                    </div>

                                    <div className="explanation-area">
                                        {setupAreaHtml}
                                    </div>

                                    <div className="action">
                                        <Row>
                                            <Col span={16} className="txt">Actions: <span className="action-name">Need more info</span></Col>
                                            <Col span={7}><div><button type="button" className="save-btn">
                                                <span className="btn-txt">+ Add New Reason</span></button></div>
                                            </Col>
                                            <Col span={1} className="deleteSvg-col"><DeleteSvg /></Col>
                                        </Row>
                                    </div>
                                    <div className="action">
                                        <Row>
                                            <Col span={16} className="txt">Actions: <span className="action-name">Waiting on subtask</span></Col>
                                            <Col span={7}><div><button type="button" className="save-btn">
                                                <span className="btn-txt">+ Add New Reason</span></button></div>
                                            </Col>
                                            <Col span={1} className="deleteSvg-col"><DeleteSvg /></Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <TaskAssignment/>

                            <div className="user-access-area">
                                <Row className="heading-row">
                                    <Col span={24}><span className="heading">User ACCESS</span></Col>
                                </Row>
                                <div className="border"></div>
                                <div className="roles-area">
                                    <Roles />
                                </div>
                                <div className="userGroups">
                                    <UserGroups />
                                </div>
                            </div>

                            <div className="routing-action-area">
                                <RoutingActions />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}