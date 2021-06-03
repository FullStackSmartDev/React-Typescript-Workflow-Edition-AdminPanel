import { Table } from 'antd';
import React, { Component } from 'react';
import './ModuleUserGroupList.scss';
import { ReactComponent as IconCheck } from "../../../../../../../assets/icons/IconCheck.svg";
import { getModuleUserGroupListMockData } from '../../../../../../../mocks/ModuleUserGroupListMock';

const columns = [
    {
        title: 'Domains',
        dataIndex: 'modules',
        key: 'modules'
    },
    {
        title: 'Total User Groups',
        dataIndex: 'userGroups',
        key: 'userGroups'
    },
    {
        title: 'Admin Groups',
        dataIndex: 'adminGroups',
        key: 'adminGroups'
    },
    {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        render: theImageURL => <IconCheck className="check-icon" />
    },
];

export class ModuleUserGroupList extends Component<any, any> {

    state = {
        moduleUserGroupListData: getModuleUserGroupListMockData(),
      };

    render() {
        return (
            <div className="table-container usr-grp-so">
                <Table dataSource={this.state.moduleUserGroupListData} columns={columns} bordered
                    pagination={false} scroll={{ y: 205 }} />
            </div>
        )
    }
}

export default ModuleUserGroupList
