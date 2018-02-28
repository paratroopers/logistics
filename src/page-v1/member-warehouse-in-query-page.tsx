import * as React from 'react';
import {withRouter,hashHistory} from 'react-router';
import {Row, Col, Button, Icon, Table, Alert} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {DatePicker} from "antd";
const { RangePicker } = DatePicker;
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
import {FormTableOperation,FormTableOperationModel} from "../components-v1/form-table-operation";


interface MemberWarehouseInQueryPageStates {
    /** 数据源*/
    listData: ModelNameSpace.WarehouseListModel[],
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
}

interface MemberWarehouseInQueryPageProps {
}


@withRouter
export class MemberWarehouseInQueryPage extends React.Component<MemberWarehouseInQueryPageProps, MemberWarehouseInQueryPageStates> {
    constructor(props) {
        super(props);
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

    /** 高级搜索*/
    onClickSearch = () => {
        const topThis = this;
        const {state: {pageSize}} = topThis;
        /** 查询第一页*/
        topThis.loadData(1, pageSize);
    }

    /** 选中事件*/
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    /** 获取数据源*/
    loadData = (index?:number,size?:number) => {
        const topThis = this;
        const {state: {pageIndex, pageSize}} = topThis;
        const request: requestNameSpace.GetWarehouseInListRequest = {
            step: ModelNameSpace.OrderTypeEnum.WarehouseIn,
            pageIndex: index ? index : pageIndex,
            pageSize: size ? size : pageSize
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

    renderTable() {
        const topThis = this;
        const {state: {listData, selectedRowKeys, pageIndex, pageSize, totalCount, loading}} = topThis;

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
            title: "初始体积(c㎡)",
            dataIndex: 'InVolume',
            render: (val, record, index) => {
                return record.InLength + "*" + record.InWeight + "*" + record.InHeight;
            }
        }, {
            title: "初始重量",
            dataIndex: 'InWeight'
        }, {
            title: "状态",
            dataIndex: 'currentStep'
        }, {
            title: "入库时间",
            dataIndex: 'InWareHouseTime'
        },{
            title: '操作',
            fixed: 'right',
            render: (val, record, index) => {
                const menu:FormTableOperationModel[]=[
                    {
                        key: PathConfig.WarehouseInViewPage,
                        type: "search",
                        label: "查看"
                    },
                    {
                        key: PathConfig.WarehouseInEditPage,
                        type: "edit",
                        label: "编辑"
                    }
                ]

                return <FormTableOperation onClick={(param:ClickParam)=>{
                    hashHistory.push({pathname:param.key,state:record});
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

        return <Table columns={columns}
                      rowKey={"ID"}
                      loading={loading}
                      style={{padding: '12px'}}
                      pagination={pagination}
                      title={(currentPageData: Object[]) => {
                          // 总计已入库的数量
                          return <Alert message={"总计有 " + totalCount + "项 已入库"} type="info" showIcon></Alert>;
                      }}
                      scroll={{x: 1800}}
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
                <Button type="primary" icon="plus" onClick={()=>{
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
                defaultDisplay: true,
                fieldName: "A",
                displayName: "状态",
                control: <FormStatusSelect placeholder="搜索订单状态"></FormStatusSelect>
            },
            {
                defaultDisplay: true,
                fieldName: "B",
                displayName: "物流方式",
                control: <FormExpressSelect placeholder="搜索物流方式"></FormExpressSelect>
            }, {
                defaultDisplay: true,
                fieldName: "C",
                displayName: "仓库",
                control: <FormWarehouseSelect placeholder="搜索仓库"></FormWarehouseSelect>
            }, {
                defaultDisplay: false,
                fieldName: "D",
                displayName: "入库时间",
                control: <RangePicker></RangePicker>
            }, {
                defaultDisplay: false,
                fieldName: "H",
                displayName: "会员",
                control: <FormControl.FormSelectIndex type={SelectType.Member} placeholder="搜索会员"/>
            }, {
                defaultDisplay: false,
                fieldName: "I",
                displayName: "客服",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerService} placeholder="搜索客服"/>
            },
            {
                defaultDisplay: false,
                fieldName: "I",
                displayName: "仓库管理员",
                control: <FormControl.FormSelectIndex type={SelectType.WarehouseAdmin} placeholder="搜索仓库管理员"/>
            },
            {
                defaultDisplay: false,
                fieldName: "J",
                displayName: "客服订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客服订单号"/>
            },
            {
                defaultDisplay: false,
                fieldName: "K",
                displayName: "快递单号",
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="搜索物流单号"/>
            }
        ];
        return items;
    }

    render() {
        const topThis = this;
        return <Row className="warehouse-in-page">
            <ContentHeaderControl title="入库查询" extra={topThis.renderButton()}></ContentHeaderControl>
            <FormAdvancedSearch
                formAdvancedItems={topThis.renderFormAdvancedItems()}
                onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch>
            {topThis.renderTable()}
        </Row>;
    }
}