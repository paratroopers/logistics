import * as React from 'react';
import {hashHistory, withRouter} from 'react-router';
import {InjectedIntlProps} from "react-intl";
import {Button, Row, Col, Form, InputNumber} from 'antd';
import {PathConfig} from '../config/pathconfig';
import {FormComponentProps} from 'antd/lib/form/Form';
import {CostCountry} from './quotation-country';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';

import {QuotationUserSwitch} from './quotation-user-switch';
import {QuotationUserQueryAdvanced} from './quotation-user-query-advanced';


interface CostProps extends FormComponentProps, ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    className?: string;
    style?: any;
    isHeard?: boolean;
    isMobile?: boolean;
    costInfo?: ModelNameSpace.CostModal;
    onClick?: (v) => void;
}

interface CostStates {
    loading?: boolean;
    isAdvanced?: boolean;
}

@withRouter
class Cost extends React.Component<CostProps, CostStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            isAdvanced: false
        }
    }

    componentDidMount() {
        const query = this.props.location.query;
        const {setFieldsValue} = this.props.form;
        setFieldsValue({...query});
        if (this.initHomeToThisPage())
            this.onOk();
    }

    initHomeToThisPage() {
        return window.location.href.indexOf(PathConfig.CostEstimatePage) >= 0
            && window.location.href.indexOf('country') >= 0;
    }

    homeToThisPage() {
        return window.location.href.indexOf(PathConfig.CostEstimatePage) >= 0
    }

    onCountryChange(v, name) {
        const {setFieldsValue} = this.props.form;
        setFieldsValue({country: v, searchName: name});
    }

    onVolumeChange(l?: any, w?: any, h?: any) {
        const {getFieldValue, setFieldsValue} = this.props.form;
        const height = h ? h : getFieldValue('height');
        const width = w ? w : getFieldValue('width');
        const length = l ? l : getFieldValue('length');
        if (height && length && width && typeof height === 'number' && typeof length === 'number' && typeof width === 'number') {
            const volume = height * width * length
            setFieldsValue({volume: volume.toFixed(2)});
        }
    }

    onOk() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                if (this.homeToThisPage()) {
                    this.setState({loading: true});
                    delete values.searchName;
                    delete values.volume;
                    this.props.onClick && this.props.onClick(null);
                    APINameSpace.QuotationApi.GetQuotation({...values}).then(result => {
                        if (result.Status === 0) {
                            this.setState({loading: false});
                            this.props.onClick && this.props.onClick(result.Data);
                        }
                    });
                } else
                    hashHistory.push({
                        pathname: PathConfig.CostEstimatePage,
                        query: {...values}
                    });
            }
        })
    }

    onSwitchChange(checked: boolean) {
        this.setState({isAdvanced: checked});
    }

    render() {
        const topThis = this;
        const {props: {isHeard, isMobile, form: {getFieldDecorator, getFieldValue}}} = topThis;
        getFieldDecorator('searchName', {});
        return <Row type="flex" justify="center" align="top" className={this.props.className}
                    style={this.props.style}>
            {isHeard && <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                <div className="banner-form-header">
                    <Row type="flex" justify="start" style={{paddingTop: '13px', paddingLeft: '21px'}}>
                        <h2>
                            <i className="iconfont icon-feiyong"></i>
                            <span>费用估算/Cost estimate</span>
                        </h2>
                    </Row>
                </div>
            </Col>}
            <Col xs={isMobile ? 0 : 24} sm={isMobile ? 0 : 24} md={isMobile ? 0 : 24} lg={24} xl={24}
                 className="banner-form-parent">
                <Form layout="vertical" style={{padding: 24}}>
                    <Form.Item>
                        {getFieldDecorator('country', {
                            rules: [{required: true, message: '请填写收货国家!'}]
                        })(<CostCountry searchName={getFieldValue('searchName')}
                                        onChange={(v, name) => this.onCountryChange(v, name)}></CostCountry>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('weight', {
                            rules: [{required: true, message: '请填写重量!'}],
                        })(<InputNumber min={0} style={{width: "100%"}} placeholder="重量（kg）公斤" size="large"/>)}
                    </Form.Item>
                    <Form.Item>
                        <QuotationUserSwitch placeholder={'高级查询'} size={'default'} checked={this.state.isAdvanced}
                                             onChange={this.onSwitchChange.bind(this)}></QuotationUserSwitch>
                    </Form.Item>
                    <QuotationUserQueryAdvanced visible={this.state.isAdvanced} form={this.props.form}
                                                onChange={this.onVolumeChange.bind(this)}></QuotationUserQueryAdvanced>
                    <Form.Item>
                        <Row type="flex" justify="center">
                            <Button size="large" loading={this.state.loading} type="primary"
                                    onClick={this.onOk.bind(this)}>开始计算</Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>;
    }
}

export default Form.create<any>()(Cost);
