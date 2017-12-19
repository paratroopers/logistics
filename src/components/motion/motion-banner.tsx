import * as React from "react";
import {Component} from "react";
import {Icon, Row, Carousel} from 'antd';
/* 动画效果*/
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
import {isNullOrUndefined} from "util";

const OverPack = ScrollAnim.OverPack;
import {CommonLocale} from '../../locales/localeid';
import HomeCostQuery from '../../components/controls/home-cost-query';
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

    render() {
        const topThis = this;
        const {props, props: {className}} = topThis;
        const {formatMessage} = NaGlobal.intl;
        return (
            <OverPack replay playScale={[0.3, 0.1]} {...props}
                      className={isNullOrUndefined(className) ? "motion-banner" : className}>
                <QueueAnim className={`${isNullOrUndefined(className) ? "motion-banner" : className}-wrapper-right`}
                           key="from">
                    {<HomeCostQuery></HomeCostQuery>}
                </QueueAnim>
                <QueueAnim delay={200}
                           type="left"
                           className={`${isNullOrUndefined(className) ? "motion-banner" : className}-wrapper-left`}
                           key="text">
                    <p>为您定制私人国际仓储平台</p>
                    <p>专注国际物流十年</p>
                </QueueAnim>
                {/*                <TweenOne animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
                          className={`${isNullOrUndefined(className) ? "motion-banner" : className}-icon`}
                          key="icon">
                    <Icon type="down"/>
                </TweenOne>*/}
            </OverPack>
        );
    }
}