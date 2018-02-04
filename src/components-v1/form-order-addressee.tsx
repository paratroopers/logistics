import * as React from 'react';
import {concat} from 'react-redux';
import {Input, Button, Row, Col, Form, message} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {FormSettingGroup} from './form-setting-group';
import {FormContactInfo} from './form-contact-info';
import {ModelNameSpace} from '../model/model';
import {Context} from '../util/common';

export interface FormOrderAddresseeProps extends FormComponentProps {
    readOnly?: boolean;
    selectContact?: ModelNameSpace.AddressModel;
}

export interface FormOrderAddresseeStates {
    selectContact?: ModelNameSpace.AddressModel;
    visible?: boolean;
}

class FormOrderAddressee extends React.Component<FormOrderAddresseeProps, FormOrderAddresseeStates> {
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
        this.props.form.setFieldsValue({...contact});
        this.setState({selectContact: contact, visible: false});
    }

    onSaveContact() {
        this.props.form.validateFields((errors: any, values: any) => {
            if (errors) {
                return;
            }
            APINameSpace.MemberAPI.InsertRecipientsAddress(this.state.selectContact as requestNameSpace.InsertRecipientsAddressRequest).then(r => {
                r.Status === 0 && message.success("保存成功");
            });
        })
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

    renderRow(label?: string, isTextArea?: boolean, noRequired?: boolean, fieldName?: string) {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 18}};
        return <Col span={12}>
            <Form.Item label={label} {...formItemLayout} required={!noRequired}>
                {
                    isTextArea ? getFieldDecorator(fieldName, {
                            initialValue: '',
                            rules: [{
                                required: !noRequired,
                                message: '请填写' + label
                            }]
                        })(<Input.TextArea placeholder={'请输入'}></Input.TextArea>)
                        : getFieldDecorator(fieldName, {
                            initialValue: '',
                            rules: [{
                                required: !noRequired,
                                message: '请填写' + label
                            }]
                        })(<Input placeholder={'请输入'}></Input>)
                }
            </Form.Item>
        </Col>
    }

    render() {
        const defaultRowSetting: RowProps = {justify: "center", type: "flex"};
        return <FormSettingGroup title={"收件人基本信息"} topBar={this.renderHeader()}>
            <Form>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件人姓名', false, false, 'recipient')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('电话', false, false, 'Tel')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('邮编', false, false, 'taxno')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件国家', false, false, 'country')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件城市', false, false, 'City')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('公司', false, true, 'companyName')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('税号', false, true, 'postalcode')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('地址', true, false, 'Address')}
                </Row>
            </Form>
            <FormContactInfo readOnly width={800} onOk={this.onSelect.bind(this)} visible={this.state.visible}
                             onCancel={() => this.setState({visible: false})}></FormContactInfo>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderAddressee);