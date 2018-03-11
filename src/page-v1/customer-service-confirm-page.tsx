import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Icon, Form} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {ModelNameSpace} from "../model/model";
import {RequestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {PathConfig} from "../config/pathconfig";
import {SelectType, Constants} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ResponseNameSpace} from "../model/response";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import FormTableHeader from '../components-v1/form-table-header';
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {FormComponentProps} from "antd/lib/form";
import {isUndefined} from "util";
import * as moment from 'moment';


interface CustomerServiceConfirmPageProps extends FormComponentProps {}

interface CustomerServiceConfirmPageStates {
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

export class CustomerServiceConfirmPageTable extends CommonTable<ModelNameSpace.WarehouseListModel> {
}

@withRouter
class CustomerServiceConfirmPage extends React.Component<CustomerServiceConfirmPageProps, CustomerServiceConfirmPageStates> {
    constructor(props, context) {
        super(props, context);
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
        this.loadData(1, 10, 0);
    }

    /** 选中事件*/
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    /** 获取数据源*/
    loadData = (index?: number, size?: number, searchaValues?: any) => {
        const topThis = this;
        const {state: {pageIndex, pageSize}} = topThis;
        const request: RequestNameSpace.GetCustomerOrderMergeRequest = {
            currentStep:Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.OrderConfirm),
            channelID: !isUndefined(searchaValues.ChannelID) ? searchaValues.ChannelID.key : 0,
            expressNo: !isUndefined(searchaValues.expressNo) ? searchaValues.expressNo : "",
            customerChooseChannelID: !isUndefined(searchaValues.ChannelID) ? searchaValues.ChannelID : 0,
            pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize,
            isAdmin:true
        }

        topThis.setState({loading: true});
        APINameSpace.MemberAPI.GetCustomerOrdersMerge(request).then((result: ResponseNameSpace.GetCustomerOrderMergeListResponse) => {
            if (result.Status === 0) {
                topThis.setState({
                    listData: result.Data,
                    pageIndex: index ? index : pageIndex,
                    totalCount: result.TotalCount,
                    loading: false
                });
            }
        })
    }

    renderTable() {
        const topThis = this;
        const {state: {listData, selectedRowKeys, pageIndex, pageSize, totalCount, loading}} = topThis;

        const rowSelection = {
            fixed: true,
            selectedRowKeys,
            onChange: topThis.onSelectChange,
        };

        const columns: CommonColumnProps<ModelNameSpace.WarehouseListModel>[] = [{
            title: "客户订单号",
            dataIndex: 'MergeOrderNo',
            fixed: 'left',
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
            dataIndex: 'WareHouseName',
            hidden: Constants.minSM
        }, {
            title: "状态",
            dataIndex: 'currentStatus',
            layout: ColumnLayout.RightTop,
            render:(txt)=>{
                return <span>{Constants.getOrderStatusByString(ModelNameSpace.OrderTypeEnum.OrderConfirm, txt)}</span>
            }
        }, {
            title: "创建时间",
            dataIndex: 'Created',
            render: (txt) => {
                return moment(txt).format('YYYY-MM-DD HH:mm');
            },
            layout: ColumnLayout.LeftBottom
        }, {
            title: '操作',
            fixed: 'right',
            layout: ColumnLayout.Option,
            render: (val, record, index) => {
                const menu: FormTableOperationModel[] = [
                    {
                        key: PathConfig.MemberAddressPageView,
                        type: "search",
                        label: "审核"
                    },
                    {
                        key: PathConfig.MemberAddressPageEdit,
                        type: "edit",
                        label: "查看"
                    },

                    {
                        key: "delete",
                        type: "delete",
                        label: "撤回"
                    }
                ]

                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "delete") {
                        //this.deleteDataByID(record.ID);
                    }
                    else {
                        hashHistory.push({
                            pathname: PathConfig.CustomerServiceConfirmApprovePage,
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
            onChange: (a) => {
                topThis.loadData(a, pageSize);
            },
            showSizeChanger: true,//是否可以改变 pageSize
            onShowSizeChange: (a, b) => {
                topThis.setState({pageIndex: a, pageSize: b});
                topThis.loadData(a, b);
            },
            showQuickJumper: true,//是否可以快速跳转至某页
            showTotal: (total, range) => {
                return `${range[0]}-${range[1]} of ${total} items`;
            }
        };

        return <CustomerServiceConfirmPageTable columns={columns}
                                                loading={loading}
                                                style={{padding: '12px'}}
                                                pagination={pagination}
                                                dataSource={listData}
                                                locale={{
                                                    emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>
                                                }}/>;
    }

    onClickSearch(values: any) {
        this.loadData(1, 10, values);
    }

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "customerOrderMergeNo",
                displayName: "客户合并订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客户合并订单号"/>,
                mobileShow: true,
                layout: {
                    xs: 15,
                    sm: 12,
                    md: 12,
                    lg: 6,
                    xl: 6
                }
            }

        ];
        return items;
    }

    render() {
        return <Row>
            <ContentHeaderControl title="订单确认"></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={this.renderFormAdvancedItems()}
                onClickSearch={this.onClickSearch.bind(this)}></FormAdvancedSearch>
            <FormTableHeader title={`总计有${this.state.totalCount}项待审批`}></FormTableHeader>
            {this.renderTable()}
        </Row>;
    }
}


export default Form.create<any>()(CustomerServiceConfirmPage);