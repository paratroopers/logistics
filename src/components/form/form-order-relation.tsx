import * as React from 'react';
import {Row, Col, Table} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {ModelNameSpace} from '../../model/model';
import {FormSettingGroup} from './form-setting-group';
import * as moment from 'moment';

export interface FormOrderRelationProps {
    data?: ModelNameSpace.CustomerOrderModel[];
}

export interface FormOrderRelationStates {
    data?: ModelNameSpace.CustomerOrderModel[];
    loading?: boolean;
}

class FormOrderRelationTable extends Table<any> {
}

export class FormOrderRelation extends React.Component<FormOrderRelationProps, FormOrderRelationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : [],
            loading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data, loading: false});
        }
    }

    renderTable() {
        const colums: ColumnProps<any>[] = [
            {
                title: '客服订单号',
                dataIndex: 'CustomerOrderNo'
            },
            {
                title: '物流订单号',
                dataIndex: 'expressNo'
            }, {
                title: '物流方式',
                dataIndex: 'expressTypeName'
            }, {
                title: '入库时间',
                dataIndex: 'InWareHouseTime',
                render: (txt) => {
                    return <span>{moment(txt).format('YYYY-MM-DD HH:mm')}</span>
                }
            }, {
                title: '初始重量(KG)',
                dataIndex: 'InWeight'
            }, {
                title: '初始体积(cm³)',
                dataIndex: 'InVolume'
            }, {
                title: '客服备注',
                dataIndex: '6'
            }
        ]
        return <FormOrderRelationTable columns={colums}
                                       loading={this.state.loading}
                                       pagination={false}
                                       dataSource={this.state.data}></FormOrderRelationTable>
    }

    render() {
        return <FormSettingGroup size={16} title={"关联订单信息"} span={24}>
            {this.renderTable()}
        </FormSettingGroup>
    }
}