import * as React from 'react';
import {withRouter} from 'react-router';
import {Layout} from 'antd';

interface UserHelpProps {
}

interface UserHelpStates {
}

@withRouter
export class MbUserHelp extends React.Component<UserHelpProps, UserHelpStates> {

    render() {
        return <div className="user-help">
            <Layout className="user-help-layout" style={{width: 'calc(100% - 40px)'}}>
                <Layout.Header>
                    <p className="title">您的专属客服</p>
                    <a className="number" href="tel:400-100-2013">400-100-2013</a>
                </Layout.Header>
                <Layout.Content>
                    <img src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
                    <p className="tip">扫一扫上面的二维码图案，加客服微信</p>
                </Layout.Content>
            </Layout>
        </div>
    }
}