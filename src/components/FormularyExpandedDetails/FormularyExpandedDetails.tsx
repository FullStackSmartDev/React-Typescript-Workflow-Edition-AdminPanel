import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import FrxMiniTabs from './../shared/FrxMiniTabs/FrxMiniTabs';
import { getformulary } from "../.././redux/slices/formulary/setup/setupService";
import { getDesignOptions } from "../.././redux/slices/formulary/setup/setupOptionsService";
import { getTierOptions } from "../.././redux/slices/formulary/setup/setupOptionsService";
import getClassificationName from "../NewFormulary/Utils/FormularyClassificationUtils";
import getSubmissionMonth from "../NewFormulary/Utils/SubmissionMonthUtils";
import GeneralInfo from './GeneralInfo';
import FormularyDesign from './DesignInfo';
import FormularyTiers from './Tiers';

import { connect } from "react-redux";

import './FormularyExpandedDetails.scss';

const miniTabs = [
  {id: 1, text: "General"},
  // {id: 2, text: "Medicare"},
  {id: 2, text: "Formulary Design"},
  {id: 3, text: "Tiers"},
  // {id: 5, text: "Supplemental Benefits/Alternative Model"}
]
const mapStateToProps = (state) => {
  return {
    dashboard: state?.dashboard.formulary_list
  }
}
class FormularyExpandedDetails extends React.Component<any,any>{
  state = {
    parentWidth: '0',
    activeMiniTabIndex: 0,
    formularyType: '',
    formularyName: '',
    formularyAbbrevation: '',
    methodofFormularyBuild:'Y',
    effectiveDate:'',
    serviceYear: '',
    formularyDescription: '',
    formularyClassificationSystem: '',
    formularySubmissionMonth: '',
    formulayId: '',
    designOptions: [],
    tiersOptions: [],
    edit_info: [],
    tiers: []
  };
  
  fetchFormulary = async () => {
    try {
      let formularyData = await getformulary(parseInt(this.props.rowData.data.id_formulary));
      const selectedRow = this.props.dashboard.filter(e => e.id_formulary === parseInt(this.props.rowData.data.id_formulary))
      if(formularyData.formulary_info){
        this.setState({
          formulayId: this.props.rowData.data.id,
          formularyType: selectedRow[0].formulary_type,
          formularyName: selectedRow[0].formulary_name,
          formularyAbbrevation: formularyData.formulary_info.abbreviation ===  null ? '' : formularyData.formulary_info.abbreviation,
          methodofFormularyBuild: formularyData.formulary_info.formulary_build_method,
          effectiveDate: selectedRow[0].effective_date,
          serviceYear: selectedRow[0].contract_year,
          formularyDescription: formularyData.formulary_info.formulary_description,
          formularyClassificationSystem: getClassificationName(formularyData.formulary_info.id_classification_system),
          formularySubmissionMonth: formularyData.formulary_info.id_submission_month === null ? '' : getSubmissionMonth(formularyData.formulary_info.id_submission_month),
          edit_info: [...formularyData.edit_info],
          tiers: [...formularyData.tiers],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchGenDesignOptions = async () => {
    try {
      const selectedRow = this.props.dashboard.filter(e => e.id_formulary === parseInt(this.props.rowData.data.id_formulary))
      let formularyData = await getDesignOptions(selectedRow[0].id_formulary_type,selectedRow[0].id_formulary);
      if(formularyData){
        console.log(formularyData)
        this.setState({
          designOptions: [...formularyData]
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchGenTiersOptions = async () => {
    try{
      const selectedRow = this.props.dashboard.filter(e => e.id_formulary === parseInt(this.props.rowData.data.id_formulary))
      let formularyData = await getTierOptions(selectedRow[0].id_formulary_type,selectedRow[0].id_formulary,0);
      if(formularyData){
        this.setState({
          tiersOptions: [...formularyData]
        })
      }
    } catch(err) {
      console.log(err)
    }
  }
  componentDidMount(){
    if(this.props.rowData && this.props.dashboard){
      const width = (document.querySelector('.ant-table-wrapper') as HTMLElement).offsetWidth - 6 + 'px';
      this.setState({
        parentWidth: width
      })
      this.fetchFormulary();
      this.fetchGenDesignOptions();
      this.fetchGenTiersOptions();
    }
  }
  setActiveMiniTabIndex = (tabIndex) => {
    this.setState({
      activeMiniTabIndex: tabIndex
    })
  }
  renderTabContent = () => {
    const tabIndex = this.state.activeMiniTabIndex;
    switch(tabIndex){
      case 0:
        return <GeneralInfo generalInfo={this.state} drugDetailClick={this.props.drugDetailClick}/>;
      case 1:
        return <FormularyDesign designOptions={this.state.designOptions} edit_info={this.state.edit_info}/>;
      case 2:
        return <FormularyTiers tiers={this.state.tiers} tiersOptions={this.state.tiersOptions}/>;
    }
  }
  render(){
    return (
      <div className="table-expanded-sticky-wrapper" style={{width: this.state.parentWidth}}>
        <div className="formulary-expanded-details">
          <Paper elevation={0}>
            <div className="formulary-expanded-details__container">
              {/* Left Container Starting*/}
              {/* <div className="formulary-expanded-details-left">
                <div className="formulary-expanded-details-left__container">
                  <div className="formulary-expanded-details-left__title">Versions</div>
                  <div className="formulary-expanded-details-left__list">
                    <div className="formulary-expanded-details-left__list-item">
                      <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--active" />Version 4
                    </div>
                    <div className="formulary-expanded-details-left__list-item">
                      <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--active" />Version 3
                    </div>
                    <div className="formulary-expanded-details-left__list-item">
                      <span className="formulary-expanded-details-left__list-item-indicator formulary-expanded-details-left__list-item-indicator--inactive" />Version 2
                    </div>
                    
                    <div className="formulary-expanded-details-left__list-add-item">+ add new version</div>
                    
                  </div>
                </div>
              </div> */}
              {/* Left Container Ending*/}
              
              {/* Right Container Starting*/}
                <div className="formulary-expanded-details-right">
                  {/* <div className="formulary-expanded-details-right__header">
                    <FrxProcessStepper/>
                  </div> */}
                  <div className="formulary-expanded-details-right__tabs">
                    <FrxMiniTabs 
                      tabList={miniTabs} 
                      activeTabIndex={this.state.activeMiniTabIndex} 
                      onClickTab={(selectedTabIndex)=> this.setActiveMiniTabIndex(selectedTabIndex)}/>
                  </div>
                  
                    <div className="formulary-expanded-details-right__content">
                    {this.renderTabContent()}
                    </div>
                </div>
              {/* Right Container Ending*/}
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FormularyExpandedDetails);