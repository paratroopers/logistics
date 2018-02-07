import * as React from 'react';
import {Table, Menu, Dropdown, Icon} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {Util} from '../util/util';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';
import {FormChannelInfo} from './form-channel-info';

export interface FormOrderChannelProps {
    readOnly?: boolean;
}

export interface FormOrderChannelStates {
    data?: ModelNameSpace.ChannelModal[];
    channelsShow?: boolean;
}

class FormOrderChannelTable extends Table<ModelNameSpace.ChannelModal> {
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
        this.setState({data: [{...selected}]});
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
        const columns: ColumnProps<ModelNameSpace.ChannelModal>[] = [
            {
                title: '渠道名称',
                dataIndex: 'Name',
                width: '20%'
            },
            {
                title: '时间',
                dataIndex: 'Prescription',
                width: '15%'
            },
            {
                title: '重量限制',
                dataIndex: 'WeightLimit',
                width: '25%',
                render: (txt) => {
                    return <div style={{width: '150px'}} className="txtislong" title={txt}>{txt}</div>
                }
            },
            {
                title: '体积限制',
                dataIndex: 'SizeLimit',
                width: '25%',
                render: (txt) => {
                    return <div style={{width: '150px'}} className="txtislong" title={txt}>{txt}</div>
                }
            },
            {
                title: '操作',
                dataIndex: '',
                render: (txt, record) => {
                    const menu = <Menu>
                        <Menu.Item>
                            <span onClick={() => this.onDelete(record)}><Icon type="delete"></Icon>删除</span>
                        </Menu.Item>
                    </Menu>;
                    return <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            操作 <Icon type="down"/>
                        </a>
                    </Dropdown>
                }
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