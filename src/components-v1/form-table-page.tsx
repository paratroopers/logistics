import * as React from 'react';
import {hashHistory} from 'react-router';
import {Icon, Row} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {ModelNameSpace} from "../model/model";
import {RequestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {SelectType, Constants} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import * as moment from 'moment';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import FormTableHeader from '../components-v1/form-table-header';

export interface dropDownModel {
    items?: FormTableOperationModel[];
    viewPath?: string;
    editPath?: string;
    delPath?: string;
}

/// 待审核列表
interface FormTablePageProps {
    dropDownConfig?: dropDownModel;
    searchItems?: FormAdvancedItemModel[];
    callBackTitle?: string;
    headerTip?: string;
}

interface FormTablePageStates {
    /** 数据源*/
    listData: ModelNameSpace.WarehouseListModel[],
    /** 选中行*/
    selectedRowKeys: any[],
    /** 当前页数*/
    pageIndex: number,
    /** 每页条数*/
    pageSize: number,
    /** 总数*/
    totalCount: number
    /** 列表是否正在查询*/
    loading?: boolean;
}

export class FormTablePageTable extends CommonTable<ModelNameSpace.WarehouseListModel> {

}

export class FormTablePage extends React.Component<FormTablePageProps, FormTablePageStates> {
    constructor(props, states) {
        super(props, states);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    onClickSearch(values: any) {
        this.loadData(values);
    }

    /** 获取数据源*/
    public async loadData<T>(values?: T) {
        const {state: {pageIndex, pageSize}} = this;
        let request: RequestNameSpace.GetCustomerOrderMergeRequest = {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
        request = Object.assign(request, values);
        this.setState({loading: true});
        const response = await APINameSpace.MemberAPI.GetCustomerOrdersMerge(request);
        if (response.Status === 0) {
            this.setState({
                listData: response.Data,
                pageIndex: this.state.pageIndex,
                totalCount: response.TotalCount,
                loading: false
            });
        }
    }

    renderTable() {
        const {state: {listData, selectedRowKeys, pageIndex, pageSize, totalCount, loading}, props: {dropDownConfig}} = this;
        const rowSelection = {
            fixed: true,
            selectedRowKeys,
            onChange: this.onClickSearch,
        };
        const columns: CommonColumnProps<ModelNameSpace.WarehouseListModel>[] = [{
            title: "客户订单号",
            dataIndex: 'MergeOrderNo',
            layout: ColumnLayout.LeftTop
        }, {
            title: "渠道",
            dataIndex: 'expressNo',
            hidden: Constants.minSM
        }, {
            title: "发往国家",
            dataIndex: 'country',
            hidden: Constants.minSM
        }, {
            title: "入库总体积",
            dataIndex: 'MemeberCode',
            hidden: Constants.minSM
        }, {
            title: "入库总重量",
            dataIndex: 'expressTypeName',
            hidden: Constants.minSM
        }, {
            title: "申报总额",
            dataIndex: 'CustomerServiceName',
            render: (txt, record) => {
                return <span>{new String().concat((Constants.minSM ? '申报总额：' : ''), txt)}</span>;
            },
            layout: ColumnLayout.RightBottom
        }, {
            title: "客服备注",
            dataIndex: 'WareHouseName'
        }, {
            title: "状态",
            dataIndex: 'currentStatus',
            layout: ColumnLayout.RightTop,
            render: (txt) => {
                return <span>{Constants.getOrderStatusByString(ModelNameSpace.OrderTypeEnum.WaitPay, txt)}</span>
            }
        }, {
            title: "创建时间",
            dataIndex: 'InWareHouseTime',
            render: (txt) => {
                return moment(txt).format('YYYY-MM-DD HH:mm');
            },
            layout: ColumnLayout.LeftBottom
        }, {
            title: '操作',
            layout: ColumnLayout.Option,
            render: (val, record) => {
                const menu: FormTableOperationModel[] = dropDownConfig.items;
                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "delete") {
                    }
                    else {
                        hashHistory.push({
                            pathname: dropDownConfig.editPath,
                            query: {id: record.ID}
                        });
                    }

                }} value={menu}></FormTableOperation>;
            }
        }];

        const pagination: PaginationProps = {
            current: pageIndex,
            pageSize: pageSize,
            total: totalCount,//数据总数
            onChange: (pageindex) => {
                this.setState({pageIndex: pageindex}, () => {
                    this.loadData();
                });
            },
            showSizeChanger: true,//是否可以改变 pageSize
            onShowSizeChange: (a, b) => {
                this.setState({pageIndex: a, pageSize: b}, () => {
                    this.loadData();
                });
            },
            showQuickJumper: true,//是否可以快速跳转至某页
            showTotal: (total, range) => {
                return `${range[0]}-${range[1]} of ${total} items`;
            }
        };

        return <FormTablePageTable columns={columns}
                                   rowKey={'ID'}
                                   loading={loading}
                                   style={{padding: '12px'}}
                                   pagination={pagination}
                                   rowSelection={rowSelection}
                                   dataSource={listData}
                                   locale={{
                                       emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>
                                   }}/>;
    }

    renderFormAdvancedItems() {
        let items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "customerOrderMerge",
                displayName: "客户合并订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客户合并订单号"/>,
                mobileShow: true
            }
        ];
        this.props.searchItems && items.concat(this.props.searchItems);
        return items;
    }

    render() {
        return <Row>
            <ContentHeaderControl title="订单确认"></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={this.renderFormAdvancedItems()}
                onClickSearch={this.onClickSearch.bind(this)}></FormAdvancedSearch>
            <FormTableHeader
                title={this.props.headerTip.replace('{name}', this.state.totalCount.toString())}></FormTableHeader>
            {this.renderTable()}
        </Row>;
    }
}