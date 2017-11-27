import * as React from 'react';
import {InjectedIntlProps} from "react-intl";
import {withRouter, hashHistory} from 'react-router';
import {Layout} from "antd";
import {TabBar} from 'antd-mobile';
import {PathConfig} from '../../config/pathconfig';
const {Header, Content} = Layout;

interface NaMasterMobilePageProps extends ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    selectedTab?: TabType;
}

interface NaMasterMobilePageStates {
    selectedTab?: TabType;
    tabHeight?: number;
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
        tabHeight: 50
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
        hashHistory.push({pathname: pathname, query: {selectedTab: type}});
        //this.props.router.replace({pathname: pathname, query: {selectedTab: type}});
    }

    renderContent() {
        const topThis = this;
        const {props: {children}} = topThis;
        const height = window.innerHeight - this.state.tabHeight + 'px';
        return <div style={{height: height}}>
            <Layout >
                <Content style={{background: "#FFF"}}>
                    {children}
                </Content>
            </Layout></div>
    }

    render() {
        const topThis = this;
        return <div>
            <TabBar unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={false}>
                <TabBar.Item
                    title="Life"
                    key="Life"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                    }}/>
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                    }}/>}
                    selected={this.onSelectUser()}
                    badge={1}
                    onPress={() => {
                        this.onTabChange(TabType.User);
                    }}>
                    {topThis.renderContent()}
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                    }
                    title="Koubei"
                    key="Koubei"
                    badge={'new'}
                    selected={this.onSelectOrder()}
                    onPress={() => {
                        this.onTabChange(TabType.Order);
                    }}>
                    {topThis.renderContent()}
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
                    {topThis.renderContent()}
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
                    {topThis.renderContent()}
                </TabBar.Item>
            </TabBar>
        </div>
    }
}