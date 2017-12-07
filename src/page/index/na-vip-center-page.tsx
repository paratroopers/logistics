import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout} from "antd";

const {Content, Sider} = Layout;
import {NaVIPNavigation} from "../../components/controls/na-vip-navigation";
import {NaUtil} from "../../util/util";
import {NaConstants} from '../../util/common';
import {ScreenModeEnum} from "../../api/model/common-model";

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
        const {state: {collapsed}, props: {children}} = topThis;
        const sider = {collapsedWidth: NaUtil.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? 64 : 0};
        const siderStyle = NaConstants.minSM ? {height: (window.innerHeight - 95) + 'px'} : {};
        // collapsedWidth={NaUtil.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? '' : 0}
        return <Layout style={{minHeight: '100%'}}>
            <Sider style={{zIndex: 1, ...siderStyle}} collapsible
                   className='na-side'
                   {...sider}
                   collapsed={collapsed}
                   onCollapse={topThis.onCollapse.bind(this)}>
                <NaVIPNavigation></NaVIPNavigation>
            </Sider>
            <Content style={{margin: 16, padding: 16, backgroundColor: '#FFF'}}>
                {children}
            </Content>
        </Layout>;
    }
}
