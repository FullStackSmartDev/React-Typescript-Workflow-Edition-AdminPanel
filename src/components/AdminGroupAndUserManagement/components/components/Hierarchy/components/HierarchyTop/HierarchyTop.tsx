import React from "react";

import "./HierarchyTop.scss";

export default class HierarchyTop extends React.Component<any, any> {
    render() {
        return (
            <div className="hierarchy-top-container">
                <div className="breadcrum-wrapper">
                    <span>Hierarchy</span>
                    <sub>&gt;</sub>
                    <h3>Healthnet Community Solutions (234989573027468)</h3>
                    <span className="green">Active</span>
                    <span className="grey">Self Administrator</span>
                    <span className="blue">Service Provider</span>
                    <span className="sub-domain">Subdomain:</span>
                    <h4>healthnet.futurerx.com</h4>
                </div>
                <div className="lob-date-wrapper">
                    <div></div>
                    <div className="name-date-domain-wrapper">
                        <div className="group">
                            <h4>Effective Date:</h4>
                            <h5>09/22/2020</h5>
                        </div>
                        <div className="group">
                            <h4>Domain:</h4>
                            <h5>4</h5>
                        </div>
                        <div className="group">
                            <h4>PRIMARY CONTACT:</h4>
                        </div>
                        <div className="group">
                            <h4>Name:</h4>
                            <h5>Jack Robertson</h5>
                        </div>
                    </div>
                    <div className="termination-date-wrapper">
                        <div className="group">
                            <h4>Termination Date:</h4>
                            <h5>09/22/2020</h5>
                        </div>
                        <div className="group">
                            <h4>Managed By:</h4>
                            <h6>healthnet.com</h6>
                        </div>
                        <div className="group hidden">1</div>
                        <div className="group">
                            <h4>Phone:</h4>
                            <h5>(818) 425-0983</h5>
                        </div>
                    </div>
                    <div className="created-date-address-wrapper">
                        <div className="group">
                            <h4>Created Date:</h4>
                            <h5>09/22/2020</h5>
                        </div>
                        <div className="group">
                            <h4>No. of Users:</h4>
                            <h5>20</h5>
                        </div>
                        <div className="group hidden">1</div>
                        <div className="group">
                            <h4>Address:</h4>
                            <h5>1155 Lolita Ave. Suite 204 Tuscon, Arizona 98759</h5>
                        </div>
                    </div>
                    <div className="last-modified-wrapper">
                        <div className="group">
                            <h4>Last Modified Date:</h4>
                            <h5>09/22/2020</h5>
                        </div>
                        <div className="group">
                            <h4>No. of Roles</h4>
                            <h5>20</h5>
                        </div>
                    </div>
                    <div className="lob">
                        <div className="group">
                            <h4>LOB:</h4>
                        </div>
                        <span className="purple">Medicare</span>
                        <span className="yellow">Exchange</span>
                        <span className="pink">Medicaid</span>
                        <span className="grey">Commercial</span>
                    </div>
                </div>
            </div>
        )
    }
}