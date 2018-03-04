import * as React from 'react';
import {withRouter,Link} from 'react-router';
import {Row,Tooltip,Icon} from 'antd';
import {PathConfig} from '../config/pathconfig';
import {PaginationProps} from 'antd/lib/pagination';
import {DatePicker} from "antd";
const {RangePicker} = DatePicker;
import {ModelNameSpace} from "../model/model";
import {requestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {SelectType, Constants} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {ResponseNameSpace} from "../model/response";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import FormTableHeader from '../components-v1/form-table-header';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {APINameSpace} from "../model/api";
import {isArray, isNullOrUndefined, isUndefined} from "util";
import * as moment from 'moment';
import {FormFileViewer} from "../components-v1/form-file-viewer";

/// 待审核列表
interface MemberMyOrderWaitForApprovePageProps {}

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
    /** 图片预览*/
    visibleFormFileViewer: boolean;
    /** 图片资源*/
    items: ModelNameSpace.Attachment[];
}

class MemberMyOrderWaitForApprovePageTable extends CommonTable<any> {}

@withRouter
export default class MemberMyOrderWaitForApprovePage extends React.Component<MemberMyOrderWaitForApprovePageProps, MemberMyOrderWaitForApprovePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false,
            selectVaules: [],
            visibleFormFileViewer: false,
            items: []
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
            currentStep:"1",
            currentStatus:"0",
            expressNo: !isUndefined(searchaValues.expressNo) ? searchaValues.expressNo : "",
            customerOrderMergeNo: isArray(searchaValues.customerOrderMergeNo) && !isNullOrUndefined(searchaValues.customerOrderMergeNo[0]) ? searchaValues.customerOrderMergeNo[0].key : "",
            customerChooseChannelID: !isUndefined(searchaValues.channel) ? searchaValues.channel.key : 0,
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

    onClickPicturePreview(item: ModelNameSpace.CustomerOrderMergeModel) {
        const topThis = this;
        const request: requestNameSpace.GetAttachmentItemsRequest = {
            customerOrderID: item.ID,
            isAdmin: false
        }

        APINameSpace.AttachmentsAPI.GetAttachmentItems(request).then((result: ResponseNameSpace.GetAttachmentItemsResponse) => {
            if (result.Status === 0) {
                topThis.setState({items: result.Data,}, () => {
                    topThis.changeFormFileViewerVisible(true);
                });
            }
        });
    }

    changeFormFileViewerVisible(bool: boolean) {
        this.setState({
            visibleFormFileViewer: bool
        });
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
            title: "附件",
            fixed: 'left',
            layout: ColumnLayout.Img,
            render: (val, record) => {
                return <Tooltip title="预览附件"><Icon type="picture" onClick={() => {
                    topThis.onClickPicturePreview(record);
                }} style={{fontSize: 20, color: "#e65922", cursor: "pointer"}}/></Tooltip>
            }
        },{
            title: "客户合并单号",
            dataIndex: 'MergeOrderNo',
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
            hidden: Constants.minSM
        }, {
            title: "客服备注",
            dataIndex: 'customerServiceMark',
            hidden: Constants.minSM
        }, {
            title: "状态",
            layout: ColumnLayout.RightBottom,
            render: (txt) => {
                return <span>待审核</span>
            }
        }, {
            title: "创建时间",
            dataIndex: 'Modified',
            layout: ColumnLayout.LeftBottom,
            render: (txt) => {
                return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
            }
        }, {
            title: '操作',
            layout: ColumnLayout.Option,
            render: (val, record, index) => {
                return <Link to={{
                    pathname: PathConfig.MemberMyOrderApprovalViewPage,
                    query: {ids: record.ID},
                }}>查看</Link>;
            }
         }];

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
                fieldName: "customerOrderMergeNo",
                displayName: "客户订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrderMerge} isadmin={false} placeholder="客户合并订单号"/>,
                layout: {
                    xs: 15,
                    sm: 12,
                    md: 12,
                    lg: 6,
                    xl: 6
                }
            },
            {
                defaultDisplay: true,
                fieldName: "expressNo",
                displayName: "快递单号",
                mobileShow:true,
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} isadmin={false} placeholder="快递单号"/>
            },
            {
                defaultDisplay: true,
                fieldName: "channel",
                displayName: "渠道",
                control: <FormControl.FormSelect type={SelectType.channel} placeholder="渠道"/>
            },
            {
                defaultDisplay: true,
                fieldName: "currentStatus",
                displayName: "状态",
                control: <FormControl.FormSelect type={SelectType.CustomerOrderMergeWaitForApproveStep}
                                                 placeholder={"订单状态"}/>
            }, {
                defaultDisplay: true,
                fieldName: "Created",
                displayName: "创建时间",
                layout: {
                    xs: 15,
                    sm: 12,
                    md: 12,
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
        const {state: {totalCount,visibleFormFileViewer, items}} = topThis;
        const message = <span>
                              客服确认: <span style={{fontWeight: "bold"}}>{totalCount}项 </span>
                              仓库打包: <span style={{fontWeight: "bold"}}>{totalCount}项 </span>
                          </span>;
        return <Row>
            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            <FormTableHeader title={message}></FormTableHeader>
            {this.renderTable()}
            {items.length > 0 ? <FormFileViewer items={items} visible={visibleFormFileViewer}
                                                changeVisible={topThis.changeFormFileViewerVisible.bind(this)}/> : null}
        </Row>;
    }
}