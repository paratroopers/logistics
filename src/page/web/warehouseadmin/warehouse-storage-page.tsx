import * as React from 'react';
import {withRouter} from 'react-router';
import { Row, Col,Card,Button,Icon,Table } from 'antd';
import FormAdvancedSearch from "../../../components/form/form-advanced-search";
import {WarehouseListModel}from "../../../api/model/member";

interface WarehouseStoragePageProps {

}

interface WarehouseStoragePageStates {
    listData?: WarehouseListModel[]
}

@withRouter
export class WarehouseStoragePage extends React.Component<WarehouseStoragePageProps, WarehouseStoragePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        }
    }

    /** 高级搜索*/
    onClickSearch = () => {
        const topThis = this;
        const data = [
            {
                key:"0",
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
                key:"1",
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
                key:"2",
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
                key:"3",
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
                key:"4",
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
                key:"5",
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

    renderTable() {
        const topThis = this;
        const {state: {listData}} = topThis;
        const columns = [{
            title: "入库单号",
            dataIndex: 'WareHouseOrder'
        }, {
            title: "客户订单号",
            dataIndex: 'CustomerOrder'
        }, {
            title: "会员号",
            dataIndex: 'MemeberCode'
        }, {
            title: "物流方式",
            dataIndex: 'LogisticsType'
        }, {
            title: "物流单号",
            dataIndex: 'LogisticsOrder'
        }, {
            title: "验收单号",
            dataIndex: 'AcceptanceNumber'
        }, {
            title: "入库体积",
            dataIndex: 'WarehouseInVolume'
        }, {
            title: "入库重量",
            dataIndex: 'WarehouseInWeight'
        }, {
            title: "入库时间",
            dataIndex: 'WarehouseInTime'
        }, {
            title: "状态",
            dataIndex: 'Status'
        }, {
            title: "备注",
            dataIndex: 'Remark'
        }];

        return <Table columns={columns}
                      bordered={false}
                      dataSource={listData}
                      locale={{emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>}}/>;
    }

    renderButton() {
        return <Row type="flex" justify="end">
            <Col style={{marginRight: 16}}>
                <Button type="primary" icon="plus">新增入库</Button>
            </Col>
            <Col>
                <Button type="primary" icon="download">导出</Button>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Row className="warehouse-storage-page">
            <Col span={24}>
                <Card className="warehouse-storage-header" title={"入库操作"} extra={topThis.renderButton()}>
                    <FormAdvancedSearch onClickSearch={topThis.onClickSearch.bind(this)} alertText="总计有 10项 已入库，5项 异常"></FormAdvancedSearch>
                </Card>
            </Col>
            <Col span={24}>{topThis.renderTable()}</Col>
        </Row>;
    }
}