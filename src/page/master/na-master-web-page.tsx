import * as React from 'react';
import {Layout} from "antd";
import NaHeader from "../../components/controls/na-header";
const {Header, Content, Footer} = Layout;
import MotionFooterControl from "../../components/motion/motion-footer";

interface NaMasterWebPageProps {
    localeKey: string;
    onChangeLanguage?: (key: any) => void;
}

interface NaMasterWebPageStates {
}

const logo = "http://www.famliytree.cn/icon/logo.jpg";
const logoName = "http://a2.qpic.cn/psb?/V13ZnpTW0vonqf/qx4ufATm2nUuH6mb6g5B.4RztJRniAH5CHIyYByK8gM!/b/dOIAAAAAAAAA&bo=5QBAAOUAQAADCSw!&rf=viewer_4";

export class NaMasterWebPage extends React.Component<NaMasterWebPageProps, NaMasterWebPageStates> {
    onChangeLanguage(key: any) {
        const topThis = this;
        const {props: {onChangeLanguage}} = topThis;
        if (onChangeLanguage)
            onChangeLanguage(key);
    }

    render() {
        const topThis = this;
        const {props: {localeKey, children}} = this;

        return <Layout>
            <Header style={{
                position: 'fixed',
                width: '100%',
                height: 80,
                zIndex: 2,
                background: "#FFF",
                borderBottom: "1px solid #c2c2c2"
            }}>
                <NaHeader
                    menuTheme={"light"}
                    logo={logo}
                    defaultLanguageKey={localeKey}
                    onChangeLanguage={topThis.onChangeLanguage.bind(this)}
                    logoName={logoName}></NaHeader>
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