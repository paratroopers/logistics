import * as React from 'react';
import {Select, Spin} from 'antd';
const Option = Select.Option;
import debounce from 'lodash.debounce';
import {SelectType} from '../../util/common';

export interface FormCustomerOrderProps{
placeholder:string;
    type:SelectType;
}

export interface FormCustomerOrderStates<T> {
    data:T[];
    value?:string[];
    fetching: boolean,

}

export class FormCustomerOrder extends React.Component<FormCustomerOrderProps, FormCustomerOrderStates<any>> {

    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {

    }
    // state = {
    //     data: [],
    //     value: [],
    //     fetching: false,
    // };

    fetchData = (value) => {
        console.log('fetching user', value);

      //  this.lastFetchId += 1;
      //  const fetchId = this.lastFetchId;
        this.setState({ data:[], fetching: true });
        fetch('https://randomuser.me/api/?results=5')
            .then(response => response.json())
            .then((body) => {
                // if (fetchId !== this.lastFetchId) { // for fetch callback order
                //     return;
                // }
                const data = body.results.map(user => ({
                    text: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                }));
                this.setState({ data, fetching: false });
            });
    };

    handleChange = (value) => {
        this.setState({
            value,
            data: [],
            fetching: false,
        });
    }



    render() {
        const { fetching, data, value } = this.state;

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