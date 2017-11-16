import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Carousel, Row, Col, Button, Icon} from 'antd';
import {isNullOrUndefined} from "util";
const bannerData = require("../../themes/images/data.json");

/* 按钮*/
interface SampleProps {
    className?: string;
    onClick?: () => void;
}
interface SampleStates {
}

export class SampleArrow extends Component<SampleProps, SampleStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {props: {className, onClick, children}} = this;
        return (
            <div className={className}
                 style={{display: "none"}}
                 onClick={onClick}
            >
                {children}
            </div>
        );
    }
}

interface DemoCarouselPageProps {
}
interface DemoCarouselPageStates {
}

@withRouter
export class DemoCarouselPage extends Component<DemoCarouselPageProps, DemoCarouselPageStates> {
    constructor(props, context) {
        super(props, context);
    }

    renderBanner() {
        return bannerData.banner.map(function (item, index) {
            // return <Row key={index}>
            //     <Col span={24} className="carousel-item-col" style={{backgroundImage: "url(" + item + ")"}}>
            //         {/*<img src={item}/>*/}
            //     </Col>
            // </Row>;

            return <div key={index}>
                <img src={item.data} style={{width: "100%", height: "100%"}}></img>
            </div>
        })
    }

    renderPrevArrow() {
        return <SampleArrow>
            <Icon type="left"></Icon>
        </SampleArrow>;
    }

    renderNextArrow() {
        return <SampleArrow>
            <Icon type="right"></Icon>
        </SampleArrow>;
    }

    render() {
        const topThis = this;

        const settings = {
            dots: true,
            dotsClass: 'slick-dots slick-thumb',
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return <div className="demo-carousel-page">
            <Carousel autoplay={true}
                      arrows={true}
                      {...settings}
                      prevArrow={topThis.renderPrevArrow()}
                      nextArrow={topThis.renderNextArrow()}>
                {topThis.renderBanner()}
            </Carousel>
        </div>;
    }
}

