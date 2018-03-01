import * as React from 'react';
import { Icon} from 'antd';
import {Util} from '../util/util';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {FormChannelInfo} from './form-channel-info';

export interface FormOrderChannelProps {
    readOnly?: boolean;
    data?: ModelNameSpace.ChannelModal[];
    onChange?:(data:ModelNameSpace.ChannelModal[])=>void;
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
            data: [],
            channelsShow: false
        }
    }

    onAddClick() {
        this.setState({channelsShow: true});
    }

    onOk(selected: ModelNameSpace.ChannelModal) {
        const topThis=this;
        const {props:{onChange}}=topThis;
        this.setState({data: [{...selected}]},()=>{
            if(onChange)
                onChange([{...selected}]);
        });
        this.setState({channelsShow: false});
    }

    onChanel() {
        this.setState({channelsShow: false});
    }

    onDelete(row?: ModelNameSpace.ChannelModal) {
        let data = this.state.data;
        Util.remove(data, d => d.ID === row.ID);
        this.setState({data: data});
    }

    renderTable() {
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
                    return <a onClick={() => this.onDelete(record)}>删除</a>
                },
                layout: ColumnLayout.Option
            }];
        return <FormOrderChannelTable pagination={false} columns={columns}
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
        return <FormSettingGroup title={"渠道选择"} topBar={this.renderHeader()}>
            {this.renderTable()}
            {<FormChannelInfo visible={this.state.channelsShow} onOk={this.onOk.bind(this)}
                              onChanel={this.onChanel.bind(this)}></FormChannelInfo>}
        </FormSettingGroup>
    }
}