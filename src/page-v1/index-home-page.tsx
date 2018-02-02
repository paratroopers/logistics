import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {MotionHeaderImage} from '../components-v1/index-header-image';
import MotionBannerControl from "../components-v1/index-banner";
import MotionContentAControl from "../components-v1/index-content-a";
import MotionContentBControl from "../components-v1//index-content-b";

interface HomePageProps {
}

interface HomePageStates {
}

@withRouter
export class IndexHomePage extends Component<HomePageProps, HomePageStates> {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return <div className="templates-wrapper">
            <MotionHeaderImage></MotionHeaderImage>
            {/*<MotionBannerControl></MotionBannerControl>*/}
            <MotionContentAControl></MotionContentAControl>
            <MotionContentBControl></MotionContentBControl>
        </div>;
    }
}
