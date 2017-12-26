import * as React from 'react';
import {Select, Spin} from 'antd';
import {CountryRequest} from '../../api/model/request/quotation-request';
import {CountryModel} from '../../api/model/quotation';
import {QuotationApi} from '../../api/quotation';

export interface NaCostCountryProps {
    onChange?: (v, name) => void;
    value?: any;
    searchName?: string;
}

export interface NaCostCountryStates {
    data?: CountryModel[];
    value?: any;
    fetching?: boolean;
    searchName?: string;
}

export class NaCostCountry extends React.Component<NaCostCountryProps, NaCostCountryStates> {
    search?: string;
    loadingTime?: number;

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : [],
            value: [],
            fetching: false
        }
        this.search = "";
        this.loadingTime = 500;
    }

    componentDidMount() {
        this.getCountry("");
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
        /*        if ('searchName' in nextProps && nextProps.searchName !== this.props.searchName
                    && nextProps.searchName !== this.search && nextProps.searchName) {
                    this.getCountry(nextProps.searchName);
                }*/
    }

    getCountry(name?: string) {
        this.setState({data: [], fetching: true, searchName: name});
        const data: CountryRequest = {
            request: {
                name: name
            }
        }
        QuotationApi.GetCountry(data).then(result => {
            if (result.Status === 0) {
                this.setState({data: result.Data, fetching: false});
            }
        });
    }

    onSearch(v?: any) {
        this.search = v;
        setTimeout(() => {
            if (this.search === v && v) {
                this.props.onChange && this.props.onChange([], this.state.searchName ? this.state.searchName : null);
                this.getCountry(v);
            }
        }, this.loadingTime);
    }

    onFocus() {
        if (!this.state.data.length)
            this.onSearch();
    }

    onCountryChange(value?: any) {
        this.setState({
            fetching: false,
        }, () => {
            this.props.onChange && this.props.onChange(value, this.state.searchName);
        });
    }

    render() {
        const {fetching, data, value} = this.state;
        return <Select showSearch={true} value={value}
                       notFoundContent={fetching ? <Spin size="small"/> : 'No Data'}
                       filterOption={false}
                       onFocus={this.onFocus.bind(this)}
                       onChange={(v) => this.onCountryChange(v)}
                       onSearch={(v) => {
                           this.onSearch(v);
                       }} placeholder="收货国家" size="large">
            {data.map(d => <Select.Option
                key={d.code}>{d.englishName + ' ' + d.chineseName}</Select.Option>)}
        </Select>
    }
}