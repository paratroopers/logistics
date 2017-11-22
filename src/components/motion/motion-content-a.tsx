import * as React from "react";
import {Component} from "react";
/* 动画效果*/
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
import {isNullOrUndefined} from "util";
const OverPack = ScrollAnim.OverPack;

interface MotionContentAControlProps {
    /* 注意应用中是否可以设置为非覆盖性属性 仅仅为外层className 附加名称*/
    className?: string;
}

interface MotionContentAControlStates {

}

export default class MotionContentAControl extends Component<MotionContentAControlProps, MotionContentAControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    getBlockChildren = (item, i) => {
        return <li key={i}>
            <div className="icon">
                <img src={item.icon} width="100%"/>
            </div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
        </li>;
    }

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const dataSource = [
            {
                icon: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
                title: '一站式业务接入',
                content: '支付、结算、核算接入产品效率翻四倍'
            },
            {
                icon: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
                title: '一站式事中风险监控',
                content: '在所有需求配置环节事前风险控制和质量控制能力'
            },
            {
                icon: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
                title: '一站式数据运营',
                content: '沉淀产品接入效率和运营小二工作效率数据'
            },
        ];
        const listChildren = dataSource.map(this.getBlockChildren);

        return (
            <div {...props}
                 className={`content-template-wrapper ${isNullOrUndefined(className) ? "motion-content-a" : className}-wrapper`}>
                <OverPack className={`content-template ${isNullOrUndefined(className) ? "motion-content-a" : className}`}>
                    <TweenOne animation={{y: '+=30', opacity: 0, type: 'from'}}
                              component="h1"
                              key="h1"
                              reverseDelay={300}>
                        产品与服务
                    </TweenOne>
                    <QueueAnim component="ul" type="bottom" key="block" leaveReverse>
                        {listChildren}
                    </QueueAnim>
                </OverPack>
            </div>
        );
    }
}