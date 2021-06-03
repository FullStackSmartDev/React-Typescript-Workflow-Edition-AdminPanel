import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import { NOCMarketingColumns } from "../../../utils/grid/columns";
import { NocReportMock } from "../../../mocks/NocReportMock";
import "./MarketingMaterial.scss";



export default class NocReportPopup extends React.Component<any, any> {
  render() {
    return (
        <div className="bordered">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={NOCMarketingColumns()}
            scroll={{ x: 2000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={NocReportMock()}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
            }}
          />
        </div>
    );
  }
}
