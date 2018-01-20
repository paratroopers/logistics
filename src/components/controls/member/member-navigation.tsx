import * as React from 'react';
import {Menu, Icon} from 'antd';
import {hashHistory} from 'react-router';
import {Global} from '../../../util/common';
import NavTree from '../../../config/navconfig';
import {MemberNavigationModel, MemberChildNavigationModel} from "../../../api/model/common-model";
import {MememberAPI} from "../../../api/member";
import {Context} from '../../../util/common';
import {UserNavigationsModel, UserNavigationsChildrenModel} from '../../../api/model/base';
import {GetUserContextResponse} from '../../../api/model/response/member';
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
        return treeData.map((item, index) => {
            return <Menu.Item key={index}>{item.Name_CN}</Menu.Item>
        });
    }

    renderMenu(treeData: UserNavigationsModel[]) {
        const topThis = this;
        return treeData.map((item, index) => {
            if (!isNullOrUndefined(item.childItems) && item.childItems.length > 0)
                return <SubMenu key={index} title={<span><Icon
                    type={item.parentItem.Image}/><span>{item.parentItem.Name_CN}</span></span>}>
                    {topThis.renderChildMenu(item.childItems)}
                </SubMenu>;
            else {
                return <Menu.Item key={index}>{item.parentItem.Name_CN}</Menu.Item>
            }
        });
    }

    render() {
        const topThis = this;
        const {state: {treeData}} = topThis;
        const defaultKey = NavTree.map(function (item, index) {
            return item.Key;
        })
        return <Menu
            className="member-navigation-control"
            style={this.props.style}
            defaultOpenKeys={defaultKey}
            mode={"inline"}
            onClick={(obj: { item, key, keyPath }) => {
                hashHistory.push({pathname: obj.key});
            }}>
            {this.renderMenu(treeData)}
        </Menu>;
    }
}