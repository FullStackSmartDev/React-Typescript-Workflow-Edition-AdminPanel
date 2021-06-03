import { Button, Tooltip } from "antd";
import React from "react";
import "./Password.scss"

const ToolTipIcon = () => (
  <span>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.33398 3.66671H7.66732V5.00004H6.33398V3.66671ZM6.33398 6.33337H7.66732V10.3334H6.33398V6.33337ZM7.00065 0.333374C3.32065 0.333374 0.333984 3.32004 0.333984 7.00004C0.333984 10.68 3.32065 13.6667 7.00065 13.6667C10.6807 13.6667 13.6673 10.68 13.6673 7.00004C13.6673 3.32004 10.6807 0.333374 7.00065 0.333374ZM7.00065 12.3334C4.06065 12.3334 1.66732 9.94004 1.66732 7.00004C1.66732 4.06004 4.06065 1.66671 7.00065 1.66671C9.94065 1.66671 12.334 4.06004 12.334 7.00004C12.334 9.94004 9.94065 12.3334 7.00065 12.3334Z" fill="#1D54B4" />
    </svg>

  </span>
);
const toolTipData1 = "The system allows an admin to define the minimum number of previous passwords rememberd.";
const toolTipData2 = "The system allows an Admin to define how long should a user keep a password before changing it. ";
const toolTipData3 = "The system allows an Admin to define the number of days before a password change is required. ";
const toolTipData4 = "The system shall allow an Admin to define the number of days before a password change is required. ";

export default class Password extends React.Component<any, any> {
  render() {
    return <>
      <div className="pswd-container">
        <div className="inner-container">
          <div className="title">Password</div>

          <div><label htmlFor="">How many new passwords must be used before reusing an old password? <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={toolTipData1}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span></label><input type="text" /></div>

          <div><label htmlFor="">How many days should a user keep their password before they can change it? <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={toolTipData2}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span></label><input type="text" /></div>

          <div><label htmlFor="">How many days are allowed before a user is required to change their password? <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={toolTipData3}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span></label><input type="text" /></div>

          <div><label htmlFor="">What is the minimum password length? <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={toolTipData4}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span></label><input type="text" /></div>

          <div><label htmlFor="">Maximum number of attempts using the wrong password before lockout? <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={""}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span></label><input type="text" /></div>

          <div className="timeout-input">
            <span>Unlock after <input type="text" defaultValue="24" /> Hours <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={""}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span> </span>
          </div>

          <div className="timeout-input">
            <span>Idle Timeout
              <input type="text" defaultValue="58" /> Minutes <span className="pswd-tooltip">
                <Tooltip
                  placement="top"
                  arrowPointAtCenter={true}
                  overlayClassName="member-info-root__tooltip"
                  title={toolTipData1}
                >
                  <span>
                  <ToolTipIcon />
                  </span>
                </Tooltip>
              </span>
            </span>

          </div>
          <div>
      <Button className="custom-action-btn">Save</Button>
        </div>

        </div>
      </div>
    </>
  }
}
