import * as React from 'react';
import {Row,Modal} from "antd";
import {Constants} from '../util/common';
import {ModelNameSpace} from '../model/model';
import {FormSettingGroup} from './form-setting-group';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import WarehouseInForm from "../components-v1/warehouse-in-form";
import * as moment from 'moment';
import {isNullOrUndefined} from "util";

export interface FormOrderRelationProps {
    data?: ModelNameSpace.CustomerOrderModel[];
    loading?: boolean;
}

export interface FormOrderRelationStates {
    data?: ModelNameSpace.CustomerOrderModel[];
    detailVisible?:boolean;
    detailData?:ModelNameSpace.CustomerOrderModel;
}

class FormOrderRelationTable extends CommonTable<any> {
}

export class FormOrderRelation extends React.Component<FormOrderRelationProps, FormOrderRelationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : [],
            detailVisible:false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    renderTable() {
        const topThis=this;
        const colums: CommonColumnProps<ModelNameSpace.CustomerOrderModel>[] = [
            {
                title: '客户订单号',
                dataIndex: 'CustomerOrderNo',
                layout: ColumnLayout.LeftTop,
                render: (txt,record) => {
                    return <a onClick={()=>{
                        topThis.setState({detailData:record,detailVisible:true});
                    }}>{txt}</a>
                }
            },
            {
                title: '物流订单号',
                dataIndex: 'expressNo',
                layout: ColumnLayout.RightTop,
                render: (txt) => {
                    return <span>{Constants.minSM ? new String().concat("物流订单号：", txt) : txt}</span>;
                }
            }, {
                title: '物流方式',
                dataIndex: 'expressTypeName',
                layout: ColumnLayout.RightBottom,
                render: (txt) => {
                    return <span>{Constants.minSM ? new String().concat("物流方式：", txt) : txt}</span>;
                }
            }, {
                title: '入库时间',
                dataIndex: 'InWareHouseTime',
                layout: ColumnLayout.LeftBottom,
                render: (txt) => {
                    return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
                }
            }, {
                title: '初始重量(kg)',
                dataIndex: 'InWeight',
                hidden: Constants.minSM
            }, {
                title: '初始体积(cm³)',
                dataIndex: 'InVolume',
                hidden: Constants.minSM
            }
        ]
        return <FormOrderRelationTable columns={colums}
                                       rowKey={"ID"}
                                       pagination={false}
                                       dataSource={this.state.data}></FormOrderRelationTable>
    }

    render() {
        const topThis=this;
        const {state:{detailData,detailVisible}}=topThis;

        return <FormSettingGroup title={"关联订单信息"} loading={this.props.loading}>
            <Row className="form-order-relation">
                {this.renderTable()}
                <Modal title="查看订单信息" visible={detailVisible} footer={false} width={800} onCancel={()=>{topThis.setState({detailVisible:false})}}>
                    {!isNullOrUndefined(detailData) ? <WarehouseInForm type={"view"} Data={detailData} isHidenBtn={true} style={{padding:"0px 8px"}}></WarehouseInForm>:null}
                </Modal>
            </Row>
        </FormSettingGroup>
    }
}