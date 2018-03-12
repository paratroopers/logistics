import * as React from 'react';
import {Input, Row, Col, Form, message} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {APINameSpace} from '../model/api';
import {RequestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {FormSettingGroup} from './form-setting-group';
import {FormContactInfo} from './form-contact-info';
import {ModelNameSpace} from '../model/model';
import {Context, Constants} from '../util/common';

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
            APINameSpace.MemberAPI.InsertRecipientsAddress(this.state.selectContact as RequestNameSpace.InsertRecipientsAddressRequest).then((r: ResponseNameSpace.BaseResponse) => {
                if (r.Status === 0)
                    message.success("保存成功");
            });
        })
    }

    renderHeader() {
        return this.props.readOnly ? null : <div>
            <i className={Context.getIconClassName("icon-xuanzelianxiren")}/>
            <a onClick={this.onAddClick.bind(this)}>
                <span>选择联系人</span>
            </a>
            <span> | </span>
            <i className={Context.getIconClassName("icon-tianjialianxiren")}/>
            <a onClick={this.onSaveContact.bind(this)}>
                <span>另存为联系人</span>
            </a>
        </div>
    }

    renderRow(label?: string, isTextArea?: boolean, noRequired?: boolean, fieldName?: string, defaultValue?: any, layout?: any) {
        const {form: {getFieldDecorator}, readOnly} = this.props;

        const spanLayout = layout ? layout : {
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 6
        }

        if (readOnly)
            return <Col {...spanLayout}>
                <Form.Item label={label}>
                    {
                        <label>{defaultValue}</label>
                    }
                </Form.Item>
            </Col>;
        else
            return <Col {...spanLayout}>
                <Form.Item label={label} required={readOnly ? false : !noRequired}>
                    {
                        isTextArea ? getFieldDecorator(fieldName, {
                            initialValue: defaultValue,
                            rules: [{
                                required: !noRequired,
                                message: '必填'
                            }]
                        })(<Input.TextArea disabled={this.props.readOnly}
                                           placeholder={readOnly ? "" : '请输入'}></Input.TextArea>)
                            : getFieldDecorator(fieldName, {
                            initialValue: defaultValue,
                            rules: [{
                                required: !noRequired,
                                message: '必填'
                            }]
                        })(<Input disabled={this.props.readOnly} placeholder={readOnly ? "" : '请输入'}></Input>)
                    }
                </Form.Item>
            </Col>
    }

    render() {
        const topThis = this;
        const {state: {selectContact}, props: {readOnly}} = topThis;
        const defaultRowSetting: RowProps = {type: "flex", gutter: 16};
        return <FormSettingGroup title={"收件人基本信息"} topBar={this.renderHeader()}>
            <Form className="form-order-address" layout={readOnly ? "inline" : "vertical"}>
                <Row {...defaultRowSetting}>
                    {this.renderRow('姓名', false, false, 'recipient', selectContact.recipient)}
                    {this.renderRow('电话', false, false, 'Tel', selectContact.Tel)}
                    {this.renderRow('国家', false, false, 'country', selectContact.country)}
                    {this.renderRow('城市', false, false, 'City', selectContact.City)}
                    {this.renderRow('邮编', false, false, 'taxno', selectContact.taxno)}
                    {this.renderRow('税号', false, true, 'postalcode', selectContact.postalcode)}
                    {this.renderRow('公司', false, true, 'companyName', selectContact.companyName, {
                        xs: 24,
                        sm: 24,
                        md: 24,
                        lg: 24,
                        xl: 12
                    })}
                    {this.renderRow('地址', true, false, 'Address', selectContact.Address, {span: 24})}
                </Row>
            </Form>
            <FormContactInfo readOnly width={800} onOk={this.onSelect.bind(this)} visible={this.state.visible}
                             onCancel={() => this.setState({visible: false})}></FormContactInfo>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderAddressee);