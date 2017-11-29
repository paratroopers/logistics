import * as React from 'react';
import {InjectedIntlProps} from "react-intl";
import {hashHistory} from 'react-router';
import {connect} from 'react-redux'
import {TabBar, NavBar, Icon} from 'antd-mobile';
import {Icon as WebIcon, Layout} from 'antd';
import {NaGlobal} from '../../util/common';
import {MobileSelectTabAction} from '../../actions/index';
import {PathConfig} from '../../config/pathconfig';
import {NaMobileNavbarPopover} from '../../components/controls/na-mobile-navbar-popover';

interface NaMasterMobilePageProps extends ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    selectedTab?: TabType;
}

interface NaMasterMobilePageStates {
    selectedTab?: TabType;
    tabHeight?: number;
    navHeight?: number;
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
        navHeight: 45
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
        }
        NaGlobal.store.dispatch(MobileSelectTabAction.SelectTabLoaded(Number(type)));
        hashHistory.push({pathname: pathname, query: {selectedTab: type}});
    }

    renderHeaderRight() {
        return <NaMobileNavbarPopover></NaMobileNavbarPopover>;
    }

    renderWebIcon(iconName: string) {
        return <WebIcon type={iconName} className="button"></WebIcon>;
    }

    render() {
        const topThis = this;
        const {Header, Content, Footer} = Layout;
        const {props: {children}} = topThis;
        const tabHeight = window.innerHeight - this.state.tabHeight + 'px';
        return <div className="mobile-page">
            <Layout>
                <Header className="header fixed">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={this.renderHeaderRight()}>
                        Im Araysa
                    </NavBar>
                </Header>
                <Content>
                    {children}
                </Content>
                <Footer className="footer fixed" style={{top: tabHeight}}>
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
                            title="客服"
                            key="Friend"
                            selected={this.onSelectWarehouse()}
                            onPress={() => {
                                this.setState({
                                    selectedTab: TabType.Warehouse,
                                });
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={this.renderWebIcon('user')}
                            selectedIcon={this.renderWebIcon('user')}
                            title="会员"
                            key="my"
                            selected={this.onSelectService()}
                            onPress={() => {
                                this.setState({
                                    selectedTab: TabType.Service,
                                });
                            }}>
                        </TabBar.Item>
                    </TabBar>
                </Footer>
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