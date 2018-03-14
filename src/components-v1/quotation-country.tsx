import * as React from 'react';
import {Select, Spin} from 'antd';
import {SelectProps}from "antd/lib/select"
import {InjectedIntlProps} from "react-intl";
import {withRouter} from 'react-router';
import {RequestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';

export interface CostCountryProps extends SelectProps, ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    onValueChange?: (v, name) => void;
    searchName?: string;
}

export interface CostCountryStates {
    data?: ModelNameSpace.CountryModel[];
    value?: any;
    fetching?: boolean;
    searchName?: string;
}

@withRouter
export class CostCountry extends React.Component<CostCountryProps, CostCountryStates> {
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
        const query = this.props.location.query;
        this.getCountry(query.searchName);
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    getCountry(name?: string) {
        this.setState({data: [], fetching: true, searchName: name});
        const data: RequestNameSpace.CountryRequest = {
            request: {
                name: name
            }
        }
        APINameSpace.QuotationApi.GetCountry(data).then(result => {
            if (result.Status === 0) {
                this.setState({data: result.Data, fetching: false});
            }
        });
    }

    onSearch(v?: any) {
        const topThis = this;
        topThis.search = v;
        setTimeout(() => {
            const {props: {onValueChange}, state: {searchName}} = topThis;
            if (topThis.search === v && v) {
                if (onValueChange)
                    onValueChange([], searchName ? searchName : null);
                topThis.getCountry(v);
            }
        }, topThis.loadingTime);
    }

    onFocus() {
        if (!this.state.data.length)
            this.onSearch();
    }

    onCountryChange(value?: any) {
        const topThis = this;
        const {props: {onValueChange, onChange}} = topThis;
        topThis.setState({
            fetching: false,
            value: value
        }, () => {
            const {state: {searchName}} = topThis;
            if (onValueChange)
                onValueChange(value, searchName);
            if (onChange)
                onChange(value);
        });
    }

    render() {
        const topThis = this;
        const {state: {fetching, data, value}, props} = topThis;
        return <Select {...props} showSearch={true} value={value}
                       notFoundContent={fetching ? <Spin size="small"/> : 'No Data'}
                       filterOption={false}
                       onFocus={this.onFocus.bind(this)}
                       onChange={(v) => this.onCountryChange(v)}
                       onSearch={(v) => {
                           this.onSearch(v);
                       }}>
            {data.map(d => <Select.Option
                key={d.code}>{d.englishName + ' ' + d.chineseName}</Select.Option>)}
        </Select>
    }
}