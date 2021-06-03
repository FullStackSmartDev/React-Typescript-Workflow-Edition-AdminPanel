import React from "react";
import {Column} from "../../../../../models/grid.model";
//  "../../../../../models/grid.model";
import {dateFilters, textFilters} from "../../../../../utils/grid/filters";
// "../../../../../utils/grid/filters";
import FrxStatusField from "../../../../shared/FrxStatusField/FrxStatusField";
export const getMaintenacneMassUpdateColumns:
(
  data?,
  hiddenColumns?
) => Column<any>[] = (data, hiddenColumns) => {
  return [
    {
      id: 1,
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 20,
      key: "createdOn",
      displayTitle: "created On",
      isFilterable: true,   
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      id: 2,
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 20,
      key: "CreatedBy",
      displayTitle: "Created By",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      id: 3,
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 20,
      key: "lob",
      displayTitle: "lob",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
      customContent: (props) => (
        <FrxStatusField
          text={props.data.lob}
          type={"pill"}
          // fill={"pill"}
          variant={props.data.lob == "medicare" ? 4 : 1}
        />
      ),
      //   render: (lob) => <span style={{color: "red"}}>{lob}</span>,
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 163,
      key: "formularyName",
      displayTitle: "formulary name",
      customContent: (props) => (
        <div
        //   className="input-link"
        //   onClick={() => data.onFormularyNameClick(props.data.key)}
         >
          {props.data.formularyName}
        </div>
      ),
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden:
        hiddenColumns && hiddenColumns.indexOf("formulary_name") !== -1
          ? true
          : false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 5,
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 20,
      key: "formularyId",
      displayTitle: "formulary Id(s)",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
    {
      id: 6,
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 20,
      key: "status",
      displayTitle: "status",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: [],
    },
  ];
};
