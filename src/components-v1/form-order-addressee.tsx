import * as React from 'react';
import {Input, Row, Col, Form, message} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
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
            selectContact: props.selectContact ? props.selectContact : {},
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('selectContact' in nextProps && nextProps.selectContact !== this.props.selectContact) {
            this.setState({selectContact: nextProps.selectContact});
        }
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
            APINameSpace.MemberAPI.InsertRecipientsAddress(this.state.selectContact as requestNameSpace.InsertRecipientsAddressRequest).then((r:ResponseNameSpace.BaseResponse) => {
                if(r.Status === 0)
                    message.success("保存成功");
            });
        })
    }

    renderHeader() {
        return this.props.readOnly ? null : <div>
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

    renderRow(label?: string, isTextArea?: boolean, noRequired?: boolean, fieldName?: string,defaultValue?:any) {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 18}};
        return <Col span={12}>
            <Form.Item label={label} {...formItemLayout} required={!noRequired}>
                {
                    isTextArea ? getFieldDecorator(fieldName, {
                            initialValue: defaultValue,
                            rules: [{
                                required: !noRequired,
                                message: '请填写' + label
                            }]
                        })(<Input.TextArea disabled={this.props.readOnly} placeholder={'请输入'}></Input.TextArea>)
                        : getFieldDecorator(fieldName, {
                            initialValue: defaultValue,
                            rules: [{
                                required: !noRequired,
                                message: '请填写' + label
                            }]
                        })(<Input disabled={this.props.readOnly} placeholder={'请输入'}></Input>)
                }
            </Form.Item>
        </Col>
    }

    render() {
        const topThis=this;
        const {state:{selectContact}}=topThis;
        const defaultRowSetting: RowProps = {justify: "center", type: "flex"};
        return <FormSettingGroup title={"收件人基本信息"} topBar={this.renderHeader()}>
            <Form>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件人姓名', false, false, 'recipient',selectContact.recipient)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('电话', false, false, 'Tel',selectContact.Tel)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('邮编', false, false, 'taxno',selectContact.taxno)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('国家', false, false, 'country',selectContact.country)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('城市', false, false, 'City',selectContact.City)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('公司', false, true, 'companyName',selectContact.companyName)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('税号', false, true, 'postalcode',selectContact.postalcode)}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('地址', true, false, 'Address',selectContact.Address)}
                </Row>
            </Form>
            <FormContactInfo readOnly width={800} onOk={this.onSelect.bind(this)} visible={this.state.visible}
                             onCancel={() => this.setState({visible: false})}></FormContactInfo>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderAddressee);