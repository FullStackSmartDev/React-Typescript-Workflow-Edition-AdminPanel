import React, { Component } from "react";
import SectionTitle from "../shared/Frx-components/section-title";
import FrxProcessStepper, {
  STATUS,
} from "../shared/FrxProcessStepper/FrxProcessStepper";
import { StepComponent } from "./steps/steps";

import Availability from "./components/Availability";
import {CompletAndSubmitComponent} from './components/CompleteAndSubmit/CompleteAndSubmit';
import "./styles.scss";
import WorkflowInfo from "./components/WorkflowInfo/WorkflowInfo";
import WorkFlowSetting from "./components/WorkFlowSetting/WorkFlowSetting";

const WorkflowSteps = [
  {
    step: "1",
    label: "Workflow Info",
    status: STATUS.PROCESSING,
  },
  {
    step: "2",
    label: "Workflow Availability",
    status: STATUS.PENDING,
  },
  {
    step: "3",
    label: "Workflow SLA settings",
    status: STATUS.PENDING,
  },
  {
    step: "4",
    label: "Steps",
    status: STATUS.PENDING,
  },
  {
    step: "5",
    label: "Complete and Submit",
    status: STATUS.PENDING,
  },
];
class Workflow extends Component<any, any> {
  state = {
    workflowSteps: WorkflowSteps,
    activeStep: 0,
  };

  handleStepClick = (index: number) => {
    const { workflowSteps } = this.state;

    const updatedWorkflowSteps = workflowSteps.map((currentStep, i) => {
      if (i == index) {
        currentStep.status = STATUS.PROCESSING;
      } else if (i < index) {
        currentStep.status = STATUS.COMPLETED;
      } else {
        currentStep.status = STATUS.PENDING;
      }

      return currentStep;
    });

    this.setState({
      workflowSteps: updatedWorkflowSteps,
      activeStep: index,
    });
  };

  getStepContent = () => {
    const { activeStep } = this.state;
    switch (activeStep) {
      case 0:
        return <WorkflowInfo />;
        break;
      case 1:
        return <Availability />;
        break;
      case 2:
        return <WorkFlowSetting />
        break;
      case 3:
        return <StepComponent />;
        break;
      case 4:
        return <CompletAndSubmitComponent />;
        break;
      default:
        break;
    }
  };

  render() {
    const { workflowSteps } = this.state;

    return (
      <div className="workflow">
        <SectionTitle>Add new workflow</SectionTitle>

        <div className="workflow__container">
          <div className="workflow-progress-steps">
            <FrxProcessStepper
              data={workflowSteps}
              onStepClick={this.handleStepClick}
            />
          </div>

          <div className="workflow-progress-content">
            {this.getStepContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default Workflow;
