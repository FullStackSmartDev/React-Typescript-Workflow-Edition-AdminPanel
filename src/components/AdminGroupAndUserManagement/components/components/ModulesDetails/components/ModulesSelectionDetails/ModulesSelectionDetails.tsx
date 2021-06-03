import { Grid } from '@material-ui/core';
import React from 'react';
import { Checkbox } from "antd";
import './ModulesSelectionDetails.scss';
export default class ModulesSelectionDetails extends React.Component<any,any>
{
    state ={
        lstModules: [
            {
                id:1,
                name:"Adjudication",
                isModuleSelected:false,
                isActive:true
            },
            {
                id:2,
                name:"Mobile Application(Member)",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:3,
                name:"Benefits",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:4,
                name:"MTM Disease Management",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:5,
                name:"Complaints Tracking",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:6,
                name:"Network Pricing",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:7,
                name:"Customer Service",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:8,
                name:"PDE Oversight",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:9,
                name:"Drug Management Program",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:10,
                name:"Pharmacy and Therapeutics",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:11,
                name:"Formulary",
                isModuleSelected:false,
                isActive:true,
            },
            {
                id:12,
                name:"Quality and Adherence",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:13,
                name:"Grievance",
                isModuleSelected:false,
                isActive:false,
            },
            {
                id:14,
                name:"Test Claim Adjudication",
                isModuleSelected:false,
                isActive:false,
            },
        ]
    }
    onModuleSelectCheck(element:any, id:any)
    {
        var commentIndex = this.state.lstModules.findIndex(function(c) { 
            return c.id == id; 
        });

        let items = [...this.state.lstModules];
        let item = {...items[commentIndex]};

        if(element.target.checked)
        {
            item.isModuleSelected = true;              
        }
        else
        {
            item.isModuleSelected = false;
        }    
        
        items[commentIndex] = item;
        this.setState({lstModules: items});
    }   

    componentDidMount(){
        if(this.props.alreadySelectedModules)
        {
            let tempModulesLst: any[] = []
            for(let i=0; i< this.state.lstModules.length; i++) 
            {                
                let obj = {};
                obj["id"] =  this.state.lstModules[i]["id"];
                obj["name"] =  this.state.lstModules[i]["name"];                 
                obj["isActive"] =  this.state.lstModules[i]["isActive"]; 
                
                if(this.props.alreadySelectedModules.some(p=>p.id == this.state.lstModules[i]["id"]))
                {
                    obj["isModuleSelected"] =  true;                                       
                }
                else
                {
                    obj["isModuleSelected"] =  this.state.lstModules[i]["isModuleSelected"];
                }
                tempModulesLst.push(obj);
            }          

            this.setState({lstModules:tempModulesLst});
        }
    }
    getModules =() =>{        
        return this.state.lstModules.map((obj, index: any) => {
            return(
                <>
                    <Grid item xs={4} className={`${obj.isActive} moduleItemWrapper`}>
                        <label>
                            {obj.name}
                        </label>
                    </Grid>
                    <Grid item xs={2}>
                        <Checkbox className="custom-checkbox" onChange={(e) => this.onModuleSelectCheck(e,obj.id)} disabled={!obj.isActive} checked={obj.isModuleSelected} />
                    </Grid>
                </>
            );
        });          
    }

    render(){
        const allModules = this.getModules();
        return(
            <div className="modulesSelectionContainer">
                <Grid  container xs={12} className="modulesSelectionWrapper">
                    {allModules}
                    
                    <br/>
                    <div className="applyButtonWrapper">
                        <button onClick = {() => this.props.ModulesSelectionApplyClick(this.state.lstModules.filter(p=>p.isModuleSelected === true))}>Apply</button>
                    </div>                    
                </Grid>
        </div>
        );
    }
}
