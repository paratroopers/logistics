import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import MotionBannerControl from "../../components/motion/motion-banner";

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
        return <div>
            {/*<MotionBannerControl></MotionBannerControl>*/}
        </div>;
    }
}
