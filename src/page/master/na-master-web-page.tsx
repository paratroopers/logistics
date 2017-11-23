import * as React from 'react';
import {Layout} from "antd";
import NaHeader from "../../components/controls/na-header";

const {Header, Content, Footer} = Layout;

interface NaMasterWebPageProps {
    localeKey: string;
    onChangeLanguage?: (key: any) => void;
}

interface NaMasterWebPageStates {
}

export class NaMasterWebPage extends React.Component<NaMasterWebPageProps, NaMasterWebPageStates> {

    onChangeLanguage(key: any) {
        this.props.onChangeLanguage && this.props.onChangeLanguage(key);
    }

    render() {
        return <div>
            <Header style={{
                position: 'fixed',
                width: '100%',
                height: 80,
                zIndex: 1,
                background: "#FFF",
                borderBottom: "1px solid #c2c2c2"
            }}>
                <NaHeader
                    menuTheme={"light"}
                    logo={"http://a3.qpic.cn/psb?/V13ZnpTW0vonqf/WWKEbbdMdJC6AYcoZQ7bLZI6UcuHRq0ELFm3Vw*WAi4!/b/dG0BAAAAAAAA&bo=QABAAEAAQAADCSw!&rf=viewer_4"}
                    defaultLanguageKey={this.props.localeKey}
                    onChangeLanguage={this.onChangeLanguage.bind(this)}
                    logoName={"http://a2.qpic.cn/psb?/V13ZnpTW0vonqf/qx4ufATm2nUuH6mb6g5B.4RztJRniAH5CHIyYByK8gM!/b/dOIAAAAAAAAA&bo=5QBAAOUAQAADCSw!&rf=viewer_4"}></NaHeader>
            </Header>
            <Content style={{background: "#FFF"}}>
                {this.props.children}
            </Content>
        </div>

    }
}