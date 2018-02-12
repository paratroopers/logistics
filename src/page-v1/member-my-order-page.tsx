import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Col, Icon, Button, Tabs, Badge} from "antd";
import {PathConfig} from '../config/pathconfig';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';

import {requestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import * as moment from 'moment';
import  MemberMyOrderWaitForApprovePage from './member-my-order-wait-for-approve-page';
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";

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
            selected: {}
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
        hashHistory.push({
            pathname: PathConfig.MemberMergePackage,
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
                    const menu: FormTableOperationModel[] = [
                        {
                            key: PathConfig.MemberMyOrderPackageViewPage,
                            type: "search",
                            label: "待打包查看"
                        },{
                            key: PathConfig.MemberMyOrderApprovalViewPage,
                            type: "search",
                            label: "待审核查看"
                        },
                        {
                            key: PathConfig.WarehouseInViewPage,
                            type: "search",
                            label: "入库查看"
                        },
                        {
                            key: PathConfig.WarehouseInEditPage,
                            type: "edit",
                            label: "入库编辑"
                        },{
                            key: PathConfig.CustomerServiceConfirmViewPage,
                            type: "search",
                            label: "客服查看"
                        },{
                            key: PathConfig.CustomerServiceConfirmApprovePage,
                            type: "edit",
                            label: "客服审批"
                        },
                        {
                            key: PathConfig.WarehousePackageViewPage,
                            type: "search",
                            label: "仓库合并查看"
                        },
                        {
                            key: PathConfig.WarehousePackageApprovePage,
                            type: "edit",
                            label: "仓库合并打包审批"
                        },
                        {
                            key: PathConfig.WarehouseOutViewPage,
                            type: "search",
                            label: "仓库出库查看"
                        },
                        {
                            key: PathConfig.WarehouseOutApprovePage,
                            type: "search",
                            label: "仓库出库审批"
                        },
                        {
                            key: "delete",
                            type: "delete",
                            label: "删除"
                        }
                    ]

                    return <FormTableOperation onClick={(param: ClickParam) => {
                        hashHistory.push({pathname: param.key, state: record});
                    }} value={menu}></FormTableOperation>;
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
        return <Row className="member-page-warehouse-in-page">
            <ContentHeaderControl title="我的订单"></ContentHeaderControl>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="待打包" key="1">
                    <Row>
                        <Col span={24} className="order-title">
                            <Badge count={selects} style={{backgroundColor: '#52c41a'}}>
                                <a onClick={this.onPackageClick.bind(this)}><Icon type="appstore"></Icon>合并打包</a>
{/*                                <Button disabled={!selects}
                                        size="large"
                                        type="primary"
                                        icon=""
                                       ></Button>*/}
                            </Badge>
                            <span className="order-count">
                                <Icon type="info-circle"></Icon>
                                {`总计有${totalCount}项 待打包订单`}
                            </span>
                        </Col>
                    </Row>
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