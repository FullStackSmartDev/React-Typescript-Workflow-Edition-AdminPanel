import React from 'react';
import {Box} from "@material-ui/core";
import DropDown from '../../shared/Frx-components/dropdown/DropDown';
import Button from '../../shared/Frx-components/button/Button';
import './Alternatives.scss';
import SeletedAlternatives from './selectedAlternatives';
import PrioritizeAlternative from './prioritizeAlternative';

class Alternatives extends React.Component<any,any>{
    state = {
        applyLOB: false,
        applySelectedAlternative: false
    }
    applyLOBHandler = () => {
        this.setState({
            applyLOB: true
        })
    }
    applySelectedAlternativeHandler = () => {
        this.setState({
            applySelectedAlternative: true
        })
    }
    render(){
        return(
            <div className="alternatives-wrapper">
                <div className="border br-5 mb-10">
                    <div className="header">FORMULARY ALTERNATIVES</div>
                    <div className="alternative-lob-wrapper">
                        <label>SELECT A LINE OF BUSINESS <span className="asterisk">*</span></label>
                        <Box display="flex">
                            <DropDown options={['Exchange']}/>
                            <Button label="Apply" onClick={this.applyLOBHandler}/>
                        </Box>
                    </div>
                </div>
                {this.state.applyLOB ? (
                    <SeletedAlternatives applyClick={this.applySelectedAlternativeHandler}/>
                ) : null}
                {this.state.applySelectedAlternative ? (
                    <PrioritizeAlternative />
                ) : null}
                
            </div>
        )
    }
}
export default Alternatives;