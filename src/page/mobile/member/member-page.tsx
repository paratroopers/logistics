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
import {UserNavigationsModel} from '../../../api/model/base';
import * as moment from 'moment';
import {isNullOrUndefined} from "util";

interface MemberPageProps {
}

interface MemberPageStates {
    treeData?: UserNavigationsModel[];
}


@withRouter
export class MemberPage extends React.Component<MemberPageProps, MemberPageStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            treeData: []
        }
    }

    componentDidMount() {
        this.setState({treeData: Context.getCurrentUser().navigations});
    }

    renderIcon(icon: string, colorCode: string) {
        const style = colorCode ? {color: colorCode} : {};
        return <i style={style} className={'iconfont ' + icon}></i>;
    }

    onItemClick(url: string) {
        if (url) {
            Global.store.dispatch(MobileNavTreeAction.SelectTabLoaded(url, MobilePathConfig.UserCenter));
            hashHistory.push({pathname: url});
        }
    }

    onUserItemClick() {
        hashHistory.push({pathname: MobilePathConfig.UserHome});
    }

    renderList() {
        const topThis = this;
        const {state: {treeData}} = topThis;
        {/*<Badge text={77} overflowCount={55}></Badge>*/}
        return treeData ? treeData.map(item => {
            return <List key={item.parentItem.Url} renderHeader={() => item.parentItem.Name_CN}>
                {
                    (!isNullOrUndefined(item.childItems) && item.childItems.length > 0) ? item.childItems.map(child => {
                        return <List.Item className="list-tree" extra={""}
                                          onClick={() => {
                                              this.onItemClick(child.Url)
                                          }} key={child.Url} thumb={this.renderIcon(child.Image, child.color?child.color:'#e65922')}
                                          arrow="horizontal">
                            {child.Name_CN}
                        </List.Item>
                    }) : null
                }
            </List>
        }) : null
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
            {this.renderList()}
        </div>;
    }
}