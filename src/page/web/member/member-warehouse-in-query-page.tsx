import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Table, Menu, Dropdown, Icon, Alert, Button, Tabs} from "antd";
import {ColumnProps} from 'antd/lib/table';
import {ContentHeaderControl} from "../../../components/controls/common/content-header-control";

interface MemberWarehouseInQueryPageStates {
    data?: any;
}

interface MemberWarehouseInQueryPageProps {

}

class MemberWarehouseInQueryTable extends Table<any> {
}

@withRouter
export class MemberWarehouseInQueryPage extends React.Component<MemberWarehouseInQueryPageProps, MemberWarehouseInQueryPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                orderName: '1',
                code: '1',
                mode: '1',
                status: '1',
                date: '1',
                service: '1',
                handle: '1',
                id: '1'
            }, {
                orderName: '1',
                code: '1',
                mode: '1',
                status: '1',
                date: '1',
                service: '1',
                handle: '1',
                id: '2'
            }]
        }
    }

    renderTable() {
        const columns: ColumnProps<any>[] = [
            {
                title: '客户订单',
                dataIndex: 'orderName'
            },
            {
                title: '物流单号',
                dataIndex: 'code'
            },
            {
                title: '物流方式',
                dataIndex: 'mode'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '入库时间',
                dataIndex: 'date'
            },
            {
                title: '客服备注',
                dataIndex: 'service'
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (txt, record) => {
                    const menu = <Menu>
                        <Menu.Item>
                            <span><Icon type="search"></Icon>View</span>
                        </Menu.Item>
                        <Menu.Item>
                            <span><Icon type="edit"></Icon>Edit</span>
                        </Menu.Item>
                        <Menu.Item>
                            <span><Icon type="delete"></Icon>Delete</span>
                        </Menu.Item>
                    </Menu>;
                    return <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            Hover me <Icon type="down"/>
                        </a>
                    </Dropdown>

                }
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return <MemberWarehouseInQueryTable rowKey="id" rowSelection={rowSelection} columns={columns}
                                            dataSource={this.state.data}/>
    }

    render() {
        return <Row className="member-warehouse-in-query-page">
            <ContentHeaderControl title="入库查询"></ContentHeaderControl>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="待打包" key="1">
                    <Row style={{marginBottom: '15px'}}>
                        <Button>合并打包</Button>
                    </Row>
                    <Row>
                        <Alert message="总计有十项 待打包订单" type="info" showIcon/>
                    </Row>
                    <Row>
                        {this.renderTable()}
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="待审核" key="2">Content of Tab Pane 2</Tabs.TabPane>
            </Tabs>
        </Row>
    }
}