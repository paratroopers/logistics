import * as React from 'react';
import {Menu, Icon} from 'antd';
import {hashHistory} from 'react-router';
import {Context} from '../../../util/common';
import {UserNavigationsModel, UserNavigationsChildrenModel} from '../../../api/model/base';
import {isNullOrUndefined} from "util";

const {SubMenu} = Menu;

interface MemberNavigationProps {
    style?: any ;
}

interface MemberNavigationStates {
    treeData?: UserNavigationsModel[];
}

export class MemberNavigation extends React.Component<MemberNavigationProps, MemberNavigationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            treeData: []
        }
    }

    componentDidMount() {
        this.setState({treeData: Context.getCurrentUser().navigations});
    }

    renderChildMenu(treeData: UserNavigationsChildrenModel[]) {
        return treeData.map((item) => {
            return <Menu.Item key={item.Url}>{<span><Icon
                type={item.Image}/><span>{item.Name_CN}</span></span>}</Menu.Item>
        });
    }

    renderMenu(treeData: UserNavigationsModel[]) {
        const topThis = this;
        return treeData.map((item) => {
            if (!isNullOrUndefined(item.childItems) && item.childItems.length > 0)
                return <SubMenu key={item.parentItem.Url}  title={<span><Icon
                    type={item.parentItem.Image}/><span>{item.parentItem.Name_CN}</span></span>}>
                    {topThis.renderChildMenu(item.childItems)}
                </SubMenu>;
            else {
                return <Menu.Item key={item.parentItem.Url} >{item.parentItem.Name_CN}</Menu.Item>
            }
        });
    }

    render() {
        const topThis = this;
        const {state: {treeData}, props: {style}} = topThis;
        /* 默认打开 我的仓库 用户设置*/
        return <Menu
            className="member-navigation-control"
            style={style}
            defaultOpenKeys={['890331594632818690','892231594632818690']}
            mode={"inline"}
            onClick={(obj: { item, key, keyPath }) => {
                hashHistory.push({pathname: obj.key});
            }}>
            {treeData && topThis.renderMenu(treeData)}
        </Menu>;
    }
}