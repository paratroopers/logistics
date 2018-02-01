import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {Layout, Row, Col} from "antd";

const {Content} = Layout;
import {PathConfig} from "../config/pathconfig";

interface CompanyPageProps {

}

interface CompanyPageStates {

}

@withRouter
export class IndexCompanyPage extends Component<CompanyPageProps, CompanyPageStates> {
    constructor(props, context) {
        super(props, context)

    }

    renderContent() {
        const topThis = this;
        return <Row>
            <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                <Row style={{margin: '24px 0'}}>
                    <img style={{width: '100%'}} src="http://www.famliytree.cn/icon/index-home-image-11.jpg"/>
                </Row>
            </Col>
            <Col lg={1} xl={1}></Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Row className="about-content" style={{margin: '24px 0'}}>
                    <h2>关于我们</h2>
                    <p>大陆国际物流网（隶属 无锡大陆国际供应链管理有限公司），是一家专业为境内外电商用户、个人SOHO用户、私人跨境购物用户、海外华人留学生等，提供线上会员私家仓储、集货，理货，打包，转运，一条龙的供应链服务商。我们自成立以来与国内外各大网络购物平台，各大运输公司，国际快递公司，都有紧密合作。线上为您解决仓储，理货，物流等问题，线下还可以帮您采购，代购您想要的物品。人性化的服务，给您带来便利的同时又为您节省多余的费用。</p>
                </Row>
            </Col>
            <Col span={24}>
                <Row className="about-content" style={{margin: '24px 0'}}>
                    <h2>我们的服务</h2>
                    <p>网上平台为您提供，在线咨询，到库包裹通知，拍照，理货，验货，清点，仓储，打包，报关，转运，到货通知 等服务，同时提供代购，采购等附加服务。年轻明快的会员页面，专业的私人定制仓储转运流程，超高性价比的物流集运方案，多种物流方式选择，在每一个环节为您节省费用，提供一个新型的储运体验。公司服务通达全球，不管您在世界何处，只要登陆大陆国际网，把您购买的产品发到大陆仓库，大陆都能保质保量准时为您送达。</p>
                </Row>
            </Col>
            <Col span={24}>
                <Row className="about-content" style={{margin: '24px 0'}}>
                    <h2>我们的信念</h2>
                    <p>我司本着诚信为本，服务至上，安全第一的经营理念，为用户提供一个舒适、快捷、方便、安全又年轻化的网上仓储转运平台。让您足不出户就能指挥操控仓库所有货物。我们专注于您的仓库，我们更专注您的感触。大陆，您的私家仓库。</p>
                </Row>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Layout style={{minHeight: '100%', backgroundColor: '#FFF'}} className="company-page">
            <Content>
                <Row style={{marginBottom: 24}} className="page-title-company-image">
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
