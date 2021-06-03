import { Checkbox, Col, Row, Table } from "antd";
import React from "react";
import InfoIcon from '../../../../../../../../../assets/icons/IconInfo.svg';
import './Permission.scss';

const ArrowDown = () => (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M0.52662 0.942758C0.834594 0.627905 1.26336 0.603197 1.63985 0.942758L4.40031 3.58795L7.16078 0.942758C7.53727 0.603197 7.96674 0.627905 8.27259 0.942758C8.58056 1.25691 8.56079 1.78778 8.27259 2.08287C7.98581 2.37795 4.95622 5.26104 4.95622 5.26104C4.88408 5.33577 4.79761 5.39521 4.70197 5.4358C4.60634 5.47639 4.50351 5.49731 4.39961 5.49731C4.2957 5.49731 4.19287 5.47639 4.09724 5.4358C4.0016 5.39521 3.91514 5.33577 3.84299 5.26104C3.84299 5.26104 0.814816 2.37795 0.52662 2.08287C0.237718 1.78778 0.218646 1.25691 0.52662 0.942758Z" fill="#323C47" />
    </svg >
);

const moduleRoleList: any[] = [
    {
        name: 'Alternatives',
        dateAdded: '08/21/2020',
        dateUpdated: '08/21/2020',
        read: true,
        write: true,
        import: false,
        export: false,
        other: false
    },
    {
        name: 'Marketing Materials',
        dateAdded: '08/21/2020',
        dateUpdated: '08/21/2020',
        read: true,
        write: true,
        import: false,
        export: false,
        other: false
    },
    {
        name: 'Formulary Build',
        dateAdded: '08/21/2020',
        dateUpdated: '08/21/2020',
        read: true,
        write: true,
        import: false,
        export: false,
        other: false
    },
    {
        name: 'Formulary Maintenence',
        dateAdded: '08/21/2020',
        dateUpdated: '08/21/2020',
        read: true,
        write: true,
        import: false,
        export: false,
        other: false
    },
    {
        name: 'Criteria',
        dateAdded: '08/21/2020',
        dateUpdated: '08/21/2020',
        read: true,
        write: true,
        import: false,
        export: false,
        other: false
    },
    {
        name: 'Components',
        dateAdded: '08/21/2020',
        dateUpdated: '08/21/2020',
        read: true,
        write: true,
        import: true,
        export: true,
        other: false
    }
]

const columns = [
    {
        title: '',
        dataIndex: 'name',
        key: 'name',
        render: name => <p className="name"><span>{name}</span></p>
    },
    {
        title: 'DATE ADDED',
        dataIndex: 'dateAdded',
        key: 'dateAdded'
    },
    {
        title: 'DATE UPDATED',
        dataIndex: 'dateUpdated',
        key: 'dateUpdated'
    },
    {
        title: 'READ',
        dataIndex: 'read',
        key: 'read',
        render: checkVal => <Checkbox defaultChecked={true} disabled={!checkVal}/>
    },
    {
        title: 'WRITE',
        dataIndex: 'write',
        key: 'write',
        render: checkVal => <Checkbox defaultChecked={true} disabled={!checkVal}/>
    },
    {
        title: 'Import',
        dataIndex: 'import',
        key: 'import',
        render: checkVal => <Checkbox defaultChecked={true} disabled={!checkVal}/>
    },
    {
        title: 'Export',
        dataIndex: 'export',
        key: 'export',
        render: checkVal => <Checkbox defaultChecked={true} disabled={!checkVal}/>
    },
    {
        title: 'Other',
        dataIndex: 'other',
        key: 'other',
        render: checkVal => <Checkbox defaultChecked={true} disabled={!checkVal}/>
    },
];

export default class Permission extends React.Component<any, any> {
    state = {
        checked: true
    }

    render() {
        return (
            <div className="permission-container">
                <div className="title-row">
                    <span className="title">Formulary</span>
                    <img src={InfoIcon}></img>
                    <span className="arrow_down"><ArrowDown/></span>
                </div>

                <Table className="table" dataSource={moduleRoleList} columns={columns}
                    pagination={false}/>

                {/* <Row className='header-row'>
                    <Col span={6}></Col>
                    <Col span={4}>DATE ADDED</Col>
                    <Col span={4}>DATE UPDATED</Col>
                    <Col span={2}>Read</Col>
                    <Col span={2}>Write</Col>
                    <Col span={2}>IMPORT</Col>
                    <Col span={2}>EXPORT</Col>
                    <Col span={2}>OTHER</Col>
                </Row>

                <Row className='data-row'>
                    <Col span={6} className="type">Alternatives</Col>
                    <Col span={4} className="date">08/21/2020</Col>
                    <Col span={4}>08/21/2020</Col>
                    <Col span={2}>
                        <Checkbox checked={true} />
                    </Col>
                    <Col span={2}><Checkbox checked={false} /></Col>
                    <Col span={2}><Checkbox checked={true} disabled /></Col>
                    <Col span={2}>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row> */}
            </div>
        );
    }
}