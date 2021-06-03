import React, { Component } from "react";

import "./styles.scss";
const RemoveIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
    >
      <path
        d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
        fill="#707683"
      />
    </svg>
  </span>
);
class CriteriaConditionPanel extends Component<any, any> {
  render() {
    return (
      <div className="criteria-condition-panel-container">
        <div className="criteria-condition-panel">
          <div className="criteria-condition-panel__header">
            <div className="criteria-condition-panel__header--title">
              {this.props.title}
            </div>
          </div>
          <div className="criteria-condition-panel__body">
            {this.props.children}
          </div>
        </div>

        <RemoveIcon className="remove-icon"/>
      </div>
    );
  }
}

export default CriteriaConditionPanel;
