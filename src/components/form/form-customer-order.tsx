import * as React from 'react';
import {Select, Spin} from 'antd';
const Option = Select.Option;
import debounce from 'lodash.debounce';

export interface FormCustomerOrderProps{

}

export interface FormCustomerOrderStates {

}

export class FormCustomerOrder extends React.Component<FormCustomerOrderProps, FormCustomerOrderStates> {

    constructor(props, context) {
        super(props, context);
       // this.lastFetchId = 0;
       // this.fetchUser = debounce(this.fetchUser, 800);
    }


    componentDidMount() {

    }

    state = {
        data: [],
        value: [],
        fetching: false,
    };

    fetchUser = (value) => {
        console.log('fetching user', value);
      //  this.lastFetchId += 1;
      //  const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });
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
            mode="multiple"
            labelInValue
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '100%' }}
        >
            {data.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
    }
}