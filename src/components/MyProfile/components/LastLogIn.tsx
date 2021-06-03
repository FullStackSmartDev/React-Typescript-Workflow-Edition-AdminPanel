import React, { Fragment } from "react";

export default class LastLogIn extends React.Component<any, any> {
  render() {
    return (
        <div className="last-login-container">
            <h5>Last Login</h5>
            <h3>12/20/2020 at 2:38PM</h3>
            <div className="created-updated-date">
                <h5>Created On:</h5>
                <span>09/22/2020</span>
            </div>
            <div className="created-updated-date">
                <h5>Last Updated:</h5>
                <span className="last-updated">12/22/2020</span>
            </div>
            <h4>Assigned Cases Complete:</h4>
            <p>photo here</p>
            <h4>Average Task Completion Time:</h4>
            <h3>3Hrs, 24 Min. </h3>
            <div className="password-reset">
                <h5>Last Password Reset:</h5>
                <span>09/22/2020</span>
            </div>
            <div className="password-reset">
                <h5>Next Password Reset:</h5>
                <span className="next-password-reset">12/22/2020</span>
            </div>
        </div>
    );
  }
}