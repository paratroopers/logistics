import * as React from 'react';
import {Row} from "antd";
import {Constants} from '../util/common';
import {ModelNameSpace} from '../model/model';
import {FormSettingGroup} from './form-setting-group';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import * as moment from 'moment';

export interface FormOrderRelationProps {
    data?: ModelNameSpace.CustomerOrderModel[];
    loading?: boolean;
}

export interface FormOrderRelationStates {
    data?: ModelNameSpace.CustomerOrderModel[];
}

class FormOrderRelationTable extends CommonTable<any> {
}

export class FormOrderRelation extends React.Component<FormOrderRelationProps, FormOrderRelationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : []
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    renderTable() {
        const colums: CommonColumnProps<ModelNameSpace.CustomerOrderModel>[] = [
            {
                title: '客户订单号',
                dataIndex: 'CustomerOrderNo',
                layout: ColumnLayout.LeftTop,
                render: (txt) => {
                    return <a>{txt}</a>
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
        return <FormSettingGroup title={"关联订单信息"} loading={this.props.loading}>
            <Row className="form-order-relation">
                {this.renderTable()}
            </Row>
        </FormSettingGroup>
    }
}