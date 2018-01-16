import * as React from 'react';
import {Menu, Icon} from 'antd';
import {hashHistory} from 'react-router';
import {NaGlobal} from '../../../util/common';
import NavTree from '../../../config/navconfig';


const {SubMenu} = Menu;

interface MemberNavigationProps {
    style?: any ;
}

interface MemberNavigationStates {

}

export class MemberNavigation extends React.Component<MemberNavigationProps, MemberNavigationStates> {
    constructor(props, context) {
        super(props, context);
    }


    renderMenu(tree: any) {
        return tree.map(item => {
            if (item.Children)
                return <SubMenu key={item.Key} title={<span><Icon
                    type={item.Icon}/><span>{NaGlobal.intl.formatMessage({id: item.Title})}</span></span>}>
                    {this.renderMenu(item.Children)}
                </SubMenu>;
            else {
                return <Menu.Item key={item.Key}>{NaGlobal.intl.formatMessage({id: item.Title})}</Menu.Item>
            }
        });
    }

    render() {
        const defaultKey=NavTree.map(function (item,index) {
            return item.Key;
        })

        return <Menu
            style={this.props.style}
            defaultOpenKeys={defaultKey}
            mode={"inline"}
            onClick={(obj: { item, key, keyPath }) => {
                hashHistory.push({pathname: obj.key});
            }}>
            {this.renderMenu(NavTree)}
        </Menu>;
    }
}