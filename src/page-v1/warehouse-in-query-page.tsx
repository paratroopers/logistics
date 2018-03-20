import * as React from 'react';
import {withRouter, Link} from 'react-router';
import {Row, Icon,message} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {ModelNameSpace} from "../model/model";
import {RequestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import FormTableHeader from '../components-v1/form-table-header';
import {PathConfig} from "../config/pathconfig";
import {FormControl} from "../components-v1/form-control";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ResponseNameSpace} from "../model/response";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import {APINameSpace} from "../model/api";
import * as moment from 'moment';
import {Constants, SelectType} from "../util/common";
import {FormFileViewer} from "../components-v1/form-file-viewer";

interface WarehouseInQueryPageProps {

}

interface WarehouseInQueryPageStates {
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
    /** 筛选字段*/
    formAdvancedData?: any;
    /** 图片预览*/
    visibleFormFileViewer: boolean;
    /** 图片资源*/
    items: ModelNameSpace.Attachment[];
}

class WarehouseInQueryPageTable extends CommonTable<any> {
}

@withRouter
export class WarehouseInQueryPage extends React.Component<WarehouseInQueryPageProps, WarehouseInQueryPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false,
            visibleFormFileViewer: false,
            items: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    /** 高级搜索*/
    onClickSearch = (values: any) => {
        const topThis = this;
        const {state: {pageSize}} = topThis;
        topThis.setState({formAdvancedData: values}, () => {
            /** 查询第一页*/
            topThis.loadData(1, pageSize);
        })
    }

    /** 获取数据源*/
    loadData = (index?: number, size?: number) => {
        const topThis = this;
        const {state: {pageIndex, pageSize, formAdvancedData}} = topThis;
        let request: RequestNameSpace.GetWarehouseInListRequest = {
                pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize,
            ...Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.OrderInQuery, true)
        }
        if (typeof (formAdvancedData) === "object") {
            for (let key of Object.keys(formAdvancedData)) {
                if (Array.isArray(formAdvancedData[key]) && formAdvancedData[key].length > 0 && typeof formAdvancedData[key][0] === "object")
                    formAdvancedData[key] = formAdvancedData[key][0].key;
            }
        }
        request = Object.assign(request, formAdvancedData);
        topThis.setState({loading: true});
        APINameSpace.WarehouseAPI.GetWarehouseInItems(request).then((result: ResponseNameSpace.GetWarehouseInListResponse) => {
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

    onClickPicturePreview(item: ModelNameSpace.WarehouseListModel) {
        const topThis = this;
        const request: RequestNameSpace.GetAttachmentItemsRequest = {
            customerOrderID: item.ID,
            isAdmin: false
        }

        APINameSpace.AttachmentsAPI.GetAttachmentItems(request).then((result: ResponseNameSpace.GetAttachmentItemsResponse) => {
            if (result.Status === 0) {
                if (Array.isArray(result.Data) && result.Data.length > 0) {
                    topThis.setState({items: result.Data,}, () => {
                        topThis.changeFormFileViewerVisible(true);
                    });
                } else {
                    message.warning("提示：暂无附件");
                }
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
        const {state: {listData, pageIndex, pageSize, totalCount, loading}} = topThis;

        const columns: CommonColumnProps<ModelNameSpace.WarehouseListModel>[] = [{
            title: "附件",
            fixed: 'left',
            layout: ColumnLayout.Img,
            render: (val, record) => {
                return <Icon type="picture" onClick={() => {
                    topThis.onClickPicturePreview(record);
                }} style={{fontSize: 20, color: "#e65922", cursor: "pointer"}}/>
            }
        }, {
            title: "客户订单号",
            dataIndex: 'CustomerOrderNo',
            layout: ColumnLayout.LeftTop,
            render: (txt, record) => {
                return <Link to={{pathname: PathConfig.WarehouseInQueryViewPage, state: record}}>{txt}</Link>
            }
        }, {
            title: "会员编号",
            layout: ColumnLayout.LeftBottom,
            dataIndex: 'MemeberCode',
            render: (txt) => {
                return Constants.minSM ? <span>会员编号:{txt}</span> : <span>{txt}</span>
            }
        }, {
            title: "物流单号",
            dataIndex: 'expressNo',
            layout: ColumnLayout.OptionRow,
            render: (txt) => {
                return Constants.minSM ? <span>快递单号:{txt}</span> : <span>{txt}</span>
            },
        }, {
            title: "交接单",
            dataIndex: 'TransferNo',
            hidden: Constants.minSM
        }, {
            title: "创建人",
            dataIndex: 'CreatedByName',
            hidden: Constants.minSM
        }, {
            title: "入库时间",
            dataIndex: 'InWareHouseTime',
            render: (txt) => {
                return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
            },
            hidden: Constants.minSM
        }, {
            title: '操作',
            layout: ColumnLayout.Option,
            render: (val, record) => {
                return <Link to={{pathname: PathConfig.WarehouseInQueryViewPage, state: record}}>查看</Link>
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
            }
        };

        return <WarehouseInQueryPageTable columns={columns}
                                     rowKey={"ID"}
                                     loading={loading}
                                     style={{padding: '12px'}}
                                     pagination={pagination}
                                     bordered={false}
                                     dataSource={listData}
                                     locale={{emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>}}/>;
    }

    renderHeader() {
        const {state: {totalCount}} = this;
        const message = <span>已入库: <span style={{fontWeight: "bold"}}>{totalCount}项 </span></span>;
        return <FormTableHeader title={message}></FormTableHeader>;
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

    render() {
        const {state: {visibleFormFileViewer, items}} = this;
        return <Row className="warehouse-in-page mainland-content-page">
            <ContentHeaderControl title="入库操作"></ContentHeaderControl>
            <FormAdvancedSearch
                easyMode={true}
                formAdvancedItems={this.renderFormAdvancedItems()}
                onClickSearch={this.onClickSearch.bind(this)}></FormAdvancedSearch>
            {this.renderHeader()}
            {this.renderTable()}
            {items.length > 0 ? <FormFileViewer items={items} visible={visibleFormFileViewer}
                                                changeVisible={this.changeFormFileViewerVisible.bind(this)}/> : null}
        </Row>;
    }
}