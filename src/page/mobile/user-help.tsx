import * as React from 'react';
import {withRouter} from 'react-router';
import {Layout, Row, Col} from 'antd';
import {WingBlank, WhiteSpace} from 'antd-mobile';
import {NaContext} from '../../util/common';

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
                    <p className="number">400-100-2013</p>
                </Layout.Header>
                <Layout.Content>
                    <img src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
                    <p className="tip">扫一扫上面的二维码图案，加客服微信</p>
                </Layout.Content>
            </Layout>
            {/*<WingBlank className="user-help-row">
                <i className={NaContext.getIconClassName('icon-qq1') + ' qq'}></i>
                <div className="user-help-row-text">
                    <span>客服人员QQ号</span>
                    <br/>
                    <span className="number">738114990 或 345327545</span>
                </div>
            </WingBlank>
            <WhiteSpace size="xl"/>
            <WingBlank className="user-help-row">
                <i className={NaContext.getIconClassName('icon-youjian') + ' email'}></i>
                <div className="user-help-row-text">
                    <span>客服人员邮箱地址</span>
                    <br/>
                    <span className="number">Enzo.Shi@Akmii.com</span>
                </div>
            </WingBlank>
            <WhiteSpace size="xl"/>
            <WingBlank className="user-help-row" style={{height: '180px'}}>
                <i className={NaContext.getIconClassName('icon-weixin1') + ' wx'}></i>
                <img style={{height: '160px', marginTop: '10px'}} src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
            </WingBlank>*/}
        </div>
    }
}