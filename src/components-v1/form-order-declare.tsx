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
}

class FormOrderDeclareTable extends Table<requestNameSpace.OrderMergeProductListModel> {
}

export class FormOrderDeclare extends React.Component<FormOrderDeclareProps, FormOrderDeclareStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
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

    renderTable() {
        const colums: ColumnProps<requestNameSpace.OrderMergeProductListModel>[] = [
            {
                title: '产品名称',
                dataIndex: 'productName',
                render: (txt, record) => {
                    return !this.props.readOnly ? <Input defaultValue={txt}></Input> : <span>{txt}</span>;
                }
            },
            {
                title: '产品数量',
                dataIndex: 'count',
                render: (txt, record) => {
                    return !this.props.readOnly ? <InputNumber defaultValue={txt}></InputNumber> : <span>{txt}</span>;
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
                    return !this.props.readOnly ? <InputNumber defaultValue={txt}></InputNumber> : <span>{txt}</span>;
                }
            }, {
                title: '申报总值',
                dataIndex: 'total',
                render: (txt, record) => {
                    return !this.props.readOnly ? <Input disabled defaultValue={txt}></Input> : <span>{txt}</span>;
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
                <Icon type="plus"></Icon>
                <a onClick={this.onAddClick.bind(this)}>
                    <span>添加货品</span>
                </a>
            </Col>
            <Col span={8}>
                <span>申报总和:</span>
                <a>23</a>
            </Col>
        </Row>
    }

    render() {
        return <FormSettingGroup size={16} title={"货品申报信息"} span={24} header={this.renderAddButton()}>
            {this.renderTable()}
        </FormSettingGroup>
    }
}