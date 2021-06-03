import React from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import {connect} from "react-redux";
import { Checkbox } from 'antd';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class MedicareInformation extends React.Component<any, any> {
    state={
        abridged: null
    }
    onMedicareCheck = (id:any) => {
        const updatedMedicareInfo:any = {...this.props.allMedicareOptions};
        const updatedMedicareInfoContract:any = [...updatedMedicareInfo.medicare_contract_types];
        const index = updatedMedicareInfoContract.indexOf(id);
        if(index > -1){
            updatedMedicareInfoContract.splice(index,1);
        }else{
            updatedMedicareInfoContract.push(id)
        }
        updatedMedicareInfo.medicare_contract_types = updatedMedicareInfoContract
        this.props.medicareCheck(updatedMedicareInfo)
    }
    onMedicareOtherCheck = (e) => {
        const genInfo = {...this.props.generalInfo};
        genInfo.medicare_types_ref_other = e.target.checked;
        this.props.onMedicareOtherCheck(genInfo)
    }
    getCheckboxData = () => {
        let data = null;
        if(this.props.contarct_types){
            const  medicare_contract_types = this.props.medicareOptions;
            data = this.props.contarct_types.map(e => {
                const isChecked = medicare_contract_types.indexOf(e.id_medicare_contract_type) !== -1 ? true : false;
                return (
                    <div className="checkbox-wrapper">
                        <Checkbox className="custom-checkbox mb-16" onChange={() => this.onMedicareCheck(e.id_medicare_contract_type)} defaultChecked={isChecked}>{e.medicare_contract_type}</Checkbox>
                    </div>
                )
            })
        }
        return data
    }
    onAbridgedHandler = (e) => {
        const val = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null;
        this.setState({
            abridged: val
        })
    }
    render() {
        console.log(this.props)
        return (
        <div className="medicare-information-container">
            <h4>Medicare Information</h4>
            <div className="medicare-information-container__wrapper setup-label">
                <Grid container>
                    <Grid item xs={6}>
                        <div className="group">
                            <label className="mb-16">MEDICARE CONTRACT TYPE <span className="astrict">*</span></label>
                            <div className="checkbox-ul medicare-information-container__checkbox-ul">
                                {this.getCheckboxData()}
                                <div className="checkbox-wrapper other-checkbox-wrapper">
                                    <Checkbox className="custom-checkbox" onChange={this.onMedicareOtherCheck}>Other</Checkbox>
                                    {this.props.generalInfo.medicare_types_ref_other ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                className="setup-input-fields other-input"
                                                onChange={this.props.otherMedicareInfo}/>
                                        </div>
                                     ) : null}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <div className="field-group group setup-panel">
                            <PanelHeader className="field-group__label-container" title="FORMULARY ID" tooltip="FORMULARY ID" required={true}/>
                            
                            <div>
                                <input type="text" className="setup-input-fields field-group__text-field" />
                            </div>
                            
                            <div className="field-group__post-fix-text text-tran-none">NOTE: Formulary ID assigned by CMS fter initial submission in HPMS</div>
                        </div>
                        
                        <div className="field-group group setup-panel">
                            <PanelHeader
                                title="OPTIONAL ABRIDGED FORMULARY CREATION"
                                tooltip="OPTIONAL ABRIDGED FORMULARY CREATION"
                                required={true}
                            />
                            <div className="radio-group field-group__radio-group">
                            <RadioGroup 
                                className="radio-group-custom mr-80" 
                                aria-label={'abridged'} 
                                name={'abridged'} 
                                value={this.state.abridged} 
                                onClick={this.onAbridgedHandler}>
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
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
        mode: state?.application?.mode,
        contarct_types: state?.setupOptions?.medicareOptions,
        medicare_contract_types: state?.setup?.formulary?.medicare_contract_types
    };
};
export default connect(mapStateToProps)(MedicareInformation)
