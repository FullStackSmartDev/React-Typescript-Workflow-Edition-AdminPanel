import React, { Component } from "react";

import "./styles.scss";

const ApprovedIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.00006 0.761719C4.00295 0.761719 0.761963 4.00271 0.761963 7.99981C0.761963 11.9969 4.00295 15.2379 8.00006 15.2379C11.9972 15.2379 15.2382 11.9969 15.2382 7.99981C15.2382 4.00271 11.9972 0.761719 8.00006 0.761719ZM11.1263 5.63612L7.72378 10.3538C7.67623 10.4202 7.61353 10.4743 7.5409 10.5116C7.46827 10.5489 7.38779 10.5684 7.30614 10.5684C7.22448 10.5684 7.14401 10.5489 7.07137 10.5116C6.99874 10.4743 6.93605 10.4202 6.88849 10.3538L4.87378 7.56197C4.81239 7.47634 4.87378 7.35679 4.9788 7.35679H5.73654C5.90133 7.35679 6.05805 7.43595 6.15499 7.57167L7.30533 9.16793L9.84513 5.64582C9.94207 5.51172 10.0972 5.43094 10.2636 5.43094H11.0213C11.1263 5.43094 11.1877 5.55049 11.1263 5.63612Z"
        fill="#80C483"
      />
    </svg>
  </span>
);

const UnApprovedIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <path
        d="M7.24 0.759766C3.24791 0.759766 0 4.00767 0 7.99976C0 11.9919 3.24791 15.2398 7.24 15.2398C11.2321 15.2398 14.48 11.9919 14.48 7.99976C14.48 4.00767 11.2321 0.759766 7.24 0.759766ZM9.86137 9.83378C9.91526 9.88498 9.95835 9.94646 9.98812 10.0146C10.0179 10.0827 10.0337 10.1561 10.0347 10.2304C10.0356 10.3047 10.0217 10.3785 9.99366 10.4474C9.96565 10.5162 9.92414 10.5788 9.87158 10.6313C9.81901 10.6839 9.75646 10.7254 9.6876 10.7534C9.61874 10.7814 9.54497 10.7954 9.47064 10.7944C9.39631 10.7935 9.32293 10.7776 9.25481 10.7479C9.18669 10.7181 9.12522 10.675 9.07402 10.6211L7.24 8.78746L5.40598 10.6211C5.30069 10.7212 5.16048 10.7761 5.01526 10.7743C4.87004 10.7724 4.73128 10.7139 4.62859 10.6112C4.52589 10.5085 4.46737 10.3697 4.46551 10.2245C4.46365 10.0793 4.5186 9.93908 4.61863 9.83378L6.4523 7.99976L4.61863 6.16575C4.5186 6.06045 4.46365 5.92025 4.46551 5.77503C4.46737 5.6298 4.52589 5.49105 4.62859 5.38835C4.73128 5.28565 4.87004 5.22714 5.01526 5.22528C5.16048 5.22342 5.30069 5.27836 5.40598 5.3784L7.24 7.21207L9.07402 5.3784C9.17931 5.27836 9.31952 5.22342 9.46474 5.22528C9.60996 5.22714 9.74872 5.28565 9.85141 5.38835C9.95411 5.49105 10.0126 5.6298 10.0145 5.77503C10.0163 5.92025 9.9614 6.06045 9.86137 6.16575L8.0277 7.99976L9.86137 9.83378Z"
        fill="#C4C4C4"
      />
    </svg>
  </span>
);

const PanelOpenIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
    >
      <path
        d="M0.223886 0.245493C0.53186 -0.0693603 0.960622 -0.0940685 1.33711 0.245493L4.09758 2.89068L6.85804 0.245493C7.23453 -0.0940685 7.664 -0.0693603 7.96986 0.245493C8.27783 0.55964 8.25805 1.09051 7.96986 1.3856C7.68307 1.68069 4.65348 4.56378 4.65348 4.56378C4.58134 4.63851 4.49487 4.69794 4.39924 4.73853C4.30361 4.77913 4.20077 4.80005 4.09687 4.80005C3.99297 4.80005 3.89013 4.77913 3.7945 4.73853C3.69887 4.69794 3.6124 4.63851 3.54026 4.56378C3.54026 4.56378 0.512082 1.68069 0.223886 1.3856C-0.0650165 1.09051 -0.0840883 0.55964 0.223886 0.245493Z"
        fill="#323C47"
      />
    </svg>
  </span>
);

const PanelCloseIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
    >
      <path
        d="M0.942026 8.2727C0.627173 7.96472 0.602465 7.53596 0.942026 7.15947L3.58721 4.399L0.942026 1.63854C0.602464 1.26205 0.627173 0.832581 0.942026 0.526726C1.25617 0.218752 1.78705 0.23853 2.08213 0.526726C2.37722 0.813509 5.26031 3.8431 5.26031 3.8431C5.33504 3.91524 5.39447 4.00171 5.43507 4.09734C5.47566 4.19297 5.49658 4.29581 5.49658 4.39971C5.49658 4.50361 5.47566 4.60645 5.43507 4.70208C5.39447 4.79771 5.33504 4.88418 5.26031 4.95632C5.26031 4.95632 2.37722 7.9845 2.08213 8.2727C1.78705 8.5616 1.25617 8.58067 0.942026 8.2727Z"
        fill="#323C47"
      />
    </svg>
  </span>
);

interface FormularyAssemblyComponentExpandableListitemProps {
  id?: any;
  title?: string;
  tag?: string;
  description?: string;
  count?: number
}

interface FormularyAssemblyComponentExpandableListitemState {}

class FormularyAssemblyComponentExpandableListitem extends Component<
  FormularyAssemblyComponentExpandableListitemProps,
  FormularyAssemblyComponentExpandableListitemState
> {
  state = {
    panelStatus: false,
  };

  togglePanel = () => {
    const { count = 0} = this.props;
    
    if(count > 0) {      
      this.setState({
        panelStatus: !this.state.panelStatus,
      });
    }
  };

  render() {
    const { title = "", count = 0 } = this.props;
    const status = count === 0 ? 'disable' : 'enable';
    
    return (
      <div className="formulary-assembly-component-expandable-list-item">
        <div
          className="formulary-assembly-component-expandable-list-item__panel-header"
          onClick={this.togglePanel}
        >
          <div className="title-container">
            <div className="title-container__icon">
              {
                status === "disable" ? <UnApprovedIcon /> : <ApprovedIcon />
              }
            </div>
            <div className="title-container__text">{title}</div>
          </div>

          <div className="formulary-assembly-component-expandable-list-item__panel-header-actions">
            {this.state.panelStatus ? <PanelOpenIcon /> : <PanelCloseIcon />}
          </div>
        </div>

        {this.state.panelStatus && (
          <div className="formulary-assembly-component-expandable-list-item__panel-body">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default FormularyAssemblyComponentExpandableListitem;
