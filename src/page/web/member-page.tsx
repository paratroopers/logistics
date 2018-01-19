import * as React from "react";
import {Component} from "react";
import {withRouter, hashHistory} from "react-router";
import {Global} from '../../util/common';
import {connect} from 'react-redux'
import {Layout} from "antd";
import  {MememberAPI} from "../../api/member";

const {Content, Sider} = Layout;
import {MemberNavigation} from "../../components/controls/member/member-navigation";
import {Util} from "../../util/util";
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

    interval: any;

    constructor(props, context) {
        super(props, context)
        this.state = {
            collapsed: false
        }
    }


    componentDidMount() {
        //console.log(Cookies.get('Authorization'));
        if (!Cookies.get('Authorization'))
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
        MememberAPI.GetToken().then(result => {
            if (result.Data !== "") {
                console.log(result.Data);
                Cookies.set("Authorization", result.Data);
            }
        })

    }

    onCollapse = (collapsed) => {
        //this.setState({collapsed});
    }

    render() {
        const topThis = this;
        const {state: {collapsed}, props: {children, showNav}} = topThis;
        const sider = {collapsedWidth: Util.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? 64 : 0};
        const siderStyle = Constants.minSM ? {height: (window.innerHeight - 95) + 'px'} : {};
        const siderHidden = showNav ? {disaplay: 'block'} : {disaplay: 'none'};
        // collapsedWidth={Util.getScrrenMode(window.innerWidth) !== ScreenModeEnum.sm ? '' : 0}
        return <div className="member-page" style={{maxWidth: '1200px', margin: '0 auto'}}>
            <Layout style={{minHeight: '100%', backgroundColor: '#fafafa'}}>
                <Sider style={{
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
