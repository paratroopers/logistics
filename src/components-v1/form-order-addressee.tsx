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
import {Context} from '../util/common';
import {CostCountry} from './quotation-country';
import {FormReadyOnlyContent, ReadyOnlyContentItemModel} from './form-readyonly-conetnt';

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
        this.props.form.setFieldsValue({
            ID: contact.ID,
            countryModel: {key: contact.countryCode, label: contact.country},
            recipient: contact.recipient,
            City: contact.City,
            postalcode: contact.postalcode,
            Tel: contact.Tel,
            taxno: contact.taxno,
            companyName: contact.companyName,
            Address: contact.Address
        });
        this.setState({selectContact: contact, visible: false});
    }

    onSaveContact() {
        this.props.form.validateFields(["countryModel", "recipient", "City", "postalcode", "Tel", "taxno", "companyName", "Address"], (err, values) => {
            if (!err) {
                let request: RequestNameSpace.InsertRecipientsAddressRequest = {
                    country: values.countryModel.label,
                    countryCode: values.countryModel.key,
                    recipient: values.recipient,
                    City: values.City,
                    postalcode: values.postalcode,
                    Tel: values.Tel,
                    taxno: values.taxno,
                    companyName: values.companyName,
                    Address: values.Address
                };
                APINameSpace.MemberAPI.InsertRecipientsAddress(request).then((r: ResponseNameSpace.BaseResponse) => {
                    if (r.Status === 0)
                        message.success("保存成功");
                });
            }
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

    renderRow(label?: string, type?: "TextArea"
        | "CostCountry", noRequired?: boolean, fieldName?: string, defaultValue?: any, layout?: any) {
        const {readOnly} = this.props;

        const spanLayout = layout ? layout : {
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 6
        }

        if (readOnly) {
            const readyOnlyData: ReadyOnlyContentItemModel = {
                conetent: type === "CostCountry" ? defaultValue.lable : defaultValue,
                lable: label,
                lableCol: 6,
                conetntCol: label === '国家' ? 18 : 6,
            };
            return FormReadyOnlyContent(readyOnlyData);
        }
        else {
            let FormItem;
            switch (type) {
                case 'TextArea':
                    FormItem = <Input.TextArea placeholder={readOnly ? "" : '请输入'}></Input.TextArea>;
                    break;
                case 'CostCountry':
                    FormItem = <CostCountry labelInValue={true} placeholder={readOnly ? "" : '请输入'}></CostCountry>
                    break;
                default:
                    FormItem = <Input placeholder={readOnly ? "" : '请输入'}></Input>;
                    break;
            }

            return <Col {...spanLayout}>
                <Form.Item label={label} required={readOnly ? false : !noRequired}>
                    {this.props.form ? this.props.form.getFieldDecorator(fieldName, {
                        initialValue: defaultValue,
                        rules: [{
                            required: !noRequired,
                            message: ' '
                        }]
                    })(FormItem)
                        : FormItem}
                </Form.Item>
            </Col>
        }
    }

    render() {
        const topThis = this;
        const {state: {selectContact}, props: {readOnly}} = topThis;
        const defaultRowSetting: RowProps = {type: "flex", gutter: 16};
        return <FormSettingGroup title={"收件人基本信息"} topBar={this.renderHeader()}>
            <Form className="form-order-address" layout={readOnly ? "inline" : "vertical"}>
                <Row {...defaultRowSetting}>
                    {this.renderRow('姓名', null, false, 'recipient', selectContact.recipient)}
                    {this.renderRow('电话', null, false, 'Tel', selectContact.Tel)}
                    {this.renderRow('国家', "CostCountry", false, 'countryModel', {
                        key: selectContact.countryCode,
                        lable: selectContact.country
                    })}
                    {this.renderRow('城市', null, false, 'City', selectContact.City)}
                    {this.renderRow('邮编', null, false, 'taxno', selectContact.taxno)}
                    {this.renderRow('税号', null, true, 'postalcode', selectContact.postalcode)}
                    {this.renderRow('公司', null, true, 'companyName', selectContact.companyName, {
                        xs: 24,
                        sm: 24,
                        md: 24,
                        lg: 24,
                        xl: 12
                    })}
                    {this.renderRow('地址', 'TextArea', false, 'Address', selectContact.Address, {span: 24})}
                </Row>
            </Form>
            <FormContactInfo readOnly width={800} onOk={this.onSelect.bind(this)} visible={this.state.visible}
                             onCancel={() => this.setState({visible: false})}></FormContactInfo>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderAddressee);