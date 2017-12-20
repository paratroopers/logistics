import * as React from 'react';
import {Layout} from "antd";
import {NaGlobal} from '../../util/common';
import {WebAction} from "../../actions/index";
import {connect} from "react-redux";
import NaHeader from "../../components/controls/na-header";
const {Header, Content, Footer} = Layout;
import MotionFooterControl from "../../components/motion/motion-footer";

interface NaMasterWebPageProps {
    localeKey?: string;
}

interface NaMasterWebPageStates {
    localeKey?: string;
}

const logo = "http://www.famliytree.cn/icon/logo.png";

class NaMasterWebPage extends React.Component<NaMasterWebPageProps, NaMasterWebPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            localeKey: props.localeKey ? props.localeKey : "zh"
        }
    }

    onChangeLanguage(key: any) {
        NaGlobal.store.dispatch(WebAction.onChangeLanguage(key));
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
            <Header style={{
                position: 'fixed',
                width: '100%',
                height: 80,
                zIndex: 1001,
                background: "#FFF",
                borderBottom: "1px solid #c2c2c2"
            }}>
                <NaHeader
                    menuTheme={"light"}
                    logo={logo}
                    defaultLanguageKey={localeKey}
                    onChangeLanguage={topThis.onChangeLanguage.bind(this)}></NaHeader>
            </Header>
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
export default connect(mapStateToProps)(NaMasterWebPage);