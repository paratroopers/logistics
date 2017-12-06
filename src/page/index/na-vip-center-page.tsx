import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout} from "antd";
const {Header, Content, Sider, Footer} = Layout;
import {NaVIPNavigation}from "../../components/controls/na-vip-navigation";


interface NaVIPCenterPageProps {
}

interface NaVIPCenterPageStates {
    collapsed: boolean;
}

@withRouter
export class NaVIPCenterPage extends Component<NaVIPCenterPageProps, NaVIPCenterPageStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            collapsed: false
        }
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    render() {
        const topThis = this;
        const {state: {collapsed},props:{children}} = topThis;
        return <Layout style={{height: '100%'}}>
            <Sider className="na-side" collapsible collapsedWidth={0} collapsed={collapsed} onCollapse={topThis.onCollapse.bind(this)}>
                <NaVIPNavigation></NaVIPNavigation>
            </Sider>
            <Content>
                {children}
            </Content>
        </Layout>;
    }
}
