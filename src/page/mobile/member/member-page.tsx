import * as React from 'react';
import {withRouter} from 'react-router';
import {List, Badge} from 'antd-mobile';
import {UserAvatar} from '../../../components/controls/user/user-avatar';
import {hashHistory} from 'react-router';
import {Global, Context} from '../../../util/common';
import {CommonLocale} from '../../../locales/localeid';
import MobileNavTree from '../../../config/mobile-navconfig';
import {MobileNavTreeAction} from '../../../actions/index';
import {MobilePathConfig} from '../../../config/pathconfig';
import {MemberWelcomeTab} from "../../../components/controls/member/member-welcome-tab";
import * as moment from 'moment';

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
                        return <List.Item className="list-tree" extra={<Badge text={77} overflowCount={55}></Badge>}
                                          onClick={x => {
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

    timeInterval() {
        const hours = moment().hour();
        const {HeaderGoodMorning, HeaderGoodNoon, HeaderGoodEvening} = CommonLocale;
        let helloMessage: string;
        if (hours >= 0 && hours <= 12) helloMessage = Global.intl.formatMessage({id: HeaderGoodMorning});
        if (hours > 12 && hours <= 18) helloMessage = Global.intl.formatMessage({id: HeaderGoodNoon});
        if (hours > 18 && hours <= 24) helloMessage = Global.intl.formatMessage({id: HeaderGoodEvening});
        return helloMessage;
    }

    render() {
        return <div className='mobile-nav'>
            <List>
                <List.Item arrow="horizontal" className="mobile-nav-userinfo" onClick={this.onUserItemClick.bind(this)}>
                    <UserAvatar className="user-img" size={46} attr="Photo"></UserAvatar>
                    <div className="some-information">
                        <div
                            className="some-information-conetnt">{this.timeInterval()}，{Context.getCurrentUser().userInfo.MemeberCode}</div>
                        <span className="some-information-welcome">欢迎你来到大陆网，体验更便捷的服务</span>
                    </div>
                </List.Item>
                <List.Item>
                    <MemberWelcomeTab></MemberWelcomeTab>
                </List.Item>
            </List>
            {this.renderList(MobileNavTree)}
        </div>;
    }
}