import * as React from 'react';
import {hashHistory} from 'react-router';
import {Button, Form, message} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {RequestNameSpace} from '../model/request';
import FormItem from "antd/lib/form/FormItem";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import {FormComponentProps} from "antd/lib/form";
import {PathConfig}from "../config/pathconfig";
import {CostCountry} from './quotation-country';

//region 属性定义区，状态定义区
interface MemberAddressAddStates {
    dataSource?: any;
    loading: boolean;
}

interface MemberAddressAddProps extends FormComponentProps {

}


//endregion

//region 新增 MemberAddressAdd
export class MemberAddressAdd extends React.Component<MemberAddressAddProps, MemberAddressAddStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {loading: false};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let model: RequestNameSpace.InsertRecipientsAddressRequest = {
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
                APINameSpace.MemberAPI.InsertRecipientsAddress(model).then(result => {
                    if (result.Status === 0) {
                        this.setState({loading: false});
                        message.success('保存成功');
                        this.returnUrl();
                    }
                    else {
                        this.setState({loading: true});
                    }
                });

            }
        });
    }


    returnUrl() {
        hashHistory.push(PathConfig.MemberAddressPage);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="收件人:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('recipient', {
                        rules: [{required: true, message: '请填写收件人'}],
                    })(
                        <Input placeholder="请填写收件人"/>
                    )}
                </FormItem>
                <FormItem
                    label="电话:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('Tel', {
                        rules: [{required: true, message: '请填写电话'}],
                    })(
                        <Input placeholder="请填写电话"/>
                    )}
                </FormItem>
                <FormItem
                    label="地址:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('Address', {
                        rules: [{required: true, message: '请填写地址'}],
                    })(
                        <TextArea placeholder="请填写收人的详细地址" autosize={{minRows: 4, maxRows: 6}}/>
                    )}
                </FormItem>
                <FormItem
                    label="国家:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('countryModel', {
                        rules: [{required: true, message: '请填写国家'}],
                    })(<CostCountry labelInValue={true} placeholder="请填写国家"></CostCountry>)}
                </FormItem>

                <FormItem
                    label="城市:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('City', {
                        rules: [{required: true, message: '请填写城市'}],
                    })(
                        <Input placeholder="请填写城市"/>
                    )}
                </FormItem>

                <FormItem
                    label="邮编:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('postalcode', {
                        rules: [{required: true, message: '请填写邮编'}],
                    })(
                        <Input placeholder="请填写邮编"/>
                    )}
                </FormItem>

                <FormItem
                    label="公司:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('companyName', {
                        rules: [{required: false, message: '请填写公司名称'}],
                    })(
                        <Input placeholder="请填写公司名称"/>
                    )}
                </FormItem>
                <FormItem
                    label="税号:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('taxno', {
                        rules: [{required: false, message: '请填写税号'}],
                    })(
                        <Input placeholder="请填写税号"/>
                    )}
                </FormItem>

                <FormItem
                    wrapperCol={{span: 12, offset: 5}}
                >
                    {/*<FormControl.FormButtonControl type={ModelNameSpace.ButtonTypeEnum.confirm}*/}
                    {/*loading={this.state.loading}*/}
                    {/*title="保存" url={PathConfig.MemberAddressPage}></FormControl.FormButtonControl>*/}
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button type="primary" onClick={this.returnUrl.bind(this)}>
                        取消
                    </Button>
                </FormItem>

            </Form>
        );
    }

}

//endregion

//region  收件人地址 编辑 查看

interface MemberAddressEditViewStates {

}

interface MemberAddressEditViewProps extends FormComponentProps {
    type?: ModelNameSpace.FormOpertationEnum;
    model: ModelNameSpace.AddressModel;
}


class MemberAddressEidtView extends React.Component<MemberAddressEditViewProps, MemberAddressEditViewStates> {
    constructor(props, context) {
        super(props, context);


    }

    componentDidMount() {
        const ViewModel = this.props.model;
        this.props.form.setFieldsValue({
            ID: ViewModel.ID,
            countryModel: {key: ViewModel.countryCode, label: ViewModel.country},
            recipient: ViewModel.recipient,
            City: ViewModel.City,
            postalcode: ViewModel.postalcode,
            Tel: ViewModel.Tel,
            taxno: ViewModel.taxno,
            companyName: ViewModel.companyName,
            Address: ViewModel.Address
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let model: RequestNameSpace.UpdateRecipientsAddressRequest = {
                    id: this.props.model.ID,
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
                APINameSpace.MemberAPI.UpdateRecipientsAddress(model).then(result => {
                    if (result.Status === 0) {
                        this.returnUrl();
                    }
                    else {

                    }
                });

            }
        });
    }

    returnUrl() {
        hashHistory.push(PathConfig.MemberAddressPage);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const Read = this.props.type === ModelNameSpace.FormOpertationEnum.view
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="收件人:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('recipient', {
                        rules: [{required: true, message: '请填写收件人'}]
                    })(
                        <Input placeholder="请填写收件人" disabled={Read}/>
                    )}
                </FormItem>
                <FormItem
                    label="电话:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('Tel', {
                        rules: [{required: true, message: '请填写电话'}],
                    })(
                        <Input placeholder="请填写电话" disabled={Read}/>
                    )}
                </FormItem>
                <FormItem
                    label="地址:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('Address', {
                        rules: [{required: true, message: '请填写地址'}],
                    })(
                        <TextArea placeholder="请填写收人的详细地址" autosize={{minRows: 4, maxRows: 6}} disabled={Read}/>
                    )}
                </FormItem>
                <FormItem
                    label="国家:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('countryModel', {
                        rules: [{required: false, message: '请填写国家'}],
                    })(<CostCountry labelInValue={true} placeholder="请填写国家" disabled={Read}></CostCountry>)}
                </FormItem>

                <FormItem
                    label="城市:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('City', {
                        rules: [{required: true, message: '请填写城市'}],
                    })(
                        <Input placeholder="请填写城市" disabled={Read}/>
                    )}
                </FormItem>

                <FormItem
                    label="邮编:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('postalcode', {
                        rules: [{required: true, message: '请填写邮编'}],
                    })(
                        <Input placeholder="请填写邮编" disabled={Read}/>
                    )}
                </FormItem>

                <FormItem
                    label="公司:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('companyName', {
                        rules: [{required: false, message: '请填写公司名称'}],
                    })(
                        <Input placeholder="请填写公司名称" disabled={Read}/>
                    )}
                </FormItem>
                <FormItem
                    label="税号:"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('taxno', {
                        rules: [{required: false, message: '请填写税号'}],
                    })(
                        <Input placeholder="请填写税号" disabled={Read}/>
                    )}
                </FormItem>

                <FormItem wrapperCol={{span: 12, offset: 5}}>

                    {Read === true ? <Button type="primary" onClick={this.returnUrl.bind(this)}>确认</Button>
                        : <Button type="primary" htmlType="submit">保存</Button>}
                    <Button type="primary" onClick={this.returnUrl.bind(this)}>取消</Button>

                </FormItem>

            </Form>
        );
    }
}


export default Form.create<any>()(MemberAddressEidtView);

//endregion



