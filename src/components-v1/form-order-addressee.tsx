import * as React from 'react';
import {Row, Col, Form, Input, Button, Icon} from 'antd';
import {RowProps} from 'antd/lib/row';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';
import {FormControl} from './form-control';
import {Context} from '../util/common';

export interface FormOrderAddresseeProps {
    readOnly?: boolean;
}

export interface FormOrderAddresseeStates {
}

export class FormOrderAddressee extends React.Component<FormOrderAddresseeProps, FormOrderAddresseeStates> {

    renderFooter() {
        return <Button type="dashed">添加联系人</Button>
    }

    renderHeader() {
        return <div>
            <i className={Context.getIconClassName("icon-tianjialianxiren")}/>
            <a>
                <span>添加联系人</span>
            </a>
            <span> | </span>
            <i className={Context.getIconClassName("icon-xuanzelianxiren")}/>
            <a>
                <span>另存为联系人</span>
            </a>
        </div>
    }

    renderRow(label?: string, value?: string, span?: number, isTextArea?: boolean) {
        const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 18}};
        return <Col span={12}>
            <Form.Item label={label} {...formItemLayout} required>
                {
                    isTextArea ? <Input.TextArea value={value} placeholder={'请输入'}></Input.TextArea>
                        : <Input value={value} placeholder={'请输入'}></Input>
                }
            </Form.Item>
        </Col>
    }

    render() {
        const defaultRowSetting: RowProps = {justify: "center", type: "flex"};
        return <FormSettingGroup title={"收件人基本信息"} topBar={this.renderHeader()}>
            <Form>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件人姓名', null)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('电话', null)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('邮编', null)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件国家', null)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件城市', null)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('地址', null, 16, true)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('公司', null)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('税号', null)}
                </Row>
            </Form>
        </FormSettingGroup>
    }
}