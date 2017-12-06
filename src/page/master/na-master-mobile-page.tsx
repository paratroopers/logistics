import * as React from 'react';
import {InjectedIntlProps} from "react-intl";
import {hashHistory} from 'react-router';
import {connect} from 'react-redux'
import {TabBar, NavBar, Icon} from 'antd-mobile';
import {Icon as WebIcon, Layout} from 'antd';
import {NaGlobal} from '../../util/common';
import {MobileSelectTabAction} from '../../actions/index';
import {PathConfig} from '../../config/pathconfig';
import {NaVIPNavigation} from '../../components/controls/na-vip-navigation';
import {NaMobileNavbarPopover} from '../../components/controls/na-mobile-navbar-popover';

interface NaMasterMobilePageProps extends ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    selectedTab?: TabType;
}

interface NaMasterMobilePageStates {
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

class NaMasterMobilePage extends React.Component<NaMasterMobilePageProps, NaMasterMobilePageStates> {
    defaultConfig: NaMasterMobilePageStates = {
        selectedTab: TabType.Home,
        tabHeight: 50,
        navHeight: 45,
        collapsed: true
    }

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

    onSelectHome() {
        return this.state.selectedTab === TabType.Home
    }

    onSelectOrder() {
        return this.state.selectedTab === TabType.Order
    }

    onSelectWarehouse() {
        return this.state.selectedTab === TabType.Warehouse
    }

    onSelectService() {
        return this.state.selectedTab === TabType.Service
    }

    onTabChange(type: TabType) {
        let pathname: string = "";
        switch (type) {
            case TabType.Home:
                pathname = PathConfig.HomePage;
                break;
            case TabType.Order:
                pathname = PathConfig.DemoPage;
                break;
            case TabType.Service:
                pathname = PathConfig.VIPCenterPage;
                break;
            default:
                pathname = PathConfig.HomePage;
                break;
        }
        NaGlobal.store.dispatch(MobileSelectTabAction.SelectTabLoaded(Number(type)));
        hashHistory.push({pathname: pathname, query: {selectedTab: type}});
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    renderHeaderRight() {
        return <NaMobileNavbarPopover></NaMobileNavbarPopover>;
    }

    renderWebIcon(iconName: string) {
        return <WebIcon type={iconName} className="button"></WebIcon>;
    }

    render() {
        const topThis = this;
        const {tabHeight, navHeight} = this.state;
        const {Header, Content, Footer} = Layout;
        const {props: {children}} = topThis;
        const _tabHeight: string = window.innerHeight - tabHeight + 'px';
        const _siderHeight: string = window.innerHeight - tabHeight - navHeight + 'px';
        /*        onLeftClick={() => console.log('onLeftClick')}
                rightContent={this.renderHeaderRight()}
                icon={<Icon type="left"/>}>>*/
        return <div className="mobile-page">
            <Layout>
                <Header className="header fixed">
                    <NavBar
                        mode="light">
                        Im Araysa
                    </NavBar>
                </Header>
                <Content>
                    {children}
                </Content>
                <Footer className="footer fixed" style={{top: _tabHeight}}>
                    <TabBar unselectedTintColor="#949494"
                            tintColor="#33A3F4"
                            barTintColor="white"
                            hidden={false}>
                        <TabBar.Item
                            title={'首页'}
                            key={TabType.Home}
                            icon={this.renderWebIcon('home')}
                            selectedIcon={this.renderWebIcon('home')}
                            selected={this.onSelectHome()}
                            onPress={() => {
                                this.onTabChange(TabType.Home);
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={this.renderWebIcon('pay-circle-o')}
                            selectedIcon={this.renderWebIcon('pay-circle')}
                            title="费用"
                            key={TabType.Order}
                            dot={true}
                            selected={this.onSelectOrder()}
                            onPress={() => {
                                this.onTabChange(TabType.Order);
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={this.renderWebIcon('customer-service')}
                            selectedIcon={this.renderWebIcon('customer-service')}
                            title={"客服"}
                            key={TabType.Warehouse}
                            selected={this.onSelectWarehouse()}
                            onPress={() => {
                                this.onTabChange(TabType.Warehouse);
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={this.renderWebIcon('user')}
                            selectedIcon={this.renderWebIcon('user')}
                            title={"会员"}
                            key={TabType.Service}
                            selected={this.onSelectService()}
                            onPress={() => {
                                this.onTabChange(TabType.Service);
                            }}>
                        </TabBar.Item>
                    </TabBar>
                </Footer>
                {/*<Layout.Sider collapsible={true}*/}
                              {/*defaultCollapsed={true}*/}
                              {/*collapsed={this.state.collapsed}*/}
                              {/*collapsedWidth={0}*/}
                              {/*className='na-side'*/}
                              {/*style={{height: _siderHeight, marginTop: navHeight}}*/}
                              {/*onCollapse={this.onCollapse}>*/}
                    {/*<NaVIPNavigation></NaVIPNavigation>*/}
                {/*</Layout.Sider>*/}
            </Layout>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTab: state.tab.tabName
    }
}
export default connect(mapStateToProps)(NaMasterMobilePage);