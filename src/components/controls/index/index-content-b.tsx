import * as React from "react";
import {Component} from "react";
/* 动画效果*/
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
import {isNullOrUndefined} from "util";
const OverPack = ScrollAnim.OverPack;

interface MotionContentBControlProps {
    /* 注意应用中是否可以设置为非覆盖性属性 仅仅为外层className 附加名称*/
    className?: string;
}

interface MotionContentBControlStates {

}

export default class MotionContentBControl extends Component<MotionContentBControlProps, MotionContentBControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    getDelay = e => e % 3 * 100 + Math.floor(e / 3) * 100 + 300;

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const oneAnim = {y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad'};
        const blockArray = [
            {
                icon: 'icon-kucun-xianxing',
                title: '会员、仓库',
                content: '免费注册会员分配仓位，专人维护仓库。'
            },
            {
                icon: 'icon-baoguofahuo-xianxing',
                title: '包裹、仓储',
                content: '会员包裹直接发往仓库，仓库收到立即存储，会员收到到货通知，当天即可操作包裹，仓库提供合并打包。'
            },
            {
                icon: 'icon-yunshuzhongwuliu-xianxing',
                title: '物流、运输',
                content: '平台与多家大型物流快递公司合作，联邦，UPS,DHL,EMS,TNT，ARAMEX,DPEX，各类专线快递多种物流选择应有尽有。'
            },
            {
                icon: 'icon-qianshoushenpitongguo-xianxing',
                title: '发货、审核',
                content: '直接选择自己仓库内货物打包发货专业仓管打包审核，确认无误准备发运。'
            },
            {
                icon: 'icon-jisuanqilishuai-xianxing',
                title: '渠道、运价',
                content: '各种物流渠道折扣优惠，运价低至2-5折会员还有定期优惠多个包裹合并打包，更能节省运费。'
            },
            {
                icon: 'icon-anquanbaozhang-xianxing',
                title: '付款、安全',
                content: '付款便捷，支付宝，微信，paypal,银联主流支付方式，保障资金安全。'
            },
        ];
        const children = blockArray.map((item, i) => {
            const delay = topThis.getDelay(i);
            const liAnim = {opacity: 0, type: 'from', ease: 'easeOutQuad', delay};
            const childrenAnim = {...liAnim, x: '+=10', delay: delay + 100,};
            return (<TweenOne component="li" animation={liAnim} key={i}>
                <TweenOne animation={{x: '-=10', opacity: 0, type: 'from', ease: 'easeOutQuad'}}
                          className="img" key="img">
                    <i className={'iconfont '+item.icon}/>
                </TweenOne>
                <div className="text">
                    <TweenOne key="h1" animation={childrenAnim} component="h1">
                        {item.title}
                    </TweenOne>
                    <TweenOne key="p" animation={{...childrenAnim, delay: delay + 200}} component="p">
                        {item.content}
                    </TweenOne>
                </div>
            </TweenOne>);
        });

        return (
            <div {...props}
                 className={`content-template-wrapper ${isNullOrUndefined(className) ? "motion-content-b" : className}-wrapper`}>
                <OverPack
                    playScale={0.2}
                    className={`content-template ${isNullOrUndefined(className) ? "motion-content-b" : className}`}>
                    <TweenOne key="h1" animation={oneAnim} component="h1" reverseDelay={100}>
                        专业的服务
                    </TweenOne>
                    {/*<TweenOne key="p" animation={{...oneAnim, delay: 100}} component="p">*/}
                        {/*基于物联网强大的基础资源*/}
                    {/*</TweenOne>*/}
                    <QueueAnim key="ul" type="bottom" className={`${isNullOrUndefined(className) ? "motion-content-b" : className}-contentWrapper`}>
                        <ul key="ul">
                            {children}
                        </ul>
                    </QueueAnim>
                </OverPack>
            </div>
        );
    }
}