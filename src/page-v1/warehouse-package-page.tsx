/**
 * 仓库合并打包
 * */
import * as React from 'react';
import {withRouter,Link,hashHistory} from 'react-router';
import {Row,Tooltip,Icon,DatePicker,message,Modal} from 'antd';
import {FormStatusSelect} from "../components-v1/form-status-select";
import {PaginationProps} from 'antd/lib/pagination';
import {ModelNameSpace} from "../model/model";
import {requestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {PathConfig} from "../config/pathconfig";
import {SelectType,Constants} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ResponseNameSpace} from "../model/response";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation,FormTableOperationModel} from "../components-v1/form-table-operation";
import {FormComponentProps} from "antd/lib/form";
import {isArray, isNullOrUndefined} from "util";
import {FormFileViewer} from "../components-v1/form-file-viewer";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import FormTableHeader from '../components-v1/form-table-header';
import * as moment from 'moment';
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;

interface WarehousePackgePageProps extends FormComponentProps {

}

interface WarehousePackgePageStates {
    /** 数据源*/
    listData: ModelNameSpace.CustomerOrderMergeModel[],
    /** 选中行*/
    selectedRowKeys: any[],
    /** 当前页数*/
    pageIndex:number,
    /** 每页条数*/
    pageSize:number,
    /** 总数*/
    totalCount:number
    /** 列表是否正在查询*/
    loading?: boolean;
    /* 查询条件选择值*/
    searchaValues?: any;
    /** 图片预览*/
    visibleFormFileViewer: boolean;
    /** 图片资源*/
    fileItems: ModelNameSpace.Attachment[];
}

class WarehousePackgePageTable extends CommonTable<any> {}

@withRouter
export default class WarehousePackgePage extends React.Component<WarehousePackgePageProps, WarehousePackgePageStates> {
    constructor(props,context) {
        super(props,context);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            searchaValues: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false,
            visibleFormFileViewer: false,
            fileItems: []
        }
    }

    componentDidMount() {
        this.loadData(1,10);
    }


    /** 选中事件*/
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    /** 获取数据源*/
    loadData = (index?:number,size?:number) => {
        const topThis = this;
        const {state: {pageIndex, pageSize,searchaValues}} = topThis;
        let request: requestNameSpace.GetCustomerOrderMergeRequest = {
            currentStep:Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.OrderMerge),
            pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize,
            isAdmin:true
        }

        if (!isNullOrUndefined(searchaValues)) {
            /** 高级搜索参数*/
            request={
                ...request,
                customerOrderMergeNo: isArray(searchaValues.customerOrderMergeNo) && !isNullOrUndefined(searchaValues.customerOrderMergeNo[0]) ? searchaValues.customerOrderMergeNo[0].key : "",
                memberID: isArray(searchaValues.memberID) && !isNullOrUndefined(searchaValues.memberID[0]) ? searchaValues.memberID[0].key : "",
                orderMergeTimeBegin: !isNullOrUndefined(searchaValues.Created) ? searchaValues.Created[0].format() : "",
                orderMergeTimeEnd: !isNullOrUndefined(searchaValues.Created) ? searchaValues.Created[1].format() : "",
            }
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

    /** 附件预览*/
    onClickPicturePreview(item: ModelNameSpace.CustomerOrderMergeModel) {
        const topThis = this;
        const request: requestNameSpace.GetAttachmentItemsRequest = {
            customerOrderID: item.ID,
            isAdmin: false
        }

        APINameSpace.AttachmentsAPI.GetAttachmentItems(request).then((result: ResponseNameSpace.GetAttachmentItemsResponse) => {
            if (result.Status === 0) {
                topThis.setState({fileItems: result.Data,}, () => {
                    topThis.changeFormFileViewerVisible(true);
                });
            }
        });
    }

    /** 附件状态更新*/
    changeFormFileViewerVisible(bool: boolean) {
        this.setState({
            visibleFormFileViewer: bool
        });
    }

    /** 撤回*/
    onClickRecall(ID: string) {
        // const topThis = this;
        // const {state: {pageIndex, pageSize}} = topThis;
        // const request: requestNameSpace.WarehouseInDeleteRequest = {
        //     ID: ID
        // }

        // topThis.setState({loading: true});
        // APINameSpace.WarehouseAPI.WarehouseInDelete(request).then((result: ResponseNameSpace.BaseResponse) => {
        //     if (result.Status === 0) {
        //         message.success("删除成功!");
        //         topThis.loadData(pageIndex, pageSize);
        //         /** 更新状态统计*/
        //         // topThis.loadStatusData();
        //     }
        // })
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
        }, {
            title: "客户订单号",
            dataIndex: 'MergeOrderNo',
            layout: ColumnLayout.LeftTop,
            fixed: 'left',
            render: (txt,record) => {
                return <Link to={{pathname: PathConfig.WarehousePackageViewPage, query: {ids: record.ID}}}>{txt}</Link>
            }
        }, {
            title: "入库总重量",
            dataIndex: 'InWeightTotal',
            render:(txt) => {
                return <span>{`${txt}kg`}</span>
            }
        }, {
            title: "入库总体积",
            dataIndex: 'InVolumeTotal',
            render:(txt) => {
                return <span>{`${txt}cm³`}</span>
            }
        }, {
            title: "入库总数",
            dataIndex: 'InPackageCountTotal',
            render:(txt) => {
                return <span>{`${txt}件`}</span>
            }
        }, {
            title: "状态",
            dataIndex: 'currentStatus',
            render:(txt)=> {
                return <span>{Constants.getOrderStatusByString(ModelNameSpace.OrderTypeEnum.OrderMerge, txt)}</span>
            }
        }, {
            title: "客户提交时间",
            dataIndex: 'Created',
            layout: ColumnLayout.LeftBottom,
            render: (txt) => {
                return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
            }
        }, {
            title: '操作',
            layout: ColumnLayout.Option,
            fixed: 'right',
            render: (val, record) => {
                const menu: FormTableOperationModel[] = [
                    {
                        key: PathConfig.WarehousePackageApprovePage,
                        type: "search",
                        label: "审核"
                    },
                    {
                        key: PathConfig.WarehousePackageViewPage,
                        type: "edit",
                        label: "查看"
                    },
                    {
                        key: "recall",
                        type: "retweet",
                        label: "撤回"
                    }
                ]

                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "recall") {
                        confirm({
                            title: '你确定要撤回此订单?',
                            okText: '确认',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                                topThis.onClickRecall(record.ID);
                            },
                            onCancel() {

                            }
                        });
                    } else {
                        hashHistory.push({pathname: param.key, query: {ids: record.ID}});
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
            }
        };

        return <WarehousePackgePageTable columns={columns}
                                         rowKey={"ID"}
                                         loading={loading}
                                         style={{padding: '12px'}}
                                         pagination={pagination}
                                         rowSelection={rowSelection}
                                         dataSource={listData}></WarehousePackgePageTable>;
    }

    onClickSearch = (values:any) =>{
        const topThis=this;
        topThis.setState({searchaValues:values},()=>{
            topThis.loadData(1,10);
        });
    }

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "customerOrderMergeNo",
                displayName: "客户订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客户订单号"/>,
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
                fieldName: "memberID",
                displayName: "会员",
                control: <FormControl.FormSelectIndex type={SelectType.Member} placeholder="搜索会员"/>
            },{
                defaultDisplay: true,
                fieldName: "Created",
                displayName: "客户提交时间",
                control: <RangePicker></RangePicker>,
                layout: {
                    xs: 15,
                    sm: 12,
                    md: 12,
                    lg: 6,
                    xl: 6
                },
            }

        ];
        return items;
    }

    render() {
        const topThis = this;
        const {state: {visibleFormFileViewer, fileItems}} = topThis;
        return <Row>
            <ContentHeaderControl title="仓库合并打包"></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            <FormTableHeader title={`总计待打包：10项 已打包：8项`}></FormTableHeader>
            {this.renderTable()}
            {fileItems.length > 0 ? <FormFileViewer items={fileItems} visible={visibleFormFileViewer}
                                                    changeVisible={topThis.changeFormFileViewerVisible.bind(this)}/> : null}
        </Row>;
    }
}