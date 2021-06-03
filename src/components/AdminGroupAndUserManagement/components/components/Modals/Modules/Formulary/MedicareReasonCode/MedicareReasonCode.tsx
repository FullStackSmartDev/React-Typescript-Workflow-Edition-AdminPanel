import React from "react";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { SearchOutlined ,DeleteFilled  } from '@ant-design/icons';
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";
import FrxGridContainer from "../../../../../../../shared/FrxGrid/FrxGridContainer";
import { MedicareReasonCodeColumns } from "../../../../../../../../utils/grid/columns";
import { Modal, Button ,Checkbox,Space} from 'antd';
import { Row, Col } from 'antd';
import TextField from '@material-ui/core/TextField';

// import sass
import "./medicare.scss";

export default class MedicareReasonCode extends React.Component<any, any> {
 
  state = {
    isNameClick: false,
    open: false,
    checked: false,
    reason:"",
    type:"",
    reason1:"",
    type1:""
  }
  onChange(e) {
    this.setState({checked: !this.state.checked});
  }
  showModal = () => {
    this.setState({open:true});
  };

  handleOk = () => {
    this.setState({open:false});
  };

   handleCancel = () => {
    this.setState({open:false});
  };
  triDotDropdownItemClick = (dataRow: any, item: any) => {
    this.setState({isNameClick: true});
  }
  data1 =  [
    {
      id: 1,
      key: 1,
      description_of_change: <a>Drug Added</a>,
      reason_for_change: "new reason ",
      change_type: "Positive Change",
    },
    {
      id: 1,
      key: 1,
      description_of_change:<a>Drug Removed</a>,
      reason_for_change: "test check ",
      change_type: "Positive Change",
    },
    {
      id: 1,
      key: 1,
      description_of_change:<a>PA Added</a>,
      reason_for_change: "test",
      change_type: "Positive Change",
    },
    {
      id: 1,
      key: 1,
      description_of_change:<a>Drug Added</a>,
      reason_for_change: "new reason ",
      change_type: "Negative Change",
    },
   
  ];
  setReason=()=>(e)=>{
    this.setState({reason:e.target.value})
  }
  setType=()=>(e)=>{
    this.setState({type:e.target.value})
  }
  setReason1=()=>(e)=>{
    this.setState({reason1:e.target.value})
  }
  setType1=()=>(e)=>{
    this.setState({type1:e.target.value})
  }
  render() {
    const columns = MedicareReasonCodeColumns();

    return (
      <>
      <div className="disaster-override-grid-container">
        <div className="grid-container-header-wrapper">
          <div className="grid-name-fields-wrapper">
            <p className="title">FORMULARY REASON CODE <span style={{marginLeft:"4px", marginTop:"4px"}} > <InfoOutlinedIcon style={{fontSize:"15px"}}/></span> </p>
            <div style={{marginLeft:"100px",display:"flex"}}>
            <DropDown
              placeholder="All"
              className="disaster-dropdown marg"
              options={[""]}
            />
              <form className="example"  style={{margin:"auto",marginLeft:"10px",width:"171px",borderRadius:"3px",height:"33px",border:"1px solid lightgray"}}>
                <span><SearchOutlined/>
                <input type="text"  name="search2" />
                
                </span>

              </form>
            <DropDown
              placeholder="Active"
              className="disaster-dropdown"
              options={[""]}
            />
            </div>
            
          </div>
          <div className="action-btn">
          <Button type="primary" onClick={this.showModal} className="add-new-code">
            + Add New Code
          </Button>
          <Modal title="Edit Reason Code" width={700} visible={this.state.open} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
            <Row>
              <Col span={24} >
                <label htmlFor="description" className="label">DESCRIPTION</label>
              </Col>
            </Row>
            <Row>
            <Col span={12}>
            <TextField id="outlined-basic"  variant="outlined" className="margin-size"/>
            </Col>
            </Row>
            <Row>
                <Col span={8}>
                  <label htmlFor="description" className="m-top label">REASON FOR CHANGE</label>
                </Col>
                <Col span={8}>
                  <label htmlFor="description" className="m-top label">CHANGE TYPE</label>
                </Col>
                <Col span={8}>
                  <label htmlFor="description" className="m-top label">DEFAULT</label>
                </Col>
            </Row>
            <Row>
              
              <Col span={8}>
                 <TextField id="outlined-basic" onChange={this.setReason.bind(this)}  variant="outlined" className="margin-size" />
              </Col>
              <Col span={8}>
                 <TextField id="outlined-basic" onChange={this.setType.bind(this)}  variant="outlined" className="margin-size" />
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={12}>
                    <Checkbox onChange={this.onChange.bind(this)} className="checkbox-margin"/>
                  </Col>
                  <Col span={12}>
                  <Button type="primary"  className="delete-btn">
                    <DeleteFilled />
                  </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
                <Col span={8}>
                  <label htmlFor="description" className="m-top label">REASON FOR CHANGE</label>
                </Col>
                <Col span={8}>
                  <label htmlFor="description" className="m-top label">CHANGE TYPE</label>
                </Col>  
            </Row>
            <Row>
              
              <Col span={8}>
                 <TextField id="outlined-basic" onChange={this.setReason.bind(this)} variant="outlined" className="margin-size" />
              </Col>
              <Col span={8}>
                 <TextField id="outlined-basic" onChange={this.setType.bind(this)} variant="outlined" className="margin-size" />
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={12}>
                    <Checkbox onChange={this.onChange.bind(this)} className="checkbox-margin"/>
                  </Col>
                  <Col span={12}>
                  <Button type="primary"  className="delete-btn">
                    <DeleteFilled />
                  </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <span>
                  <CancelOutlinedIcon className="icon-style"/>
                    <span className="txt"> add reason for change</span>
                  </span>
              </Col>
            </Row>
            <Row>
                <button type="button" onClick={this.handleCancel} className="cancle-btn">cancle</button>
                <button type="button" className="save-btn">Save</button>

            </Row>

          </Modal>
          </div>
        </div>
        <div className="disaster-grid-container ">
         
          <FrxGridContainer
            enableSearch
            enableSettings
            onSearch={() => {}}
            fixedColumnKeys={[""]}
            settingsTriDotDropDownItems={["Edit"]}
            onsettingsTriDotDropDownItemClick={this.triDotDropdownItemClick}
            gridName="AuditView"
            isFetchingData={false}
            columns={columns}
            data={this.data1}
            pagintionPosition="topRight"
            onSettingsClick="grid-menu"
            applyFilter
            scroll={{ x: 1100, y: 420 }}
            expandable={{
              isExpandable: false,
            }}
          />
        </div>
      </div>
      </>
    )
  }
}
