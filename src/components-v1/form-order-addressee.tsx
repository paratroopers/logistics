import * as React from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import {FormSettingGroup} from './form-setting-group';

export interface FormOrderAddresseeProps {
    readOnly?: boolean;
}

export interface FormOrderAddresseeStates {
}

export class FormOrderAddressee extends React.Component<FormOrderAddresseeProps, FormOrderAddresseeStates> {

    renderFooter() {
        return <Button type="dashed">添加联系人</Button>
    }

    render() {
        const formItemLayout = {labelCol: {span: 10}, wrapperCol: {span: 14}};
        return <FormSettingGroup size={16} title={"收件人基本信息"} span={24} footer={this.renderFooter()}>
            <Form>
                <Row>
                    <Col span={6}>
                        <Form.Item label={'收件人姓名'} {...formItemLayout} required>
                            <Input placeholder={'请输入'}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item label={'收件国家'} {...formItemLayout} required>
                            <Input placeholder={'请输入'}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item label={'收件城市'} {...formItemLayout} required>
                            <Input placeholder={'请输入'}></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item label={'邮编'} {...formItemLayout} required>
                            <Input placeholder={'请输入'}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'电话'} {...formItemLayout} required>
                            <Input placeholder={'请输入'}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label={'公司名或税号'} {...formItemLayout} required>
                            <Input placeholder={'请输入'}></Input>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </FormSettingGroup>
    }
}