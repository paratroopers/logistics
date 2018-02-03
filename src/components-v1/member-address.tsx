import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Table, Button, Divider, Form} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormControl} from '../components-v1/form-control';
import FormItem from "antd/lib/form/FormItem";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import {FormComponentProps} from "antd/lib/form";

//region 属性定义区，状态定义区
interface MemberAddressAddStates {
    dataSource?: any;
    loading: boolean;
}

interface MemberAddressAddProps extends FormComponentProps {

}

interface MemberAddressViewStates {
    dataSource: any;
}

interface MemberAddressViewProps extends FormComponentProps {
    id: string;
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
                console.log('Received values of form: ', values);
                let model: requestNameSpace.InsertRecipientsAddressRequest = {
                    country: values.country,
                    recipient: values.recipient,
                    City: values.City,
                    postalcode: values.postalcode,
                    Tel: values.Tel,
                    taxno: values.taxno,
                    companyName: values.companyName,
                    Address: values.Address
                };
                console.log(model);
                APINameSpace.MemberAPI.InsertRecipientsAddress(model).then(result => {
                    if (result.Status === 0) {
                        this.setState({loading: false});
                    }
                    else {
                        this.setState({loading: true});
                    }
                });

            }
        });
    }

    handleSelectChange = (value) => {
        console.log(value);
        // this.props.form.setFieldsValue({
        //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        // });
    }

    savingdata = () => {
        return false;
    };

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
                    {getFieldDecorator('country', {
                        rules: [{required: false, message: '请填写国家'}],
                    })(
                        <Input placeholder="请填写国家"/>
                    )}
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
                    <FormControl.FormButtonControl type={ModelNameSpace.ButtonTypeEnum.confirm}
                                                   loading={this.state.loading}
                                                   title="保存"></FormControl.FormButtonControl>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                    <Button type="primary" htmlType="submit">
                        取消
                    </Button>
                </FormItem>

            </Form>
        );
    }

}

//endregion

//region 查看 MemberAddressEidt

interface MemberAddressEditStates {
    loading?: boolean;
    dataSource?: ModelNameSpace.AddressModel;
}

interface MemberAddressEditProps extends FormComponentProps {
    id: string;
    type?:ModelNameSpace.FormOpertationEnum;
}

class MemberAddressEidt extends React.Component<MemberAddressEditProps, MemberAddressEditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false, dataSource: {
                country: "",
                recipient: "",
                City: "",
                postalcode: "",
                Tel: "",
                taxno: "",
                companyName: "",
                Address: ""
            }
        };
        this.loadingData();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let model: requestNameSpace.UpdateRecipientsAddressRequest = {
                    id:this.props.id,
                    country: values.country,
                    recipient: values.recipient,
                    City: values.City,
                    postalcode: values.postalcode,
                    Tel: values.Tel,
                    taxno: values.taxno,
                    companyName: values.companyName,
                    Address: values.Address
                };
                console.log(model);
                APINameSpace.MemberAPI.UpdateRecipientsAddress(model).then(result => {
                    if (result.Status === 0) {
                        this.setState({loading: false});
                    }
                    else {
                        this.setState({loading: true});
                    }
                });

            }
        });
    }

    handleSelectChange = (value) => {
        console.log(value);
        // this.props.form.setFieldsValue({
        //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        // });
    }

    loadingData() {
        let data: requestNameSpace.GetRecipientsAddressRequest = {
            id: this.props.id
        };
        APINameSpace.MemberAPI.GetRecipientsAddress(data).then(result => {

            if (result.Status === 0) {
                var resultData = result.Data;
                this.props.form.setFieldsValue({
                    country: resultData.recipient,
                    recipient: resultData.recipient,
                    City: resultData.City,
                    postalcode: resultData.postalcode,
                    Tel: resultData.Tel,
                    taxno: resultData.taxno,
                    companyName: resultData.companyName,
                    Address: resultData.Address
                });


            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formType = this.props.type;
        const  Read = this.props.type === ModelNameSpace.FormOpertationEnum.view
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
                    {getFieldDecorator('country', {
                        rules: [{required: false, message: '请填写国家'}],
                    })(
                        <Input placeholder="请填写国家" disabled={Read}/>
                    )}
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

                    {Read === true ?<FormControl.FormButtonControl type={ModelNameSpace.ButtonTypeEnum.confirm} loading={this.state.loading} title="确认"></FormControl.FormButtonControl>
                        :
                        <FormControl.FormButtonControl type={ModelNameSpace.ButtonTypeEnum.confirm} loading={this.state.loading} title="保存"></FormControl.FormButtonControl>}

                    <FormControl.FormButtonControl type={ModelNameSpace.ButtonTypeEnum.cancel}  title="取消"></FormControl.FormButtonControl>

                </FormItem>

            </Form>
        );
    }

}


export default Form.create<any>()(MemberAddressEidt);

//endregion

