import * as React from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {APINameSpace} from '../model/api';

interface FormAgentDropDownProps extends SelectProps {
}
interface FormAgentDropDownStates {
    data?: any[];
}

export class FormAgentDropDown extends React.Component<FormAgentDropDownProps, FormAgentDropDownStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        this.getData("");
    }

    async getData(value?: string) {
        const response = await APINameSpace.SystemAPI.GetAgentList({name: value});
        response.Status === 0 && this.setState({data: response.Data});
    }

    renderOptions() {
        return this.state.data.map(item => {
            return <Select.Option key={item.ID} value={item.ID}>
                {item.Name}
            </Select.Option>
        });
    }

    render() {
        return <Select {...this.props}>
            {this.renderOptions()}
        </Select>;
    }
}