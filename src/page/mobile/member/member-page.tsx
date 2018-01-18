import * as React from 'react';
import {withRouter} from 'react-router';
import {List, Badge} from 'antd-mobile';
import {UserAvatar} from '../../../components/controls/user/user-avatar';
import {hashHistory} from 'react-router';
import {Global} from '../../../util/common';
import MobileNavTree from '../../../config/mobile-navconfig';
import {MobileNavTreeAction} from '../../../actions/index';
import {MobilePathConfig, PathConfig} from '../../../config/pathconfig';
import {Cookies} from '../../../util/cookie';
import  {enumAvatarType}from '../../../components/controls/common/common'

interface MemberPageProps {
}

interface MemberPageStates {
}


@withRouter
export class MemberPage extends React.Component<MemberPageProps, MemberPageStates> {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        /*        if (!Cookies.get('Authorization'))
                    hashHistory.push(PathConfig.LoginPage);*/
    }

    renderIcon(icon: string, colorCode: string) {
        const style = colorCode ? {color: colorCode} : {};
        return <i style={style} className={'iconfont ' + icon}></i>;
    }

    onItemClick(data: any) {
        if (data) {
            Global.store.dispatch(MobileNavTreeAction.SelectTabLoaded(data, MobilePathConfig.UserCenter));
            hashHistory.push({pathname: MobilePathConfig.UserCenterDetail});
        }
    }

    onUserItemClick() {
        hashHistory.push({pathname: MobilePathConfig.UserHome});
    }

    renderList(data) {
        const FormatMessage = Global.intl.formatMessage;
        return data.map(item => {
            return <List key={item.Title} renderHeader={() => FormatMessage({id: item.Title})}>
                {
                    item.Children ? item.Children.map(child => {
                        return <List.Item extra={<Badge text={77} overflowCount={55}></Badge>} onClick={x => {
                            this.onItemClick(child.Children)
                        }} key={child.Title} thumb={this.renderIcon(child.Icon, child.Color)}
                                          arrow="horizontal">
                            {FormatMessage({id: child.Title})}
                        </List.Item>
                    }) : {}
                }
            </List>
        })
    }

    render() {
        return <div className='mobile-nav'>
            <List>
                <List.Item arrow="horizontal" className="mobile-nav-userinfo" onClick={this.onUserItemClick.bind(this)}>
                    <UserAvatar className="user-img" size={46} attr="Photo" type={enumAvatarType.user}></UserAvatar>
                    <div className="some-information">
                        <div className="some-information-conetnt">早安，Araysa</div>
                        <span className="some-information-welcome">欢饮你来到大陆网，体验便捷的服务</span>
                    </div>
                </List.Item>
                <List.Item>
                    <div className="mobile-nav-topbar">
                        <div className="left">
                            <strong>0</strong>
                            <span>待打包</span>
                        </div>
                        <div className="center">
                            <strong>12</strong>
                            <span>待付款</span>
                        </div>
                        <div className="right">
                            <strong>14</strong>
                            <span>待发货</span>
                        </div>
                    </div>
                </List.Item>
            </List>
            {this.renderList(MobileNavTree)}
        </div>;
    }
}