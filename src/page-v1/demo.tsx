import * as React from 'react';
import {withRouter} from 'react-router';
import {
    HeaderMessage
} from "../components-v1/index-header-message";

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export default class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="demo-page">
            <HeaderMessage></HeaderMessage>
        </div>
    }
}