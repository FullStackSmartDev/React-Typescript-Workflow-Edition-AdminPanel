import { Table } from "antd";
import React from "react";
import { hierarchySummaryExpandGridColumns } from "../../../../../../../../utils/grid/columns";
import FrxGridContainer from "../../../../../../../shared/FrxGrid/FrxGridContainer";

import "./HierarchyExpandedMenu.scss";

const dataSource = [
    {
      key: '1',
      name: 'ABCere',
      group_name: 'Choice Enhanced',
      level_id: '654327890',
    },
    {
      key: '2',
      name: 'CREv124',
      group_name: 'Direct Access',
      level_id: '65432789012',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Group Name',
      dataIndex: 'group_name',
      key: 'group_name',
    },
    {
      title: 'Level ID',
      dataIndex: 'level_id',
      key: 'level_id',
    },
  ];

export default class SummaryExpandable extends React.Component<any, any> {
      
    render() {
        return(
            <div className="summary-expandable-container">
                <Table dataSource={dataSource} columns={columns} pagination={false} />;
                {/* <FrxGridContainer
                enableSearch
                enableColumnDrag
                onSearch={() => {}}
                enableSettings
                fixedColumnKeys={["claimId"]}
                gridName="ACCUMULATORS"
                isFetchingData={false}
                columns={hierarchySummaryExpandGridColumns()}
                data={dataSource}
                pagintionPosition="topRight"
                onSettingsClick="grid-menu"
                scroll={{ x: 0, y: 420 }}
                /> */}
            </div>
        )
    }
}