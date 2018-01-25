import * as React from 'react';
import {Select, Spin} from 'antd';
const Option = Select.Option;
import debounce from 'lodash.debounce';
import {SelectType} from '../../util/common';
import {MemberAPI}  from '../../api/member';
import  {UserSearchIndexRequest} from '../../api/model/request/member-request';
import {type} from "os";

export interface FormCustomerOrderProps{
placeholder:string;
    type:SelectType;
}

export interface FormCustomerOrderStates {
    data:any[];
    value?:string[];
    fetching?: boolean,

}

export class FormCustomerOrder extends React.Component<FormCustomerOrderProps, FormCustomerOrderStates> {

    constructor(props, context) {
        super(props, context);
       // this.setState({data:[], value:[], fetching: true });
    }
    componentDidMount() {

    }
    state = {
        data: [],
        value: [],
        fetching: false,
    };

    fetchData = (value) => {
        console.log('fetching user', value);

        this.setState({ data:[], value:[], fetching: true });

        switch (this.props.type){
            case SelectType.CustomerOrder:
                var request:UserSearchIndexRequest ={
                    name:value,
                    type:2
                };
                MemberAPI.UserSearchIndex(request).then(result =>{
                    if(result.Status === 0){
                        const data = result.Data.map(o =>({
                            text:`${o.MemeberCode}`,
                            value:o.Userid
                        }));
                        this.setState({
                            data:data,fetching:false
                        });

                    }
                });

            case  SelectType.ExpressNo:
                // request.type = SelectType.ExpressNo;
                // MemberAPI.UserSearchIndex(request);
            case  SelectType.CustomerService:
                 // request.type = SelectType.CustomerService;
                 // MemberAPI.UserSearchIndex(request);

            case  SelectType.Member:
                 request ={
                    name:value,
                    type:2
                };
                MemberAPI.UserSearchIndex(request).then(result =>{
                    if(result.Status === 0){
                        const data = result.Data.map(o =>({
                            text:`${o.MemeberCode}`,
                            value:o.Userid
                        }));
                        this.setState({
                            data:data,fetching:false
                        });

                    }
                });

            case  SelectType.WarehouseAdmin:;
                   // request.type = SelectType.WarehouseAdmin;
                   // MemberAPI.UserSearchIndex(request);
        }

    };

    handleChange = (value) => {
        this.setState({
            value,
            data: [],
            fetching: false,
        });
    }

    render() {
        const {data, value,fetching } = this.state;

        return <Select
            mode="tags"
            labelInValue
            value={value}
            placeholder={this.props.placeholder}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchData}
            onChange={this.handleChange}
            style={{ width: '100%' }}
        >
            {data.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
    }
}