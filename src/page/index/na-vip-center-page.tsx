import * as React from "react";
import {Component} from "react";
import {withRouter, hashHistory} from "react-router";
import {NaGlobal} from '../../util/common';
import {connect} from 'react-redux'
import {Layout} from "antd";

const {Content, Sider} = Layout;
import {NaVIPNavigation} from "../../components/controls/na-vip-navigation";
import {NaUtil} from "../../util/util";
import {NaConstants} from '../../util/common';
import {ScreenModeEnum} from "../../api/model/common-model";
import {PathConfig} from '../../config/pathconfig';
import {Cookies} from '../../util/cookie';
import {MobileNavTreeAction} from '../../actions/index';

interface NaVIPCenterPageProps {
    showNav?: boolean;
}

interface NaVIPCenterPageStates {
    collapsed: boolean;
}

@withRouter
class NaVIPCenterPage extends Component<NaVIPCenterPageProps, NaVIPCenterPageStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            collapsed: false
        }
    }


    componentDidMount() {
        console.log(Cookies.get('Authorization'));
        if (!Cookies.get('Authorization'))
            hashHistory.push(PathConfig.LoginPage);
    }

    componentWillReceiveProps(nextProps) {
        if ('showNav' in nextProps && nextProps.showNav !== this.props.showNav) {
            this.setState({collapsed: nextProps.showNav});
        }
    }

    onCollapse = (collapsed) => {
        //this.setState({collapsed});
    }

    render() {
        const topThis = this;
        const {state: {collapsed}, props: {children, showNav}} = topThis;
        const sider = {collapsedWidth: NaUtil.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? 64 : 0};
        const siderStyle = NaConstants.minSM ? {height: (window.innerHeight - 95) + 'px'} : {};
        const siderHidden = showNav ? {disaplay: 'block'} : {disaplay: 'none'};
        // collapsedWidth={NaUtil.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? '' : 0}
        return <Layout style={{minHeight: '100%'}}>
            <Sider style={{zIndex: 1, ...siderStyle, ...siderHidden}}
                   trigger={null}
                   collapsible={true}
                   className='na-side'
                   {...sider}
                   collapsed={collapsed}>
                <NaVIPNavigation></NaVIPNavigation>
            </Sider>
            <Content style={{margin: 16, padding: 16, backgroundColor: '#FFF'}}>
                {children}
            </Content>
        </Layout>;
    }
}

const mapStateToProps = (state) => {
    return {
        showNav: state.nav.showModal
    }
}
export default connect(mapStateToProps)(NaVIPCenterPage);
