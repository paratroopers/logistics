import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Col, Button, Icon, Table, Alert, Modal, message, Input} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {DatePicker} from "antd";
const {RangePicker} = DatePicker;
import {ColumnProps} from 'antd/lib/table';
import {ModelNameSpace} from "../model/model";
import {requestNameSpace} from "../model/request";
import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import {PathConfig} from "../config/pathconfig";
import {FormWarehouseSelect} from "../components-v1/form-warehouse-select";
import {FormExpressSelect} from "../components-v1/form-express-select";
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
import {isNullOrUndefined} from "util";
import * as moment from 'moment';
import {Global,Context} from "../util/common";

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
    warehouseInStatus?:ModelNameSpace.WarehouseInStatusModel
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
            warehouseInStatus:{
                unconfirmedCount: 0,
                confirmedCount: 0,
                retrunGoodsCount: 0
            }
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
            type: ModelNameSpace.OrderTypeEnum.WarehouseIn,
            pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize,
            isAdmin:false
        }

        if (!isNullOrUndefined(formAdvancedData)) {
            request = {
                customerOrderNo: !isNullOrUndefined(formAdvancedData.customerOrderNo) ? formAdvancedData.customerOrderNo[0].key : "",
                customerOrderStatus: !isNullOrUndefined(formAdvancedData.customerOrderStatus) ? formAdvancedData.customerOrderStatus : "",
                expressNo: !isNullOrUndefined(formAdvancedData.expressNo) ? formAdvancedData.expressNo.key : "",
                expressTypeID: !isNullOrUndefined(formAdvancedData.expressTypeID) ? formAdvancedData.expressTypeID.key : "",
                transferNo: !isNullOrUndefined(formAdvancedData.transferNo) ? formAdvancedData.transferNo : "",
                warehouseID: !isNullOrUndefined(formAdvancedData.warehouseID) ? formAdvancedData.warehouseID.key : "",
                inWarehouseIimeBegin: !isNullOrUndefined(formAdvancedData.inWarehouseIimeBegin) ? formAdvancedData.inWarehouseIimeBegin[0].format("YYYY-MM-DD hh:mm:ss") : "",
                inWarehouseIimeEnd: !isNullOrUndefined(formAdvancedData.inWarehouseIimeEnd) ? formAdvancedData.inWarehouseIimeEnd[1].format("YYYY-MM-DD hh:mm:ss") : "",
                customerServiceID: !isNullOrUndefined(formAdvancedData.customerServiceID) ? formAdvancedData.customerServiceID[0].key : "",
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

        APINameSpace.WarehouseAPI.GetWarehouseInStatus().then((result: ResponseNameSpace.GetWarehouseInStatusResponse) => {
            if (result.Status === 0) {
                topThis.setState({
                    warehouseInStatus:{
                        unconfirmedCount: result.Data.unconfirmedCount,
                        confirmedCount: result.Data.confirmedCount,
                        retrunGoodsCount: result.Data.retrunGoodsCount
                    }
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
            }
        })
    }

    renderTable() {
        const topThis = this;
        const {state: {listData, selectedRowKeys, pageIndex, pageSize, totalCount, loading,warehouseInStatus}} = topThis;

        const rowSelection = {
            fixed: true,
            selectedRowKeys,
            onChange: topThis.onSelectChange,
        };

        const columns: ColumnProps<ModelNameSpace.WarehouseListModel>[] = [{
            title: "客户订单号",
            dataIndex: 'CustomerOrderNo',
            fixed: 'left'
        }, {
            title: "会员编号",
            dataIndex: 'MemeberCode'
        }, {
            title: "快递方式",
            dataIndex: 'expressTypeName'
        }, {
            title: "快递单号",
            dataIndex: 'expressNo'
        }, {
            title: "客服",
            dataIndex: 'CustomerServiceName'
        }, {
            title: "仓库",
            dataIndex: 'WareHouseName'
        }, {
            title: "初始体积(cm³)",
            dataIndex: 'InVolume',
            render: (val, record, index) => {
                return record.InLength + "*" + record.InWeight + "*" + record.InHeight;
            }
        }, {
            title: "初始重量(kg)",
            dataIndex: 'InWeight'
        }, {
            title: "状态",
            dataIndex: 'currentStatus',
            render: (txt) => {
                return <span>{Global.intl.formatMessage({id: Context.getCustomerOrderStatusID(ModelNameSpace.OrderTypeEnum.WarehouseIn.toString(), txt)})}</span>
            }
        }, {
            title: "入库时间",
            dataIndex: 'InWareHouseTime',
            render: (txt) => {
                return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
            }
        }, {
            title: '操作',
            fixed: 'right',
            render: (val, record, index) => {
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
                            title: 'Are you sure delete this task?',
                            content: 'Some descriptions',
                            okText: 'Yes',
                            okType: 'danger',
                            cancelText: 'No',
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

        return <Table columns={columns}
                      rowKey={"ID"}
                      loading={loading}
                      style={{padding: '12px'}}
                      pagination={pagination}
                      title={() => {
                          const message=<div>总计有 <span style={{fontWeight:"bold"}}>{warehouseInStatus.confirmedCount}项</span>（已入库）<span style={{fontWeight:"bold"}}>{warehouseInStatus.unconfirmedCount}项</span>（待确认）<span style={{fontWeight:"bold"}}>{warehouseInStatus.retrunGoodsCount}项</span>（仓库退货）</div>;
                          return <Alert message={message} type="info" showIcon></Alert>;
                      }}
                      scroll={{x: 1700}}
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
                <Button type="primary" icon="download" disabled={!hasSelected}>导出</Button>
            </Col>
        </Row>
    }

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: false,
                fieldName: "customerOrderNo",
                displayName: "会员",
                control: <FormControl.FormSelectIndex type={SelectType.Member} placeholder="搜索会员"/>
            },
            {
                defaultDisplay: false,
                fieldName: "expressNo",
                displayName: "快递单号",
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="搜索快递单号"/>
            },
            {
                defaultDisplay: false,
                fieldName: "CustomerOrderID",
                displayName: "客服订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客服订单号"/>,
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
                fieldName: "warehouseAdminID",
                displayName: "仓库管理员",
                control: <FormControl.FormSelectIndex type={SelectType.WarehouseAdmin} placeholder="搜索仓库管理员"/>
            }, {
                defaultDisplay: true,
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

    render() {
        const topThis = this;
        return <Row className="warehouse-in-page">
            <ContentHeaderControl title="入库操作" extra={topThis.renderButton()}></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            {topThis.renderTable()}
        </Row>;
    }
}