import * as React from 'react';
import {Row, Col, Form, Input} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group'
import {FormControl} from '../components-v1/form-control';
import {SelectType} from "../util/common";

export interface FormOrderAgentProps extends FormComponentProps {
    readyOnly?: boolean;
    AgentName?: string;
}

export interface FormOrderAgentStates {
}


export default class FormOrderAgent extends React.Component<FormOrderAgentProps, FormOrderAgentStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {props: {form, readyOnly, AgentName}} = this;
        return <FormSettingGroup title={"代理商选择"}>
            <Form>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={8} style={{paddingLeft: '8px'}}>
                        <Form.Item required={!readyOnly}>
                            {form.getFieldDecorator("agent", {
                                rules: [{required: true, message: '请选择代理商!'}],
                            })(<FormControl.FormSelectIndex type={SelectType.Agent}
                                                            mode="default"
                                                            noLabelInValue={true}
                                                            placeholder="代理商"/>)}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </FormSettingGroup>
    }
}