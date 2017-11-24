import * as React from 'react';
import {Layout} from "antd";
import {TabBar} from 'antd-mobile';
import NaHeader from "../../components/controls/na-header";
const {Header, Content} = Layout;

interface NaMasterMobilePageProps {
    selectedTab?: TabType;
}

interface NaMasterMobilePageStates {
    selectedTab?: TabType;
}

export enum TabType {
    User = 1,
    Order = 2,
    Warehouse = 3,
    Service = 4
}
export class NaMasterMobilePage extends React.Component<NaMasterMobilePageProps, NaMasterMobilePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedTab: TabType.User
        }
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

    renderContent() {
        const topThis = this;
        const {props: {children}} = topThis;
        return <Layout>
            <Content style={{background: "#FFF"}}>
                {children}
            </Content>
        </Layout>
    }

    render() {
        const topThis = this;
        return <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
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
                        this.setState({
                            selectedTab: TabType.User,
                        });
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
                        this.setState({
                            selectedTab: TabType.Order,
                        });
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