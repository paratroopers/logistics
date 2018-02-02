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
    dataSource: any;
}

interface MemberAddressAddProps extends FormComponentProps {

}

interface MemberAddressViewStates {
    dataSource: any;
}

interface MemberAddressViewProps extends FormComponentProps {

}

interface MemberAddressEditStates {
    dataSource: any;
}

interface MemberAddressEditProps extends FormComponentProps {

}

//endregion

//region 新增 MemberAddressAdd
export class MemberAddressAdd extends React.Component<MemberAddressAddProps, MemberAddressAddStates> {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let model: requestNameSpace.InsertRecipientsAddressRequest = {
                    recipient: values.recipient,
                    Tel: values.Tel,
                    Address: values.Address,
                    country: values.country,
                    City: values.City,
                    postalcode: values.postalcode,
                    companyName: values.companyName,
                    taxno: values.taxno
                };
                APINameSpace.MemberAPI.InsertRecipientsAddress(model).then(()=>{

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
                                                   savingdata={this.savingdata}
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
export class MemberAddressEidt extends React.Component<MemberAddressEditProps, MemberAddressEditStates> {
    constructor(props) {
        super(props);
        this.state = {dataSource: []};
    }

    returnVaule = [];

    loadData() {
        APINameSpace.MemberAPI.GetRecipientsAddressAll().then((result) => {
            if (result.Data !== null) {
                result.Data.map((r) => {
                    this.returnVaule.push({
                        key: r.ID,
                        recipient: r.recipient,
                        country: r.country,
                        Address: r.Address,
                        Tel: r.Tel
                    });
                });
                this.setState({dataSource: this.returnVaule});
            }
        });
    }

    columns = [{
        title: '收件人',
        dataIndex: 'recipient',
        key: 'recipient',
    }, {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
    }, {
        title: '地址',
        dataIndex: 'Address',
        key: 'Address',
    }, {
        title: '电话',
        dataIndex: 'Tel',
        key: 'Tel',
    }, {
        title: '',
        key: 'action',
        render: (text, record) => (
            <span>
      <a href="#">查看</a>
      <Divider type="vertical"/>
      <a href="#">修改</a>
      <Divider type="vertical"/>
      <a href="#">删除</a>
    </span>
        ),
    }];


    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
        }),
    };

    savingdata = () => {
        return true;
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (<Row className="member-address-page">
            <ContentHeaderControl title="收件人地址"></ContentHeaderControl>
            <FormControl.FormButtonControl savingdata={this.savingdata} title="确认"
                                           type={ModelNameSpace.ButtonTypeEnum.confirm}/>
            <FormControl.FormButtonControl savingdata={this.savingdata} title="新增收件人"
                                           type={ModelNameSpace.ButtonTypeEnum.add}/>
            <Table rowSelection={this.rowSelection} dataSource={this.state.dataSource} columns={this.columns}
                   pagination={false}/>
        </Row>)
    }

}

//endregion

//region 编辑 MemberAddressView
export class MemberAddressView extends React.Component<MemberAddressViewProps, MemberAddressViewStates> {
    constructor(props) {
        super(props);
        this.state = {dataSource: []};
    }

    returnVaule = [];

    loadData() {
        APINameSpace.MemberAPI.GetRecipientsAddressAll().then((result) => {
            if (result.Data !== null) {
                result.Data.map((r) => {
                    this.returnVaule.push({
                        key: r.ID,
                        recipient: r.recipient,
                        country: r.country,
                        Address: r.Address,
                        Tel: r.Tel
                    });
                });
                this.setState({dataSource: this.returnVaule});
            }
        });
    }

    columns = [{
        title: '收件人',
        dataIndex: 'recipient',
        key: 'recipient',
    }, {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
    }, {
        title: '地址',
        dataIndex: 'Address',
        key: 'Address',
    }, {
        title: '电话',
        dataIndex: 'Tel',
        key: 'Tel',
    }, {
        title: '',
        key: 'action',
        render: (text, record) => (
            <span>
      <a href="#">查看</a>
      <Divider type="vertical"/>
      <a href="#">修改</a>
      <Divider type="vertical"/>
      <a href="#">删除</a>
    </span>
        ),
    }];


    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
        }),
    };

    savingdata = () => {
        return true;
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (<Row className="member-address-page">
            <ContentHeaderControl title="收件人地址"></ContentHeaderControl>
            <FormControl.FormButtonControl savingdata={this.savingdata} title="确认"
                                           type={ModelNameSpace.ButtonTypeEnum.confirm}/>
            <FormControl.FormButtonControl savingdata={this.savingdata} title="新增收件人"
                                           type={ModelNameSpace.ButtonTypeEnum.add}/>
            <Table rowSelection={this.rowSelection} dataSource={this.state.dataSource} columns={this.columns}
                   pagination={false}/>
        </Row>)
    }

}

//endregion
