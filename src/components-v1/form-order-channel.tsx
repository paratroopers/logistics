import * as React from 'react';
import {Icon} from 'antd';
import {Util} from '../util/util';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {FormComponentProps} from 'antd/lib/form/Form';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {FormChannelInfo} from './form-channel-info';

export interface FormOrderChannelProps extends FormComponentProps {
    readOnly?: boolean;
    fieldName?: string;
    data?: ModelNameSpace.ChannelModal[];
    ids?: string[];
    onChange?: (data: ModelNameSpace.ChannelModal[]) => void;
    loading?: boolean;
}

export interface FormOrderChannelStates {
    data?: ModelNameSpace.ChannelModal[];
    channelsShow?: boolean;
}

class FormOrderChannelTable extends CommonTable<ModelNameSpace.ChannelModal> {
}

export class FormOrderChannel extends React.Component<FormOrderChannelProps, FormOrderChannelStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : [],
            channelsShow: false
        }
        this.props.form && !this.props.readOnly && this.props.form.getFieldDecorator(this.props.fieldName, {initialValue: this.props.ids[0]});
    }

    componentDidMount() {
        const {props: {ids}} = this;
        if (ids && ids.length > 0)
            this.getChannels();
    }

    componentWillReceiveProps(nextProps) {
        if ('ids' in nextProps && JSON.stringify(nextProps.ids) !== JSON.stringify(this.props.ids)) {
            this.getChannels(nextProps.ids);
        }
    }

    async getChannels(ids?: string[]) {
        const result = await APINameSpace.CustomerOrderAPI.GetChannels();
        if (result.Status === 0) {
            const data = result.Data || [];
            this.setState({
                data: data.filter((r) => {
                    return (ids ? ids : this.props.ids).indexOf(r.ID) !== -1;
                })
            }, () => {
                if (this.props.form) {
                    this.props.form.setFieldsValue({[this.props.fieldName]: this.props.ids[0]});
                }
            });
        }
    }

    onAddClick() {
        this.setState({channelsShow: true});
    }

    onOk(selected: ModelNameSpace.ChannelModal) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        this.setState({data: [{...selected}]}, () => {
            if (onChange)
                onChange([{...selected}]);
            else if (this.props.form)
                this.props.form.setFieldsValue({[this.props.fieldName]: selected.ID});
        });
        this.setState({channelsShow: false});
    }

    onChanel() {
        this.setState({channelsShow: false});
    }

    onDelete(row ?: ModelNameSpace.ChannelModal) {
        let data = this.state.data;
        Util.remove(data, d => d.ID === row.ID);
        this.setState({data: data});
    }

    renderTable() {
        const topThis = this;
        const {props: {readOnly}} = topThis;

        const columns: CommonColumnProps<ModelNameSpace.ChannelModal>[] = [
            {
                title: '渠道名称',
                dataIndex: 'Name',
                width: '20%',
                layout: ColumnLayout.LeftTop
            },
            {
                title: '时间',
                dataIndex: 'Prescription',
                width: '15%',
                layout: ColumnLayout.LeftBottom
            },
            {
                title: '重量限制',
                dataIndex: 'WeightLimit',
                width: '25%',
                render: (txt) => {
                    return <div style={{width: '150px'}} className="txtislong" title={txt}>{txt}</div>
                },
                layout: ColumnLayout.RightTop
            },
            {
                title: '体积限制',
                dataIndex: 'SizeLimit',
                width: '25%',
                render: (txt) => {
                    return <div style={{width: '150px'}} className="txtislong" title={txt}>{txt}</div>
                },
                layout: ColumnLayout.RightBottom
            },
            {
                title: '操作',
                dataIndex: '',
                render: (txt, record) => {
                    return !readOnly ? <a onClick={() => this.onDelete(record)}>删除</a> : null
                },
                layout: ColumnLayout.Option,
                hidden: readOnly
            }];
        return <FormOrderChannelTable pagination={false} columns={columns}
                                      rowKey={"ID"}
                                      dataSource={this.state.data}></FormOrderChannelTable>
    }

    renderHeader() {
        return this.props.readOnly ? null : <div>
            <Icon type="plus-circle-o"/>
            <a onClick={this.onAddClick.bind(this)}>
                <span>添加渠道</span>
            </a>
        </div>
    }

    render() {
        return <FormSettingGroup title={"渠道选择"} topBar={this.renderHeader()} loading={this.props.loading}>
            {this.renderTable()}
            {<FormChannelInfo visible={this.state.channelsShow} onOk={this.onOk.bind(this)}
                              onChanel={this.onChanel.bind(this)}></FormChannelInfo>}
        </FormSettingGroup>
    }
}
