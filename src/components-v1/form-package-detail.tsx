import * as React from 'react';
import {Input, Table, InputNumber, Icon} from 'antd';
import {FormSettingGroup} from './form-setting-group';
import {ColumnProps} from 'antd/lib/table';
import {requestNameSpace} from '../model/request';
import {Util} from '../util/util';

const PackageDetailListModel = requestNameSpace.PackageDetailListModel;

export interface FormPackageDetailProps {
    readOnly?: boolean;
}

export interface FormPackageDetailStates {
    data?: requestNameSpace.PackageDetailListModel[];
}

class FormPackageDetailTable extends Table<requestNameSpace.PackageDetailListModel> {
}

export class FormPackageDetail extends React.Component<FormPackageDetailProps, FormPackageDetailStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }

    onAddClick(e) {
        e.stopPropagation();
        let data = this.state.data;
        data.push(new PackageDetailListModel());
        this.setState({data: data});
    }

    onDeleteClick(record: requestNameSpace.PackageDetailListModel) {
        let data = this.state.data;
        Util.remove(data, i => i.ID === record.ID);
        this.setState({data: data});
    }

    onChange(value, record: requestNameSpace.PackageDetailListModel, fieldName: string) {
        let data = this.state.data;
        Util.each(data, d => {
            if (d.ID === record.ID)
                d[fieldName] = value;
        });
        this.setState({data: data});
    }

    renderTable() {
        const columns: ColumnProps<requestNameSpace.PackageDetailListModel>[] = [
            {
                title: '包裹名称',
                dataIndex: 'PackageName',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <Input value={txt}
                               onChange={e => this.onChange(e.target.value, record, 'PackageName')}></Input> :
                        <span>{txt}</span>;
                }
            },
            {
                title: '结算长(cm)',
                dataIndex: 'PackageLength',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <InputNumber defaultValue={txt}
                                     step={0.01}
                                     min={0}
                                     precision={2}
                                     onChange={v => this.onChange(v, record, 'PackageLength')}></InputNumber> :
                        <span>{txt}</span>;
                }
            }, {
                title: '结算宽(cm)',
                dataIndex: 'PackageWidth',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <InputNumber defaultValue={txt}
                                     step={0.01}
                                     min={0}
                                     precision={2}
                                     onChange={v => this.onChange(v, record, 'PackageWidth')}></InputNumber> :
                        <span>{txt}</span>;
                }
            }, {
                title: '结算高(cm)',
                dataIndex: 'PackageHeight',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <InputNumber defaultValue={txt}
                                     step={0.01}
                                     min={0}
                                     precision={2}
                                     onChange={v => this.onChange(v, record, 'PackageHeight')}></InputNumber> :
                        <span>{txt}</span>;
                }
            }, {
                title: '结算重量(kg)',
                dataIndex: 'PackageWeight',
                render: (txt, record) => {
                    return !this.props.readOnly ?
                        <InputNumber defaultValue={txt}
                                     step={0.01}
                                     min={0}
                                     precision={2}
                                     onChange={v => this.onChange(v, record, 'PackageWeight')}></InputNumber> :
                        <span>{txt}</span>;
                }
            }, {
                title: '操作',
                render: (txt, record) => {
                    return <div>
                        <a onClick={() => this.onDeleteClick(record)}>删除</a>
                    </div>
                }
            }
        ]
        return <FormPackageDetailTable columns={columns}
                                       pagination={false}
                                       dataSource={this.state.data}></FormPackageDetailTable>
    }

    renderAddButton() {
        return <div>
            <Icon type="plus-circle-o"/>
            <a onClick={this.onAddClick.bind(this)}>
                <span>添加打包</span>
            </a>
        </div>
    }

    render() {
        return <FormSettingGroup title={"打包明细"} topBar={this.renderAddButton()}>
            {this.renderTable()}
        </FormSettingGroup>
    }
}