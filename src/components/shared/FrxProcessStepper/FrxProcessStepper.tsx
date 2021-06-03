import React from 'react'
import './FrxProcessStepper.scss';

export const STATUS = {
  COMPLETED: "completed",
  PROCESSING: "processing",
  PENDING: "pending",
}

const FrxProcessStepper: (any) = (props) => {
  const { data, onStepClick } = props;
  
  const getProcessingStep = () => {
    const stepIndex = data.map(x=>x.status).indexOf(STATUS.PROCESSING);
    return stepIndex !== -1 ? stepIndex : data.length + 10; 
  }
  
  
  return (
    <div className="steps-container">
      { 
        data.map(({step, label, status}, key)=>(
          <div className="process-step" key={key} >
            <div className={`process-step__count process-step__count--${status}`} onClick={() => onStepClick(key)}>
              {step}
              {data.length - 1 !== key && <div className={`process-bar process-bar--${key < getProcessingStep() ? STATUS.COMPLETED : STATUS.PENDING}`} /> }
            </div>
            <div className={`process-step__label process-step__label--${getProcessingStep() === key ? STATUS.PROCESSING : 'idle'}`}>{label}</div>
          </div> 
        ))
      }
    </div>
  )
}

export default FrxProcessStepper
