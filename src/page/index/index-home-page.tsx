import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {MotionBannerControl}from "../../components/motion/motion-banner";

interface HomePageProps {}
interface HomePageStates {}

@withRouter
export class HomePage extends Component<HomePageProps, HomePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            <MotionBannerControl></MotionBannerControl>
        </div>;
    }

}
