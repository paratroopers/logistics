import * as React from 'react';
import BannerAnim, {Element} from 'rc-banner-anim';
import {Icon} from 'antd';
import 'rc-banner-anim/assets/index.css';
import TweenOne from 'rc-tween-one';
import {HomeCostQuery} from '../../components/controls/home-cost-query';

const BgElement = Element.BgElement;

export class MotionHeaderImage extends React.Component<any, any> {
    render() {
        const height = window.innerHeight - 80 + 'px';
        return (<div>
                <HomeCostQuery className="motion-banner-wrapper-right" style={{zIndex: 1000}}></HomeCostQuery>
                <BannerAnim prefixCls="banner-user"
                            type={'across'}
                            style={{height: height, zIndex: 999}}
                            autoPlaySpeed={4000}
                            autoPlay={true} arrow={false}>
                    <Element
                        prefixCls="banner-user-elem"
                        key="0">
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                background: 'url("http://www.famliytree.cn/icon/index-home-image-5.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}/>
                        <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                            <span style={{letterSpacing: '30px'}}>一流的物流团队</span>
                        </TweenOne>
                        <TweenOne className="banner-user-text"
                                  animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>
                            <span style={{letterSpacing: '20px'}}>为您提供专业的境外物流服务</span>
                        </TweenOne>
                        <TweenOne animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
                                  className={`motion-banner-icon`}
                                  key="icon">
                            <Icon type="down"/>
                        </TweenOne>
                    </Element>
                    <Element
                        prefixCls="banner-user-elem"
                        key="1">
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                background: 'url("http://www.famliytree.cn/icon/index-home-image-4.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}/>
                        <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                            <span style={{letterSpacing: '30px'}}>高效的投递方式</span>
                        </TweenOne>
                        <TweenOne className="banner-user-text"
                                  animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>
                            <span style={{letterSpacing: '20px'}}>为您节省更多的快递运输时间</span>
                        </TweenOne>
                    </Element>
                </BannerAnim>
            </div>
        );
    }
}
