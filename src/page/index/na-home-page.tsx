import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {MotionHeaderImage} from '../../components/motion/motion-header-image';
import MotionBannerControl from "../../components/motion/motion-banner";
import MotionContentAControl from "../../components/motion/motion-content-a";
import MotionContentBControl from "../../components/motion/motion-content-b";

interface NaHomePageProps {
}

interface NaHomePageStates {
}

@withRouter
export class NaHomePage extends Component<NaHomePageProps, NaHomePageStates> {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return <div className="templates-wrapper">
            {/*<MotionHeaderImage></MotionHeaderImage>*/}
            {/*<MotionBannerControl></MotionBannerControl>*/}
            {/*<MotionContentAControl></MotionContentAControl>*/}
            {/*<MotionContentBControl></MotionContentBControl>*/}
        </div>;
    }
}
