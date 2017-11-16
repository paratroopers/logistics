import * as React from "react";
import {Component} from "react";
import {Row} from "antd";
/* Banner 及 动画效果*/
import BannerAnim from 'rc-banner-anim';
import TweenOne, {TweenOneGroup} from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
const {Element, Arrow, Thumb} = BannerAnim;
const BgElement = Element.BgElement;
const bannerData = require("../../themes/images/data.json");

interface BannerAnimControlProps {
}
interface BannerAnimControlStates {
    intShow: number,
    prevEnter: boolean,
    nextEnter: boolean,
    thumbEnter: boolean,
}

export class BannerAnimControl extends Component<BannerAnimControlProps, BannerAnimControlStates> {
    imgArray: Array<any>;

    constructor(props, context) {
        super(props, context);
        this.imgArray = bannerData.banner || [];
        this.state = {
            intShow: 0,
            prevEnter: false,
            nextEnter: false,
            thumbEnter: false,
        };
        [
            'onChange',
            'prevEnter',
            'prevLeave',
            'nextEnter',
            'nextLeave',
            'onMouseEnter',
            'onMouseLeave',
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    onChange(type, int) {
        if (type === 'before') {
            this.setState({
                intShow: int,
            });
        }
    }

    getNextPrevNumber() {
        let nextInt = this.state.intShow + 1;
        let prevInt = this.state.intShow - 1;
        if (nextInt >= this.imgArray.length) {
            nextInt = 0;
        }
        if (prevInt < 0) {
            prevInt = this.imgArray.length - 1;
        }

        return [prevInt, nextInt];
    }

    prevEnter() {
        this.setState({
            prevEnter: true,
        });
    }

    prevLeave() {
        this.setState({
            prevEnter: false,
        });
    }

    nextEnter() {
        this.setState({
            nextEnter: true,
        });
    }

    nextLeave() {
        this.setState({
            nextEnter: false,
        });
    }

    onMouseEnter() {
        this.setState({
            thumbEnter: true,
        });
    }

    onMouseLeave() {
        this.setState({
            thumbEnter: false,
        });
    }

    renderItem() {
        return this.imgArray.map((item, i) =>
            <Element key={i} prefixCls="banner-anim-elem">
                <BgElement key={"a" + i} className="banner-anim-bg">
                    <img src={item.data}></img>
                </BgElement>
                <TweenOne className="banner-anim-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                    {item.title}
                </TweenOne>
                <TweenOne className="banner-anim-text" animation={{y: 30, opacity: 0, type: 'from', delay: 100}}>
                    {item.des}
                </TweenOne>
            </Element>
        );
    }

    render() {
        const intArray = this.getNextPrevNumber();
        const thumbChildren = this.imgArray.map((item, i) =>
            <span key={i}><i style={{backgroundImage: `url(${item.data})`}}/></span>
        );
        return (
            <BannerAnim
                autoPlay
                onChange={this.onChange}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                prefixCls="custom-arrow-thumb"
            >
                {this.renderItem()}
                <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={TweenOne}
                       onMouseEnter={this.prevEnter}
                       onMouseLeave={this.prevLeave}
                       animation={{left: this.state.prevEnter ? 0 : -120}}
                >
                    <div className="arrow"></div>
                    <TweenOneGroup
                        enter={{opacity: 0, type: 'from'}}
                        leave={{opacity: 0}}
                        appear={false}
                        className="img-wrapper" component="ul"
                    >
                        <li style={{backgroundImage: `url(${this.imgArray[intArray[0]].data})`}} key={intArray[0]}/>
                    </TweenOneGroup>
                </Arrow>
                <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={TweenOne}
                       onMouseEnter={this.nextEnter}
                       onMouseLeave={this.nextLeave}
                       animation={{right: this.state.nextEnter ? 0 : -120}}
                >
                    <div className="arrow"></div>
                    <TweenOneGroup
                        enter={{opacity: 0, type: 'from'}}
                        leave={{opacity: 0}}
                        appear={false}
                        className="img-wrapper"
                        component="ul"
                    >
                        <li style={{backgroundImage: `url(${this.imgArray[intArray[1]].data})`}} key={intArray[1]}/>
                    </TweenOneGroup>
                </Arrow>
                <Thumb prefixCls="user-thumb" key="thumb" component={TweenOne}
                       animation={{bottom: this.state.thumbEnter ? 0 : -70}}
                >
                    {thumbChildren}
                </Thumb>
            </BannerAnim>
        );
    }
}