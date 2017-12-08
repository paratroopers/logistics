import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout} from "antd";
const {Content} = Layout;

interface NaCompanyProfilePageProps {

}

interface NaCompanyProfilePageProps {

}

@withRouter
export class NaCompanyProfilePage extends Component<NaCompanyProfilePageProps, NaCompanyProfilePageProps> {
    constructor(props, context) {
        super(props, context)
    }



    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%'}}>
            <Content>
                公司简介
            </Content>
        </Layout>;
    }
}