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
                {/*<img src={item.icon} width="100%"/>*/}
                <i className={"na-iconfont " + item.icon}></i>
            </div>
            <h3>{item.title}</h3>
            {/*<p>{item.content}</p>*/}
        </li>;
    }

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const dataSource = [
            {
                icon: "na-icon-jisuanqilishuai",
                title: '费用估算'
            },
            {
                icon: 'na-icon-jijianfasong',
                title: '客户发货'
            },
            {
                icon: 'na-icon-cangkucangchu',
                title: '入库操作'
            },
            {
                icon: 'na-icon-qianshoushenpitongguo',
                title: '客户确认'
            },
            {
                icon: 'na-icon-baoguofahuo',
                title: '合并打包'
            },
            {
                icon: 'na-icon-yunshuzhongwuliu',
                title: '国际快递'
            }
        ];
        const listChildren = dataSource.map(this.getBlockChildren);

        return (
            <div {...props}
                 className={`content-template-wrapper ${isNullOrUndefined(className) ? "motion-content-a" : className}-wrapper`}>
                <OverPack
                    className={`content-template ${isNullOrUndefined(className) ? "motion-content-a" : className}`}>
                    <TweenOne animation={{y: '+=30', opacity: 0, type: 'from'}}
                              component="h1"
                              key="h1"
                              reverseDelay={300}>
                        一键式服务流程
                    </TweenOne>
                    <QueueAnim component="ul" type="bottom" key="block" leaveReverse>
                        {listChildren}
                    </QueueAnim>
                </OverPack>
            </div>
        );
    }
}