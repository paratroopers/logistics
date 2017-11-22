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
        const links = data.contentLink.split(/\n/).filter(item => item);
        const content = data.content.split(/\n/).filter(item => item)
            .map((item, ii) => {
                const cItem = item.trim();
                const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i);
                return (<li className={isImg ? 'icon' : ''} key={ii}>
                    <a href={links[ii]} target="_blank">
                        {isImg ? <img src={cItem} width="100%"/> : cItem}
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
            img: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
            content: 'A efficient motion design solutions'
        };
        const dataSource = [
            {title: '产品', content: '产品更新记录\nAPI文档\n快速入门\n参考指南', contentLink: '#\n#\n#\n#'},
            {title: '关于', content: 'FAQ\n联系我们', contentLink: '#\n#'},
            {title: '资源', content: 'Ant Design\nAnt Design Mobile\nAnt Cool\nAntD Library', contentLink: '#\n#\n#\n#'},
            {
                title: '关注',
                content: 'https://zos.alipayobjects.com/rmsportal/IiCDSwhqYwQHLeU.svg\n https://zos.alipayobjects.com/rmsportal/AXtqVjTullNabao.svg\n https://zos.alipayobjects.com/rmsportal/fhJykUTtceAhYFz.svg\n https://zos.alipayobjects.com/rmsportal/IDZTVybHbaKmoEA.svg',
                contentLink: '#\n#\n#\n#'
            },
        ];
        const liChildrenToRender = dataSource.map(this.getLiChildren);

        return (
            <OverPack {...props} className={`content-template ${isNullOrUndefined(className) ? "motion-footer" : className}`}>
                <QueueAnim type="bottom" component="ul" key="ul" leaveReverse>
                    <li key="logo">
                        <p className="logo">
                            <img src={logoContent.img} width="100%"/>
                        </p>
                        <p>{logoContent.content}</p>
                    </li>
                    {liChildrenToRender}
                </QueueAnim>
                <TweenOne animation={{y: '+=30', opacity: 0, type: 'from'}} key="copyright" className="copyright">
                    <span>Copyright © 2016 The Project by <a href="#">Ant Motion</a>. All Rights Reserved</span>
                </TweenOne>
            </OverPack>);
    }
}