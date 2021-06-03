import { Col, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import "./routing-actions.scss";

const { Option } = Select;

export class RoutingActions extends React.Component<any, any> {

    render() {
        return (
            <>
                <Row className="heading-row">
                    <Col span={24}><span className="heading">Auto Routing Actions</span></Col>
                </Row>
                <div className="border"></div>
                <Row className="inner-heading">Auto Routing - Time in Step</Row>
                <Row className="input-row">
                    <Col span={9}>
                        <Row>
                            <Col span={11}>
                                <span className="input-label">Time in Queue</span>
                                <div className="dropdown-input-wrapper">
                                    <DropDown className="time-complete-dropdown" options={["Days", "Hours"]} />
                                </div>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={11} className="input-without-label"><Input className="input-control" /></Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={11}>
                        <span className="input-label">Reason</span>
                        <Input className="input-control" placeholder="-" />
                    </Col>
                </Row>
                <Row className="input-row pb-20">
                    <Col span={9}>
                        <span className="input-label">Target Step</span>
                        <Select className="select" defaultValue="lucy" placeholder="Select...">
                            <Option value="jack">Setup</Option>
                            <Option value="lucy">Construct</Option>
                            <Option value="jack">Review</Option>
                            <Option value="jack">Audit</Option>
                            <Option value="jack">Completed</Option>
                            <Option value="jack">Cancelled</Option>
                        </Select>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={11}>
                        <span className="input-label">Explanation</span>
                        <TextArea rows={3} placeholder="-" />
                    </Col>
                </Row>
            </>
        )
    }
}