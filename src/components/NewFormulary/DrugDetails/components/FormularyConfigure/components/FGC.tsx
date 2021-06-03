import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { getDrugDetailsFGCTiers } from "../../../../../../redux/slices/formulary/drugDetails/fgc/fgcActionCreation";
import * as fgcConstants from "../../../../../../api/http-drug-details";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsFGCTiers: (a) => dispatch(getDrugDetailsFGCTiers(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

class FGC extends React.Component<any, any> {
  state = {
    panelGridTitle1: [
      "Tier Number",
      "Tier Descripion",
      "Full Gap Coverage",
      "Partial Gap Coverage",
    ],
    panelTitleAlignment1: ["left", "left", "center", "center"],
    panelGridValue1: []
  };

  onApplyHandler = () => {
    alert(1);
  };

  getFGCTiers = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = fgcConstants.GET_DRUG_FGC_TIERS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: fgcConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsFGCTiers(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.data ? json.payload.data : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["tier_value"],
          ele["tier_label"],
        ];
        curRow.push("checkbox");
        curRow.push("checkbox");
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
      });
    });
  }

  componentDidMount() {
    this.getFGCTiers();
  }

  render() {
    return (
      <>
        <div className="bordered">
          <PanelHeader title="Full Gap Coverage" tooltip="Full Gap Coverage" />
          <div className="inner-container bg-light-grey">
            <PanelGrid
              panelGridTitle={this.state.panelGridTitle1}
              panelGridValue={this.state.panelGridValue1}
              panelTitleAlignment={this.state.panelTitleAlignment1}
            />
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button label="Apply" disabled onClick={this.onApplyHandler} />
        </Box>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FGC);
