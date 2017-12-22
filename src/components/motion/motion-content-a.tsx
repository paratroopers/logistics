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
            <div className="line"></div>
            <div className="icon"
                 style={{border: item.type === 0 ? "2px solid #c2c2c2" : "2px dashed #c2c2c2"}}>
                <i className={"iconfont " + item.icon} style={{color: item.type === 0 ? "#1890FF" : "#e65922"}}></i>
            </div>
            <h3>{item.title}</h3>
        </li>;
    }

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const dataSource = [
            {
                icon: "icon-jisuanqilishuai",
                title: '费用估算',
                type: 0
            },
            {
                icon: 'icon-jijianfasong',
                title: '客户发货',
                type: 0
            },
            {
                icon: 'icon-cangkucangchu',
                title: '入库操作',
                type: 1
            },
            {
                icon: 'icon-qianshoushenpitongguo',
                title: '客户确认',
                type: 0
            },
            {
                icon: 'icon-baoguofahuo',
                title: '合并打包',
                type: 1
            },
            {
                icon: 'icon-yunshuzhongwuliu',
                title: '国际快递',
                type: 1
            }
        ];
        const listChildren = dataSource.map(this.getBlockChildren);

        return (
            <div {...props}
                 className={`content-template-wrapper ${isNullOrUndefined(className) ? "motion-content-a" : className}-wrapper`}>
                <OverPack
                    playScale={0.2}
                    className={`content-template ${isNullOrUndefined(className) ? "motion-content-a" : className}`}>
                    <TweenOne className="with-line" animation={{y: '+=30', opacity: 0, type: 'from'}}
                              component="h1"
                              key="h1"
                              reverseDelay={300}>
                        一键式服务流程
                    </TweenOne>
                    <TweenOne animation={{y: '+=30', opacity: 0, type: 'from'}}
                              component="h4"
                              key="h4"
                              reverseDelay={300}>
                        操作更便捷，发货更省心
                    </TweenOne>
                    <QueueAnim className="content-tag" type="bottom" key="tag" leaveReverse>
                        <div className="item" key={0} style={{color: "#1890FF"}}><i
                            className="iconfont icon-yonghu1"></i><span>客户完成</span></div>
                        <div className="item" key={1} style={{color: "#e65922"}}><i
                            className="iconfont icon-weibiaoti-"></i><span>大陆完成</span></div>
                    </QueueAnim>
                    <QueueAnim component="ul" type="bottom" key="block" leaveReverse>
                        {listChildren}
                    </QueueAnim>
                </OverPack>
            </div>
        );
    }
}