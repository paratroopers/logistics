import * as React from 'react';
import {Input, Button, Row, Col, Form, message} from 'antd';
import {RowProps} from 'antd/lib/row';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {FormSettingGroup} from './form-setting-group';
import {FormContactInfo} from './form-contact-info';
import {ModelNameSpace} from '../model/model';
import {Context} from '../util/common';

export interface FormOrderAddresseeProps {
    readOnly?: boolean;
    selectContact?: ModelNameSpace.AddressModel;
}

export interface FormOrderAddresseeStates {
    selectContact?: ModelNameSpace.AddressModel;
    visible?: boolean;
}


export class FormOrderAddressee extends React.Component<FormOrderAddresseeProps, FormOrderAddresseeStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectContact: {},
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('selectContact' in nextProps && nextProps.selectContact !== this.props.selectContact) {
            this.setState({selectContact: nextProps.selectContact});
        }
    }

    renderFooter() {
        return <Button type="dashed">添加联系人</Button>
    }

    onAddClick() {
        this.setState({visible: true});
    }

    onSelect(contact: ModelNameSpace.AddressModel) {
        this.setState({selectContact: contact, visible: false});
    }

    onSaveContact() {
        APINameSpace.MemberAPI.InsertRecipientsAddress(this.state.selectContact as requestNameSpace.InsertRecipientsAddressRequest).then(r => {
            r.Status === 0 && message.success("保存成功");
        });
    }

    renderHeader() {
        return <div>
            <i className={Context.getIconClassName("icon-tianjialianxiren")}/>
            <a onClick={this.onAddClick.bind(this)}>
                <span>选择联系人</span>
            </a>
            <span> | </span>
            <i className={Context.getIconClassName("icon-xuanzelianxiren")}/>
            <a onClick={this.onSaveContact.bind(this)}>
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
        const {selectContact} = this.state;
        const defaultRowSetting: RowProps = {justify: "center", type: "flex"};
        return <FormSettingGroup title={"收件人基本信息"} topBar={this.renderHeader()}>
            <Form>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件人姓名', selectContact.recipient,)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('电话', selectContact.Tel)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('邮编', selectContact.taxno)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件国家', selectContact.country)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件城市', selectContact.City)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('地址', selectContact.Address, 16, true)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('公司', selectContact.companyName)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('税号', selectContact.postalcode)}
                </Row>
            </Form>
            <FormContactInfo readOnly width={800} onOk={this.onSelect.bind(this)} visible={this.state.visible}
                             onCancel={() => this.setState({visible: false})}></FormContactInfo>
        </FormSettingGroup>
    }
}