import * as React from 'react';
import {hashHistory} from 'react-router';
import {Form, Input, Button, Modal, Row, Col} from 'antd';
import {Steps, Icon} from 'antd-mobile';
import {PathConfig} from '../../../config/pathconfig';
import {FormComponentProps} from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface NaLoginForgetProps extends FormComponentProps {
    visible?: boolean;
    onCancel?: () => void;
}

interface NaLoginForgetStates {
    visible?: boolean;
    current?: number;
}


export class NaLoginForget extends React.Component<NaLoginForgetProps, NaLoginForgetStates> {

    constructor(props, content) {
        super(props, content);
        this.state = {
            visible: props.visible ? props.visible : false,
            current: 1
        }
    }


    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({visible: nextProps.visible});
        }
    }

    onCancel() {
        this.props.onCancel && this.props.onCancel();
    }

    renderFirstSteps() {
        return [
            <Col span={14} key="1">
                <FormItem>
                    <Input placeholder="手机号或者邮箱"/>
                </FormItem>
            </Col>,
            <Col offset={1} key="2" span={9}>
                <FormItem>
                    <Button type="primary">获取验证码</Button>
                </FormItem>
            </Col>
        ];
    }

    renderSecondSteps() {
        const size = 'large';
        return [
            <Col span={24} key="1">
                <FormItem>
                    <Input size={size} placeholder="手机号或者邮箱"/>
                </FormItem>
            </Col>,
            <Col span={24} key="2">
                <FormItem>
                    <Input size={size} type="password" placeholder="新密码"/>
                </FormItem>
            </Col>,
            <Col span={14} key="3">
                <FormItem>
                    <Input size={size} placeholder="手机收到的6位数验证码"/>
                </FormItem>
            </Col>,
            <Col offset={1} span={9} key="4">
                <FormItem>
                    <Button size={size} type="primary" style={{marginTop: '-4px'}}>获取验证码</Button>
                </FormItem>
            </Col>,
            <Col span={24} key="5" style={{textAlign: 'center'}}>
                <FormItem>
                    <Button style={{width: '100%'}} size={size} type="primary">重设密码</Button>
                </FormItem>
            </Col>
        ];
    }

    render() {
        return <Modal visible={this.state.visible}
                      className="na-login-content-tabs-modal"
                      width={350}
                      footer={false}
                      onCancel={this.onCancel.bind(this)}>
            <h1 className="title">找回密码</h1>
            <p>验证码将会发送至你的注册邮箱或手机</p>
            <Row align="top" type="flex" justify="start">
                <Col span={24} style={{marginBottom: '14px'}}>
                    <Steps children={{}} direction="horizontal" size="small" current={this.state.current}>
                        <Steps.Step key="1" description={"获取验证码"}></Steps.Step>
                        <Steps.Step key="2" description={"重置密码"}></Steps.Step>
                    </Steps>
                </Col>
                {
                    <Form>
                        {this.state.current ? this.renderSecondSteps() : this.renderFirstSteps()}
                    </Form>
                }
            </Row>
        </Modal>
    }
}

const NaLoginForgetForm = Form.create()(NaLoginForget);
export default NaLoginForgetForm;