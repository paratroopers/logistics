import * as React from 'react';
import {Menu, Icon} from 'antd';
import {hashHistory} from 'react-router';
import {Global} from '../../../util/common';
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
                    type={item.Icon}/><span>{Global.intl.formatMessage({id: item.Title})}</span></span>}>
                    {this.renderMenu(item.Children)}
                </SubMenu>;
            else {
                return <Menu.Item key={item.Key}>{Global.intl.formatMessage({id: item.Title})}</Menu.Item>
            }
        });
    }

    render() {
        return <Menu
            style={this.props.style}
            defaultOpenKeys={['sub1']}
            mode={"inline"}
            onClick={(obj: { item, key, keyPath }) => {
                hashHistory.push({pathname: obj.key});
            }}>
            {this.renderMenu(NavTree)}
        </Menu>;
    }
}