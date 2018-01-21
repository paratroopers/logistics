import * as React from 'react';
import {InjectedIntlProps} from "react-intl";
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {TabBar, NavBar} from 'antd-mobile';
import {Icon as WebIcon, Layout} from 'antd';
import {Global} from '../../util/common';
import {MobileSelectTabAction, MobileNavTreeAction} from '../../actions/index';
import {PathConfig, MobilePathConfig} from '../../config/pathconfig';
import {HeaderMessage} from '../../components/controls/index/index-header-message';
import {MobilePopover} from '../../components/controls/index/mobile/mobile-popover';

interface MasterMobilePageProps extends ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    selectedTab?: TabType;
    callBack?: string;
}

interface MasterMobilePageStates {
    selectedTab?: TabType;
    tabHeight?: number;
    navHeight?: number;
    collapsed?: boolean;
}

export enum TabType {
    Home = 1,
    Order = 2,
    Warehouse = 3,
    Service = 4
}

@connect(state => ({selectedTab: state.tab.tabName, callBack: state.nav.routerAddress}))
export class MasterMobilePage extends React.Component<MasterMobilePageProps, MasterMobilePageStates> {
    defaultConfig: MasterMobilePageStates = {
        selectedTab: TabType.Home,
        tabHeight: 50,
        navHeight: 45,
        collapsed: true
    }
    tabBarDatas = [
        {title: '首页', key: TabType.Home, icon: 'home'},
        {title: '费用', key: TabType.Order, icon: 'pay-circle-o'},
        {title: '客服', key: TabType.Warehouse, icon: 'customer-service'},
        {title: '会员', key: TabType.Service, icon: 'user'}
    ]

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedTab: props.selectedTab ? props.selectedTab : this.defaultConfig.selectedTab,
            tabHeight: this.defaultConfig.tabHeight,
            navHeight: this.defaultConfig.navHeight
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('selectedTab' in nextProps && nextProps.selectedTab !== this.props.selectedTab) {
            this.setState({selectedTab: nextProps.selectedTab});
        }
    }

    onTabChange(type: TabType) {
        let pathname: string = "";
        switch (type) {
            case TabType.Home:
                pathname = PathConfig.HomePage;
                break;
            case TabType.Order:
                pathname = PathConfig.CostEstimatePage;
                break;
            case TabType.Service:
                pathname = MobilePathConfig.UserCenter;
                break;
            default:
                pathname = MobilePathConfig.UserHelper;
                break;
        }
        Global.store.dispatch(MobileSelectTabAction.SelectTabLoaded(Number(type)));
        hashHistory.push({pathname: pathname, query: {selectedTab: type}});
    }

    renderHeaderRight() {
        return [<HeaderMessage fullScreen={true}></HeaderMessage>,
            <MobilePopover className="right-button"></MobilePopover>];
    }

    renderHeaderLeft() {
        if (this.props.callBack)
            return <a className="mian-theme-color" onClick={x => {
                hashHistory.push({pathname: this.props.callBack});
                Global.store.dispatch(MobileNavTreeAction.SelectTabLoaded(null, null));
            }}><i className="iconfont icon-disclosureindicator"></i></a>
        else
            return <a className="left-icon"><img src="http://www.famliytree.cn/icon/logo.png"/></a>;
    }

    renderWebIcon(iconName: string) {
        return <WebIcon type={iconName} className="button"></WebIcon>;
    }

    renderTabBarItem() {
        return this.tabBarDatas.map(d => {
            return <TabBar.Item
                title={d.title}
                key={d.key}
                icon={this.renderWebIcon(d.icon)}
                selectedIcon={this.renderWebIcon(d.icon)}
                selected={this.state.selectedTab === d.key}
                onPress={() => {
                    this.onTabChange(d.key);
                }}>
            </TabBar.Item>;
        });
    }

    render() {
        const {Header, Content, Footer} = Layout;
        const {props: {children}, state: {tabHeight, navHeight}} = this;
        const footerTop: string = window.innerHeight - tabHeight + 'px',
            contentHeight: string = window.innerHeight - tabHeight - navHeight + 'px';
        return <div className="mobile-page">
            <Layout>
                <Header className="mobile-page-header fixed">
                    <NavBar
                        mode="light"
                        rightContent={this.renderHeaderRight()}>
                        <a className="left-icon">
                            <img onClick={() => {
                                hashHistory.push(PathConfig.HomePage)
                            }} src="http://www.famliytree.cn/icon/logo_mobile.png"/>
                        </a>
                    </NavBar>
                    <div className={'a'}></div>
                </Header>
                <Content className="mobile-page-content"
                         style={{minHeight: contentHeight, marginTop: navHeight, marginBottom: tabHeight}}>
                    {children}
                </Content>
                <Footer className="mobile-page-footer fixed" style={{top: footerTop}}>
                    <TabBar unselectedTintColor="#949494"
                            tintColor="#e65922"
                            barTintColor="white"
                            hidden={false}>
                        {this.renderTabBarItem()}
                    </TabBar>
                </Footer>
            </Layout>
        </div>
    }
}