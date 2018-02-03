import * as React from 'react';
import {Row, Col, Form, Input, Button, Table, InputNumber, Icon} from 'antd';
import {FormSettingGroup} from './form-setting-group';
import {ColumnProps} from 'antd/lib/table';
import {requestNameSpace} from '../model/request';
import {Util} from '../util/util';

const OrderMergeProductListModel = requestNameSpace.OrderMergeProductListModel;

export interface FormOrderDeclareProps {
    readOnly?: boolean;
}

export interface FormOrderDeclareStates {
    data?: requestNameSpace.OrderMergeProductListModel[];
    total?: string;
}

class FormOrderDeclareTable extends Table<requestNameSpace.OrderMergeProductListModel> {
}

export class FormOrderDeclare extends React.Component<FormOrderDeclareProps, FormOrderDeclareStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            total: '00.00'
        }
    }

    onAddClick(e) {
        e.stopPropagation();
        let data = this.state.data;
        data.push(new OrderMergeProductListModel());
        this.setState({data: data});
    }

    onDeleteClick(record: requestNameSpace.OrderMergeProductListModel) {
        let data = this.state.data;
        Util.remove(data, i => i.ID === record.ID);
        this.setState({data: data});
    }

    onChange(value, record: requestNameSpace.OrderMergeProductListModel, fieldName: string) {
        let total: number = 0, data = this.state.data;
        Util.each(data, d => {
            if (d.ID === record.ID)
                d[fieldName] = value;
            d.total = (d.declareUnitPrice * d.count).toFixed(2);
            total += Number(d.total);
        });
        this.setState({total: total.toFixed(2), data: data});
    }

    renderTable() {
        const colums: ColumnProps<requestNameSpace.OrderMergeProductListModel>[] = [
            {
                title: '产品名称',
                dataIndex: 'productName',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <Input value={txt}
                               onChange={e => this.onChange(e.target.value, record, 'productName')}></Input> :
                        <span>{txt}</span>;
                }
            },
            {
                title: '产品数量',
                dataIndex: 'count',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <InputNumber defaultValue={txt}
                                     step={1}
                                     precision={0}
                                     min={0}
                                     onChange={v => this.onChange(v, record, 'count')}></InputNumber> :
                        <span>{txt}</span>;
                }
            }, {
                title: '货币单位',
                dataIndex: 'HSCode',
                render: (txt, record) => {
                    return !this.props.readOnly ? <Input disabled defaultValue={txt}></Input> : <span>{txt}</span>;
                }
            }, {
                title: '申报单价',
                dataIndex: 'declareUnitPrice',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <InputNumber defaultValue={txt}
                                     step={0.01}
                                     min={0}
                                     precision={2}
                                     onChange={v => this.onChange(v, record, 'declareUnitPrice')}></InputNumber> :
                        <span>{txt}</span>;
                }
            }, {
                title: '申报总值',
                dataIndex: 'total',
                render: (txt, record) => {
                    return !this.props.readOnly ? <Input disabled value={txt}></Input> : <span>{txt}</span>;
                }
            }, {
                title: '操作',
                dataIndex: '6',
                render: (txt, record) => {
                    return <div>
                        <a onClick={() => this.onDeleteClick(record)}>删除</a>
                    </div>
                }
            }
        ]
        return <FormOrderDeclareTable columns={colums}
                                      pagination={false}
                                      dataSource={this.state.data}></FormOrderDeclareTable>
    }

    renderAddButton() {
        return <Row type="flex" justify="start" align="bottom">
            <Col span={16}>
                <Icon type="plus-circle-o" style={{marginRight: "5px"}}/>
                <a onClick={this.onAddClick.bind(this)}>
                    <span>添加货品</span>
                </a>
                <span> | </span>
                <span style={{paddingRight: '5px'}}>申报总和:</span>
                <a>{this.state.total}</a>
            </Col>
        </Row>
    }

    render() {
        return <FormSettingGroup size={16} title={"货品申报信息"} span={24}>
            {this.renderAddButton()}
            {this.renderTable()}
        </FormSettingGroup>
    }
}