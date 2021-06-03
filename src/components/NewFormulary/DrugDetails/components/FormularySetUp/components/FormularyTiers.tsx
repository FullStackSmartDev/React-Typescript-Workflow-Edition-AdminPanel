import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { connect } from "react-redux";

const tierCount = {
  medicare: 7,
  commercial: 20,
};

class FormularyTiers extends React.Component<any, any> {
  getTierDropDownVal = () => {
    const type = this.props.generalInfo.type.toLowerCase();
    const val: any = [];
    for (let i = 1; i <= tierCount[type]; i++) {
      val.push(i);
    }
    return val;
  };

  getAllTierOptions = () => {
    //console.log(" getAllTierOptions... ");
    let options = [] as any;
    let htmlElement: any;
    if (this.props.tiers) {
      const selectedTierOptions = this.props.tiers;
      // console.log(selectedTierOptions);
      let allOptions = this.props.tierOptionsOptions?.map((e) => e.tier_label);
      options = selectedTierOptions.map((e) => {
        if (e.id_tier_label === null) {
          return {
            selecedVal: "",
            tierName: e.tier_name,
            id_tier_label: e.id_tier_label,
            is_custom: e.is_custom,
          };
        } else {
          return this.props.tierOptionsOptions?.find(
            (el) => el.id_tier_label === e.id_tier_label
          )
            ? {
                seletedVal: this.props.tierOptionsOptions.find(
                  (el) => el.id_tier_label === e.id_tier_label
                ).tier_label,
                tierName: e.tier_name,
                id_tier_label: e.id_tier_label,
                is_custom: e.is_custom,
              }
            : "";
        }
      });
      htmlElement = options.map((e, index) => {
        return (
          <div className="tier border-bottom">
            <label>{e.tierName}</label>

            {e.is_custom === true ? (
              <div className="custom-tier-wrapper">
                <input
                  className="custom-tier"
                  type="text"
                  onChange={(el) => this.props.customTierChange(el, e.tierName)}
                />
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  className="delete-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={(el) => this.props.deleteCustomTier(e.tierName)}
                >
                  <path
                    d="M1.75004 13.0417C1.75004 13.9125 2.46254 14.625 3.33337 14.625H9.66671C10.5375 14.625 11.25 13.9125 11.25 13.0417V3.54167H1.75004V13.0417ZM12.0417 1.16667H9.27087L8.47921 0.375H4.52087L3.72921 1.16667H0.958374V2.75H12.0417V1.16667Z"
                    fill="#999999"
                  ></path>
                </svg>
              </div>
            ) : (
              <div>
                <DropDown
                  className="formulary-tier-dropdown"
                  value={e.seletedVal}
                  options={allOptions}
                  onChange={(el) => this.props.changeTierValue(el, e.tierName)}
                />
              </div>
            )}
          </div>
        );
      });
      return htmlElement;
    }
  };

  numberOfTiers = () => {
    let selectedCount = this.props.tiers ? this.props.tiers.length : null;
    // if(this.props.selectedTiersOptions){
    let htmlElement = (
      <DropDown
        className="formulary-type-dropdown number-of-tier-dropdown"
        placeholder="Select Tiers"
        options={this.getTierDropDownVal()}
        value={selectedCount}
        onChange={this.props.selectTier}
      />
    );
    // }
    return htmlElement;
  };
  render() {
    return (
      <Fragment>
        <div className="tiers-information-container">
          <h4>TIERS</h4>
          <div className="tiers-information-fields-wrapper setup-label">
            <Grid container>
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    NUMBER OF TIERS <span className="astrict">*</span>
                  </label>
                  {this.numberOfTiers()}
                </div>
                <div className="tiers-dropdown-wrapper">
                  {this.getAllTierOptions()}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tierOptionsOptions: state?.setupOptions?.tierOptions,
    selectedTiersOptions: state?.setup?.formulary?.tiers,
    editInfo: state?.setup?.formulary?.edit_info,
  };
};
export default connect(mapStateToProps)(FormularyTiers);
