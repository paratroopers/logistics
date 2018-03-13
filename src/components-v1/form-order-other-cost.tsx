import * as React from 'react';
import {Input, Row, Col, Form, message, Icon} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {APINameSpace} from '../model/api';
import {RequestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {FormSettingGroup} from './form-setting-group';
import {FormContactInfo} from './form-contact-info';
import {ModelNameSpace} from '../model/model';
import {Context} from '../util/common';

export interface FormOrderOtherCostProps extends FormComponentProps {
    readOnly?: boolean;
    data?: ModelNameSpace.OtherCostModel;
}

export interface FormOrderOtherCostStates {
    data?: ModelNameSpace.OtherCostModel;
    visible?: boolean;
}

class FormOrderOtherCost extends React.Component<FormOrderOtherCostProps, FormOrderOtherCostStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : {},
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    renderRow(label?: string, isTextArea?: boolean, noRequired?: boolean, fieldName?: string, defaultValue?: any, layout?: any) {
        const {form: {getFieldDecorator}, readOnly} = this.props;
        const spanLayout = layout ? layout : {
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 6
        }

        if (readOnly)
            return <Col {...spanLayout}>
                <Form.Item label={label}>
                    {
                        <label>{defaultValue}</label>
                    }
                </Form.Item>
            </Col>;
        else
            return <Col {...spanLayout}>
                <Form.Item label={label} required={readOnly ? false : !noRequired}>
                    {
                        isTextArea ? getFieldDecorator(fieldName, {
                                initialValue: defaultValue,
                                rules: [{
                                    required: !noRequired,
                                    message: ' '
                                }]
                            })(<Input.TextArea disabled={this.props.readOnly}
                                               placeholder={readOnly ? "" : '请输入'}></Input.TextArea>)
                            : getFieldDecorator(fieldName, {
                                initialValue: defaultValue,
                                rules: [{
                                    required: !noRequired,
                                    message: ' '
                                }]
                            })(<Input disabled={this.props.readOnly} placeholder={readOnly ? "" : '请输入'}></Input>)
                    }
                </Form.Item>
            </Col>
    }

    render() {
        const topThis = this;
        const {state: {data}, props: {readOnly}} = topThis;
        const defaultRowSetting: RowProps = {type: "flex", gutter: 16};
        return <FormSettingGroup title={"额外费用"}>
            <Form className="form-order-address" layout={readOnly ? "inline" : "vertical"}>
                <Row {...defaultRowSetting}>
                    {this.renderRow('偏远费（RMB)', false, false, 'remoteFee', data.remoteFee)}
                    {this.renderRow('磁检费（RMB)', false, false, 'magneticinspectionFee', data.magneticinspectionFee)}
                </Row>
            </Form>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderOtherCost);