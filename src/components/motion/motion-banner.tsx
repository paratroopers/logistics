import * as React from "react";
import {Component} from "react";
import {Button, Icon, Row, Col, Form, Input} from 'antd';
const FormItem = Form.Item;
/* 动画效果*/
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
import {isNullOrUndefined} from "util";
const OverPack = ScrollAnim.OverPack;
import {CommonLocale} from '../../locales/localeid';
import {NaGlobal} from '../../util/common';
import {InjectedIntlProps} from "react-intl";

interface MotionBannerControlProps extends InjectedIntlProps {
    /* 注意应用中是否可以设置为非覆盖性属性 仅仅为外层className 附加名称*/
    className?: string;
}

interface MotionBannerControlStates {

}

export default class MotionBannerControl extends Component<MotionBannerControlProps, MotionBannerControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    renderFrom() {
        const topThis = this;
        return <Row type="flex" justify="center">
            <Col xs={0} sm={0} md={0} lg={18} xl={18} className="banner-form-parent">
                <Form layout="vertical" style={{padding: 24}}>
                    <FormItem label="收货国家">
                        <Input size="large"/>
                    </FormItem>
                    <FormItem label="重量（kg）公斤">
                        <Input size="large"/>
                    </FormItem>
                    <FormItem label="体积（m3）">
                        <Input size="large"/>
                    </FormItem>
                    <FormItem>
                        <Row type="flex" justify="center">
                            <Button size="large" type="primary">开始计算</Button>
                        </Row>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const {formatMessage} = NaGlobal.intl;
        return (
            <OverPack replay playScale={[0.3, 0.1]} {...props}
                      className={isNullOrUndefined(className) ? "motion-banner" : className}>
                <TweenOne className={`${isNullOrUndefined(className) ? "motion-banner" : className}-wrapper-right`}
                          key="from">
                    {topThis.renderFrom()}
                </TweenOne>
                <QueueAnim delay={200}
                           className={`${isNullOrUndefined(className) ? "motion-banner" : className}-wrapper-left`}
                           key="text">
                <span className="title" key="title">
                    <img width="100%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png"/>
                </span>
                    <p key="content"> 国际物流网致力为客户提供更省心，更便捷的仓储物流服务。 </p>
                    {/*<Button type="ghost" key="button"> {formatMessage({id: CommonLocale.Demo})}</Button>*/}
                </QueueAnim>
                <TweenOne animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
                          className={`${isNullOrUndefined(className) ? "motion-banner" : className}-icon`}
                          key="icon">
                    <Icon type="down"/>
                </TweenOne>
            </OverPack>
        );
    }
}