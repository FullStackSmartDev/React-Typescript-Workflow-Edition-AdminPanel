import React from "react";
import { Row, Col,Divider ,DatePicker} from 'antd';
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";
import moment from 'moment';
// import css
import "./cms.scss";

export default class CmsSubmissionCalendar extends React.Component<any, any> {

    state={
      open:false,
      selectedDate: "",
      newDate:"",
    }
    onChange(date, dateString) {
      this.setState({selectedDate:dateString});

    }
    onDateChange=(date,dateString)=>{
      this.setState({newDate:dateString});
    }
    dateStyle ={
           height: "40px !important",
            padding: "10px",
            borderRadius: "3px",
            backgroundColor: "rgb(240, 235, 235)",
            marginLeft: "10px",
            marginTop: "10px",
    }

    data =[
      {
        key:1,
        title:"Intial Formulary Submission"
      },
      {
        key:2,
        title:"Supplemental File Submission"
      },
      {
        key:3,
        title:"VBID File Submission"
      },
      {
        key:4,
        title:"Add File Submission"
      },
      {
        key:5,
        title:"Stage 1 Review"
      },
      {
        key:6,
        title:"Stage 2 Review"
      },
      {
        key:7,
        title:"Stage 3 Review"
      },
      {
        key:8,
        title:"Limited Window Update"
      },
      {
        key:9,
        title:"Limited Window Update"
      },
      {
        key:10,
        title:"Formulary Enhancment Submission Window"
      },
      {
        key:11,
        title:"Formulary Posting"
      },
      {
        key:12,
        title:"Formulary PA and ST Posting"
      }
    ]
   year=[
      {
        key:1,
        month:"January"
      },
      {
        key:2,
        month:"February"
      },
      {
        key:3,
        month:"March"
      },
      {
        key:4,
        month:"April"
      },
      {
        key:5,
        month:"May"
      },
      {
        key:6,
        month:"June"
      },
      {
        key:7,
        month:"July"
      },
      {
        key:8,
        month:"August"
      },
      {
        key:9,
        month:"September"
      },
      {
        key:10,
        month:"October"
      },
      {
        key:11,
        month:"November"
      },
      {
        key:12,
        month:"December"
      }     
   ]
   handleComponent=()=>{
     if(this.state.selectedDate !== ""){
       this.setState({selectedDate: ""});
     }
     this.setState({open:!this.state.open})
   }
  render() {
    return (
      <>
      <div className="cms-container">
        <div className="cms-header">
          <Row>
            <Col span={4} className="mt">
              <span className="title"> CMS SUBMISSION CALENDAR</span>   
           </Col>
            <Col span={16}>
              <DropDown
                placeholder="Plan Year"
                className="cms-dropdown"
                options={[""]}
              />
            </Col>
            <Col span={4}>
              <button type="button" className="add-button" onClick={this.handleComponent.bind(this)}>+ Add New Calendar</button>
            </Col>
          </Row>
        </div>
        <Divider/>
       { (this.state.selectedDate !== ""  ) ? 
       <>
       <div className="cms-content">
          <Row>
            <Col span={24} className="mar">
              <span > Plan Year</span>
            </Col>
            <Col span={24}>
              <input type="text" value={this.state.selectedDate} className="selected-date"/>
            </Col>
            <Col span={24} style={{marginTop:"20px"}}>
            <span className="title-1">Initial Formulary</span>
            </Col>
            <Col span={24}>
              <Row  className="ml">
               {this.data.map((d)=>( 
                 <>
                  <Col span={12} className="col">
                        <span className="ml">{d.title}</span>
                    </Col>
                    <Col span={12} className="col">
                      <DatePicker onChange={this.onDateChange.bind(this)} className="date-picker" />
                    </Col>
                </>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
        <div className="main-container">
        <Row>
            <Col span={24} className="mar">
              <span className={"title-1"}>Maintenance Formulary</span>
            </Col>
            <div className="inner-container">
              <span>
              <Col span={24} style={{backgroundColor:"rgb(240, 235, 235)",padding:"10px"}}>
              <span >Initial Formulary</span>
              </Col>
              </span> 
              <Col span={24}>
                <Row  className="ml">
                {this.year.map((y)=>( 
                  <>
                    <Col span={12} className="col">
                          <span className="ml">{y.month}</span>
                      </Col>
                      <Col span={12} className="col">
                        <DatePicker onChange={this.onDateChange.bind(this)} className="date-picker" />
                      </Col>
                  </>
                  ))}
                </Row>
              </Col>
            </div>
            <div className="inner-container">
              <span>
              <Col span={24} style={{backgroundColor:"rgb(240, 235, 235)",padding:"10px"}}>
              <span >Line-Level Decision Review</span>
              </Col>
              </span> 
              <Col span={24}>
                <Row  className="ml">
                {this.year.map((y)=>( 
                  <>
                    <Col span={12} className="col">
                          <span className="ml">{y.month}</span>
                      </Col>
                      <Col span={12} className="col">
                        <DatePicker onChange={this.onDateChange.bind(this)} className="date-picker" />
                      </Col>
                  </>
                  ))}
                </Row>
              </Col>
            </div>
          </Row>
      </div>
      </>
      :
      <div className="cms-content">
        <Row>
          <Col span={24} className="mar">
            <span >Pick Plan Year</span>
          </Col>
          <Col span={24}>
            <DatePicker onChange={this.onChange.bind(this)} size="large" className="date" picker="year" style={this.dateStyle} />
          </Col>
        </Row>
      </div>
      }
      </div>
     
      </>
    );
  }
}
