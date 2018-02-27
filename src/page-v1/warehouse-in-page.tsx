import * as React from 'react';
import {withRouter, hashHistory, Link} from 'react-router';
import {Row, Col, Button, Icon, Table, Modal, message, Input, Tooltip} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {DatePicker} from "antd";
import FormTableHeader from '../components-v1/form-table-header';

const {RangePicker} = DatePicker;
import {ColumnProps} from 'antd/lib/table';
import {ModelNameSpace} from "../model/model";
import {requestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {Constants} from '../util/common';
import {PathConfig} from "../config/pathconfig";
import {FormWarehouseSelect} from "../components-v1/form-warehouse-select";
import {SelectType} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ResponseNameSpace} from "../model/response";
import {FormStatusSelect} from "../components-v1/form-status-select";
import {FormAdvancedSearch} from "../components-v1/all-components-export";
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";

const confirm = Modal.confirm;
import {isArray, isNullOrUndefined} from "util";
import * as moment from 'moment';
import {Global, Context} from "../util/common";
import {FormFileViewer} from "../components-v1/form-file-viewer";
import {FormExport} from '../components-v1/form-export';

interface WarehouseInPageProps {

}

interface WarehouseInPageStates {
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
    /** 入库状态数量统计*/
    warehouseInStatus?: ModelNameSpace.WarehouseInStatusModel
    /** 图片预览*/
    visibleFormFileViewer: boolean;
    /** 图片资源*/
    items: ModelNameSpace.Attachment[];
}

class WarehouseInPageTable extends CommonTable<any> {
}

@withRouter
export class WarehouseInPage extends React.Component<WarehouseInPageProps, WarehouseInPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false,
            warehouseInStatus: {
                unconfirmedCount: 0,
                confirmedCount: 0,
                retrunGoodsCount: 0
            },
            visibleFormFileViewer: false,
            items: []
        }
    }

    componentDidMount() {
        this.loadData();
        this.loadStatusData();
    }

    /** 获取统计数量*/
    loadStatusData() {
        const topThis = this;
        /** 初始化統計*/
        APINameSpace.WarehouseAPI.GetWarehouseInStatus().then((result: ResponseNameSpace.GetWarehouseInStatusResponse) => {
            if (result.Status === 0) {
                topThis.setState({
                    warehouseInStatus: {
                        unconfirmedCount: result.Data.unconfirmedCount,
                        confirmedCount: result.Data.confirmedCount,
                        retrunGoodsCount: result.Data.retrunGoodsCount
                    }
                });
            }
        })
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

    /** 选中事件*/
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    /** 获取数据源*/
    loadData = (index?: number, size?: number) => {
        const topThis = this;
        const {state: {pageIndex, pageSize, formAdvancedData}} = topThis;
        let request: requestNameSpace.GetWarehouseInListRequest = {
            step: ModelNameSpace.OrderTypeEnum.WarehouseIn,
            pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize,
            isAdmin: false
        }

        if (!isNullOrUndefined(formAdvancedData)) {
            request = {
                memberID: isArray(formAdvancedData.memberID) && !isNullOrUndefined(formAdvancedData.memberID[0]) ? formAdvancedData.memberID[0].key : "",
                customerOrderNo: isArray(formAdvancedData.customerOrderNo) && !isNullOrUndefined(formAdvancedData.customerOrderNo[0]) ? formAdvancedData.customerOrderNo[0].key : "",
                customerOrderStatus: !isNullOrUndefined(formAdvancedData.customerOrderStatus) ? formAdvancedData.customerOrderStatus : "",
                expressNo: isArray(formAdvancedData.expressNo) && !isNullOrUndefined(formAdvancedData.expressNo[0]) ? formAdvancedData.expressNo[0].key : "",
                transferNo: !isNullOrUndefined(formAdvancedData.transferNo) ? formAdvancedData.transferNo : "",
                warehouseID: !isNullOrUndefined(formAdvancedData.wareHouseID) ? formAdvancedData.wareHouseID.key : "",
                inWarehouseIimeBegin: isArray(formAdvancedData.warehouseInTime) && !isNullOrUndefined(formAdvancedData.warehouseInTime[0]) ? formAdvancedData.warehouseInTime[0].format("YYYY-MM-DD hh:mm:ss") : "",
                inWarehouseIimeEnd: isArray(formAdvancedData.warehouseInTime) && !isNullOrUndefined(formAdvancedData.warehouseInTime[1]) ? formAdvancedData.warehouseInTime[1].format("YYYY-MM-DD hh:mm:ss") : "",
                customerServiceID: isArray(formAdvancedData.customerServiceID) && !isNullOrUndefined(formAdvancedData.customerServiceID[0]) ? formAdvancedData.customerServiceID[0].key : "",
                warehouseAdmin: isArray(formAdvancedData.warehouseAdmin) && !isNullOrUndefined(formAdvancedData.warehouseAdmin[0]) ? formAdvancedData.warehouseAdmin[0].key : "",
                ...request
            }
        }

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

    onClickDelete(ID: number) {
        const topThis = this;
        const {state: {pageIndex, pageSize}} = topThis;
        const request: requestNameSpace.WarehouseInDeleteRequest = {
            ID: ID
        }

        topThis.setState({loading: true});
        APINameSpace.WarehouseAPI.WarehouseInDelete(request).then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                message.success("删除成功!");
                topThis.loadData(pageIndex, pageSize);
                topThis.loadStatusData();
            }
        })
    }

    onClickPicturePreview(item: ModelNameSpace.WarehouseListModel) {
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

    renderTable() {
        const topThis = this;
        const {state: {listData, selectedRowKeys, pageIndex, pageSize, totalCount, loading, warehouseInStatus}} = topThis;

        const rowSelection = {
            fixed: true,
            selectedRowKeys,
            onChange: topThis.onSelectChange,
        };

        const columns: CommonColumnProps<ModelNameSpace.WarehouseListModel>[] = [{
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
            dataIndex: 'CustomerOrderNo',
            layout: ColumnLayout.LeftTop,
            render: (txt, record) => {
                return <Link to={{pathname: PathConfig.WarehouseInViewPage, state: record}}>{txt}</Link>
            }
        }, {
            title: "会员编号",
            layout: ColumnLayout.LeftBottom,
            dataIndex: 'MemeberCode',
            render: (txt) => {
                return Constants.minSM ? <span>会员编号:{txt}</span> : <span>{txt}</span>
            }
        }, {
            title: "物流方式",
            dataIndex: 'expressTypeName',
            hidden: Constants.minSM
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
            title: "客服",
            dataIndex: 'CustomerServiceName',
            hidden: Constants.minSM
        }, {
            title: "仓库",
            dataIndex: 'WareHouseName',
            hidden: Constants.minSM,
        }, {
            title: "初始体积(cm³)",
            dataIndex: 'InVolume',
            render: (val, record, index) => {
                return record.InLength + "*" + record.InWeight + "*" + record.InHeight;
            },
            hidden: Constants.minSM
        }, {
            title: "初始重量(kg)",
            dataIndex: 'InWeight',
            hidden: Constants.minSM
        }, {
            title: "状态",
            dataIndex: 'currentStatus',
            layout: ColumnLayout.RightBottom,
            render: (txt) => {
                return <span>{Global.intl.formatMessage({id: Context.getCustomerOrderStatusID(ModelNameSpace.OrderTypeEnum.WarehouseIn.toString(), txt)})}</span>
            }
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
                const menu: FormTableOperationModel[] = [
                    {
                        key: PathConfig.WarehouseInViewPage,
                        type: "search",
                        label: "查看"
                    },
                    {
                        key: PathConfig.WarehouseInEditPage,
                        type: "edit",
                        label: "编辑"
                    },
                    {
                        key: "delete",
                        type: "delete",
                        label: "删除"
                    }
                ]

                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "delete") {
                        confirm({
                            title: '你确定要删除此订单?',
                            content: '订单删除后将不可恢复，请注意！',
                            okText: '确认',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                                topThis.onClickDelete(record.ID);
                            },
                            onCancel() {

                            }
                        });
                    } else {
                        hashHistory.push({pathname: param.key, state: record});
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
            showQuickJumper: false//是否可以快速跳转至某页
        };

        return <WarehouseInPageTable columns={columns}
                                     rowKey={"ID"}
                                     loading={loading}
                                     style={{padding: '12px'}}
                                     pagination={pagination}
                                     title={() => {
                                         const message = <span>
                              已入库: <span style={{fontWeight: "bold"}}>{warehouseInStatus.confirmedCount}项 </span>
                              待确认: <span style={{fontWeight: "bold"}}>{warehouseInStatus.unconfirmedCount}项 </span>
                              仓库退货: <span style={{fontWeight: "bold"}}>{warehouseInStatus.retrunGoodsCount}项 </span>
                          </span>;
                                         return <FormTableHeader title={message}></FormTableHeader>;
                                     }}
                                     rowSelection={rowSelection}
                                     bordered={false}
                                     dataSource={listData}
                                     locale={{emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>}}/>;
    }

    renderButton() {
        const topThis = this;
        const {state: {selectedRowKeys}} = topThis;
        const hasSelected = selectedRowKeys.length > 0;
        return <Row type="flex" justify="end">
            <Col style={{marginRight: 16}}>
                <Button type="primary" icon="plus" onClick={() => {
                    hashHistory.push({pathname: PathConfig.WarehouseInAddPage});
                }}>新增入库</Button>
            </Col>
            <Col>
                <FormExport disabled={!hasSelected}></FormExport>
            </Col>
        </Row>
    }

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "memberID",
                displayName: "会员",
                control: <FormControl.FormSelectIndex type={SelectType.Member} placeholder="搜索会员"/>
            },
            {
                defaultDisplay: true,
                fieldName: "expressNo",
                displayName: "快递单号",
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="搜索快递单号"/>
            },
            {
                defaultDisplay: true,
                fieldName: "customerOrderNo",
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
                fieldName: "customerOrderStatus",
                displayName: "状态",
                control: <FormStatusSelect dataType={ModelNameSpace.OrderTypeEnum.WarehouseIn}
                                           placeholder="搜索订单状态"></FormStatusSelect>
            },
            {
                defaultDisplay: false,
                fieldName: "transferNo",
                displayName: "交接单号",
                control: <Input placeholder="搜索交接单号"/>
            }, {
                defaultDisplay: false,
                fieldName: "customerServiceID",
                displayName: "客服",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerService} placeholder="搜索客服"/>
            },
            {
                defaultDisplay: false,
                fieldName: "warehouseAdmin",
                displayName: "仓库管理员",
                control: <FormControl.FormSelectIndex type={SelectType.WarehouseAdmin} placeholder="搜索仓库管理员"/>
            }, {
                defaultDisplay: false,
                fieldName: "wareHouseID",
                displayName: "仓库",
                control: <FormWarehouseSelect placeholder="搜索仓库"></FormWarehouseSelect>
            }, {
                defaultDisplay: false,
                fieldName: "warehouseInTime",
                displayName: "入库时间",
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

    changeFormFileViewerVisible(bool: boolean) {
        this.setState({
            visibleFormFileViewer: bool
        });
    }

    render() {
        const topThis = this;
        const {state: {visibleFormFileViewer, items}} = topThis;
        return <Row className="warehouse-in-page">
            <ContentHeaderControl title="入库操作" extra={topThis.renderButton()}></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            {topThis.renderTable()}
            {items.length > 0 ? <FormFileViewer items={items} visible={visibleFormFileViewer}
                                                changeVisible={topThis.changeFormFileViewerVisible.bind(this)}/> : null}
        </Row>;
    }
}