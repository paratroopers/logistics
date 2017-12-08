import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout} from "antd";
const {Content} = Layout;

interface NaCostEstimatePageProps {

}

interface NaCostEstimatePageProps {

}

@withRouter
export class NaCostEstimatePage extends Component<NaCostEstimatePageProps, NaCostEstimatePageProps> {
    constructor(props, context) {
        super(props, context)
    }



    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%'}}>
            <Content>
                费用估算
            </Content>
        </Layout>;
    }
}