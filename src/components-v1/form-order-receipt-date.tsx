import * as React from 'react';
import {Radio, Form, Row, Col, DatePicker} from 'antd';
import {RowProps} from 'antd/lib/row';
import {FormSettingGroup} from './form-setting-group';
import {FormComponentProps} from 'antd/lib/form/Form';

interface FormOrderReceiptDateProps extends FormComponentProps {
    readOnly?: boolean;
    data?: any;
}
interface FormOrderReceiptDateStates {

}

export enum ReceiptEnum {
    Now = 1,
    Selected = 2
}

class FormOrderReceiptDate extends React.Component<FormOrderReceiptDateProps, FormOrderReceiptDateStates> {
    constructor(props, context) {
        super(props, context);
    }

    renderRadio() {
        const {props: {form, readOnly, data}} = this;
        return readOnly ? <span>{data}</span> : <Form.Item>
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
                    <Col lg={6}>
                        <Form.Item>
                            {
                                readOnly ? <span>{data}</span> :
                                    form.getFieldDecorator('receiptDate', {
                                        rules: [
                                            {
                                                required: form.getFieldValue('receiptType') === ReceiptEnum.Selected ? true : false,
                                                message: '必须填写发货日期'
                                            }
                                        ]
                                    })(<DatePicker
                                        disabled={form.getFieldValue('receiptType') === ReceiptEnum.Now }></DatePicker>)
                            }
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </FormSettingGroup>
    }
}
export default Form.create<any>()(FormOrderReceiptDate);