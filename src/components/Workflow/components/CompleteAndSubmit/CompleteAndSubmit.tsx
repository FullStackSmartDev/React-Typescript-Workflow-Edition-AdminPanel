import { Col, Row } from "antd";
import React, { Component } from "react";
import WorkflowSLA from "../WorkFlowSLA/WorkflowSLA";
import "./CompleteAndSubmit.scss";

export class CompletAndSubmitComponent extends React.Component<any, any> {

    workFlowSla =() => {
       window.location.href="/workflow-sla"
    }
  render() {
    return (
      <div className="step-main-container-submit">
        <Row>
          <Col span={24}>
            <div className="right-side-area">
              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Workflow Info</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Name of Wokrflow
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Description{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      What Entity do you want to use the workflow
                    </Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Morning For Walk
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      Name of Workflow
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      Formulary
                    </Col>
                    <Col span={3}></Col>
                  </Row>
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Lob
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Effective Date & Time{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      Country
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      Morning For Walk
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      2021-01-22 15:21:00
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      United Stated
                    </Col>
                    <Col span={3}></Col>
                  </Row>

                  <Row className="label-row">
                    <Col span={7} className="label">
                      States
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      Navenda
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Workflow SLA Settings</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Calender
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      {" "}
                    </Col>
                    <Col span={1}></Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Medicare Workflow
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="label-center">
                      Working Days 24
                    </Col>
                    <Col span={5} className="label-center">
                      {" "}
                      Working hours per day 24
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Step 1 - Setup</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Name of Wokrflow
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Description{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      What Entity do you want to use the workflow
                    </Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Morning For Walk
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      Name of Workflow
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      Formulary
                    </Col>
                    <Col span={3}></Col>
                  </Row>
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Lob
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Effective Date & Time{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      Country
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      Morning For Walk
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      2021-01-22 15:21:00
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      United Stated
                    </Col>
                    <Col span={3}></Col>
                  </Row>

                  <Row className="label-row">
                    <Col span={7} className="label">
                      States
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      Navenda
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Step 2 - Construct</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Name of Wokrflow
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Description{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      What Entity do you want to use the workflow
                    </Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Morning For Walk
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      Name of Workflow
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      Formulary
                    </Col>
                    <Col span={3}></Col>
                  </Row>
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Lob
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Effective Date & Time{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      Country
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      Morning For Walk
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      2021-01-22 15:21:00
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      United Stated
                    </Col>
                    <Col span={3}></Col>
                  </Row>

                  <Row className="label-row">
                    <Col span={7} className="label">
                      States
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      Navenda
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Step 4 - Audit</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Step Name
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Total time to Complete this step{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      Step type
                    </Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Audit
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      -
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      Audit
                    </Col>
                    <Col span={3}></Col>
                  </Row>
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Reasons
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Explanation
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      User Access
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      0
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      -
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      -
                    </Col>
                    <Col span={3}></Col>
                  </Row>

                  <Row className="label-row">
                    <Col span={7} className="label">
                      Auto Routing Target Step
                    </Col>
                    <Col span={2}></Col>

                    <Col span={7} className="label">
                      Subtask
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={7} className="value">
                      -
                    </Col>
                    <Col span={2}></Col>

                    <Col span={7} className="value">
                      -
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Step 4 - Completed</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Step Name
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Total time to Complete this step{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      Step type
                    </Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Completed
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      -
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      Completed
                    </Col>
                    <Col span={3}></Col>
                  </Row>
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Reasons
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Explanation
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      User Access
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      0
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      -
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      -
                    </Col>
                    <Col span={3}></Col>
                  </Row>

                  <Row className="label-row">
                    <Col span={7} className="label">
                      Auto Routing Target Step
                    </Col>
                    <Col span={2}></Col>

                    <Col span={7} className="label">
                      Subtask
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={7} className="value">
                      -
                    </Col>
                    <Col span={2}></Col>

                    <Col span={7} className="value">
                      -
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="setup-area">
                <Row className="heading-row">
                  <Col span={24}>
                    <span className="heading">Step 4 - Cancelled</span>
                  </Col>
                </Row>
                <div className="border"></div>
                <div className="input-area">
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Step Name
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Total time to Complete this step{" "}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      Step type
                    </Col>
                  </Row>

                  <Row className="input-row">
                    <Col span={8} className="value">
                      Cancelled
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      -
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      Cancelled
                    </Col>
                    <Col span={3}></Col>
                  </Row>
                  <Row className="label-row">
                    <Col span={7} className="label">
                      Reasons
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8} className="label">
                      Explanation
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6} className="label">
                      User Access
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={8} className="value">
                      0
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8} className="value">
                      -
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="value">
                      -
                    </Col>
                    <Col span={3}></Col>
                  </Row>

                  <Row className="label-row">
                    <Col span={7} className="label">
                      Auto Routing Target Step
                    </Col>
                    <Col span={2}></Col>

                    <Col span={7} className="label">
                      Subtask
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col span={7} className="value">
                      -
                    </Col>
                    <Col span={2}></Col>

                    <Col span={7} className="value">
                      -
                    </Col>
                  </Row>
                </div>
              </div>
              <Row className="btn-row">
                <Col span={18}></Col>
                <Col span={1} className="btn-col">
                  <button type="button" className="saveBtn">
                    <span className="btn-txt">Save</span>
                  </button>
                </Col>
                <Col span={5} className="btn-col">
                  <button type="button" className="saveContinueBtn" onClick={() => this.workFlowSla()}>
                    <span className="btn-txt">Save & Continue</span>
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
