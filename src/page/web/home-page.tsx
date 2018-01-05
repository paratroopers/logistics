import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {MotionHeaderImage} from '../../components/controls/index/index-header-image';
import MotionBannerControl from "../../components/controls/index/index-banner";
import MotionContentAControl from "../../components/controls/index/index-content-a";
import MotionContentBControl from "../../components/controls/index/index-content-b";

interface HomePageProps {
}

interface HomePageStates {
}

@withRouter
export class HomePage extends Component<HomePageProps, HomePageStates> {
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
