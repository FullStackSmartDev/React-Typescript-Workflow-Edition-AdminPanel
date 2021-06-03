import React from 'react';
import { Collapse } from 'antd';
import './CostShareDetails.scss';
import DropDown from '../../shared/Frx-components/dropdown/DropDown';

const costShareDetails = (props:any) => {
    const { Panel } = Collapse;
    return (
        <div className="cost-share-details_content">
            <Collapse defaultActiveKey={['1']}>
                <Panel header="GROUP NAME" key="1">
                    <div className="headings">
                        <div className="item tier-number">tier number</div>
                        <div className="item tier-desc">tier description</div>
                        <div className="item cost-share">Cost share</div>
                        <div className="item cost-val">value</div>
                    </div>
                    <div className="body">
                        {props.costShareData.map(e => {
                            return (
                                <div className="row">
                                    <div className="item tier-number">{e.tierNumber}</div>
                                    <div className="item tier-desc">{e.tierDescription}</div>
                                    <div className="item cost-share"><DropDown options={['Copay','Co-Insurance']} value={e.costShare}/></div>
                                    <div className="item cost-val">
                                        {e.costVal === 'Co-Insurance' ? (
                                            <span className="prefix percent">%</span>  
                                        ) : (
                                            <span className="prefix">$</span>  
                                        )}
                                        <input type="text" placeholder={e.costVal}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}
export default costShareDetails;