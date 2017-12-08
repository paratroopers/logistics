import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout} from "antd";
const {Content} = Layout;

interface NaProcessDemoPageProps {

}

interface NaProcessDemoPageProps {

}

@withRouter
export class NaProcessDemoPage extends Component<NaProcessDemoPageProps, NaProcessDemoPageProps> {
    constructor(props, context) {
        super(props, context)
    }



    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%'}}>
            <Content>
                流程演示
            </Content>
        </Layout>;
    }
}