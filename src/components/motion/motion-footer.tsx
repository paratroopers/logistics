import * as React from "react";
import {Component} from "react";
/* 动画效果*/
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
import {isNullOrUndefined} from "util";
const OverPack = ScrollAnim.OverPack;

interface MotionFooterControlProps {
    /* 注意应用中是否可以设置为非覆盖性属性 仅仅为外层className 附加名称*/
    className?: string;
}

interface MotionFooterControlStates {

}

export default class MotionFooterControl extends Component<MotionFooterControlProps, MotionFooterControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    getLiChildren = (data, i) => {
        const content = data.content.map((item, index) => {
            return (<li className="" key={index}>
                <a href={item.contentLink} target="_blank">
                    <i className={"iconfont " + item.icon}></i>
                    <span>{item.contont}</span>
                </a>
            </li>);
        });
        return (<li className={data.className} key={i}>
            <h2>{data.title}</h2>
            <ul>{content}</ul>
        </li>);
    }

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const logoContent = {
            img: 'http://www.famliytree.cn/icon/logo.png',
            rcode: 'http://www.famliytree.cn/icon/rcode.jpg',
            content: 'From Mainland To Word'
        };
        const dataSource = [
                {
                    title: '联系我们',
                    content: [{
                        icon: "icon-weizhi",
                        contont: "上海市浦东新区国际机场",
                        contentLink: ''
                    }, {
                        icon: "icon-dianhua-yuankuang",
                        contont: "0370 - 88 888 888",
                        contentLink: ''
                    }, {
                        icon: "icon-xin",
                        contont: "1005824013@qq.com",
                        contentLink: ''
                    }]
                },
            ]
        ;
        const liChildrenToRender = dataSource.map(this.getLiChildren);

        return (
            <OverPack {...props}
                      className={`content-template ${isNullOrUndefined(className) ? "motion-footer" : className}`}>
                <QueueAnim type="bottom" component="ul" key="ul" leaveReverse>
                    <li key="logo">
                        <p className="logo">
                            <img src={logoContent.img} width="100%"/>
                        </p>
                        <p className="logo-content">{logoContent.content}</p>
                        <p className="rcode">
                            <img src={logoContent.rcode} width="100%"/>
                        </p>
                    </li>
                    {liChildrenToRender}
                </QueueAnim>
                <TweenOne animation={{y: '+=30', opacity: 0, type: 'from'}} key="copyright" className="copyright">
                    <span>Copyright © 2018 The Project by <a href="#">Mainload</a>. All Rights Reserved</span>
                </TweenOne>
            </OverPack>);
    }
}