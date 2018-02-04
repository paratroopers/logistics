import * as React from 'react';
import {Input, Row, Col, Form, message, Table, Menu, Dropdown, Icon} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {FormSettingGroup} from './form-setting-group';
import {FormContactInfo} from './form-contact-info';
import {ModelNameSpace} from '../model/model';
import {Context} from '../util/common';

export interface FormOrderChannelProps {
    readOnly?: boolean;
}

export interface FormOrderChannelStates {
    data?: any[];
}

class FormOrderChannelTable extends Table<any> {
}

export class FormOrderChannel extends React.Component<FormOrderChannelProps, FormOrderChannelStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
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
            <a>
                <span>添加渠道</span>
            </a>
        </div>
    }

    render() {
        return <FormSettingGroup title={"渠道选择"} topBar={this.renderHeader()}>
            {this.renderTable()}
        </FormSettingGroup>
    }
}