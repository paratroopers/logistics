import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Avatar, Card, Icon} from "antd";

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
        return <Row className="demo-page">

        </Row>
    }
}