import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import MotionBannerControl from "../../components/motion/motion-banner";
import MotionContentAControl from "../../components/motion/motion-content-a";
import MotionContentBControl from "../../components/motion/motion-content-b";
import MotionFooterControl from "../../components/motion/motion-footer";

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
            {/*<MotionBannerControl></MotionBannerControl>*/}
            {/*<MotionContentAControl></MotionContentAControl>*/}
            <MotionContentBControl></MotionContentBControl>
            {/*<MotionFooterControl></MotionFooterControl>*/}
        </div>;
    }
}
