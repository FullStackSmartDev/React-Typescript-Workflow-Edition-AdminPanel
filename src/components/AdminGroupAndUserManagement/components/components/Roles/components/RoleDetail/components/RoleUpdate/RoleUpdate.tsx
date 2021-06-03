import { Button, Col, DatePicker, Dropdown, Input, Menu, Row, Select } from 'antd';
import React, { Component } from 'react';
import './RoleUpdate.scss';
import ArrowUp from '../../../../../../../../../assets/icons/ArrowUp.svg';
import EditIcon from '../../../../../../../../../assets/icons/EditIcon.svg';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const VersionHistorySvg = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.8281 5.48992C10.8336 8.42555 8.43949 10.826 5.50387 10.8281C4.23597 10.829 3.07134 10.387 2.15613 9.64838C1.91815 9.4563 1.90036 9.09964 2.11662 8.88338L2.35868 8.64132C2.54364 8.45636 2.83892 8.43612 3.04384 8.59869C3.71813 9.13376 4.57147 9.45312 5.5 9.45312C7.68507 9.45312 9.45312 7.68472 9.45312 5.5C9.45312 3.31493 7.68472 1.54688 5.5 1.54688C4.45126 1.54688 3.49875 1.95441 2.79151 2.61963L3.88193 3.71005C4.09849 3.92661 3.94511 4.29688 3.63887 4.29688H0.515625C0.325768 4.29688 0.171875 4.14298 0.171875 3.95312V0.829877C0.171875 0.523639 0.542137 0.370262 0.758699 0.586803L1.81943 1.64753C2.77597 0.733391 4.07241 0.171875 5.5 0.171875C8.43928 0.171875 10.8227 2.55191 10.8281 5.48992ZM6.94134 7.18255L7.15238 6.9112C7.32722 6.68641 7.28673 6.36245 7.06193 6.18763L6.1875 5.5075V3.26562C6.1875 2.98085 5.95665 2.75 5.67187 2.75H5.32812C5.04335 2.75 4.8125 2.98085 4.8125 3.26562V6.18L6.21777 7.273C6.44256 7.44782 6.7665 7.40734 6.94134 7.18255Z"
            fill="#219653"
        />
    </svg>
);

const CloneSvg = () => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11.7812 0C12.4544 0 13 0.545645 13 1.21875V8.53125C13 9.20436 12.4544 9.75 11.7812 9.75H4.46875C3.79564 9.75 3.25 9.20436 3.25 8.53125V1.21875C3.25 0.545645 3.79564 0 4.46875 0H11.7812ZM4.46875 10.5625C3.34872 10.5625 2.4375 9.65128 2.4375 8.53125V3.25H1.21875C0.545645 3.25 0 3.79564 0 4.46875V11.7812C0 12.4544 0.545645 13 1.21875 13H8.53125C9.20436 13 9.75 12.4544 9.75 11.7812V10.5625H4.46875Z"
            fill="#219653"
        />
    </svg>
);

const DeleteSvg = () => (
    <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5ZM8.14962 3.33713C8.21417 3.27258 8.25043 3.18503 8.25043 3.09375C8.25043 3.00247 8.21417 2.91492 8.14962 2.85037C8.08508 2.78583 7.99753 2.74957 7.90625 2.74957C7.81497 2.74957 7.72742 2.78583 7.66288 2.85037L5.5 5.01394L3.33713 2.85037C3.30516 2.81841 3.26722 2.79306 3.22546 2.77577C3.18371 2.75847 3.13895 2.74957 3.09375 2.74957C3.04855 2.74957 3.00379 2.75847 2.96204 2.77577C2.92028 2.79306 2.88234 2.81841 2.85037 2.85037C2.81841 2.88234 2.79306 2.92028 2.77577 2.96204C2.75847 3.00379 2.74957 3.04855 2.74957 3.09375C2.74957 3.13895 2.75847 3.18371 2.77577 3.22546C2.79306 3.26722 2.81841 3.30516 2.85037 3.33713L5.01394 5.5L2.85037 7.66288C2.78583 7.72742 2.74957 7.81497 2.74957 7.90625C2.74957 7.99753 2.78583 8.08508 2.85037 8.14962C2.91492 8.21417 3.00247 8.25043 3.09375 8.25043C3.18503 8.25043 3.27258 8.21417 3.33713 8.14962L5.5 5.98606L7.66288 8.14962C7.69484 8.18159 7.73278 8.20694 7.77454 8.22423C7.81629 8.24153 7.86105 8.25043 7.90625 8.25043C7.95145 8.25043 7.99621 8.24153 8.03796 8.22423C8.07972 8.20694 8.11766 8.18159 8.14962 8.14962C8.18159 8.11766 8.20694 8.07972 8.22423 8.03796C8.24153 7.99621 8.25043 7.95145 8.25043 7.90625C8.25043 7.86105 8.24153 7.81629 8.22423 7.77454C8.20694 7.73278 8.18159 7.69484 8.14962 7.66288L5.98606 5.5L8.14962 3.33713Z"
            fill="#219653"
        />
    </svg>
);

const ArchiveSvg = () => (
    <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.6875 9.625C0.6875 10.0053 0.994727 10.3125 1.375 10.3125H9.625C10.0053 10.3125 10.3125 10.0053 10.3125 9.625V3.4375H0.6875V9.625ZM4.125 5.07031C4.125 4.92852 4.24102 4.8125 4.38281 4.8125H6.61719C6.75898 4.8125 6.875 4.92852 6.875 5.07031V5.24219C6.875 5.38398 6.75898 5.5 6.61719 5.5H4.38281C4.24102 5.5 4.125 5.38398 4.125 5.24219V5.07031ZM10.3125 0.6875H0.6875C0.307227 0.6875 0 0.994727 0 1.375V2.40625C0 2.59531 0.154687 2.75 0.34375 2.75H10.6562C10.8453 2.75 11 2.59531 11 2.40625V1.375C11 0.994727 10.6928 0.6875 10.3125 0.6875Z"
            fill="#219653"
        />
    </svg>
);

const NewVersionSvg = () => (
    <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.61523 0C3.47441 0 0.927734 2.54668 0.927734 5.6875C0.927734 8.82832 3.47441 11.375 6.61523 11.375C9.75605 11.375 12.3027 8.82832 12.3027 5.6875C12.3027 2.54668 9.75605 0 6.61523 0ZM9.05273 5.99219C9.05273 6.04805 9.00703 6.09375 8.95117 6.09375H7.02148V8.02344C7.02148 8.0793 6.97578 8.125 6.91992 8.125H6.31055C6.25469 8.125 6.20898 8.0793 6.20898 8.02344V6.09375H4.2793C4.22344 6.09375 4.17773 6.04805 4.17773 5.99219V5.38281C4.17773 5.32695 4.22344 5.28125 4.2793 5.28125H6.20898V3.35156C6.20898 3.2957 6.25469 3.25 6.31055 3.25H6.91992C6.97578 3.25 7.02148 3.2957 7.02148 3.35156V5.28125H8.95117C9.00703 5.28125 9.05273 5.32695 9.05273 5.38281V5.99219Z"
            fill="#219653"
        />
    </svg>
);

const StampSvg = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C5.44772 0 5 0.447715 5 1V4C5 4.55228 5.44772 5 6 5H7V9H1C0.447715 9 0 9.44771 0 10V11C0 11.5523 0.447715 12 1 12H15C15.5523 12 16 11.5523 16 11V10C16 9.44772 15.5523 9 15 9H9V5H10C10.5523 5 11 4.55228 11 4V1C11 0.447715 10.5523 0 10 0H6ZM1 13.5C1 13.2239 1.22386 13 1.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H1.5C1.22386 14 1 13.7761 1 13.5Z"
            fill="#2055B5" />
    </svg>
);

const menu = (
    <Menu>
        {/* <Menu.Item key="0">
            <a>1st menu item</a>
        </Menu.Item> */}
    </Menu>
);

interface RoleProps {
    addRole?: boolean;
    addRoleSaveClickEvent?: any;
    expandModeInd?: boolean;
}

export class RoleUpdate extends React.Component<RoleProps, any> {

    constructor(props) {
        super(props);
        //this.state.editMode = this.props.addRole;
    }

    state = {
        addRole: false,
        editMode: this.props.addRole,
        roleName: 'Formulary Analyst',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique molestie urna. Vestibulum tristique nisl in ipsum viverra euismod. Nullam nec pellentesque lorem. Vestibulum pretium mauris ac neque tincidunt aliquet. Ut rhoncus luctus sapien, in luctus erat suscipit convallis.',
        expandModeInd: this.props.expandModeInd
    };

    addRolefunc = () => {
        this.props.addRoleSaveClickEvent(true);
    }

    switchMode = () => {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    getRoleDetailData(){
        return <Row className="item-row">
        {this.state.editMode === false ? (
            <>
                <Col span={5}>
                    <span className="item-label">Effective Date:</span>
                    <span className="item-value">09/22/2020</span>
                </Col>
                <Col span={8}>
                    <span className="item-label">Termination Date:</span>
                    <span className="item-value">09/22/2020</span>
                </Col>
                <Col span={4}>
                    <span className="item-label">Owner:</span>
                    <span className="item-value">09/22/2020</span>
                </Col>
                <Col span={6}>
                    <span className="item-label">Module:</span>
                    <span className="item-value">09/22/2020</span>
                </Col>
                <Row className="item-row">
                    <span className="Description-container">
                        <span className="item-label">Description:</span>
                        <span className="item-value-2"><br></br>{this.state.description}</span>
                    </span>
                    <span className="item-first">
                        <span className="item-label">No. o Users:</span>
                        <span className="item-value-1">30</span>
                    </span>
                    <span>
                        <span className="item-label">No. of User Groups:</span>
                        <span className="item-value-1">30</span>
                    </span>
                    <span className="item-last">
                        <span className="item-label">No. Unused Roles:</span>
                        <span className="item-value-1">30</span>
                    </span>
                </Row>
            </>
        ) : (
                <>
                    <Col span={2} className="label-col">
                        <span className="item-label">Effective Date:</span>
                    </Col>
                    <Col span={3}>
                        <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} format={'YYYY/MM/DD'} />
                    </Col>
                    <Col span={3} className="label-col">
                        <span className="item-label">Termination Date:</span>
                    </Col>
                    <Col span={5}>
                        <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} format={'YYYY/MM/DD'} />
                    </Col>
                    <Col span={1} className="label-col">
                        <span className="item-label">Owner:</span>
                        {/* <span className="item-value">09/22/2020</span> */}
                    </Col>
                    <Col span={3} className="owner-input">
                        <Input placeholder="Future Rx" value="Future Rx" />
                    </Col>
                    <Col span={1} className="label-col">
                        <span className="item-label">Module:</span>
                        {/* <span className="item-value">09/22/2020</span> */}
                    </Col>
                    <Col span={3}>
                        <Select className="select" placeholder="Select...">
                        </Select>
                    </Col>

                    <Row className="item-row">
                        <span className="Description-container">
                            <span className="item-label">Description:</span>
                        </span>
                        <span className="item-first">
                            <span className="item-label">No. o Users:</span>
                            <span className="item-value-1">30</span>
                        </span>
                        <span>
                            <span className="item-label">No. of User Groups:</span>
                            <span className="item-value-1">30</span>
                        </span>
                        <span className="item-last">
                            <span className="item-label">No. Unused Roles:</span>
                            <span className="item-value-1">30</span>
                        </span>
                    </Row>
                    <Row className="btn-row">
                        <Col span={12}>
                            <span className="item-value-2">
                                <TextArea rows={4} value={this.state.description} />
                            </span>
                        </Col>
                        <Col span={12}>
                            {this.props.addRole === false ? (
                                <div className="btn-area">
                                    <button type="button" className="cancel-btn" onClick={() => this.switchMode()}>Cancel</button>
                                    <button type="button" className="save-btn" onClick={() => this.switchMode()}>Save</button>
                                </div>
                            ) : (
                                    <div className="btn-area">
                                        <button type="button" className="cancel-btn" onClick={() => this.addRolefunc()}>Save</button>
                                    </div>
                                )
                            }
                            
                        </Col>
                    </Row>
                </>
        ) }
    </Row>
    }

    render() {
        const roleDetailData=this.getRoleDetailData();
        return (
            <div className="role-detail-container">
                {this.state.expandModeInd === true ?(<>{roleDetailData}</>):(
                <><Row>
                        {this.state.editMode === false ? (
                            <>
                                <Col span={2} className="rolesGrid-col">
                                    <span className="rolesGrid">Roles Grid</span>
                                    <img className="arrow-up" src={ArrowUp} />
                                </Col>
                                <Col span={5} className="Role-Title">Formulary Analyst
                                    <span className="tag">Active</span>
                                </Col>
                                <Col span={3}>
                                    <img className="edit-icon" src={EditIcon} onClick={() => this.switchMode()} />
                                </Col>
                            </>
                        ) : (
                                <>
                                    <Col span={2} className="Role-name">
                                        <span>Role Name:</span>
                                    </Col>
                                    {!this.props.addRole ? (
                                        <>
                                            <Col span={4} className="Role-Title-input">
                                                <Input placeholder="Formulary Analyst" value={this.state.roleName} />
                                            </Col>
                                            <Col span={4} className="Role-Title">
                                                <span className="tag">Active</span>
                                            </Col>
                                        </>)
                                        : (
                                            <>
                                                <Col span={5} className="Role-Title-input">
                                                    <Input placeholder="" value='' />
                                                </Col>
                                                <Col span={3}></Col>
                                            </>
                                        )}

                                </>
                            )}
                        <Col span={13}>
                            <Row className={` ${this.state.editMode ? "action-row-edit" : "action-row"}`}>
                                <Col span={7}>
                                    <div className="dropdown-container">
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <a className="rolePermission-dropdown" onClick={e => e.preventDefault()}>
                                                Role Permission Ver 1
                                                <span className="caret"></span>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </Col>
                                <span className="action-item-container-1">
                                    <span className="action-items">
                                        <VersionHistorySvg />
                                        <span className="action">Version History</span>
                                    </span>
                                </span>
                                <span className="action-item-container">
                                    <span className="action-items">
                                        <CloneSvg />
                                        <span className="action">Clone</span>
                                    </span>
                                </span>
                                <span className="action-item-container">
                                    <span className="action-items">
                                        <DeleteSvg />
                                        <span className="action">Delete</span>
                                    </span>
                                </span>
                                <span className="action-item-container">
                                    <span className="action-items">
                                        <ArchiveSvg />
                                        <span className="action">Archive</span>
                                    </span>
                                </span>
                                <span className="action-item-container">
                                    <span className="action-items">
                                        <NewVersionSvg />
                                        <span className="action">New Version</span>
                                    </span>
                                </span>
                            </Row>
                        </Col>
                        <Col span={1}>
                            <span className="svg-stamp">
                                <StampSvg />
                            </span>
                        </Col>
                    </Row>

                        <>{roleDetailData}</></>
                )}
            </div>
        )
    }
}

export default RoleUpdate
