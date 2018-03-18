import * as React from 'react';
import {InputNumber, Row, Col, Form} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';

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
        const {form, readOnly} = this.props;
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
                        form.getFieldDecorator(fieldName, {
                            initialValue: defaultValue,
                            rules: [{
                                required: !noRequired,
                                message: ' '
                            }]
                        })(<InputNumber disabled={this.props.readOnly} style={{width: '100%'}}
                                        placeholder={readOnly ? "" : '请输入'}></InputNumber>)
                    }
                </Form.Item>
            </Col>
    }

    render() {
        const topThis = this;
        const {state: {data: {remoteFee, magneticinspectionFee}}, props: {readOnly}} = topThis;
        const defaultRowSetting: RowProps = {type: "flex", gutter: 16};
        return <FormSettingGroup title={"额外费用"}>
            <Form className="form-order-address" layout={readOnly ? "inline" : "vertical"}>
                <Row {...defaultRowSetting}>
                    {this.renderRow('偏远费（RMB)', false, false, 'remoteFee', remoteFee ? remoteFee.toFixed(2) : '0.00')}
                    {this.renderRow('磁检费（RMB)', false, false, 'magneticinspectionFee', magneticinspectionFee ? magneticinspectionFee.toFixed(2) : '0.00')}
                </Row>
            </Form>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderOtherCost);