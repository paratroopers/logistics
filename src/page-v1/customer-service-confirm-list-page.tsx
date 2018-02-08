import * as React from 'react';
import {withRouter,hashHistory} from 'react-router';
import {Row, Col, Button, Icon, Table, Alert,Form,Input} from 'antd';
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
import {FormComponentProps} from "antd/lib/form";
import FormItem from "antd/lib/form/FormItem";


/// 待审核列表
interface CustomerServiceConfirmListPageProps extends FormComponentProps {

}

interface CustomerServiceConfirmListPageStates {
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

@withRouter
class CustomerServiceConfirmListPage extends React.Component<CustomerServiceConfirmListPageProps, CustomerServiceConfirmListPageStates> {
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
        // this.loadData();
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
            type: ModelNameSpace.OrderTypeEnum.WarehouseIn,
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
            title: "渠道",
            dataIndex: 'expressNo'
        },{
            title: "发往国家",
            dataIndex: 'expressNo'
        },{
            title: "入库总体积",
            dataIndex: 'MemeberCode'
        }, {
            title: "入库总重量",
            dataIndex: 'expressTypeName'
        },  {
            title: "申报总额",
            dataIndex: 'CustomerServiceName'
        }, {
            title: "客服备注",
            dataIndex: 'WareHouseName'
        },  {
            title: "状态",
            dataIndex: 'currentStep'
        }, {
            title: "创建时间",
            dataIndex: 'InWareHouseTime'
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

    onSearch = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        //   this.loadData();
    }
    onReset(){

    }

    render() {
        const topThis = this;
        return <Row className="warehouse-in-page">
            <Form className="na-advanced-search-form"
                  layout={"inline"}
                  onSubmit={topThis.onSearch}>
                <FormItem>
                    客户订单号: <Input  placeholder="客户订单号" size ="default" />
                </FormItem>
                <FormItem>
                    快递单号:
                    <Input  placeholder="快递单号" size ="default" />
                </FormItem>
                <FormItem>
                    渠道:
                    <Input  placeholder="渠道" size ="default" />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{marginTop:40}}>搜索</Button>
                </FormItem>
                <FormItem>
                    <Button style={{marginTop: 40}} onClick={topThis.onReset.bind(this)}>重置</Button>
                </FormItem>
            </Form>
            {topThis.renderTable()}
        </Row>;
    }
}


export default Form.create<any>()(CustomerServiceConfirmListPage);