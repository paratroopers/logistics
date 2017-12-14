import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {Layout, Row, Col} from "antd";
const {Content} = Layout;
import {PathConfig} from "../../config/pathconfig";

interface NaCompanyProfilePageProps {

}

interface NaCompanyProfilePageStates {

}

@withRouter
export class NaCompanyProfilePage extends Component<NaCompanyProfilePageProps, NaCompanyProfilePageStates> {
    constructor(props, context) {
        super(props, context)
    }

    renderContent() {
        const topThis = this;
        return <Row>
            <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                <Row style={{margin: '24px 0'}}>
                    <img style={{width: '100%'}} src="http://www.famliytree.cn/icon/company-profile-abouts.jpg"/>
                </Row>
            </Col>
            <Col lg={1} xl={1}></Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Row style={{margin: '24px 0'}}>
                    <h2 style={{fontWeight: 800}}>关于我们</h2>
                    <p>Mainload物流网隶属于（电子商务有限公司）旗下，是一家专业从事货物仓储及国际包裹转运的服务商。</p>
                    <p> Mainload创建于2003年，专业服务于国内外贸公司及海外华人，为用户提供货物在线仓 储、验货、清点、打包、报关、运输等一条龙服务。</p>
                    <p> Mainload为客户提供全方位和量身定制的转运服务，只为给客户带来最优质的物流方案、 最优惠的转运价格、最棒的国际转运体验。</p>
                    <p> 公司自成立以来，已为全球200多个国家的用户提供高效、便捷的网购集运及国际转运服务，在全球华人中有着高度的美誉，深受用户的喜爱，也成为诸多同行的模仿对象。
                    </p>
                </Row>
            </Col>
            <Col span={24}>
                <Row style={{margin: '24px 0'}}>
                    <h2 style={{fontWeight: 800}}>我们的服务</h2>
                    <p>美幻国际物流网致力为客户提供更省心，更便捷的仓储物流服务。通过整合上下游的资源，提供多渠道的物流方式，使您的货物更快速、更经济的方式送达目的地。</p>
                </Row>
            </Col>
            <Col span={24}>
                <Row style={{margin: '24px 0'}}>
                    <h2 style={{fontWeight: 800}}>企业宗旨:诚信、高效、创新</h2>
                    <p>美幻网的核心所在，只适当收取相关服务费用，绝不私吞广大用户的一针一线。北京时间17：00前提交的打包订单当天封装完毕。服务的同时我们会不断的丰富自己，改正自身的缺点，推出更多、更好、更便捷的服务理念，绝不辜负您对“美幻网”的信任。</p>
                </Row>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                <Row style={{marginBottom: 24}}>
                    <img style={{maxWidth: '100%'}} src="http://www.famliytree.cn/icon/company-profile-banner.jpg"/>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        <Row type="flex" justify="space-between"
                             style={{borderBottom: '1px solid #c2c2c2', marginBottom: 24}}>
                            <Col>
                                <h2>公司简介<span style={{paddingLeft: 16, fontSize: 16}}>COMPANY PROFILE</span></h2>
                            </Col>
                            <Col style={{display: 'flex', alignItems: 'center'}}>

                            </Col>
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        {topThis.renderContent()}
                    </Col>
                </Row>
            </Content>
        </Layout>;
    }
}
