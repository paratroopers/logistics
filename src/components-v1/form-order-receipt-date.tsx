import * as React from 'react';
import {Radio, Form, Row, Col, DatePicker} from 'antd';
import {RowProps} from 'antd/lib/row';
import {FormSettingGroup} from './form-setting-group';
import {FormComponentProps} from 'antd/lib/form/Form';
import * as moment from 'moment';

interface FormOrderReceiptDateProps extends FormComponentProps {
    readOnly?: boolean;
    data: any;
}

interface FormOrderReceiptDateStates {
    data?: any;
}

export enum ReceiptEnum {
    Now = 1,
    Selected = 2
}

class FormOrderReceiptDate extends React.Component<FormOrderReceiptDateProps, FormOrderReceiptDateStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: Object.assign(nextProps.data, {deliverTime: moment().format('YYYY-MM-DD HH:mm:ss')})})
        }
    }

    renderRadio() {
        const {props: {form, readOnly}, state: {data}} = this;
        return readOnly ? <span>{data['deliverTime']}</span> : <Form.Item>
            {
                form.getFieldDecorator('receiptType', {
                    initialValue: ReceiptEnum.Now
                })(
                    <Radio.Group style={{lineHeight: '32px'}}>
                        <Radio value={ReceiptEnum.Now}>立即发货</Radio>
                        <Radio value={ReceiptEnum.Selected}>指定发货日期</Radio>
                    </Radio.Group>)
            }
        </Form.Item>;
    }

    render() {
        const {props: {readOnly, form, data}} = this;
        const defaultRowSetting: RowProps = {type: "flex", gutter: 16};
        return <FormSettingGroup title={"发货日期选择"}>
            <Form className="form-order-address" layout={readOnly ? "inline" : "vertical"}>
                <Row {...defaultRowSetting}>
                    <Col lg={6}>
                        {this.renderRadio()}
                    </Col>
                    {
                        readOnly ? null :
                            <Col lg={6}>
                                <Form.Item>
                                    {
                                        form.getFieldDecorator('deliverTime', {
                                            rules: [
                                                {
                                                    required: form.getFieldValue('receiptType') === ReceiptEnum.Selected ? true : false,
                                                    message: '必须填写发货日期'
                                                }
                                            ]
                                        })(<DatePicker
                                            onChange={v => this.state.data.deliverTime = moment(v.toString()).format('YYYY-MM-DD HH:mm:ss')}
                                            disabled={form.getFieldValue('receiptType') === ReceiptEnum.Now}></DatePicker>)
                                    }
                                </Form.Item>
                            </Col>
                    }
                </Row>
            </Form>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderReceiptDate);