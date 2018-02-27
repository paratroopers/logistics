import * as React from 'react';
import {withRouter, hashHistory, Link} from 'react-router';
import {Row, Icon, Tabs, message} from "antd";
import {PathConfig} from '../config/pathconfig';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {requestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormTableHeader} from '../components-v1/form-table-header';
import MemberMyOrderWaitForApprovePage from './member-my-order-wait-for-approve-page';
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import * as moment from 'moment';

interface MemberMyOrderPageStates {
    pageIndex: number;
    pageSize: number;
    data?: ModelNameSpace.CustomerOrderModel[];
    totalCount?: number;
    loading?: boolean;
    selected?: { selectedRowKeys?: string[], selectedRows?: ModelNameSpace.CustomerOrderModel[] };
}

interface MemberMyOrderPageProps {

}

class MemberMyOrderPageTable extends CommonTable<any> {
}

@withRouter
export class MemberMyOrderPage extends React.Component<MemberMyOrderPageProps, MemberMyOrderPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            data: [],
            totalCount: 0,
            loading: false,
            selected: {
                selectedRowKeys: []
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData(pageIndex?: number) {
        const request: requestNameSpace.CustomerOrdersRequest = {
            type: 0,
            pageSize: this.state.pageSize,
            pageIndex: pageIndex ? pageIndex : this.state.pageIndex,
        };
        this.setState({loading: true});
        APINameSpace.MemberAPI.GetCustomerOrders(request).then(r => {
            r.Status === 0 && this.setState({
                data: r.Data,
                pageIndex: pageIndex,
                totalCount: r.TotalCount,
                loading: false
            });
        });
    }

    onPackageClick() {
        if (this.state.selected.selectedRowKeys.length === 0) {
            message.warning('请选择至少一个订单!');
            return;
        }
        hashHistory.push({
            pathname: PathConfig.MemberMergePackagePage,
            query: {ids: this.state.selected.selectedRowKeys},
        })
    }

    renderTable() {
        const {state: {pageSize, pageIndex, totalCount, data, loading, selected}} = this;
        const columns: CommonColumnProps<ModelNameSpace.CustomerOrderModel>[] = [
            {
                title: '客户订单',
                dataIndex: 'CustomerOrderNo',
                layout: ColumnLayout.LeftTop,
                render: (txt) => {
                    return <a>{txt}</a>
                }
            },
            {
                title: '物流单号',
                dataIndex: 'expressNo',
                layout: ColumnLayout.RightTop
            },
            {
                title: '物流方式',
                dataIndex: 'expressTypeName'
            },
            {
                title: '状态',
                dataIndex: 'status',
                layout: ColumnLayout.RightBottom,
                render: () => {
                    return <span>待打包</span>
                }
            },
            {
                title: '入库时间',
                dataIndex: 'InWareHouseTime',
                layout: ColumnLayout.LeftBottom,
                render: (txt) => {
                    return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
                }
            },
            {
                title: '操作',
                layout: ColumnLayout.Option,
                render: (val, record, index) => {
                    return <Link to={{pathname: PathConfig.MemberMyOrderPackageViewPage, state: record}}>查看</Link>;
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

    renderHeader() {
        const {state: {selected}} = this;
        const selects = selected.selectedRowKeys ? selected.selectedRowKeys.length : 0;
        return <a onClick={this.onPackageClick.bind(this)}>
            <Icon type="appstore"></Icon>
            <span>合并打包 ({selects})</span>
        </a>
    }

    render() {
        const {state: {totalCount}} = this;
        return <Row className="member-page-warehouse-in-page mainland-content-page">
            <ContentHeaderControl title="我的订单"></ContentHeaderControl>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="待打包" key="1">
                    <FormTableHeader title={`总计有${totalCount}项 待打包订单`}
                                     buttonGroup={this.renderHeader()}></FormTableHeader>
                    <Row>
                        {this.renderTable()}
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="待审核" key="2">
                    <MemberMyOrderWaitForApprovePage></MemberMyOrderWaitForApprovePage>
                </Tabs.TabPane>
            </Tabs>
        </Row>
    }
}