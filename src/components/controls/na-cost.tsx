import * as React from 'react';
import {hashHistory, withRouter} from 'react-router';
import {InjectedIntlProps} from "react-intl";
import {Button, Row, Col, Form, InputNumber, Input} from 'antd';
import {PathConfig} from '../../config/pathconfig';
import {FormComponentProps} from 'antd/lib/form/Form';
import {NaCostCountry} from './na-cost-country';
import {CostModal} from '../../api/model/quotation';
import {QuotationApi} from '../../api/quotation';
import {NaToast} from '../../components/mobile-controls/na-toast';
import {NaUtil} from '../../util/util';


interface HomeCostProps extends FormComponentProps, ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    className?: string;
    style?: any;
    isHeard?: boolean;
    isMobile?: boolean;
    costInfo?: CostModal;
    onClick?: (v) => void;
}

interface HomeCostStates {
    loading?: boolean;
}

@withRouter
class HomeCostForm extends React.Component<HomeCostProps, HomeCostStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        const query = this.props.location.query;
        const {setFieldsValue} = this.props.form;
        setFieldsValue({...query});
        if (this.homeToThisPage())
            this.onOk();
    }

    homeToThisPage() {
        return window.location.href.indexOf(PathConfig.CostEstimatePage);
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
                    QuotationApi.GetQuotation({...values}).then(result => {
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
                        })(<NaCostCountry searchName={getFieldValue('searchName')}
                                          onChange={(v, name) => this.onCountryChange(v, name)}></NaCostCountry>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('weight', {
                            rules: [{required: true, message: '请填写重量!'}],
                        })(<InputNumber min={0} style={{width: "100%"}} placeholder="重量（kg）公斤" size="large"/>)}
                    </Form.Item>
                    <Form.Item>
                        <Row type="flex" justify="center" align="top">
                            <Col span={7}>
                                {getFieldDecorator('length', {
                                    rules: [{required: true, message: '请填写长度!'}],
                                })(<InputNumber min={0} style={{width: "100%"}} onChange={v => {
                                    this.onVolumeChange(v)
                                }} placeholder="长（cm）"
                                                size="large"/>)}
                            </Col>
                            <Col span={7} offset={1}>
                                {getFieldDecorator('width', {
                                    rules: [{required: true, message: '请填写宽度!'}],
                                })(<InputNumber min={0} style={{width: "100%"}} onChange={v => {
                                    this.onVolumeChange(null, v)
                                }} placeholder="宽（cm）" size="large"/>)}
                            </Col>
                            <Col span={8} offset={1}>
                                {getFieldDecorator('height', {
                                    rules: [{required: true, message: '请填写高度!'}],
                                })(<InputNumber min={0} style={{width: "100%"}} onChange={v => {
                                    this.onVolumeChange(null, null, v)
                                }} placeholder="高（cm）" size="large"/>)}
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('volume', {
                            rules: [{required: true, message: '请填写体积!'}],
                        })(<Input readOnly={true} placeholder="体积（cm3）" size="large"/>)}
                    </Form.Item>
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

const CostQuery = Form.create<any>()(HomeCostForm);
export default CostQuery;
