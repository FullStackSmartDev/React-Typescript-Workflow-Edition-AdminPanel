import { Grid } from "@material-ui/core";
import { DatePicker } from "antd";
import React from "react";
import DropDown from "../../../../../../../shared/Frx-components/dropdown/DropDown";
import './HistoricalClaimProcessing.scss';
export default class HistoricalClaimProcessing extends React.Component<
  any,
  any
  > {
  render() {
    return (
      <div className="historicalClaimProcessingContainer">

        <div className="disaster-date-wrapper">
          <div className="start-date">
            <label>
              start date
                  </label>
            <DatePicker
              className="disaster-date-picker"
              placeholder=""
              suffixIcon={
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ant-picker-suffix"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                    fill="#C4C4C4"
                  />
                </svg>
              }
            />
          </div>
          <div className="end-date">
            <label>
              end date
                  </label>
            <DatePicker
              className="disaster-date-picker"
              placeholder=""
              suffixIcon={
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ant-picker-suffix"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                    fill="#C4C4C4"
                  />
                </svg>
              }
            />
          </div>
        </div>

        <div className="historicalProcessingDetail">
          <div className="disaster-date-wrapper">
            <div className="start-date">
              <label>
                Fill start date
                  </label>
              <DatePicker
                className="disaster-date-picker"
                placeholder=""
                suffixIcon={
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ant-picker-suffix"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                      fill="#C4C4C4"
                    />
                  </svg>
                }
              />
            </div>
            <div className="end-date">
              <label>
                Fill end date
                  </label>
              <DatePicker
                className="disaster-date-picker"
                placeholder=""
                suffixIcon={
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ant-picker-suffix"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                      fill="#C4C4C4"
                    />
                  </svg>
                }
              />
            </div>

          </div>
          <div className="disaster-date-wrapper">
            <div className="disaster-date-wrapper">
              <div className="start-date">
              <span className="labelBlue">
                  Pharmacy NPI
                  </span>
                <DropDown
                  className="disaster-date-picker"
                  options={["Text", "Text", "Text"]}
                />
              </div>
              <div className="end-date">
              <span className="labelBlue">
                  Pharmacy Relationship Id
                  </span>
                <DropDown
                  className="disaster-date-picker"
                  options={["Text", "Text", "Text"]}
                />
              </div>

            </div>

          </div>

          <div className="disaster-date-wrapper">
            <div className="disaster-date-wrapper">
              <div className="start-date">
                <span className="labelBlue">
                  Member ID
                  </span>
                <DropDown
                  className="disaster-date-picker"
                  options={["Text", "Text", "Text"]}
                />
              </div>
              <div className="end-date">
                <span className="labelBlue">
                  Pharmacy Parent Organization Id
                  </span>
                <DropDown
                  className="disaster-date-picker"
                  options={["Text", "Text", "Text"]}
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    );
  }
}
