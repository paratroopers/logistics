import * as React from 'react';
import {Menu, Icon, Badge} from 'antd';
import {hashHistory} from 'react-router';
import {Context} from '../util/common';
import {connect} from 'react-redux';
// import {UserNavigationsModel, UserNavigationsChildrenModel} from '../../../api/model/base';
import {ModelNameSpace} from '../model/model';
import {isNullOrUndefined} from "util";

const {SubMenu} = Menu;

interface MemberNavigationProps {
    style?: any ;
    unWaitPayCount?: number;
}

interface MemberNavigationStates {
    treeData?: ModelNameSpace.UserNavigationsModel[];
}

@connect(state => ({unWaitPayCount: state.web.unWaitPayCount}))
export class MemberNavigation extends React.Component<MemberNavigationProps, MemberNavigationStates> {
    static defaultWaitPayName: string = '待付款';

    constructor(props, context) {
        super(props, context);
        this.state = {
            treeData: []
        }
    }

    componentDidMount() {
        this.setState({treeData: Context.getCurrentUser().navigations});
    }

    renderChildMenu(treeData: ModelNameSpace.UserNavigationsChildrenModel[]) {
        return treeData.map((item) => {
            return <Menu.Item key={item.Url}>{
                <div>
                    <Icon type={item.Image}/>
                    <span>{item.Name_CN}</span>
                    {typeof(this.props.unWaitPayCount) === 'number' && this.props.unWaitPayCount !== 0
                    && item.Name_CN === MemberNavigation.defaultWaitPayName ?
                        <div style={{float: 'right'}}><Badge count={this.props.unWaitPayCount}>
                        </Badge></div> : null}
                </div>
            }</Menu.Item>
        });
    }

    renderMenu(treeData: ModelNameSpace.UserNavigationsModel[]) {
        const topThis = this;
        return treeData.map((item) => {
            if (!isNullOrUndefined(item.childItems) && item.childItems.length > 0)
                return <SubMenu key={item.parentItem.Url} title={<span><Icon
                    type={item.parentItem.Image}/><span>{item.parentItem.Name_CN}</span></span>}>
                    {topThis.renderChildMenu(item.childItems)}
                </SubMenu>;
            else {
                return <Menu.Item key={item.parentItem.Url}>{item.parentItem.Name_CN}</Menu.Item>
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
            defaultOpenKeys={['890331594632818690', '892231594632818690', '892231594632998690', '892231594632678690', '892231594632678450',]}
            mode={"inline"}
            onClick={(obj: { item, key, keyPath }) => {
                hashHistory.push({pathname: obj.key});
            }}>
            {treeData && topThis.renderMenu(treeData)}
        </Menu>;
    }
}