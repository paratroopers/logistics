import * as React from 'react';
import {Select, Spin} from 'antd';
import {CountryRequest} from '../../api/model/request/quotation-request';
import {CountryModel} from '../../api/model/quotation';
import {QuotationApi} from '../../api/quotation';

export interface NaCostCountryProps {
    onChange?: (v) => void;
    value?: any[];
}

export interface NaCostCountryStates {
    data?: CountryModel[],
    value?: any[],
    fetching?: boolean,
}

export class NaCostCountry extends React.Component<NaCostCountryProps, NaCostCountryStates> {
    search?: string;
    loadingTime?: number;

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            value: [],
            fetching: false
        }
        this.search = "";
        this.loadingTime = 1000;
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    getCountry(name: string) {
        this.setState({data: [], fetching: true});
        const data: CountryRequest = {
            request: {
                name: name
            }
        }
        QuotationApi.GetCountry(data).then(result => {
            if (result.Status === 0) {
                this.setState({data: result.Data, fetching: false})
            }
        });
    }

    onSearch(v) {
        this.props.onChange && this.props.onChange([]);
        this.search = v;
        setTimeout(() => {
            if (this.search === v)
                this.getCountry(v);
        }, this.loadingTime);
    }

    onCountryChange(value) {
        this.setState({
            fetching: false,
        }, () => {
            this.props.onChange && this.props.onChange(value[value.length - 1]);
        });
    }

    render() {
        const {fetching, data, value} = this.state;
        return <Select mode="multiple"
                       value={value}
                       notFoundContent={fetching ? <Spin size="small"/> : null}
                       filterOption={false}
                       onChange={(v) => this.onCountryChange(v)}
                       onSearch={(v) => {
                           this.onSearch(v);
                       }} placeholder="收货国家" size="large">
            {data.map(d => <Select.Option
                key={d.code}>{d.englishName + ' ' + d.chineseName}</Select.Option>)}
        </Select>
    }
}