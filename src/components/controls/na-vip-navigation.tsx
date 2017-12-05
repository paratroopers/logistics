import * as React from 'react';
import {Menu, Icon} from 'antd';
const {SubMenu} = Menu;

interface NaVIPNavigationProps {

}

interface NaVIPNavigationStates {

}

export class NaVIPNavigation extends React.Component<NaVIPNavigationProps, NaVIPNavigationStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={"inline"}
            theme="dark">
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>我的仓库</span></span>}>
                <Menu.Item key="0">待打包</Menu.Item>
                <Menu.Item key="1">待发运</Menu.Item>
                <SubMenu key="sub1-2" title="已完成">
                    <Menu.Item key="2">已付款</Menu.Item>
                    <Menu.Item key="3">已发运</Menu.Item>
                    <Menu.Item key="4">已清空</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="setting" /><span>我的设置</span></span>}>
                <Menu.Item key="5">仓库地址</Menu.Item>
                <Menu.Item key="6">用户信息</Menu.Item>
                <Menu.Item key="7">收货地址</Menu.Item>
                <Menu.Item key="8">会员活动</Menu.Item>
                <Menu.Item key="9">邀请记录</Menu.Item>
                <Menu.Item key="10">修改密码</Menu.Item>
            </SubMenu>
            <Menu.Item key="11">
                <Icon type="mail" />
                用户须知
            </Menu.Item>
        </Menu>;
    }
}