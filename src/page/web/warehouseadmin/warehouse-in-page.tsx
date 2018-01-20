import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Card, Button, Icon, Table, Alert} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import FormAdvancedSearch from "../../../components/form/form-advanced-search";
import {WarehouseListModel}from "../../../api/model/member";

interface WarehouseInPageProps {

}

interface WarehouseInPageStates {
    /** 数据源*/
    listData: WarehouseListModel[],
    /** 选中行*/
    selectedRowKeys: any[],
    /** 筛选*/
    filteredInfo: any,
    /** 排序*/
    sortedInfo: any,
    // /** 当前页数*/
    // current:number,
    // /** 每页条数*/
    // pageSize:number,
    // /** 总数*/
    // total:number
}

@withRouter
export class WarehouseInPage extends React.Component<WarehouseInPageProps, WarehouseInPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            selectedRowKeys: [],
            filteredInfo: {},
            sortedInfo: {}
        }
    }

    /** 清空筛选和排序*/
    clearAll = () => {
        this.setState({
            filteredInfo: {},
            sortedInfo: {},
        });
    }

    /** 高级搜索*/
    onClickSearch = () => {
        const topThis = this;
        const data = [
            {
                key: "0",
                WareHouseOrder: "WH2018010500001",
                CustomerOrder: "ML2018010500002",
                MemeberCode: "ML0000011",
                LogisticsType: "顺丰",
                LogisticsOrder: "MLO 2018010500001",
                AcceptanceNumber: "ML2018010500003",
                WarehouseInVolume: "20.00",
                WarehouseInWeight: "20.00",
                WarehouseInTime: "2018年1月17日23:59:24",
                Status: "已入库",
                Remark: "",
                Attachment: []
            },
            {
                key: "1",
                WareHouseOrder: "WH2018010500002",
                CustomerOrder: "ML2018010500002",
                MemeberCode: "ML0000011",
                LogisticsType: "顺丰",
                LogisticsOrder: "MLO 2018010500001",
                AcceptanceNumber: "ML2018010500003",
                WarehouseInVolume: "20.00",
                WarehouseInWeight: "20.00",
                WarehouseInTime: "2018年1月17日23:59:24",
                Status: "已入库",
                Remark: "",
                Attachment: []
            },
            {
                key: "2",
                WareHouseOrder: "WH2018010500003",
                CustomerOrder: "ML2018010500002",
                MemeberCode: "ML0000011",
                LogisticsType: "顺丰",
                LogisticsOrder: "MLO 2018010500001",
                AcceptanceNumber: "ML2018010500003",
                WarehouseInVolume: "20.00",
                WarehouseInWeight: "20.00",
                WarehouseInTime: "2018年1月17日23:59:24",
                Status: "已入库",
                Remark: "",
                Attachment: []
            },
            {
                key: "3",
                WareHouseOrder: "WH2018010500004",
                CustomerOrder: "ML2018010500002",
                MemeberCode: "ML0000011",
                LogisticsType: "顺丰",
                LogisticsOrder: "MLO 2018010500001",
                AcceptanceNumber: "ML2018010500003",
                WarehouseInVolume: "20.00",
                WarehouseInWeight: "20.00",
                WarehouseInTime: "2018年1月17日23:59:24",
                Status: "已入库",
                Remark: "",
                Attachment: []
            },
            {
                key: "4",
                WareHouseOrder: "WH2018010500005",
                CustomerOrder: "ML2018010500002",
                MemeberCode: "ML0000011",
                LogisticsType: "顺丰",
                LogisticsOrder: "MLO 2018010500001",
                AcceptanceNumber: "ML2018010500003",
                WarehouseInVolume: "20.00",
                WarehouseInWeight: "20.00",
                WarehouseInTime: "2018年1月17日23:59:24",
                Status: "已入库",
                Remark: "",
                Attachment: []
            },
            {
                key: "5",
                WareHouseOrder: "WH2018010500006",
                CustomerOrder: "ML2018010500002",
                MemeberCode: "ML0000011",
                LogisticsType: "顺丰",
                LogisticsOrder: "MLO 2018010500001",
                AcceptanceNumber: "ML2018010500003",
                WarehouseInVolume: "20.00",
                WarehouseInWeight: "20.00",
                WarehouseInTime: "2018年1月17日23:59:24",
                Status: "已入库",
                Remark: "",
                Attachment: []
            }
        ];
        topThis.setState({listData: data});
    }

    /** 选中事件*/
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    renderTable() {
        const topThis = this;
        const {state: {listData, selectedRowKeys, sortedInfo, filteredInfo}} = topThis;

        const rowSelection = {
            fixed: true,
            selectedRowKeys,
            onChange: topThis.onSelectChange,
        };

        const columns = [{
            title: "入库单号",
            dataIndex: 'WareHouseOrder',
            key: 'WareHouseOrder'
        }, {
            title: "客户订单号",
            dataIndex: 'CustomerOrder',
            key: 'CustomerOrder'
        }, {
            title: "会员号",
            dataIndex: 'MemeberCode',
            key: 'MemeberCode'
        }, {
            title: "物流方式",
            dataIndex: 'LogisticsType',
            key: 'LogisticsType',
            sorter: (a, b) => a.LogisticsType.length - b.LogisticsType.length,
            sortOrder: sortedInfo.columnKey === 'LogisticsType' && sortedInfo.order,
        }, {
            title: "物流单号",
            dataIndex: 'LogisticsOrder',
            key: 'LogisticsOrder'
        }, {
            title: "验收单号",
            dataIndex: 'AcceptanceNumber',
            key: 'AcceptanceNumber'
        }, {
            title: "入库体积",
            dataIndex: 'WarehouseInVolume',
            key: 'WarehouseInVolume'
        }, {
            title: "入库重量",
            dataIndex: 'WarehouseInWeight',
            key: 'WarehouseInWeight'
        }, {
            title: "入库时间",
            dataIndex: 'WarehouseInTime',
            key: 'WarehouseInTime'
        }, {
            title: "状态",
            dataIndex: 'Status',
            key: 'Status',
            filters: [
                {text: '已入库', value: '已入库'},
                {text: '违禁品', value: '违禁品'},
            ],
            filteredValue: filteredInfo.Status || null,
            onFilter: (value, record) => record.Status.includes(value),
        }, {
            title: "备注",
            dataIndex: 'Remark',
            key: 'Remark'
        }];

        const pagination: PaginationProps = {
            defaultCurrent: 1,//默认页码
            total: 500,//数据总数
            showSizeChanger: true,//是否可以改变 pageSize
            onShowSizeChange: (current, pageSize) => {
                console.log(current, pageSize);
            },
            showQuickJumper: true,//是否可以快速跳转至某页
            onChange: (pageNumber) => {
                console.log('Page: ', pageNumber);
            },
            showTotal: (total, range) => {
               return `${range[0]}-${range[1]} of ${total} items`;
            }
        };

        return <Table columns={columns}
                      pagination={pagination}
                      title={(currentPageData: Object[]) => {
                          console.log(currentPageData);
                          return <Alert message={"总计有 10项 已入库，5项 异常"} type="info" showIcon></Alert>;
                      }}
                      scroll={{x: 1500}}
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
                <Button type="primary" icon="plus">新增入库</Button>
            </Col>
            <Col>
                <Button type="primary" icon="download" disabled={!hasSelected}>导出</Button>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Row className="warehouse-in-page">
            <Card className="warehouse-in-header" bordered={false} title={"入库操作"} extra={topThis.renderButton()}>
                <Row style={{marginBottom: 16}}><FormAdvancedSearch
                    onClickSearch={topThis.onClickSearch.bind(this)}></FormAdvancedSearch></Row>
                <Row style={{marginBottom: 16}}>{topThis.renderTable()}</Row>
            </Card>
        </Row>;
    }
}