import * as React from "react";
import {Component} from "react";
import {withRouter, hashHistory} from "react-router";
import {Context} from '../util/common';
import {connect} from 'react-redux'
import {Layout, message} from "antd";
import {APINameSpace} from "../model/api";
import {MemberNavigation} from "../components-v1/member-navigation";
import {Util} from "../util/util";
import {Constants} from '../util/common';
import {ModelNameSpace} from "../model/model";
import {ResponseNameSpace} from "../model/response";
import {PathConfig} from '../config/pathconfig';
import {isNullOrUndefined} from "util";
const {Content, Sider} = Layout;

interface MemberPageProps {
    showNav?: boolean;
}

interface NMemberPageStates {
    collapsed: boolean;
}

var intervalToken: any;

/** 载入Token信息*/
function initToken() {
    APINameSpace.MemberAPI.GetToken().then((result: ResponseNameSpace.BaseResponse) => {
        if (result.Status === 0) {
            Context.setToken(result.Data);
        } else {
            message.warning("登录信息过期，请重新登录");
            Context.setToken(null);
            Context.setMerchantData(null);
            hashHistory.push(PathConfig.LoginPage);
        }
    })
}

@withRouter
class MemberPage extends Component<MemberPageProps, NMemberPageStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            collapsed: false
        }
    }

    componentWillMount() {
        /** Token、用户信息不存在----请重新登录*/
        if (!Context.getLoginStatus())
            hashHistory.push(PathConfig.LoginPage);
    }

    componentDidMount() {
        /** 定时获取Token------- 暂时注释掉，后期更改*/
        // intervalToken = setInterval(() => initToken(), 1000 * 60 * 3);
    }

    componentWillUnmount() {
        /** 卸载定时获取Token------- 暂时注释掉，后期更改*/
        // clearInterval(intervalToken);
    }

    componentWillReceiveProps(nextProps) {
        if ('showNav' in nextProps && nextProps.showNav !== this.props.showNav) {
            this.setState({collapsed: nextProps.showNav});
        }
    }

    render() {
        /** Token、用户信息不存在----请重新登录*/
        if (!Context.getLoginStatus())
            return null;

        const topThis = this;
        const {state: {collapsed}, props: {children, showNav}} = topThis;
        const sider = {collapsedWidth: Util.getScrrenMode(window.innerWidth) !== ModelNameSpace.ScreenModeEnum.sm ? 64 : 0};
        const siderStyle = Constants.minSM ? {height: (window.innerHeight - 95) + 'px'} : {};
        const siderHidden = showNav ? {disaplay: 'block'} : {disaplay: 'none'};
        const isMobile = window.innerWidth <= 768;
        return <div className="member-page" style={{maxWidth: '1500px', margin: '0 auto'}}>
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
