import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout} from "antd";
const {Content} = Layout;

interface NaConsultingCenterPageProps {

}

interface NaConsultingCenterPageProps {

}

@withRouter
export class NaConsultingCenterPage extends Component<NaConsultingCenterPageProps, NaConsultingCenterPageProps> {
    constructor(props, context) {
        super(props, context)
    }



    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%'}}>
            <Content>
                咨询中心
            </Content>
        </Layout>;
    }
}