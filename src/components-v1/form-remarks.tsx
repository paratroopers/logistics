import * as React from 'react';
import {Row, Col, Input, Form} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group';

export interface FormRemarksProps extends FormComponentProps {
    readOnly?: boolean;
    value?: string;
    title?: string;
    minRows?: number;
    fieldName?: string;
}

export interface FormRemarksStates {
    value?: string;
}

class FormRemarks extends React.Component<FormRemarksProps, FormRemarksStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value ? props.value : ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}, readOnly, title, minRows, fieldName}, state: {value}} = topThis;
        return <FormSettingGroup title={title ? title : "备注"}>
            <Form className="form-remarks">
                <Row >
                    <Col span={24} style={{marginBottom: 24}}>
                        {!readOnly ?
                            <Form.Item>{
                                getFieldDecorator(fieldName ? fieldName : "Remark",
                                    {initialValue: value, rules: [{required: true, message: ' '}]})
                                (<Input.TextArea autosize={{minRows: minRows ? minRows : 6}}></Input.TextArea>)
                            }</Form.Item> : <span>{value}</span>}
                    </Col>
                </Row>
            </Form>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormRemarks);