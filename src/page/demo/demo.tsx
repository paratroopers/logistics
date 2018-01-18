import * as React from 'react';
import {withRouter} from 'react-router';

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Demo</div>
    }
}