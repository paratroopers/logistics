import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {NaGlobal} from '../../util/common';
import {TaskAction} from "../../actions/index";
import DemoControl from "../../components/demo/na-demo";

interface NaDemoPageProps {
}

interface NaDemoPageStates {
}

@withRouter
export class NaDemoPage extends Component<NaDemoPageProps, NaDemoPageStates> {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        /* reducers使用*/
        NaGlobal.store.dispatch(TaskAction.taskCountLoaded(3, 4));
    }

    render() {
        return <div>
            <DemoControl></DemoControl>
        </div>;
    }

}
