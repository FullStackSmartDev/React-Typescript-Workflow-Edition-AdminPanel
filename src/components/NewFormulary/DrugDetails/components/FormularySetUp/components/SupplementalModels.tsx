import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";
import { Checkbox } from 'antd';
class SupplementalModels extends React.Component<any, any> {
    getChecked = (id) => {
        let isChecked = false;
        if(this.props.supplemental){
            isChecked = this.props.supplemental.supplemental_benefits.indexOf(id) !== -1;
        }
        return isChecked;
    }
    renderCheckbox = () => {
        let checkbox = [];

        if(this.props.supplementalOptions){

            checkbox = this.props.supplementalOptions.map(el => {
                return <Grid item xs={4}>
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => this.supplementalCheck(el.id_supplemental_benefit)} 
                        checked={this.getChecked(el.id_supplemental_benefit)}>
                            {el.supplemental_benefit}
                    </Checkbox>
                </Grid>
            })
        }
        return checkbox; 
    }
    supplementalCheck = (id:any) => {
        const updatedSupplementalCheck:any = {...this.props.supplemental};
        const index = updatedSupplementalCheck.supplemental_benefits.indexOf(id);
        if(index > -1){
          updatedSupplementalCheck.supplemental_benefits.splice(index,1);
        }else{
          updatedSupplementalCheck.supplemental_benefits.push(id)
        }
        this.props.supplementalCheck(updatedSupplementalCheck);
    }
  render() {
    return (
      <div className="supplemental-models-container">
        <h4>SUPPLEMENTAL BENEFITS OR ALTERNATIVE MODELS</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
            <Grid item xs={11}>
                <Checkbox 
                    className="custom-checkbox mb-16" 
                    onChange={() => this.props.checkUncheckAllSupplemental('uncheck')} 
                    checked={true}>
                        N/A
                </Checkbox>
            </Grid>
            <Grid item xs={1}>
                <ul>
                    <li>
                    <Box display="flex" justifyContent="flex-end" className="compare-btn">
                        {this.props.supplemental.supplemental_benefits.length > 0 ? (
                            <Button label="Uncheck All" className="uncheck-btn" onClick={() => this.props.checkUncheckAllSupplemental('uncheck')}/>
                        ) : (
                            <Button label="Check All" className="uncheck-btn" onClick={() => this.props.checkUncheckAllSupplemental('check')}/>
                        )}
                    </Box>
                    </li>
                </ul>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={11}>
                <Grid container>
                    {this.renderCheckbox()}
                </Grid>
            </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        supplementalOptions: state?.setupOptions?.supplementalOptions,
        supplemental_benefits: state?.setup?.formulary?.supplemental_benefits
    };
};
export default connect(mapStateToProps)(SupplementalModels)