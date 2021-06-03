import React, { Component } from "react";
import { ReactComponent as HideIcon } from "../../../../../../../assets/icons/HideIcon.svg";
import { ReactComponent as ShowIcon } from "../../../../../../../assets/icons/ShowIcon.svg";
import PureAccordion from "../../../../../../shared/Frx-components/accordion/PureAccordion";
import { formularyTypesGridData } from "./CompareTable";
import InnerGrid from "./InnerGrid";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as compareConstants from "../../../../../../../api/http-compare-view";
import { connect } from "react-redux";
import showMessage from "../../../../../Utils/Toast";
import getLobCode from "../../../../../Utils/LobUtils";
import { getMainComparison } from "../../../../../../../redux/slices/formulary/compareView/compareViewService";
import FrxLoader from "../../../../../../shared/FrxLoader/FrxLoader";
import {
  dateFilters,
  textFilters,
  numberFilters,
} from "../../../../../../../utils/grid/filters";

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    clientId: state?.application?.clientId,
  };
};


class ViewTable extends Component<any, any> {
  state = {
    showCheckbox: false,
    toggleAllAccordion: true,
    showViewAll: false,
    showViewAllNonMatch: false,
    formularyTypesGridData: Array(),
    isRequestFinished: false,
  };

  componentDidMount() {
    if (
      this.props.baseformulary &&
      this.props.baseformulary["id_formulary"]
    ) {
      this.setState({
        isRequestFinished: false
      });
      this.populateSummaryData();
    }
  }

  getBackgroundColor = (type) => {
    switch (type) {
      case "Tier":
        return "rgba(31, 187, 196, 0.4)";

      case "Category/Class":
        return "rgba(10, 123, 225, 0.4)";

      case "Prior Authorization (PA)":
        return "#FFF5F0";

      case "Step Therpay (ST)":
        return "rgba(244, 175, 100, 0.4)";

      case "Quantity Limits (QL)":
        return "rgba(213, 255, 215, 0.5)";

      case "Drug Details":
        return "rgba(224, 237, 81, 0.4)";

      case "User Defined":
        return "#ECF5FA";
    }
  };

  areAllNull = (type) => {
    switch (type) {
      case "Category/Class":
        return true;

      case "Drug Details":
        return true;

      case "User Defined":
        return true;

      default:
        return false;
    }
  };

  getGridColumns = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];

    let lastSectionColumns = [...columns];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tier",
              displayTitle: "Tier",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "category",
            displayTitle: "Category",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "class",
            displayTitle: "Class",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paType",
              displayTitle: "PA Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescription",
              displayTitle: "PA Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;


      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stType",
              displayTitle: "ST Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescription",
              displayTitle: "ST Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValue",
              displayTitle: "ST Value",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlType",
              displayTitle: "QL Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDays",
              displayTitle: "QL Days",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantity",
              displayTitle: "QL Quantity",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "covered",
                  displayTitle: "Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCovered",
                  displayTitle: "Not Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefined",
              displayTitle: "User Defined",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;
    }
    return Array();
  };

  populateSummaryData = async () => {
    if (this.props.formulary_lob_id && this.props.formulary_lob_id === 4) {
      let formularyTypesGridData = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = compareConstants.COMMERCIAL_FORMULARY_SUMMARY;
      apiDetails["pathParams"] = this.props.baseformulary["id_formulary"]

      try {
        const data = await getMainComparison(apiDetails);
        if (data && data.length > 0) {
          let idCount = 1;
          data.map((value) => {
            let header = {
              id: idCount,
              title: value["attribute_type"],
              titleBG: this.getBackgroundColor(value["attribute_type"]),
              attribute_type: value["attribute_type"],
              file_type: value["file_type"],
              gridColumns: ['Tier', 'Prior Authorization (PA)', 'Step Therpay (ST)', 'Quantity Limits (QL)'].includes(value["attribute_type"]) ? this.getGridColumns(value["attribute_type"]) : Array(),
              headDrugsCount: {
                baseFormulary: null,
              },
              formularies: Array(),
            };
            if (!this.areAllNull(value["attribute_type"])) {
              header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
            }
            let valueId = 1;
            if (value["values"] && value["values"].length > 0) {
              value["values"].map((subValue) => {
                let gridColumns: any[] = Array();
                if (
                  subValue["attribute_name"] === "PA Group Descriptions" ||
                  subValue["attribute_name"] === "ST Group Descriptions"
                ) {
                  gridColumns = this.getGridColumns(subValue["attribute_name"]);
                } else if (value["attribute_type"] === "Drug Details") {
                  gridColumns = this.getGridColumns(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                } else {
                  gridColumns = this.getGridColumns(value["attribute_type"]);
                }
                let subItem = {
                  name: subValue["attribute_name"],
                  baseFormulary: subValue["base_formulary_drugs_count"],
                  attribute_type: value["attribute_type"],
                  file_type: value["file_type"],
                  attribute_field_data_type:
                    subValue["attribute_field_data_type"],
                  attribute_field_name: subValue["attribute_field_name"],
                  attribute_field_value: subValue["attribute_field_value"],
                  attribute_name: subValue["attribute_name"],
                  source: subValue["source"],
                  gridColumns: gridColumns,
                };
                header.formularies.push(subItem);
                valueId++;
              });
            }
            formularyTypesGridData.push(header);
            idCount++;
          });
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            isRequestFinished: true
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            isRequestFinished: true
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          formularyTypesGridData: formularyTypesGridData,
          isRequestFinished: true
        });
      }
    } else {
      this.setState({
        formularyTypesGridData: formularyTypesGridData,
        isRequestFinished: true
      });
    }
  };
  render() {
    const { showCheckbox, toggleAllAccordion } = this.state;
    if(!this.state.isRequestFinished){
      return <FrxLoader />;
    }
    return (
      <>
        <div className="bordered-grid">
          <div className="__root_compare-grid-container">
            <div className="__root_view-grid-container-parent-el">
              {/* Top Header Grid*/}
              <div className="border-bottom accordion-section-wrapper-first-col">
                <div className="header-first-child-container">
                  <div
                    className="header-first-child-container-child"
                    onClick={() =>
                      this.setState({
                        showCheckbox: !this.state.showCheckbox,
                      })
                    }
                  >
                    {showCheckbox ? (
                      <HideIcon
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                      />
                    ) : (
                      <ShowIcon
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                      />
                    )}
                    <p>{showCheckbox ? "Hide" : "Show"} Checkboxes</p>
                  </div>
                  <div
                    className="header-first-child-container-child"
                    onClick={() => {
                      this.setState({
                        toggleAllAccordion: !toggleAllAccordion,
                      });
                    }}
                  >
                    <p>{!toggleAllAccordion ? "Expand All" : "Collapse All"}</p>
                  </div>
                </div>
              </div>
              <div className="border-bottom font-style bg-grey">
                <span>BASE FORMULARY</span>
              </div>
            </div>
            {this.state.formularyTypesGridData.map((accordionHeader) => (
              <div key={accordionHeader.id}>
                <PureAccordion
                  tableType={"VIEW"}
                  title={accordionHeader.title}
                  titleBG={accordionHeader.titleBG}
                  showCheckbox={showCheckbox}
                  baseformulary={this.props.baseformulary}
                  gridColumns={accordionHeader.gridColumns}
                  fileType={accordionHeader.file_type}
                  formularyLobId={this.props.formulary_lob_id}
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"VIEW"}
                        clientId={this.props.clientId}
                        dataArr={accordionHeader.formularies}
                        formularyType={accordionHeader.title}
                        baseformulary={this.props.baseformulary}
                        formularyLobId={this.props.formulary_lob_id}
                      />
                    );
                  }}
                  headerData={accordionHeader.headDrugsCount}
                  toggleAllAccordion={toggleAllAccordion}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
