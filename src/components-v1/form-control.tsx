import * as React from 'react';
import {Select, Spin, Input, Button, Form, Icon} from 'antd';

const Option = Select.Option;
import {Context, SelectType} from '../util/common';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {SelectProps} from "antd/lib/select";
import {hashHistory} from 'react-router';
import {ModelNameSpace} from '../model/model';
import {isArray, isNullOrUndefined} from "util";
import {LabeledValue} from "antd/lib/select";
import {ButtonProps} from "antd/lib/button";
import {ResponseNameSpace} from "../model/response";

const FormItem = Form.Item;
const {TextArea} = Input;
const ButtonType = ModelNameSpace.ButtonTypeEnum;

export namespace FormControl {


    //region    属性  状态定义区

    export interface FormSelectIndexProps extends SelectProps {
        readonly?:boolean;
        placeholder: string;
        type: SelectType;
        value?: LabeledValue;
        isadmin?: boolean;
    }

    export interface FormSelectIndexStates {
        data: any[];
        fetching?: boolean
    }

    interface FormButtonControlProps {
        title: string;
        loading?: boolean;
        type: ModelNameSpace.ButtonTypeEnum;
        size?: any;
        url?: any;
        handleClick?: () => {};
    }


    interface FormButtonControlState {
        loading: boolean;
    }

    //endregion


    //region select索引控件, Button控件 Select 控件
    export class FormSelectIndex extends React.Component<FormSelectIndexProps, FormSelectIndexStates> {
        lastFetchId: number;

        constructor(props, context) {
            super(props, context);
            this.lastFetchId = 0;
            this.state = {
                data: [],
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
            else if (type === SelectType.CustomerOrderMerge) {

                let req: requestNameSpace.GetCustomerOrderMergeRequest = {
                    pageIndex: 1,
                    pageSize: 1000,
                    isAdmin: this.props.isadmin
                };

                APINameSpace.MemberAPI.GetCustomerOrdersMerge(req).then((result: ResponseNameSpace.GetCustomerOrderMergeListResponse) => {
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if (result.Status === 0 && result.Data !== null) {
                        const data = result.Data.map(o => ({
                            text: `${o.MergeOrderNo}`,
                            value: o.ID
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
            } else if (type === SelectType.Agent) {
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
                data: [],
                fetching: false,
            });
            this.props.onChange(value);
        }

        render() {
            const topThis = this;
            const {props: {value, disabled, readonly}, state: {fetching, data}} = topThis;
            return !readonly ? <Select
                disabled={disabled}
                mode="multiple"
                labelInValue
                value={value}
                placeholder={this.props.placeholder}
                notFoundContent={fetching ? <Spin size="small"/> : null}
                filterOption={false}
                onSearch={this.fetchData}
                onChange={this.handleChange}
                style={{width: '100%'}}>
                {data.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select> : <label style={{width: '100%'}}>{value ? value.label : ""}</label>;
        }

    }

    export class FormButtonControl extends React.Component<FormButtonControlProps, FormButtonControlState> {
        constructor(props, context) {
            super(props, context);
            this.state = {loading: this.props.loading};

        }

        loadingIcon = (): string => {
            if (this.props.type === ButtonType.confirm) {
                return "icon-queding";
            } else if (this.props.type === ButtonType.cancel)
                return "icon-cancel";
            else if (this.props.type === ButtonType.reject) {
                return "icon-icon-";
            } else if (this.props.type === ButtonType.confirmApprove) {
                return "icon-shengpi";
            } else if (this.props.type === ButtonType.approve) {
                return "icon-shengpi";
            } else if (this.props.type === ButtonType.package) {
                return "icon-dabaocaiji";
            }
            else if (this.props.type === ButtonType.delete) {
                return "icon-105";
            }
            else if (this.props.type === ButtonType.add) {
                return "icon-tianjia";
            }
            else if (this.props.type === ButtonType.saveascontact) {
                return "icon-tianjialianxiren";
            }
            else if (this.props.type === ButtonType.choosecontact) {
                return "icon-xuanzelianxiren";
            }
            else if (this.props.type === ButtonType.view) {
                return "icon-chakan";
            }
            else if (this.props.type === ButtonType.search) {
                return "icon-sousuo";
            }
            else if (this.props.type === ButtonType.reset) {
                return "icon-11zhongzhi";
            }
            else if (this.props.type === ButtonType.pay) {
                return "icon-shouye";
            }
            else if (this.props.type === ButtonType.export) {
                return "icon-daochu";
            }

        }
        enterLoading = () => {
            if (isNullOrUndefined(this.props.url)) {
                this.props.handleClick();
            }

            this.setState({loading: true});
            if (!isNullOrUndefined(this.props.url)) {
                hashHistory.push(this.props.url);
            }
        }

        componentWillReceiveProps(nextProps) {
            if ('loading' in nextProps) {
                this.setState({loading: false});

            }
        }


        render() {
            const style = this.props.size ? {fontSize: this.props.size} : {};
            const icon = Context.getIconClassName(this.loadingIcon().toString());
            return (
                <span>
        <Button type="primary" loading={this.state.loading}
                onClick={this.enterLoading} htmlType="submit">     <i className={icon}
                                                                      style={style}>{this.props.title}  </i> </Button>
      </span>
            );
        }
    }

    interface FormSelectProps extends SelectProps {
        value?: LabeledValue,
        type: SelectType
    }

    interface FormSelectStates {
        selectData?: LabeledValue[]
    }

    export class FormSelect extends React.Component<FormSelectProps, FormSelectStates> {
        constructor(props, content) {
            super(props, content);
            this.state = {
                selectData: []
            }
        }

        componentDidMount() {
            this.onLoadData();
        }

        /** 获取数据源*/
        onLoadData() {
            const topThis = this;
            let data: LabeledValue[];
            const type = this.props.type;
            if (type === SelectType.channel) {
                APINameSpace.SystemAPI.GetChannelAll().then((result) => {
                    if (result.Data !== null && result.Status === 0) {
                        data = result.Data.map(o => ({
                            key: o.ID,
                            label: o.Name
                        }));
                        topThis.setState({selectData: data});
                    }
                })
            }
            else if (type === SelectType.CustomerOrderMergeWaitForApproveStep) {
                APINameSpace.SystemAPI.GetCustomerOrderMergeStep().then((result) => {
                    if (result.Data !== null && result.Status === 0) {
                        data = result.Data.map(o => ({
                            key: o.ID,
                            label: o.value
                        }));
                        topThis.setState({selectData: data});
                    }
                })
            }
        }


        renderOption() {
            const topThis = this;
            const {state: {selectData}} = topThis;
            const options = [];
            if (!isNullOrUndefined(selectData)) {
                selectData.map(function (item, index) {
                    options.push(<Option value={item.key} key={index}>{item.label}</Option>);
                })
            }
            return options;
        }

        render() {
            const topThis = this;
            const {props: {value, ...otherProps}} = topThis;
            return <Select allowClear={true} labelInValue value={value} {...otherProps} showSearch
                           optionFilterProp="children"
                           filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {topThis.renderOption()}
            </Select>;
        }
    }

    //endregion
}