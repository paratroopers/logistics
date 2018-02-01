import * as React from 'react';
import {withRouter} from 'react-router';
import {Select, Spin, Input, Button, Form} from 'antd';
const Option = Select.Option;
import {Context, SelectType} from '../util/common';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {SelectProps} from "antd/lib/select";
import {hashHistory} from 'react-router';
import {ModelNameSpace} from '../model/model';

const FormItem = Form.Item;
const {TextArea} = Input;


export namespace FormControl {

    @withRouter
    export class EnzoDemoPage extends React.Component {

        constructor(props) {
            super(props);
            //  this.fetchUser = debounce(this.fetchUser, 800);
        }

        form: Form;

        handleChange = (value) => {
            this.setState({
                value,
                data: [],
                fetching: false,
            });
        }

        savingdata() {
            return true;
        }

        //   WrappedApp = Form.create()(MemberPageNameSpace.MemberAddressCombinationPage);

        render() {
            return (<div><FormButtonControl title="确认" savingdata={this.savingdata} type={FormControl.ButtonType.confirm}/>
                <FormButtonControl title="取消" savingdata={this.savingdata} type={FormControl.ButtonType.cancel}/>
                <FormButtonControl title="审批" savingdata={this.savingdata} type={FormControl.ButtonType.approve}/>
                <FormButtonControl title="拒绝" savingdata={this.savingdata} type={FormControl.ButtonType.reject}/>
                <FormButtonControl title="确认及审批" savingdata={this.savingdata} type={FormControl.ButtonType.confirmApprove}/>
                <FormButtonControl title="导出" savingdata={this.savingdata} type={FormControl.ButtonType.export}/>
                <FormButtonControl title="删除" savingdata={this.savingdata} type={FormControl.ButtonType.delete}/>
                <FormButtonControl title="新增" savingdata={this.savingdata} type={FormControl.ButtonType.add}/>
                <FormButtonControl title="另存为联系人" savingdata={this.savingdata} type={FormControl.ButtonType.saveascontact}/>
                <FormButtonControl title="选择联系人" savingdata={this.savingdata} type={FormControl.ButtonType.choosecontact}/>
                <FormButtonControl title="查看" savingdata={this.savingdata} type={FormControl.ButtonType.view}/>
                <FormButtonControl title="查询" savingdata={this.savingdata} type={FormControl.ButtonType.search}/>
                <FormButtonControl title="重置" savingdata={this.savingdata} type={FormControl.ButtonType.reset}/>
                <FormButtonControl title="付款" savingdata={this.savingdata} type={FormControl.ButtonType.pay}/>
            </div>);
        }

    }

    export interface FormSelectIndexProps extends SelectProps {
        placeholder: string;
        type: SelectType;
    }

    export interface FormSelectIndexStates {
        data: any[];
        value?: string[];
        fetching?: boolean,

    }

    export class FormSelectIndex extends React.Component<FormSelectIndexProps, FormSelectIndexStates> {
        lastFetchId: number;

        constructor(props, context) {
            super(props, context);
            this.lastFetchId = 0;
            this.state = {
                data: [],
                value: [],
                fetching: false,
            }
        }

        fetchData = (value) => {
            console.log('fetching user', value);
            this.lastFetchId += 1;
            let fetchId = this.lastFetchId;
            this.setState({data: [], fetching: true});
            const type = this.props.type;
            var request: requestNameSpace.UserSearchIndexRequest = {
                name: value,
                type: type
            };
            if (type === SelectType.Member || type === SelectType.CustomerService || type === SelectType.WarehouseAdmin) {
                APINameSpace.MemberAPI.UserSearchIndex(request).then(result => {
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if (result.Status === 0 && result.Data !== null) {
                        const data = result.Data.map(o => ({
                            text: `${o.MemeberCode}`,
                            value: o.Userid
                        }));
                        this.setState({
                            data: data, fetching: false
                        });

                    }
                });
            }
            else if (type === SelectType.CustomerOrder) {
                APINameSpace.CustomerOrderAPI.OrderSearchIndex(request).then(result => {
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if (result.Status === 0 && result.Data !== null) {
                        const data = result.Data.map(o => ({
                            text: `${o.CustomerOrderNo}`,
                            value: o.CustomerOrderNo
                        }));
                        this.setState({
                            data: data, fetching: false
                        });

                    }
                });
            }
            else if (type === SelectType.ExpressNo) {
                APINameSpace.CustomerOrderAPI.OrderSearchIndex(request).then(result => {
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if (result.Status === 0 && result.Data !== null) {
                        const data = result.Data.map(o => ({
                            text: `${o.expressNo}`,
                            value: o.expressNo
                        }));
                        this.setState({
                            data: data, fetching: false
                        });

                    }
                });
            }
        }

        handleChange = (value) => {
            this.setState({
                value,
                data: [],
                fetching: false,
            });
            this.props.onChange(value);
        }


        render() {
            const {fetching, data, value} = this.state;
            return (
                <Select
                    mode="multiple"
                    labelInValue
                    value={value}
                    placeholder={this.props.placeholder}
                    notFoundContent={fetching ? <Spin size="small"/> : null}
                    filterOption={false}
                    onSearch={this.fetchData}
                    onChange={this.handleChange}
                    style={{width: '100%'}}
                >
                    {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
            );
        }

    }

    export  enum ButtonType {
        confirm = 1,
        cancel = 2,
        approve = 3,
        reject = 4,
        confirmApprove = 5,
        package = 6,
        export = 7,
        delete = 8,
        add = 9,
        saveascontact =10,
        choosecontact =11,
        view = 12,
        search = 13,
        reset =14,
        pay = 15

    }

    interface FormButtonControlProps {
        title: string;
        savingdata: () => boolean;
        type: FormControl.ButtonType;
        size?:any;
    }

    interface FormButtonControlState {
        loading: boolean;
    }

    export class FormButtonControl extends React.Component<FormButtonControlProps, FormButtonControlState> {
        constructor(props, context) {
            super(props, context);
            this.state = {loading: false};
        }



        loadingIcon = ():string => {
            if (this.props.type === FormControl.ButtonType.confirm) {
                return "icon-queding";
            } else if (this.props.type === FormControl.ButtonType.cancel)
                return "icon-cancel";
            else if (this.props.type === FormControl.ButtonType.reject) {
                return "icon-icon-";
            } else if (this.props.type === FormControl.ButtonType.confirmApprove) {
                return "icon-shengpi";
            } else  if (this.props.type === FormControl.ButtonType.approve){
                return "icon-shengpi";
            }else  if(this.props.type === FormControl.ButtonType.package){
                return "icon-dabaocaiji";
            }
            else  if(this.props.type === FormControl.ButtonType.delete){
                return "icon-105";
            }
            else  if(this.props.type === FormControl.ButtonType.add){
                return "icon-tianjia";
            }
            else  if(this.props.type === FormControl.ButtonType.saveascontact){
                return "icon-tianjialianxiren";
            }
            else  if(this.props.type === FormControl.ButtonType.choosecontact){
                return "icon-xuanzelianxiren";
            }
            else  if(this.props.type === FormControl.ButtonType.view){
                return "icon-chakan";
            }
            else  if(this.props.type === FormControl.ButtonType.search){
                return "icon-sousuo";
            }
            else  if(this.props.type === FormControl.ButtonType.reset){
                return "icon-11zhongzhi";
            }
            else  if(this.props.type === FormControl.ButtonType.pay){
                return "icon-shouye";
            }
            else  if(this.props.type === FormControl.ButtonType.export){
                return "icon-daochu";
            }

        }


        enterLoading = () => {
            this.setState({loading: true});
            console.log(this.props.savingdata());
            if (this.props.savingdata()) {
                this.cancelLoading();
                hashHistory.goBack();
            }

        }

        cancelLoading = () => {

            this.setState({loading: false});
        }

        render() {
            const style = this.props.size ? {fontSize: this.props.size} : {};
            const  icon = Context.getIconClassName(this.loadingIcon().toString());
            return (
                <span>
        <Button type="primary" loading={this.state.loading}
                onClick={this.enterLoading}>     <i className={icon} style={style}>{this.props.title}  </i> </Button>
      </span>
            );
        }
    }

}

export namespace MemberPageNameSpace {

    interface MemberAddressCombinationPageProps {
        form: any;
    }

    interface MemberAddressCombinationPageState {

    }

    export class MemberAddressCombinationPage extends React.Component<MemberAddressCombinationPageProps, MemberAddressCombinationPageState> {
        constructor(props, context) {
            super(props, context);
        }

        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);

                }
            });
        }

        handleSelectChange = (value) => {
            console.log(value);
            this.props.form.setFieldsValue({
                note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
            });
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

}




