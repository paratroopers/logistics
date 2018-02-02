import * as React from 'react';
import {Select, Spin, Input, Button, Form} from 'antd';
const Option = Select.Option;
import {Context, SelectType} from '../util/common';
import {APINameSpace} from '../model/api';
import {requestNameSpace} from '../model/request';
import {SelectProps} from "antd/lib/select";
import {hashHistory} from 'react-router';
import {ModelNameSpace} from '../model/model';
import {isNullOrUndefined} from "util";
const FormItem = Form.Item;
const {TextArea} = Input;
const  ButtonType = ModelNameSpace.ButtonTypeEnum;

export  namespace FormControl{


    //region    属性  状态定义区

    export interface FormSelectIndexProps extends SelectProps {
        placeholder: string;
        type: SelectType;
    }

    export interface FormSelectIndexStates {
        data: any[];
        value?: string[];
        fetching?: boolean,

    }


    interface FormButtonControlProps {
        title: string;
        savingdata: () => boolean;
        type: ModelNameSpace.ButtonTypeEnum;
        size?:any;
        url?:any;
    }


    interface FormButtonControlState {
        loading: boolean;
    }

    //endregion


    //region select 控件, Button控件
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
    export class FormButtonControl extends React.Component<FormButtonControlProps, FormButtonControlState> {
        constructor(props, context) {
            super(props, context);
            this.state = {loading: false};
        }
        loadingIcon = ():string => {
            if (this.props.type === ButtonType.confirm) {
                return "icon-queding";
            } else if (this.props.type === ButtonType.cancel)
                return "icon-cancel";
            else if (this.props.type === ButtonType.reject) {
                return "icon-icon-";
            } else if (this.props.type === ButtonType.confirmApprove) {
                return "icon-shengpi";
            } else  if (this.props.type === ButtonType.approve){
                return "icon-shengpi";
            }else  if(this.props.type === ButtonType.package){
                return "icon-dabaocaiji";
            }
            else  if(this.props.type === ButtonType.delete){
                return "icon-105";
            }
            else  if(this.props.type === ButtonType.add){
                return "icon-tianjia";
            }
            else  if(this.props.type === ButtonType.saveascontact){
                return "icon-tianjialianxiren";
            }
            else  if(this.props.type === ButtonType.choosecontact){
                return "icon-xuanzelianxiren";
            }
            else  if(this.props.type === ButtonType.view){
                return "icon-chakan";
            }
            else  if(this.props.type === ButtonType.search){
                return "icon-sousuo";
            }
            else  if(this.props.type === ButtonType.reset){
                return "icon-11zhongzhi";
            }
            else  if(this.props.type === ButtonType.pay){
                return "icon-shouye";
            }
            else  if(this.props.type === ButtonType.export){
                return "icon-daochu";
            }

        }
        enterLoading = () => {
            this.setState({loading: true});
            console.log(this.props.savingdata());
            if (this.props.savingdata()) {
                this.cancelLoading();
                if (!isNullOrUndefined(this.props.url)){
                    hashHistory.push(this.props.url);
                }
                else {
                    hashHistory.goBack();
                }
             //   hashHistory.push({pathname: obj.key});
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

    //endregion
}