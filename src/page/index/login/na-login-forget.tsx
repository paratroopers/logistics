import * as React from 'react';
import {hashHistory} from 'react-router';
import {Form, Input, Button, Modal, Row, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {Steps, Icon} from 'antd-mobile';
import {PathConfig} from '../../../config/pathconfig';

interface NaLoginForgetProps extends FormComponentProps {
    visible?: boolean;
    onCancel?: () => void;
}

interface NaLoginForgetStates {
    visible?: boolean;
    current?: number;
    countDown?: number;
}


class NaLoginForget extends React.Component<NaLoginForgetProps, NaLoginForgetStates> {

    constructor(props, content) {
        super(props, content);
        this.state = {
            visible: props.visible ? props.visible : false,
            current: 0,
            countDown: 0
        }
    }


    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({visible: nextProps.visible, current: 0});
        }
    }

    /* 成功发送Code,验证码60秒等待*/
    setTimeoutPhone = () => {
        const topThis = this;
        setTimeout(function () {
            const {state: {countDown}} = topThis;
            if (countDown !== 0) {
                topThis.setState({countDown: countDown - 1});
                topThis.setTimeoutPhone();
            }
        }, 1000);
    }

    onCancel() {
        this.props.onCancel && this.props.onCancel();
    }

    onCodeOk() {
        const {getFieldValue} = this.props.form;
        const v = getFieldValue('PhoneNumber');
        var regex = new RegExp(/^1\d{10}$/);
        if (regex.test(v)) {
            this.setState({current: 1, countDown: 60})
            this.setTimeoutPhone();
        }
    }

    renderSteps(steps?: number) {
        const size = 'default';
        const {getFieldDecorator} = this.props.form;
        const {countDown} = this.state;
        let stepsContent: any[] = [];

        stepsContent.push(<Col span={!steps ? 14 : 24}>
            <Form.Item>
                {getFieldDecorator('PhoneNumber', {
                    rules: [{required: true, message: '请输入你的手机号码!'}]
                })(<Input size={size} placeholder="新密码"/>)}
            </Form.Item>
        </Col>);
        if (steps) {
            stepsContent.push(
                <Col span={24}>
                    <Form.Item>
                        {getFieldDecorator('Password', {
                            rules: [{required: true, message: '请输入你的手机号码!'}]
                        })(<Input size={size} type="password" placeholder="新密码"/>)}
                    </Form.Item>
                </Col>
            );
            stepsContent.push(<Col span={14}>
                <Form.Item>
                    <Input size={size} placeholder="手机收到的6位数验证码"/>
                </Form.Item>
            </Col>);
        }
        stepsContent.push(<Col offset={1} span={9}>
            <Form.Item>
                <Button size={size} type="primary" style={{width: '100%'}} onClick={this.onCodeOk.bind(this)}
                        disabled={countDown === 0 ? false : true}>{countDown === 0 ? "获取验证码" : countDown + "秒"}</Button>
            </Form.Item>
        </Col>);
        if (steps) {
            stepsContent.push(<Col span={24} style={{textAlign: 'center'}}>
                <Form.Item>
                    <Button style={{width: '100%'}} size={size} type="primary">重设密码</Button>
                </Form.Item>
            </Col>);
        }
        return stepsContent;
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
                    <Form style={{width: '100%'}}>
                        {this.renderSteps(this.state.current)}
                    </Form>
                }
            </Row>
        </Modal>
    }
}

export default Form.create<any>()(NaLoginForget);