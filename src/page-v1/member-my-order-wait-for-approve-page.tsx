import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Col, Button, Icon, Table, Alert, Form, Input} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {DatePicker} from "antd";

const {RangePicker} = DatePicker;
import {ColumnProps} from 'antd/lib/table';
import {ModelNameSpace} from "../model/model";
import {requestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {SelectType, Constants} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {ResponseNameSpace} from "../model/response";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import {FormTableHeader} from '../components-v1/form-table-header';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {APINameSpace} from "../model/api";
import {FormComponentProps} from "antd/lib/form";
import {isUndefined} from "util";
import * as moment from 'moment';


/// 待审核列表
interface MemberMyOrderWaitForApprovePageProps extends FormComponentProps {

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
    /* 查询条件选择值*/
    selectVaules?: any;
}

class MemberMyOrderWaitForApprovePageTable extends CommonTable<any> {
}

@withRouter
class MemberMyOrderWaitForApprovePage extends React.Component<MemberMyOrderWaitForApprovePageProps, MemberMyOrderWaitForApprovePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false,
            selectVaules: []
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


        const request: requestNameSpace.GetCustomerOrderMergeRequest = {
            type: 0,
            expressNo: !isUndefined(searchaValues.expressNo) ? searchaValues.expressNo : "",
            customerChooseChannelID: !isUndefined(searchaValues.channel) ? searchaValues.channel.key : 0,
            currentStep: !isUndefined(searchaValues.currentStatus) ? searchaValues.currentStatus.key : "",
            orderMergeTimeBegin: !isUndefined(searchaValues.Created) ? searchaValues.Created[0].format() : "",
            orderMergeTimeEnd: !isUndefined(searchaValues.Created) ? searchaValues.Created[1].format() : "",
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

        const columns: CommonColumnProps<ModelNameSpace.CustomerOrderMergeModel>[] = [{
            title: "客户合并单号",
            dataIndex: 'MergeOrderNo',
            width: 200,
            layout: ColumnLayout.LeftTop,
            render: (txt) => {
                return <a>{txt}</a>
            }
        }, {
            title: "渠道",
            dataIndex: 'CustomerChooseChannelName',
            layout: ColumnLayout.RightTop
        }, {
            title: "发往国家",
            dataIndex: 'country',
            width: 100,
            hidden: Constants.minSM
        }, {
            title: "客服备注",
            dataIndex: 'customerServiceMark',
            width: 200,
            hidden: Constants.minSM
        }, {
            title: "状态",
            dataIndex: 'currentStep',
            layout: ColumnLayout.RightBottom,
            width: 100
        }, {
            title: "创建时间",
            dataIndex: 'Modified',
            layout: ColumnLayout.LeftBottom,
            render: (txt) => {
                return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
            }
        }/*, {
         title: '操作',
         layout: ColumnLayout.Option,
         render: (val, record) => {
         return <a>查看</a>
         }
         }*/];

        const pagination: PaginationProps = {
            current: pageIndex,
            pageSize: pageSize,
            total: totalCount,//数据总数
            onChange: (a) => {
                topThis.loadData(a, pageSize, this.state.selectVaules);
            }
        };

        return <MemberMyOrderWaitForApprovePageTable columns={columns}
                                                     rowKey={"ID"}
                                                     loading={loading}
                                                     pagination={pagination}
                                                     rowSelection={rowSelection}
                                                     dataSource={listData}></MemberMyOrderWaitForApprovePageTable>;
    }

    onClickSearch = (values: any) => {
        this.loadData(1, 10, values);
        this.setState({selectVaules: values});
    }


    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "expressNo",
                displayName: "快递单号",
                mobileShow:true,
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} isadmin={false} placeholder="快递单号"/>
            },
            {
                defaultDisplay: true,
                fieldName: "customerOrderMerge",
                displayName: "客户订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrderMerge} isadmin={false}
                                                      placeholder="客户合并订单号"/>
            },

            {
                defaultDisplay: true,
                fieldName: "channel",
                displayName: "渠道",
                layout: {
                    lg: 3,
                    xl: 3
                },
                control: <FormControl.FormSelect type={SelectType.channel} placeholder="渠道"/>
            },
            {
                defaultDisplay: true,
                fieldName: "currentStatus",
                displayName: "状态",
                layout: {
                    lg: 3,
                    xl: 3
                },
                control: <FormControl.FormSelect type={SelectType.CustomerOrderMergeWaitForApproveStep}
                                                 placeholder={"订单状态"}/>
            }, {
                defaultDisplay: true,
                fieldName: "Created",
                displayName: "创建时间",
                layout: {
                    lg: 6,
                    xl: 6
                },
                control: <RangePicker></RangePicker>
            }

        ];
        return items;
    }

    render() {
        const topThis = this;
        const {state: {totalCount}} = topThis;
        // const { getFieldDecorator } = this.props.form;
        return <Row>
            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            <FormTableHeader title={`总计有 ${totalCount} 项客服确认 ${totalCount} 项仓库打包`}></FormTableHeader>
            {this.renderTable()}
        </Row>;
    }
}


export default Form.create<any>()(MemberMyOrderWaitForApprovePage);