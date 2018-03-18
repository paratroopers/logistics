import * as React from 'react';
import {Form, Input, Modal, Icon} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group';
import {FormInputNumber} from './form-input-number';
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
            data: props.data ? props.data : [new CustomerOrderMergeProductModel()],
            total: '00.00',
            visible: false
        }
    }

    componentDidMount() {
        const topThis = this;
        const {state: {data}} = topThis;

        let total: number = 0;
        Util.each(data, d => {
            d.declareTotal = (d.declareUnitPrice * d.productCount).toFixed(2);
            total += Number(d.declareTotal);
        });
        this.setState({total: total.toFixed(2), data: data});
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            let total: number = 0;
            Util.each(nextProps.data, d => {
                const price = Number.isFinite(d.declareUnitPrice) ? d.declareUnitPrice : 0;
                const count = Number.isFinite(d.productCount) ? d.productCount : 0;
                d.declareTotal = (price * count).toFixed(2);
                total += Number(d.declareTotal);
            });
            this.setState({
                total: total.toFixed(2),
                data: nextProps.data ? nextProps.data : [new CustomerOrderMergeProductModel()]
            });
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
            total += Number(d.declareTotal);
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
            const price = Number.isFinite(d.declareUnitPrice) ? d.declareUnitPrice : 0;
            const count = Number.isFinite(d.productCount) ? d.productCount : 0;
            d.declareTotal = (price * count).toFixed(2);
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
        const {props: {form}} = this;
        const colums: CommonColumnProps<ModelNameSpace.CustomerOrderMergeProductModel>[] = [
            {
                title: <span className="required-lable">产品名称(中文)</span>,
                dataIndex: 'productName',
                width: '15%',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`productList[${index}].productName`, {
                            initialValue: txt,
                            rules: [{required: true, message: '  '}]
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'productName')}></Input>)}</Form.Item>
                        : <span>{new String().concat(Constants.minSM ? "产品名称：" : "", txt)}</span>;
                },
                layout: ColumnLayout.LeftTop
            }, {
                title: <span className="required-lable">产品名称(英文)</span>,
                dataIndex: 'productNameEN',
                width: '15%',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`productList[${index}].productNameEN`, {
                            initialValue: txt,
                            rules: [{required: true, message: '  '}]
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'productNameEN')}></Input>)}</Form.Item>
                        : <span>{txt}</span>;
                },
                hidden: Constants.minSM
            },
            {
                title: <span className="required-lable">产品数量</span>,
                width: '10%',
                dataIndex: 'productCount',
                render: (txt, record, index) => {
                    return !this.props.readOnly ?
                        <Form.Item>
                            {form.getFieldDecorator(`productList[${index}].productCount`, {
                                initialValue: txt,
                                rules: [{required: true, message: '  '}]
                            })
                            (< FormInputNumber step={1}
                                               precision={0}
                                               min={0}
                                               onChange={v => this.onChange(v, record, 'productCount')}></FormInputNumber>)}
                        </Form.Item> :
                        <span>{new String().concat(Constants.minSM ? "产品数量：" : "", txt)}</span>;
                },
                layout: ColumnLayout.RightTop
            }, {
                title: '货币单位',
                width: '10%',
                render: (txt, record) => {
                    return <span>美元</span>;
                },
                hidden: Constants.minSM
            }, {
                title: "HSCode",
                width: '15%',
                dataIndex: 'HSCode',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`productList[${index}].HSCode`, {
                            initialValue: txt
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'HSCode')}></Input>)}</Form.Item>
                        : <span>{txt}</span>;
                },
                hidden: Constants.minSM
            }, {
                title: <span className="required-lable">申报单价</span>,
                width: '10%',
                dataIndex: 'declareUnitPrice',
                render: (txt, record, index) => {
                    return !this.props.readOnly ?
                        <Form.Item>
                            {form.getFieldDecorator(`productList[${index}].declareUnitPrice`, {
                                initialValue: txt,
                                rules: [{required: true, message: '  '}]
                            })
                            (<FormInputNumber step={0.01}
                                              min={0}
                                              precision={2}
                                              onChange={v => this.onChange(v, record, 'declareUnitPrice')}></FormInputNumber>)}
                        </Form.Item> :
                        <span>{new String().concat(Constants.minSM ? "申报单价：" : "", txt)}</span>;
                },
                layout: ColumnLayout.LeftBottom
            }, {
                title: '申报总值',
                width: '10%',
                dataIndex: 'declareTotal',
                render: (txt, record) => {
                    return !this.props.readOnly && !Constants.minSM ? <Input disabled value={txt}></Input> :
                        <span>{new String().concat(Constants.minSM ? "申报总值：" : "", txt)}</span>;
                },
                layout: ColumnLayout.RightBottom
            }, {
                title: '操作',
                width: '10%',
                render: (txt, record, index) => {
                    return <div>
                        {!this.props.readOnly && index !== 0 ?
                            <a onClick={() => this.onDeleteClick(record)}>删除</a> : null}
                    </div>
                },
                layout: ColumnLayout.Option,
                hidden: this.props.readOnly
            }
        ]
        return <FormOrderDeclareTable columns={colums}
                                      rowKey={"ID"}
                                      className="declare-table"
                                      pagination={false}
                                      dataSource={this.state.data}></FormOrderDeclareTable>;
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

    renderAddModal() {
        if (this.state.visible) {
            const {props: {form: {getFieldDecorator, getFieldValue, setFieldsValue}}} = this;
            return <Modal title="货品信息"
                          visible
                          onOk={this.onModalOk.bind(this)}
                          onCancel={this.onModalCancel.bind(this)}>
                <Form>
                    <Form.Item label="产品名称">
                        {
                            getFieldDecorator('productName',
                                {rules: [{required: true, message: '  '}]})
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
                                {rules: [{required: true, message: '  '}]})
                            (<FormInputNumber onChange={(val: number) => {
                                const total = val * getFieldValue('declareUnitPrice');
                                setFieldsValue({total: total.toFixed(2)});
                            }}/>)
                        }
                    </Form.Item>
                    <Form.Item label="申报单价">
                        {
                            getFieldDecorator('declareUnitPrice',
                                {rules: [{required: true, message: '请填写申报单价!'}]})
                            (<FormInputNumber onChange={(val: number) => {
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
            </Modal>
        } else
            return null;
    }

    render() {
        const {props: {loading}} = this;
        return <FormSettingGroup title={"货品申报信息"} topBar={this.renderAddButton()} loading={loading}>
            <Form layout="inline" className="form-order-declare">{this.renderTable()}</Form>
            {this.renderAddModal()}
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderDeclare);