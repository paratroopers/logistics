import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";

interface DemoPageProps {
}
interface DemoPageStates {
}

@withRouter
export class DemoPage extends Component<DemoPageProps, DemoPageStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>Hello Word</div>;
    }
}
