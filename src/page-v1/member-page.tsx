import * as React from "react";
import {Component} from "react";
import {withRouter, hashHistory} from "react-router";
import {Context} from '../util/common';
import {connect} from 'react-redux'
import {Layout} from "antd";
import {APINameSpace} from "../model/api";
const {Content, Sider} = Layout;
import {MemberNavigation} from "../components-v1/member-navigation";
import {Util} from "../util/util";
import {Constants} from '../util/common';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {Cookies} from '../util/cookie';

interface MemberPageProps {
    showNav?: boolean;
}

interface NMemberPageStates {
    collapsed: boolean;
}

@withRouter
class MemberPage extends Component<MemberPageProps, NMemberPageStates> {

    interval: any;

    constructor(props, context) {
        super(props, context)
        this.state = {
            collapsed: false
        }
    }


    componentDidMount() {
        //console.log(Cookies.get('Authorization'));
        if (!Cookies.get('Authorization')||!Context.getCurrentUser())
            hashHistory.push(PathConfig.LoginPage);
        this.interval = setInterval(() => this.getToken(), 1000 * 60 * 3);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        if ('showNav' in nextProps && nextProps.showNav !== this.props.showNav) {
            this.setState({collapsed: nextProps.showNav});
        }
    }

    getToken() {
        APINameSpace.MemberAPI.GetToken().then(result => {
            if (result.Data !== "") {
                console.log(result.Data);
                Cookies.set("Authorization", result.Data, 1);//cookie保存一天
            }
        })

    }

    onCollapse = (collapsed) => {
        //this.setState({collapsed});
    }

    render() {
        /** 不存在登录信息、需要登录*/
        if (!Cookies.get('Authorization')||!Context.getCurrentUser())
            hashHistory.push(PathConfig.LoginPage);

        const topThis = this;
        const {state: {collapsed}, props: {children, showNav}} = topThis;
        const sider = {collapsedWidth: Util.getScrrenMode(window.innerWidth) !== ModelNameSpace.ScreenModeEnum.sm ? 64 : 0};
        const siderStyle = Constants.minSM ? {height: (window.innerHeight - 95) + 'px'} : {};
        const siderHidden = showNav ? {disaplay: 'block'} : {disaplay: 'none'};
        const isMobile = window.innerWidth <= 768;
        // collapsedWidth={Util.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? '' : 0}
        return <div className="member-page" style={{maxWidth: '1200px', margin: '0 auto'}}>
            <Layout style={{minHeight: '100%', backgroundColor: '#fafafa'}}>
                <Sider style={{
                    display: isMobile ? 'none' : '',
                    zIndex: 1,
                    minHeight: "calc(100vh - 80px)",
                    backgroundColor: "#FFF", ...siderStyle, ...siderHidden
                }}
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
