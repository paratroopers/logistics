import * as React from 'react';
import {withRouter} from 'react-router';
import {List, Badge} from 'antd-mobile';
import {hashHistory} from 'react-router';
import {NaGlobal} from '../../../util/common';
import MobileNavTree from '../../../config/mobile-navconfig';
import {MobileNavTreeAction} from '../../../actions/index';
import {MobilePathConfig, PathConfig} from '../../../config/pathconfig';
import {Cookies} from '../../../util/cookie';

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
        if (!Cookies.get('Authorization'))
            hashHistory.push(PathConfig.LoginPage);
    }

    renderIcon(icon: string, colorCode: string) {
        const style = colorCode ? {color: colorCode} : {};
        return <i style={style} className={'iconfont ' + icon}></i>;
    }

    onItemClick(data: any) {
        if (data) {
            NaGlobal.store.dispatch(MobileNavTreeAction.SelectTabLoaded(data, MobilePathConfig.UserCenter));
            hashHistory.push({pathname: MobilePathConfig.UserCenterDetail});
        }
    }

    renderList(data) {
        const FormatMessage = NaGlobal.intl.formatMessage;
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
                <List.Item arrow="horizontal" thumb={<img style={{width: '80px', height: '80px', margin: '10px 0px 10px 0px'}}
                                       src='http://www.famliytree.cn/icon/green.jpg'/>}>
                    <span style={{display: 'block', fontSize: '14px'}}>早安，Antd design,祝你开心每一天</span>
                    <span style={{fontSize: '12px'}}>欢饮你来到大陆网，体验便捷的服务</span>
                </List.Item>
            </List>
            {this.renderList(MobileNavTree)}
        </div>;
    }
}