import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Table, Menu, Dropdown, Icon, Alert, Button, Tabs, Badge} from "antd";
import {ColumnProps} from 'antd/lib/table';
import {MemberAPI} from '../../../api/member';
import {PathConfig} from '../../../config/pathconfig';
import {CustomerOrderModel} from '../../../api/model/member';
import {CustomerOrdersRequest} from '../../../api/model/request/member-request';
import {ContentHeaderControl} from "../../../components/controls/common/content-header-control";
import * as moment from 'moment';

interface MemberMyOrderPageStates {
    pageIndex: number;
    pageSize: number;
    data?: CustomerOrderModel[];
    totalCount?: number;
    loading?: boolean;
    selected?: { selectedRowKeys?: string[], selectedRows?: CustomerOrderModel[] };
}

interface MemberMyOrderPageProps {

}

class MemberMyOrderPageTable extends Table<any> {
}

@withRouter
export class MemberMyOrderPage extends React.Component<MemberMyOrderPageProps, MemberMyOrderPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 3,
            data: [],
            totalCount: 0,
            loading: false,
            selected: {}
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData(pageIndex?: number) {
        const request: CustomerOrdersRequest = {
            type: 0,
            pageSize: this.state.pageSize,
            pageIndex: pageIndex ? pageIndex : this.state.pageIndex,
        };
        this.setState({loading: true});
        MemberAPI.GetCustomerOrders(request).then(r => {
            r.Status === 0 && this.setState({
                data: r.Data,
                pageIndex: pageIndex,
                totalCount: r.TotalCount,
                loading: false
            });
        });
    }

    onPackageClick() {
        hashHistory.push({
            pathname: PathConfig.MemberMergePackage,
            query: {ids: this.state.selected.selectedRowKeys},
        })
    }

    renderTable() {
        const {state: {pageSize, pageIndex, totalCount, data, loading, selected}} = this;
        const columns: ColumnProps<CustomerOrderModel>[] = [
            {
                title: '客户订单',
                dataIndex: 'CustomerOrderNo'
            },
            {
                title: '物流单号',
                dataIndex: 'expressNo'
            },
            {
                title: '物流方式',
                dataIndex: 'expressTypeName'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: () => {
                    return <span>待打包</span>
                }
            },
            {
                title: '入库时间',
                dataIndex: 'InWareHouseTime',
                render: (txt) => {
                    return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
                }
            },
            {
                title: '',
                dataIndex: 'handle',
                render: (txt, record) => {
                    const menu = <Menu>
                        <Menu.Item>
                            <span><Icon type="search"></Icon>查看</span>
                        </Menu.Item>
                    </Menu>;
                    return <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            操作 <Icon type="down"/>
                        </a>
                    </Dropdown>
                }
            }
        ];
        const rowSelection = {
            selectedRowKeys: selected.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selected: {selectedRowKeys, selectedRows}})
            }
        };
        return <MemberMyOrderPageTable columns={columns}
                                       loading={loading}
                                       pagination={{
                                           pageSize: pageSize,
                                           current: pageIndex,
                                           onChange: (current) => {
                                               this.getData(current);
                                           },
                                           total: totalCount
                                       }}
                                       rowKey="ID"
                                       rowSelection={rowSelection}
                                       dataSource={data}/>
    }

    render() {
        const {state: {totalCount, selected}} = this;
        const selects = selected.selectedRowKeys ? selected.selectedRowKeys.length : 0;
        return <Row className="member-warehouse-in-query-page">
            <ContentHeaderControl title="我的订单"></ContentHeaderControl>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="待打包" key="1">
                    <Row style={{marginBottom: '15px'}}>
                        <Badge count={selects} style={{backgroundColor: '#52c41a'}}>
                            <Button disabled={!selects}
                                    type="primary"
                                    onClick={this.onPackageClick.bind(this)}>合并打包</Button>
                        </Badge>
                    </Row>
                    <Row>
                        <Alert message={`总计有${totalCount}项 待打包订单`} type="info" showIcon/>
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