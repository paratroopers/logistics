import * as React from 'react';
import {withRouter} from 'react-router';
import { Select, Spin } from 'antd';
const Option = Select.Option;
import  {SelectType} from '../../util/common';
import  {UserSearchIndexRequest} from '../../api/model/request/member-request'
import  {MemberAPI} from '../../api/member';
import  {API} from '../../api/customerorder';
import {SelectProps} from "antd/lib/select";

export namespace FormControl {

    @withRouter
    export class EnzoDemoPage extends React.Component {

        constructor(props) {
            super(props);
            //  this.fetchUser = debounce(this.fetchUser, 800);
        }


        handleChange = (value) => {
            this.setState({
                value,
                data: [],
                fetching: false,
            });
        }


        render() {
            return (<FormSelectIndex placeholder="会员号" type={SelectType.Member}/>);
        }

    }

    export interface FormSelectIndexProps extends SelectProps{
        placeholder:string;
        type:SelectType;
    }

    export interface FormSelectIndexStates {
        data:any[];
        value?:string[];
        fetching?: boolean,

    }

    export class FormSelectIndex extends React.Component<FormSelectIndexProps,FormSelectIndexStates> {
        lastFetchId: number;

        constructor(props,context) {
            super(props,context);
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
            var request:UserSearchIndexRequest ={
                name:value,
                type:type
            };
            if(type === SelectType.Member|| type === SelectType.CustomerService|| type ===SelectType.WarehouseAdmin){
                MemberAPI.UserSearchIndex(request).then(result =>{
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if(result.Status === 0 && result.Data !== null){
                        const data = result.Data.map(o =>({
                            text:`${o.MemeberCode}`,
                            value:o.Userid
                        }));
                        this.setState({
                            data:data,fetching:false
                        });

                    }
                });
            }
            else  if( type === SelectType.CustomerOrder) {
                API.CustomerOrderAPI.OrderSearchIndex(request).then(result =>{
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if(result.Status === 0 && result.Data !== null){
                        const data = result.Data.map(o =>({
                            text:`${o.CustomerOrderNo}`,
                            value:o.CustomerOrderNo
                        }));
                        this.setState({
                            data:data,fetching:false
                        });

                    }
                });
            }
            else  if(type === SelectType.ExpressNo){
                API.CustomerOrderAPI.OrderSearchIndex(request).then(result =>{
                    if (fetchId !== this.lastFetchId) { // for fetch callback order
                        return;
                    }
                    if(result.Status === 0 && result.Data !== null){
                        const data = result.Data.map(o =>({
                            text:`${o.expressNo}`,
                            value:o.expressNo
                        }));
                        this.setState({
                            data:data,fetching:false
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


}


