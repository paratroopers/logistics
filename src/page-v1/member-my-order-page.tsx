import * as React from 'react';
import {withRouter, hashHistory, Link} from 'react-router';
import {Row, Tabs, message, DatePicker} from "antd";

const {RangePicker} = DatePicker;
import {PathConfig} from '../config/pathconfig';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response'
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import FormTableHeader, {FormTableHeaderButton, SearchFormModel} from '../components-v1/form-table-header';
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import MemberMyOrderWaitForApprovePage from './member-my-order-wait-for-approve-page';
import * as moment from 'moment';
import {FormControl} from "../components-v1/form-control";
import {SelectType, Constants} from "../util/common";
import {isArray, isNullOrUndefined} from "util";

interface MemberMyOrderPageStates {
    pageIndex: number;
    pageSize: number;
    data?: ModelNameSpace.CustomerOrderModel[];
    totalCount?: number;
    loading?: boolean;
    selected?: { selectedRowKeys?: string[], selectedRows?: ModelNameSpace.CustomerOrderModel[] };
    /** 筛选字段*/
    formAdvancedData?: any;
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
        const topThis = this;
        const {state: {formAdvancedData}} = topThis;

        let request: requestNameSpace.CustomerOrdersRequest = {
            type: ModelNameSpace.OrderTypeEnum.CustomerConfirm,
            pageSize: this.state.pageSize,
            pageIndex: pageIndex ? pageIndex : this.state.pageIndex,
        };

        if (!isNullOrUndefined(formAdvancedData)) {
            request = {
                expressNo: isArray(formAdvancedData.expressNo) && !isNullOrUndefined(formAdvancedData.expressNo[0]) ? formAdvancedData.expressNo[0].key : "",
                inWarehouseIimeBegin: isArray(formAdvancedData.warehouseInTime) && !isNullOrUndefined(formAdvancedData.warehouseInTime[0]) ? formAdvancedData.warehouseInTime[0].format("YYYY-MM-DD hh:mm:ss") : "",
                inWarehouseIimeEnd: isArray(formAdvancedData.warehouseInTime) && !isNullOrUndefined(formAdvancedData.warehouseInTime[1]) ? formAdvancedData.warehouseInTime[1].format("YYYY-MM-DD hh:mm:ss") : "",
                ...request
            }
        }

        this.setState({loading: true});
        APINameSpace.MemberAPI.GetCustomerOrders(request).then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                this.setState({
                    data: result.Data,
                    pageIndex: pageIndex,
                    totalCount: result.TotalCount,
                    loading: false
                });
            }
        });
    }

    /** 合并打包*/
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

    /** 搜索*/
    onClickSearch(values: any) {
        const topThis = this;
        topThis.setState({formAdvancedData: values}, () => {
            /** 查询第一页*/
            topThis.getData(1);
        })
    }

    renderTable() {
        const {state: {pageSize, pageIndex, totalCount, data, loading, selected}} = this;
        const columns: CommonColumnProps<ModelNameSpace.CustomerOrderModel>[] = [
            {
                title: '客户订单',
                dataIndex: 'CustomerOrderNo',
                layout: ColumnLayout.OptionRow,
                render: (txt, record) => {
                    return <span>
                        {
                            Constants.minSM ? <div>
                                    <div>客户订单号:{txt}</div>
                                    <div>物流单号:{record.expressNo}</div>
                                </div>
                                : <span>{txt}</span>
                        }
                    </span>
                }
            },
            {
                title: '物流单号',
                dataIndex: 'expressNo',
                hidden: Constants.minSM,
                render: (txt) => {
                    return <span>
                        {
                            Constants.minSM ? <span>物流单号:<a>{txt}</a></span>
                                : <span>{txt}</span>
                        }
                    </span>
                }
            },
            {
                title: '物流方式',
                hidden: Constants.minSM,
                dataIndex: 'expressTypeName'
            },
            {
                title: '状态',
                dataIndex: 'status',
                hidden: Constants.minSM,
                render: () => {
                    return <span>待打包</span>
                }
            },
            {
                title: '入库时间',
                dataIndex: 'InWareHouseTime',
                hidden: Constants.minSM,
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

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "expressNo",
                displayName: "物流单号",
                mobileShow: true,
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="搜索物流单号"/>
            }
        ];
        return items;
    }

    renderHeader() {
        const topThis = this;
        const {state: {totalCount}} = topThis;
        const {state: {selected}} = this;
        const selects = selected.selectedRowKeys ? selected.selectedRowKeys.length : 0;
        /** 批量操作*/
        const buttons: FormTableHeaderButton[] = [{
            displayName: "合并打包",
            icon: "appstore",
            onClick: topThis.onPackageClick.bind(this),
            count: selects,
            isShowCount: true
        }]
        return <FormTableHeader title={`总计有${totalCount}项 待打包订单`}
                                buttonGroup={buttons}></FormTableHeader>
    }

    render() {
        const topThis = this;
        return <Row className="mainland-content-page">
            <ContentHeaderControl title="我的订单"></ContentHeaderControl>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="待打包" key="1">
                    <FormAdvancedSearch
                        easyMode={true}
                        formAdvancedItems={this.renderFormAdvancedItems()}
                        onClickSearch={this.onClickSearch.bind(this)}></FormAdvancedSearch>
                    {topThis.renderHeader()}
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