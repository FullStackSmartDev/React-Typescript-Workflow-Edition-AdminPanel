import React from "react";
import Grid from "@material-ui/core/Grid";
import { Checkbox } from 'antd';
class FormularyDesignCommercial extends React.Component<any, any> {
    getChecked = (id) => {
        let isChecked = false;
        if(this.props.edit_info){
            isChecked = this.props.edit_info.filter(e => e.id_edit === id).length > 0;
        }
        return isChecked;
    }
    renderCustomCheckbox = () => {
        let inputs:any = [];
        const custom = this.props.designOptions.filter(e => e.is_custom === true);
        if(custom.length > 0){
            inputs = custom?.map((el,index) => {
                return (
                    <div className="custom-input-wrapper">
                        <input 
                        type="text" 
                        className="add-new-cbx" 
                        value={el.edit_name}
                        disabled
                        onChange={() => {}}/> 
                    </div>
                )
            })
        }
        let finalEle = (
            <div>
                <Checkbox 
                    className="custom-checkbox mb-16" 
                    onChange={() => {}} 
                    disabled
                    checked={custom.length > 0}>
                        Other
                </Checkbox>
                {inputs}
            </div>
        )
        return finalEle;
    }
    renderCheckbox = () => {
        let checkbox = [];
        let custom=[];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name !== 'Prescriber Taxonomy' && e.edit_name !=='N/A'));
            custom = this.props.designOptions?.filter(e => e.is_custom === true);
            let count = 0;
            checkbox = des_opt?.map(el => {
                return <Grid item xs={6}>
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => {}} 
                        disabled
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                </Grid>
            })
        }
        return checkbox; 
    }
    renderPrescribeCheckbox = () => {
        let checkbox = [];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name === 'Prescriber Taxonomy'));
            checkbox = des_opt?.map(el => {
                return (
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        onChange={() => {}} 
                        disabled
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                )
            })
        }
        return checkbox; 
    }
    renderNACheckbox = () => {
        let checkbox = [];
        if(this.props.designOptions){
            const des_opt = this.props.designOptions?.filter(e => (e.is_custom === false && e.edit_name === 'N/A'));
            checkbox = des_opt?.map(el => {
                return (
                    <Checkbox 
                        className="custom-checkbox mb-16" 
                        disabled
                        onChange={() => {}} 
                        checked={this.getChecked(el.id_edit)}>
                            {el.edit_name}
                    </Checkbox>
                )
            })
        }
        return checkbox; 
    }
  render() {
    return (
      <div className="supplemental-models-container">
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
            <Grid item xs={11}>
                {this.renderNACheckbox()}
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={8}>
                <Grid container>
                    {this.renderCheckbox()}
                </Grid>
            </Grid>
            <Grid item xs={4}>
                {this.renderPrescribeCheckbox()}
                {this.renderCustomCheckbox()}
            </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}

export default FormularyDesignCommercial;