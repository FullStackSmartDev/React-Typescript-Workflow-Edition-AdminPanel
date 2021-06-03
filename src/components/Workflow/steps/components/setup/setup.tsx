import { Col, Input, Row, Select } from "antd";
import React from "react";
import "./setup.scss";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../shared/Frx-components/label/Label";

const InfoSvg = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.16772 3.66683H7.49926V5.00016H6.16772V3.66683ZM6.16772 6.3335H7.49926V10.3335H6.16772V6.3335ZM6.83349 0.333496C3.15843 0.333496 0.175781 3.32016 0.175781 7.00016C0.175781 10.6802 3.15843 13.6668 6.83349 13.6668C10.5085 13.6668 13.4912 10.6802 13.4912 7.00016C13.4912 3.32016 10.5085 0.333496 6.83349 0.333496ZM6.83349 12.3335C3.89744 12.3335 1.50732 9.94016 1.50732 7.00016C1.50732 4.06016 3.89744 1.66683 6.83349 1.66683C9.76954 1.66683 12.1597 4.06016 12.1597 7.00016C12.1597 9.94016 9.76954 12.3335 6.83349 12.3335Z" fill="#1D54B4" />
    </svg>
)

const { Option } = Select;

export class SetupComponent extends React.Component<any, any> {

    render() {
        return (
            <>
                <Row className="heading-row">
                    <Col span={24}><span className="heading">Setup</span></Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                    <Row className="input-row">
                        <Col span={8}>
                            <Label className="input-label">Step Name<span className="star"> *</span></Label>
                            <Input className="input-control" defaultValue="Setup" />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <Row>
                                <Label className="input-label dual-input-label">Total time to complete the step</Label>
                                <Col span={12} className="dropdown-input-wrapper">
                                    <DropDown className="time-complete-dropdown" options={["Days", "Hours"]} />
                                </Col>
                                <Col span={12}><Input className="input-control" /></Col>
                            </Row>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <Label className="input-label">Step Sequence<span className="info-svg"><InfoSvg /></span></Label>
                            <Input className="input-control" defaultValue="1" />
                        </Col>
                    </Row>
                    <Row className="input-row-last">
                        <Col span={8}>
                            <Label className="input-label dual-input-label">CMS Deadlines date.
                                        <span className="star"> *</span></Label>
                            <Select className="select" placeholder="Select..."></Select>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}