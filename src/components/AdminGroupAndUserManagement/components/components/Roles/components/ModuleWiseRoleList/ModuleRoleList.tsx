import { Table } from 'antd';
import React, { Component } from 'react';
import './ModuleRoleList.scss';
import { ReactComponent as IconCheck } from "../../../../../../../assets/icons/IconCheck.svg";
import { getModuleRoleListMockData } from '../../../../../../../mocks/ModuleRoleListMock';

const columns = [
    {
        title: 'Modules',
        dataIndex: 'modules',
        key: 'modules'
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'roles'
    },
    {
        title: 'Unused Roles',
        dataIndex: 'unusedRoles',
        key: 'unusedRoles'
    },
    {
        title: 'Number Of User Groups',
        dataIndex: 'numberOfUserGroups',
        key: 'numberOfUserGroups'
    },
    {
        title: 'Number Of Users',
        dataIndex: 'numberOUsers',
        key: 'numberOUsers'
    },
    {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        render: theImageURL => <IconCheck className="check-icon" />
    },
];

export class ModuleRoleList extends Component {

    state = {
        moduleRoleListData: getModuleRoleListMockData(),
      };

    render() {
        return (
            <div className="table-container">
                <Table dataSource={this.state.moduleRoleListData} columns={columns} bordered
                    pagination={false} scroll={{ y: 228 }} />
            </div>
        )
    }
}

export default ModuleRoleList
