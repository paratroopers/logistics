import * as React from 'react';
import {InjectedIntlProps} from "react-intl";
import {hashHistory} from 'react-router';
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
    User = 1,
    Order = 2,
    Warehouse = 3,
    Service = 4
}

export class NaMasterMobilePage extends React.Component<NaMasterMobilePageProps, NaMasterMobilePageStates> {
    defaultConfig: NaMasterMobilePageStates = {
        selectedTab: TabType.User,
        tabHeight: 50,
        navHeight: 45
    }

    constructor(props, context) {
        super(props, context);
        this.state = this.defaultConfig;
    }

    onSelectUser() {
        return this.state.selectedTab === TabType.User
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
            case TabType.User:
                pathname = PathConfig.HomePage;
                break;
            case TabType.Order:
                pathname = PathConfig.DemoPage;
                break;
        }
        NaGlobal.store.dispatch(MobileSelectTabAction.SelectTabLoaded(Number(type)));
        hashHistory.push({pathname: pathname, query: {selectedTab: type}});
    }

    renderContent() {
        /*        const topThis = this;
         const {props: {children}} = topThis;
         const height = window.innerHeight - this.state.tabHeight - this.state.tabHeight + 'px';
         return <div style={{height: height}}>
         <Layout >
         <Content style={{background: "#FFF"}}>

         </Content>
         </Layout></div>*/
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
                <Content style={{marginTop: 45}}>
                    {children}
                </Content>
                <Footer className="footer fixed" style={{top: tabHeight}}>
                    <TabBar unselectedTintColor="#949494"
                            tintColor="#33A3F4"
                            barTintColor="white"
                            hidden={false}>
                        <TabBar.Item
                            title={'User'}
                            key={TabType.User}
                            icon={this.renderWebIcon('user')}
                            selectedIcon={this.renderWebIcon('user')}
                            selected={this.onSelectUser()}
                            onPress={() => {
                                this.onTabChange(TabType.User);
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={this.renderWebIcon('tag-o')}
                            selectedIcon={this.renderWebIcon('tag')}
                            title="Order"
                            key={TabType.Order}
                            selected={this.onSelectOrder()}
                            onPress={() => {
                                this.onTabChange(TabType.Order);
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            title="Friend"
                            key="Friend"
                            dot
                            selected={this.onSelectWarehouse()}
                            onPress={() => {
                                this.setState({
                                    selectedTab: TabType.Warehouse,
                                });
                            }}>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                            selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                            title="My"
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