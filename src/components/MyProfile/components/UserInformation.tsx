import React, { Fragment } from "react";
import { Rating } from "@material-ui/lab";
import { Switch } from "antd";

export default class UserInformation extends React.Component<any, any> {

    toggle () {
        console.log("toggled")
    }
  render() {
    return (
        <Fragment>
                    <div className="user-name-status">
                        <div className="user-name">
                            <h4>Matt Sanchez</h4>
                            <h6>Formulary Supervisor</h6>
                        </div>
                        <div className="user-status">
                            <span className="green">Active</span>
                            <span className="blue">Supervisor</span>
                        </div>
                    </div>
                    <div className="rating-contact-wrapper">
                        <div className="raing">
                            <h6>Ranking:</h6>
                            <Rating name="half-rating" defaultValue={3} precision={0.5} />
                        </div>
                        <div className="user-contact">
                            <div className="email-wrapper">
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7727 2.97188C11.8641 2.89922 12 2.96719 12 3.08203V7.875C12 8.49609 11.4961 9 10.875 9H1.125C0.503906 9 0 8.49609 0 7.875V3.08438C0 2.96719 0.133594 2.90156 0.227344 2.97422C0.752344 3.38203 1.44844 3.9 3.83906 5.63672C4.33359 5.99766 5.16797 6.75703 6 6.75234C6.83672 6.75938 7.6875 5.98359 8.16328 5.63672C10.5539 3.9 11.2477 3.37969 11.7727 2.97188ZM6 6C6.54375 6.00938 7.32656 5.31563 7.72031 5.02969C10.8305 2.77266 11.0672 2.57578 11.7844 2.01328C11.9203 1.90781 12 1.74375 12 1.57031V1.125C12 0.503906 11.4961 0 10.875 0H1.125C0.503906 0 0 0.503906 0 1.125V1.57031C0 1.74375 0.0796875 1.90547 0.215625 2.01328C0.932813 2.57344 1.16953 2.77266 4.27969 5.02969C4.67344 5.31563 5.45625 6.00938 6 6Z" fill="#666666"/>
                                </svg>
                                <span>Email:</span>
                                <span className="email-id">matt@futurerx.com</span>
                            </div>
                            <div className="phone-wrapper">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.508584 0.672938L3.35228 0.0167016C3.66125 -0.0543907 3.97844 0.106934 4.10421 0.396772L5.41669 3.45921C5.53153 3.72717 5.45497 4.04162 5.22802 4.22482L3.57102 5.58104C4.55538 7.67826 6.27526 9.42275 8.41623 10.4262L9.77246 8.76925C9.95839 8.5423 10.2701 8.46574 10.5381 8.58058L13.6005 9.89305C13.8931 10.0216 14.0544 10.3387 13.9833 10.6477L13.3271 13.4914C13.2587 13.7867 12.9962 14 12.6872 14C5.68465 14 0 8.32629 0 1.31277C0 1.00652 0.210544 0.741296 0.508584 0.672938Z" fill="#707683"/>
                                </svg>
                                <span>Phone Number:</span>
                                <span className="phone-numner">(818) 457-2252</span>
                            </div>
                        </div>
                    </div>
                    <div className="toggle-btn-wrapper">
                        <h6>Alerts:</h6>
                        <span>on</span>
                        <Switch defaultChecked onClick={this.toggle} />
                        <span>off</span>
                    </div>
        </Fragment>
    );
  }
}