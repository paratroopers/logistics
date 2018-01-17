import * as React from "react";
import {Component} from "react";
import {withRouter, hashHistory} from "react-router";
import {Global} from '../../util/common';
import {connect} from 'react-redux'
import {Layout} from "antd";

const {Content, Sider} = Layout;
import {MemberNavigation} from "../../components/controls/member/member-navigation";
import {NaUtil} from "../../util/util";
import {Constants} from '../../util/common';
import {ScreenModeEnum} from "../../api/model/common-model";
import {PathConfig} from '../../config/pathconfig';
import {Cookies} from '../../util/cookie';
import {MobileNavTreeAction} from '../../actions/index';

interface MemberPageProps {
    showNav?: boolean;
}

interface NMemberPageStates {
    collapsed: boolean;
}

@withRouter
class MemberPage extends Component<MemberPageProps, NMemberPageStates> {
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
        const siderStyle = Constants.minSM ? {height: (window.innerHeight - 95) + 'px'} : {};
        const siderHidden = showNav ? {disaplay: 'block'} : {disaplay: 'none'};
        // collapsedWidth={NaUtil.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? '' : 0}
        return <div className="member-page" style={{maxWidth: '1200px', margin: '0 auto'}}>
            <Layout style={{minHeight: '100%'}}>
                <Sider style={{zIndex: 1, minHeight: "calc(100vh - 80px)",backgroundColor:"#FFF", ...siderStyle, ...siderHidden}}
                       trigger={null}
                       collapsible={true}
                       className='na-side'
                       {...sider}
                       collapsed={collapsed}>
                    <MemberNavigation></MemberNavigation>
                </Sider>
                <Content className="member-page-content">
                    {children}
                </Content>
            </Layout>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        showNav: state.nav.showModal
    }
}
export default connect(mapStateToProps)(MemberPage);
