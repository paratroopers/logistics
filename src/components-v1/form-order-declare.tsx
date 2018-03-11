import * as React from 'react';
import {Form, Input, InputNumber, Modal, Icon} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group';
import {Constants} from '../util/common';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {ModelNameSpace} from '../model/model';
import {Util} from '../util/util';

const CustomerOrderMergeProductModel = ModelNameSpace.CustomerOrderMergeProductModel;

export interface FormOrderDeclareProps extends FormComponentProps {
    readOnly?: boolean;
    data?: ModelNameSpace.CustomerOrderMergeProductModel[];
    onChange?: (data: ModelNameSpace.CustomerOrderMergeProductModel[]) => void;
    loading?: boolean;
}

export interface FormOrderDeclareStates {
    data?: ModelNameSpace.CustomerOrderMergeProductModel[];
    total?: string;
    visible?: boolean;
}

class FormOrderDeclareTable extends CommonTable<ModelNameSpace.CustomerOrderMergeProductModel> {
}

class FormOrderDeclare extends React.Component<FormOrderDeclareProps, FormOrderDeclareStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : [],
            total: '00.00',
            visible: false
        }
    }

    componentDidMount() {
        const topThis = this;
        const {state: {data}} = topThis;

        let total: number = 0;
        Util.each(data, d => {
            d.total = (d.declareUnitPrice * d.productCount).toFixed(2);
            total += Number(d.total);
        });
        this.setState({total: total.toFixed(2), data: data});
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    onAddClick(e) {
        e.stopPropagation();
        const topThis = this;
        const {props: {onChange}} = topThis;

        if (Constants.minSM) {
            this.renderModal();
            return;
        }
        let data = this.state.data;
        data.push(new CustomerOrderMergeProductModel());
        this.setState({data: data}, () => {
            if (onChange)
                onChange(data);
        });
    }

    onDeleteClick(record: ModelNameSpace.CustomerOrderMergeProductModel) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        let data = this.state.data;
        Util.remove(data, i => i.ID === record.ID);
        let total: number = 0;
        Util.each(data, d => {
            total += Number(d.total);
        });
        this.setState({data: data, total: total.toFixed(2)}, () => {
            if (onChange)
                onChange(data);
        });
    }

    onChange(value, record: ModelNameSpace.CustomerOrderMergeProductModel, fieldName: string) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        let total: number = 0, data = this.state.data;
        Util.each(data, d => {
            if (d.ID === record.ID)
                d[fieldName] = value;
            d.declareTotal = (d.declareUnitPrice * d.productCount).toFixed(2);
            total += Number(d.declareTotal);
        });
        this.setState({total: total.toFixed(2), data: data}, () => {
            if (onChange)
                onChange(data);
        });
    }

    onModalOk() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                let data = this.state.data;
                data.push(values);
                let total = (Number(this.state.total) + Number(values['total'])).toFixed(2);
                this.setState({total: total, data: data});
            }
        })
        this.onModalCancel();
    }

    onModalCancel() {
        this.setState({visible: false});
    }

    renderModal() {
        const item = new CustomerOrderMergeProductModel();
        this.props.form.setFieldsValue({...item})
        this.setState({visible: true});
    }

    onOk() {
        this.props.form.validateFields((err, values) => {
            console.log(1);
        })
    }

    renderTable() {
        const {props: {form: {getFieldDecorator}}} = this;
        const colums: CommonColumnProps<ModelNameSpace.CustomerOrderMergeProductModel>[] = [
            {
                title: '产品名称(中文)',
                dataIndex: 'productName',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{getFieldDecorator(`productList[${index}].productName`, {
                            initialValue: txt,
                            rules: [{required: true, message: '产品名称必须填写'}]
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'productName')}></Input>)}</Form.Item>
                        : <span>{new String().concat(Constants.minSM ? "产品名称：" : "", txt)}</span>;
                },
                layout: ColumnLayout.LeftTop
            }, {
                title: '产品名称(英文)',
                dataIndex: 'productNameEN',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{getFieldDecorator(`productList[${index}].productNameEN`, {
                            initialValue: txt,
                            rules: [{required: true, message: '产品名称必须填写'}]
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'productNameEN')}></Input>)}</Form.Item>
                        : <span>{txt}</span>;
                },
                hidden: Constants.minSM
            },
            {
                title: '产品数量',
                dataIndex: 'productCount',
                render: (txt, record, index) => {
                    return !this.props.readOnly ?
                        <Form.Item>
                            {getFieldDecorator(`productList[${index}].productCount`, {
                                initialValue: txt,
                                rules: [{required: true, message: '产品数量必须填写'}]
                            })
                            (< InputNumber step={1}
                                           precision={0}
                                           min={0}
                                           onChange={v => this.onChange(v, record, 'productCount')}></InputNumber>)}
                        </Form.Item> :
                        <span>{new String().concat(Constants.minSM ? "产品数量：" : "", txt)}</span>;
                },
                layout: ColumnLayout.RightTop
            }, {
                title: '货币单位',
                render: (txt, record) => {
                    return <span>美元</span>;
                },
                hidden: Constants.minSM
            }, {
                title: 'HSCode',
                dataIndex: 'HSCode',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{getFieldDecorator(`productList[${index}].HSCode`, {
                            initialValue: txt,
                            rules: [{required: false}]
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'HSCode')}></Input>)}</Form.Item>
                        : <span>{txt}</span>;
                },
                hidden: Constants.minSM
            }, {
                title: '申报单价',
                dataIndex: 'declareUnitPrice',
                render: (txt, record, index) => {
                    return !this.props.readOnly ?
                        <Form.Item>
                            {getFieldDecorator(`productList[${index}].declareUnitPrice`, {
                                initialValue: txt,
                                rules: [{required: true, message: '申报单价必须填写'}]
                            })
                            (<InputNumber step={0.01}
                                          min={0}
                                          precision={2}
                                          onChange={v => this.onChange(v, record, 'declareUnitPrice')}></InputNumber>)}
                        </Form.Item> :
                        <span>{new String().concat(Constants.minSM ? "申报单价：" : "", txt)}</span>;
                },
                layout: ColumnLayout.LeftBottom
            }, {
                title: '申报总值',
                dataIndex: 'declareTotal',
                render: (txt, record) => {
                    return !this.props.readOnly && !Constants.minSM ? <Input disabled value={txt}></Input> :
                        <span>{new String().concat(Constants.minSM ? "申报总值：" : "", txt)}</span>;
                },
                layout: ColumnLayout.RightBottom
            }, {
                title: '操作',
                dataIndex: '6',
                render: (txt, record) => {
                    return <div>
                        {!this.props.readOnly ? <a onClick={() => this.onDeleteClick(record)}>删除</a> : null}
                    </div>
                },
                layout: ColumnLayout.Option,
                hidden: this.props.readOnly
            }
        ]
        return <Form>
            <FormOrderDeclareTable columns={colums}
                                   className="declare-table"
                                   pagination={false}
                                   dataSource={this.state.data}></FormOrderDeclareTable>
        </Form>;
    }

    renderAddButton() {
        return <div>
            {
                this.props.readOnly ? null :
                    <span>
                        <Icon type="plus-circle-o"/>
                        <a onClick={this.onAddClick.bind(this)}>
                            <span>添加货品</span>
                        </a>
                    </span>
            }
            <div style={{float: 'right'}}>
                <span style={{paddingRight: '5px'}}>申报总和:</span>
                <a>{this.state.total}</a>
            </div>
        </div>
    }

    render() {
        const {state: {visible}, props: {loading, form: {getFieldDecorator, getFieldValue, setFieldsValue}}} = this;
        return <FormSettingGroup title={"货品申报信息"} topBar={this.renderAddButton()} loading={loading}>
            {this.renderTable()}
            {visible ? <Modal title="货品信息"
                              visible
                              onOk={this.onModalOk.bind(this)}
                              onCancel={this.onModalCancel.bind(this)}>
                <Form>
                    <Form.Item label="产品名称">
                        {
                            getFieldDecorator('productName',
                                {rules: [{required: true, message: '请填写产品名称!'}]})
                            (<Input/>)
                        }
                    </Form.Item>
                    <Form.Item label="货币单位">
                        <span>美元</span>
                    </Form.Item>
                    <Form.Item label="HSCode">

                        {
                            getFieldDecorator('HSCode', {})
                            (<Input/>)
                        }
                    </Form.Item>
                    <Form.Item label="数量">
                        {
                            getFieldDecorator('productCount',
                                {rules: [{required: true, message: '请填写数量!'}]})
                            (<InputNumber onChange={(val: number) => {
                                const total = val * getFieldValue('declareUnitPrice');
                                setFieldsValue({total: total.toFixed(2)});
                            }}/>)
                        }
                    </Form.Item>
                    <Form.Item label="申报单价">
                        {
                            getFieldDecorator('declareUnitPrice',
                                {rules: [{required: true, message: '请填写申报单价!'}]})
                            (<InputNumber onChange={(val: number) => {
                                const total = val * getFieldValue('productCount');
                                setFieldsValue({total: total.toFixed(2)});
                            }}/>)
                        }
                    </Form.Item>
                    <Form.Item label="申报总和">
                        {
                            getFieldDecorator('total', {})
                            (<Input/>)
                        }
                    </Form.Item>
                </Form>
            </Modal> : null}
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderDeclare);