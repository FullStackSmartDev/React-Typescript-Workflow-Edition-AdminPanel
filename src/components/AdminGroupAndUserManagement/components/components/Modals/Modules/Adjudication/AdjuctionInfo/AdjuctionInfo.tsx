import React from "react";
import Grid from "@material-ui/core/Grid";
import AdjuctionInfoLeft from "./AdjuctionInfoLeft";
import AdjuctionInfoRight from "./AdjuctionInfoRight";

import "./AdjuctionInfo.scss";

export default class AdjuctionInfo extends React.Component<any, any> {
  render() {
    return(
      <div className="module-adjuction-info-container">
        <Grid container>
          <AdjuctionInfoLeft />
          <AdjuctionInfoRight />
        </Grid>
      </div>
    );
  }
}
