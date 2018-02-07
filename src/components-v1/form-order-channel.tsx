import * as React from 'react';
import {Table, Menu, Dropdown, Icon} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {FormSettingGroup} from './form-setting-group';
import {FormChannelInfo} from './form-channel-info';

export interface FormOrderChannelProps {
    readOnly?: boolean;
}

export interface FormOrderChannelStates {
    data?: any[];
    channelsShow?: boolean;
}

class FormOrderChannelTable extends Table<any> {
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

    onOk() {
        this.setState({channelsShow: false});
    }

    onChanel() {
        this.setState({channelsShow: false});
    }

    renderTable() {
        const columns: ColumnProps<any>[] = [
            {
                title: '渠道名称',
                dataIndex: 'channelName'
            },
            {
                title: '操作',
                dataIndex: '',
                render: (txt, record) => {
                    const menu = <Menu>
                        <Menu.Item>
                            <span><Icon type="edit"></Icon>修改</span>
                            <span><Icon type="delete"></Icon>删除</span>
                        </Menu.Item>
                    </Menu>;
                    return <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            操作 <Icon type="down"/>
                        </a>
                    </Dropdown>
                }
            }];
        return <FormOrderChannelTable columns={columns} dataSource={this.state.data}></FormOrderChannelTable>
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