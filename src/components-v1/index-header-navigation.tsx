import * as React from "react";
import {hashHistory} from 'react-router';
import {Row, Menu, Dropdown, Icon} from 'antd';
import {Global} from "../util/common";
import {CommonLocale} from "../locales/localeid";
import {PathConfig} from "../config/pathconfig";

interface HeaderNavigationProps {
    theme?: "light" | "dark" | undefined;
    member?: boolean;
    onClick?: (key: string) => void;
    type: NavigationType;
}

interface HeaderNavigationStates {

}

export enum NavigationType {
    Button = 0,
    Default = 1
}

export class HeaderNavigation extends React.Component<HeaderNavigationProps, HeaderNavigationStates> {

    onClickNavigation({item, key, keyPath}) {
        switch (key) {
            case PathConfig.MemberIndexPage:
                if (this.props.member) {
                    hashHistory.push({pathname: PathConfig.MemberIndexPage});
                } else {
                    hashHistory.push({pathname: PathConfig.LoginPage});
                }
                break;
            default:
                hashHistory.push({pathname: key});
                break;
        }
        this.props.onClick && this.props.onClick(key);
    }

    renderButtonNavigation(): JSX.Element {
        const {formatMessage} = Global.intl;
        const menu = <Menu className="na-header-button-navigation">
            <Menu.Item
                key={PathConfig.HomePage}>{formatMessage({id: CommonLocale.HeaderMenuHome})}</Menu.Item>
            <Menu.Item
                key={PathConfig.CostEstimatePage}>{formatMessage({id: CommonLocale.HeaderMenuCostEstimate})}</Menu.Item>
            <Menu.Item
                key={PathConfig.CompanyProfilePage}>{formatMessage({id: CommonLocale.HeaderMenuCompanyProfile})}</Menu.Item>
            <Menu.Item
                key={PathConfig.MemberIndexPage}>{formatMessage({id: CommonLocale.HeaderMenuVIPCenter})}</Menu.Item>
        </Menu>
        return <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Row type="flex" justify="start" align="middle" style={{cursor: "pointer"}}>
                <Icon type="bars" className="bars"/>菜单
            </Row>
        </Dropdown>
    }

    renderNavigation(): JSX.Element {
        const {theme} = this.props;
        return <Row type="flex" justify="end">
            <Menu theme={theme ? theme : "dark"}
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  className="na-header-navigation"
                  onClick={this.onClickNavigation.bind(this)}>
                <Menu.Item
                    key={PathConfig.HomePage}>{Global.intl.formatMessage({id: CommonLocale.HeaderMenuHome})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.CostEstimatePage}>{Global.intl.formatMessage({id: CommonLocale.HeaderMenuCostEstimate})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.CompanyProfilePage}>{Global.intl.formatMessage({id: CommonLocale.HeaderMenuCompanyProfile})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.MemberIndexPage}>{Global.intl.formatMessage({id: CommonLocale.HeaderMenuVIPCenter})}</Menu.Item>
            </Menu>
        </Row>;
    }

    render() {
        return <div>
            {
                this.props.type === NavigationType.Default ?
                    this.renderNavigation() : this.renderButtonNavigation()
            }
        </div>
    }
}