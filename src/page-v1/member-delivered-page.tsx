import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Icon, Table, Alert} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {DatePicker} from "antd";
import {ModelNameSpace} from "../model/model";
import {RequestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {PathConfig} from "../config/pathconfig";
import {SelectType, Constants} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ResponseNameSpace} from "../model/response";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import {FormComponentProps} from "antd/lib/form";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import FormTableHeader from '../components-v1/form-table-header';
import {isUndefined} from "util";
import * as moment from 'moment';

/// 待审核列表
interface MemberDeliveredPageProps extends FormComponentProps {

}

interface MemberMyOrderWaitForApprovePageStates {
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

export class MemberDeliveredPageTable extends CommonTable<ModelNameSpace.WarehouseListModel> {

}

@withRouter
export class MemberDeliveredPage extends React.Component<MemberDeliveredPageProps, MemberMyOrderWaitForApprovePageStates> {
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
            channelID: !isUndefined(searchaValues.ChannelID) ? searchaValues.ChannelID.key : 0,
            expressNo: !isUndefined(searchaValues.expressNo) ? searchaValues.expressNo : "",
            customerChooseChannelID: !isUndefined(searchaValues.ChannelID) ? searchaValues.ChannelID : 0,
            pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize
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
                    }

                ]

                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "delete") {
                        //this.deleteDataByID(record.ID);
                    }
                    else {
                        hashHistory.push({
                            pathname: PathConfig.MemberDeliveredApprovalPage,
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

        return <MemberDeliveredPageTable columns={columns}
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

    onClickSearch = (values: any) => {
        this.loadData(1, 10, values);
    }

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "customerOrderMerge",
                displayName: "客户合并订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客户合并订单号"/>,
                mobileShow: true
            }/*,
            {
                defaultDisplay: true,
                fieldName: "MemberNo",
                displayName: "会员号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索会员号"/>
            },
            {
                defaultDisplay: true,
                fieldName: "channel",
                displayName: "渠道",
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="搜索渠道"/>
            },
            {
                defaultDisplay: false,
                fieldName: "CustomerSericeStatus",
                displayName: "状态",
                control:  <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder={"快递状态"}  />
            },{
                defaultDisplay: false,
                fieldName: "Created",
                displayName: "创建时间",
                control: <RangePicker></RangePicker>
            }*/

        ];
        return items;
    }

    render() {
        const topThis = this;
        // const { getFieldDecorator } = this.props.form;
        return <Row>
            <ContentHeaderControl title="订单确认"></ContentHeaderControl>

            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            <FormTableHeader title={`总计有${this.state.totalCount}项待审批`}></FormTableHeader>
            {this.renderTable()}
        </Row>;
    }
}