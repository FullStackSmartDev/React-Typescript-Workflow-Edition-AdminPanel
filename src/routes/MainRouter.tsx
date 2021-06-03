import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Workflow from "../components/Workflow";
import FrxTitleBar from "@bit/futurerx.frx_collection.frx-title-bar";
import WorkflowSLA from '../components/Workflow/components/WorkFlowSLA/WorkflowSLA'

class MainRouter extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const propsNavbar = this.props;
    return (
      <React.Fragment>
        <FrxTitleBar {...propsNavbar} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Workflow {...props} />}
          />
          <Route path="/workflow-sla" component={WorkflowSLA} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainRouter;
