import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {BannerAnimControl}from "../../components/motion/motion-banner-anim";
import {MotionBannerControl}from "../../components/motion/motion-banner";

interface MySpacePageProps {}
interface MySpacePageStates {}

@withRouter
export class MySpacePage extends Component<MySpacePageProps, MySpacePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            <MotionBannerControl></MotionBannerControl>
            <BannerAnimControl></BannerAnimControl>
        </div>;
    }
}
