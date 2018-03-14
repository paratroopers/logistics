import * as React from 'react';
import {hashHistory, Link} from 'react-router';
import {Icon, Row, Tooltip} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {RequestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {SelectType, Constants, Context} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import * as moment from 'moment';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import FormTableHeader from '../components-v1/form-table-header';
import {FormFileViewer} from "../components-v1/form-file-viewer";

export interface DropDownModel {
    items?: FormTableOperationModel[];
    viewPath?: string;
    editPath?: string;
    delPath?: string;
}

/// 待审核列表
interface FormTablePageProps {
    dropDownConfig?: DropDownModel;
    searchConfig?: FormAdvancedItemModel[];
    callBackTitle?: string;
    headerTip?: string;
    currentStep?: ModelNameSpace.OrderTypeEnum
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
    /*图片*/
    imgItems?: ModelNameSpace.Attachment[];
    /** 图片预览*/
    visibleFormFileViewer: boolean;
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
            loading: false,
            visibleFormFileViewer: false,
            imgItems: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async onClickSearch(values: any) {
        console.log(values);
        this.loadData(values);
    }

    /** 获取数据源*/
    async loadData<T>(values?: T) {
        const {state: {pageIndex, pageSize}, props: {currentStep}} = this;
        let request: RequestNameSpace.CustomerOrdersRequest = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            ...Constants.getOrderStep(currentStep, true)
        }
        request = Object.assign(request, values);
        console.log(request);
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

    async onClickPicturePreview(item: ModelNameSpace.CustomerOrderModel) {
        const request: RequestNameSpace.GetAttachmentItemsRequest = {
            customerOrderID: item.ID,
            isAdmin: false
        }

        const resp = await APINameSpace.AttachmentsAPI.GetAttachmentItems(request);
        if (resp.Status === 0) {
            //不介意这么做 会渲染两次
            this.setState({imgItems: resp.Data}, () => {
                this.setState({visibleFormFileViewer: true});
            });
        }
    }

    renderTable() {
        const {state: {listData, selectedRowKeys, pageIndex, pageSize, totalCount, loading}, props: {dropDownConfig, currentStep}} = this;
        const rowSelection = {
            fixed: true,
            selectedRowKeys,
            onChange: this.onClickSearch,
        };
        const columns: CommonColumnProps<ModelNameSpace.WarehouseListModel>[] = [{
            title: "附件",
            fixed: 'left',
            layout: ColumnLayout.Img,
            render: (val, record) => {
                return <Tooltip title="预览附件"><Icon type="picture" onClick={() => {
                    this.onClickPicturePreview(record);
                }} style={{fontSize: 20, color: "#e65922", cursor: "pointer"}}/></Tooltip>
            }
        }, {
            title: "客户合并单号",
            dataIndex: 'MergeOrderNo',
            layout: ColumnLayout.LeftTop,
            render: (txt, record) => {
                return <Link
                    to={{pathname: PathConfig.MemberMyOrderApprovalViewPage, query: {ids: record.ID}}}>{txt}</Link>
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
            title: "状态",
            layout: ColumnLayout.RightBottom,
            dataIndex: 'currentStep',
            render: (txt, record) => {
                return <span>{Constants.getOrderStatusByString(currentStep, record.currentStatus)}</span>
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
            render: (val, record) => {
                const menu: FormTableOperationModel[] = dropDownConfig.items;
                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "delete") {
                    }
                    else {
                        hashHistory.push({
                            pathname: (param.key === "view" ? dropDownConfig.viewPath : dropDownConfig.editPath),
                            query: {id: record.ID}
                        });
                    }

                }} value={menu}></FormTableOperation>;
            }
        }];

        const pagination: PaginationProps = {
            current: pageIndex,
            pageSize: pageSize,
            total: totalCount//数据总数
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
        if (this.props.searchConfig)
            return items.concat(this.props.searchConfig);
        return items;
    }

    render() {
        const {state: {visibleFormFileViewer, imgItems}} = this;
        return <Row>
            <ContentHeaderControl title="订单确认"></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={this.renderFormAdvancedItems()}
                onClickSearch={v => this.onClickSearch(v)}></FormAdvancedSearch>
            <FormTableHeader
                title={this.props.headerTip.replace('{name}', this.state.totalCount.toString())}></FormTableHeader>
            {this.renderTable()}
            {imgItems.length > 0 ? <FormFileViewer items={imgItems}
                                                   visible={visibleFormFileViewer}
                                                   changeVisible={visible => this.setState({visibleFormFileViewer: visible})}/> : null}
        </Row>;
    }
}