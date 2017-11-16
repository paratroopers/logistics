import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {NaGlobal} from '../../util/common';
import {TaskAction} from "../../actions/index";
import MotionBannerControl from "../../components/motion/motion-banner";

interface HomePageProps {}
interface HomePageStates {}

@withRouter
export class HomePage extends Component<HomePageProps, HomePageStates> {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount(){
        NaGlobal.store.dispatch(TaskAction.requestTaskCount());
        NaGlobal.store.dispatch(TaskAction.taskCountLoaded(1,2));
    }

    render() {
        return <div>
            <MotionBannerControl></MotionBannerControl>
        </div>;
    }

}
