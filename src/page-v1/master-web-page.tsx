import * as React from 'react';
import {Layout} from "antd";
import {Global} from '../util/common';
import {WebAction} from "../actions/index";
import {connect} from "react-redux";
import Header from "../components-v1/index-header";

const {Content, Footer} = Layout;
 import MotionFooterControl from "../components-v1/index-footer";

interface MasterWebPageProps {
    localeKey?: string;
}

interface MasterWebPageStates {
    localeKey?: string;
}

const logo = "http://www.famliytree.cn/icon/logo.png";

class MasterWebPage extends React.Component<MasterWebPageProps, MasterWebPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            localeKey: props.localeKey ? props.localeKey : "zh"
        }
    }

    onChangeLanguage(key: any) {
        Global.store.dispatch(WebAction.onChangeLanguage(key));
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {localeKey}} = topThis;
        if ('localeKey' in nextProps && nextProps.localeKey !== localeKey) {
            topThis.setState({localeKey: nextProps.localeKey});
        }
    }

    render() {
        const topThis = this;
        const {props: {children}, state: {localeKey}} = this;

        return <Layout>
            <Layout.Header style={{
                position: 'fixed',
                width: '100%',
                height: 80,
                zIndex: 1001,
                background: "#FFF",
                borderBottom: "1px solid #c2c2c2",
                padding:0
            }}>
                <div className="content-template" style={{maxWidth: '1500px', margin: '0 auto'}}>
                    <Header
                        menuTheme={"light"}
                        logo={logo}
                        defaultLanguageKey={localeKey}
                        onChangeLanguage={topThis.onChangeLanguage.bind(this)}></Header>
                </div>
            </Layout.Header>
            <Content style={{background: "#FFF", marginTop: 80}}>
                {children}
            </Content>
            <Footer style={{padding: 0}}>
                <div className="templates-wrapper">
                    <MotionFooterControl></MotionFooterControl>
                </div>
            </Footer>
        </Layout>
    }
}

const mapStateToProps = (state) => {
    return {
        localeKey: state.web.languageKey
    }
}
export default connect(mapStateToProps)(MasterWebPage);