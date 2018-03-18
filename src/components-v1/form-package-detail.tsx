import * as React from 'react';
import {Form, Input, Icon} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group';
import {FormInputNumber} from './form-input-number';
import {Constants} from '../util/common';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {ModelNameSpace} from '../model/model';
import {Util} from '../util/util';

const PackageDetailListModel = ModelNameSpace.PackageDetailListModel;

export interface FormPackageDetailProps extends FormComponentProps{
    readOnly?: boolean;
    data?: ModelNameSpace.PackageDetailListModel[];
    onChange?: (data: ModelNameSpace.PackageDetailListModel[]) => void;
    loading?: boolean;
}

export interface FormPackageDetailStates {
    data?: ModelNameSpace.PackageDetailListModel[];
}

class FormPackageDetailTable extends CommonTable<ModelNameSpace.PackageDetailListModel> {
}

class FormPackageDetail extends React.Component<FormPackageDetailProps, FormPackageDetailStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : [new PackageDetailListModel()]
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({
                data: nextProps.data ? nextProps.data : [new PackageDetailListModel()]
            });
        }
    }

    onAddClick(e) {
        e.stopPropagation();
        const topThis = this;
        const {props: {onChange}} = topThis;

        let data = this.state.data;
        data.push(new PackageDetailListModel());
        this.setState({data: data}, () => {
            if (onChange)
                onChange(data);
        });
    }

    onDeleteClick(record: ModelNameSpace.PackageDetailListModel) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        let data = this.state.data;
        Util.remove(data, i => i.ID === record.ID);
        this.setState({data: data}, () => {
            if (onChange)
                onChange(data);
        });
    }

    onChange(value, record: ModelNameSpace.PackageDetailListModel, fieldName: string) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        let data = this.state.data;
        this.setState({data: data}, () => {
            if (onChange)
                onChange(data);
        });
    }

    renderTable() {
        const {props: {form}} = this;
        const colums: CommonColumnProps<ModelNameSpace.PackageDetailListModel>[] = [
            {
                title: "包裹名称",
                dataIndex: 'PackageName',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`packageDetailList[${index}].PackageName`, {
                            initialValue: txt
                        })
                        (<Input
                            onChange={e => this.onChange(e.target.value, record, 'PackageName')}></Input>)}</Form.Item>
                        : <span>{new String().concat(Constants.minSM ? "包裹名称：" : "", txt)}</span>;
                }
            }, {
                title: "结算长(cm)",
                dataIndex: 'PackageLength',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`packageDetailList[${index}].PackageLength`, {
                            initialValue: txt,
                            rules: [{required: true, message: '  '}]
                        })
                        (<FormInputNumber step={1}
                                           precision={0}
                                           min={0}
                                           onChange={v => this.onChange(v, record, 'PackageLength')}></FormInputNumber>)}</Form.Item>
                        : <span>{txt}</span>;
                }
            },
            {
                title: "结算宽(cm)",
                dataIndex: 'PackageWidth',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`packageDetailList[${index}].PackageWidth`, {
                            initialValue: txt,
                            rules: [{required: true, message: '  '}]
                        })
                        (<FormInputNumber step={1}
                                          precision={0}
                                          min={0}
                                          onChange={v => this.onChange(v, record, 'PackageWidth')}></FormInputNumber>)}</Form.Item>
                        : <span>{txt}</span>;
                }
            }, {
                title: "结算高(cm)",
                dataIndex: 'PackageHeight',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`packageDetailList[${index}].PackageHeight`, {
                            initialValue: txt,
                            rules: [{required: true, message: '  '}]
                        })
                        (<FormInputNumber step={1}
                                          precision={0}
                                          min={0}
                                          onChange={v => this.onChange(v, record, 'PackageHeight')}></FormInputNumber>)}</Form.Item>
                        : <span>{txt}</span>;
                }
            }, {
                title: "结算重量(kg)",
                dataIndex: 'PackageWeight',
                render: (txt, record, index) => {
                    return !this.props.readOnly && !Constants.minSM ?
                        <Form.Item>{form.getFieldDecorator(`packageDetailList[${index}].PackageWeight`, {
                            initialValue: txt,
                            rules: [{required: true, message: '  '}]
                        })
                        (<FormInputNumber step={1}
                                          precision={0}
                                          min={0}
                                          onChange={v => this.onChange(v, record, 'PackageWeight')}></FormInputNumber>)}</Form.Item>
                        : <span>{txt}</span>;
                }
            }, {
                title: '操作',
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
        return <FormPackageDetailTable columns={colums}
                                      rowKey={"ID"}
                                      className="package-detail-table"
                                      pagination={false}
                                      dataSource={this.state.data}></FormPackageDetailTable>;
    }

    renderAddButton() {
        return <div>
            {
                this.props.readOnly ? null :
                    <span>
                        <Icon type="plus-circle-o"/>
                        <a onClick={this.onAddClick.bind(this)}>
                            <span>添加明细</span>
                        </a>
                    </span>
            }
        </div>
    }

    render() {
        return <FormSettingGroup title={"打包明细"} topBar={this.renderAddButton()}>
            <Form layout="inline" className="form-package-detail">{this.renderTable()}</Form>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormPackageDetail);