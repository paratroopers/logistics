import * as React from 'react';
import {withRouter} from 'react-router';
import {List} from 'antd-mobile';
import {NavLocale} from '../../locales/localeid';
import {NaGlobal} from '../../util/common';
import MobileNavTree from '../../config/mobile-navconfig';


interface MbUserCenterProps {
}

interface MbUserCenterStates {
}


@withRouter
export class MbUserCenter extends React.Component<MbUserCenterProps, MbUserCenterStates> {
    constructor(props, context) {
        super(props, context)
    }

    renderIcon(icon: string, colorCode: string) {
        const style = colorCode ? {color: colorCode} : {};
        return <i style={style} className={'iconfont ' + icon}></i>;
    }

    renderList(data) {
        const FormatMessage = NaGlobal.intl.formatMessage;
        return data.map(item => {
            return <List key={item.Title} renderHeader={() => FormatMessage({id: item.Title})}>
                {
                    item.Children ? item.Children.map(child => {
                        return <List.Item key={child.Title} thumb={this.renderIcon(child.Icon, child.Color)}
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
            {this.renderList(MobileNavTree)}
        </div>;
    }
}