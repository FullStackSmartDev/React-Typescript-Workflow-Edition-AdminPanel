import React from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {connect} from "react-redux";
import { Checkbox } from 'antd';
class FormularyDesign extends React.Component<any, any> {
    state = {
        ql: true,
        egs: false,
        dr: false,
        st: false,
        stp: false
    }
    qlChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ql: event.target.value
        })
    }
    designCheckbox = (type) => {
        let paCheckbox: any;
        if(this.props.designOptions){
            const index = type === 'pa' ? 5 : 6;
            paCheckbox = this.props.designOptions[index][type]?.map(e => {
                const id = e.id_edit;
                let checked:any;
                if(this.props.edit_info){
                    checked =  this.props.edit_info.edits.indexOf(id) !== -1 ? true :
                    this.props.edit_info.edits_no.indexOf(id) !== -1 ? false : null;
                }
                return (
                    <div className="label-wrapper checkbox-wrapper">
                        <Checkbox className="custom-checkbox mb-16" onChange={(e) => this.props.formularyRadioChange(e,id,'checkbox')} checked={checked}>{e.edit_name}</Checkbox>
                        {/* <input type="checkbox" className="checkbox-btn" value checked={checked} onChange={(e) => this.props.formularyRadioChange(e,id)}/>
                        <label htmlFor="N/A" className="checkbox-label text-tran-none">{e.edit_name}</label> */}
                    </div>
                )
            })
        }
        return paCheckbox;
    }
    designRadioButton = (type) => {
        let radioBox: any;
        if(this.props.designOptions){
            const id = this.props.designOptions.find(el => el.edit_name === type)?.id_edit;
            const value = this.props.edit_info.edits.indexOf(id) !== -1 ? true :
                          this.props.edit_info.edits_no.indexOf(id) !== -1 ? false : null;
            return (
                <RadioGroup 
                    className="radio-group-custom mr-80" 
                    aria-label={type} 
                    name={type} 
                    value={value} 
                    onClick={(e) => this.props.formularyRadioChange(e,id)}>
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
            )
        }
        return radioBox;
    }
  render() {
    return (
      <div className="formulary-design-container">
        <h4>FORMULARY DESIGN</h4>
        <div className="formulary-design-fields-wrapper setup-label">
        <Grid container>
        <Grid item xs={6}>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?"
                    tooltip="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                />
                
                <div className="radio-group field-group__radio-group">
                    {this.designCheckbox('pa')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    tooltip="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('QL')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    tooltip="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('LA')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    tooltip="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('EGS')}
                </div>
            </div>
        </Grid>
        <Grid item xs={6}>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS?"
                    tooltip="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('PartB-ST')}
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    tooltip="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designCheckbox('st')}    
                </div>
            </div>
            <div className="field-group group setup-panel">
                <PanelHeader
                    title="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    tooltip="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    required={true}
                />
                <div className="radio-group field-group__radio-group">
                    {this.designRadioButton('OTC')}
                </div>
            </div>
        </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        designOptions: state?.setupOptions?.designOptions,
        editInto: state?.setup?.formulary?.edit_info
    };
};
export default connect(mapStateToProps)(FormularyDesign)