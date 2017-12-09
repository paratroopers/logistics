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
                icon: 'http://www.famliytree.cn/icon/motion-content-a-a.png',
                title: '诚信',
                content: '我们的核心所在，只适当收取相关服务费用，绝不私吞广大用户的一针一线。'
            },
            {
                icon: 'http://www.famliytree.cn/icon/motion-content-a-b.png',
                title: '高效',
                content: '北京时间17：00前提交的打包订单当天封装完毕。'
            },
            {
                icon: 'http://www.famliytree.cn/icon/motion-content-a-c.png',
                title: '创新',
                content: '推出更多、更好、更便捷的服务理念，绝不辜负您对我们的信任。'
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
                        企业与宗旨
                    </TweenOne>
                    <QueueAnim component="ul" type="bottom" key="block" leaveReverse>
                        {listChildren}
                    </QueueAnim>
                </OverPack>
            </div>
        );
    }
}