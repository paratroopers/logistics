import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {InjectedIntlProps} from "react-intl";
import {Layout, Row, Col, Input, Button, Tag, Table, Modal as WebModal, Icon} from "antd";
import Cost from "../../components/controls/quotation/quotation-user-query";
import {CostTableModal} from '../../api/model/quotation';

const {Content} = Layout;
const {TextArea} = Input;
import {Util} from "../../util/util";
import {ScreenModeEnum} from "../../api/model/common";
import {Card, WingBlank, WhiteSpace, Modal} from 'antd-mobile';

interface CostPageProps extends ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {

}

interface CostPageStates {
    selectedTagsA: any;
    selectedTagsB: any;
    /** 手机版Modal*/
    mobileModalVisible: boolean;
    /** 注意事项*/
    mobileModalContent: string;
    /** 首页带过来的费用估算信息*/
    costInfo?: any;
    /** 列表字段model*/
    data?: CostTableModal[];
}

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

@withRouter
export class CostPage extends Component<CostPageProps, CostPageStates> {
    isMobile: boolean;

    constructor(props, context) {
        super(props, context)
        const query = props.location.query;
        this.state = {
            selectedTagsA: [],
            selectedTagsB: [],
            mobileModalVisible: false,
            mobileModalContent: "",
            costInfo: {
                ...query
            },
            data: []
        }
        this.isMobile = (Util.getScrrenMode(window.innerWidth) === ScreenModeEnum.sm);
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }


    TagAChange(tag, checked) {
        const topThis = this;
        const {state: {selectedTagsA}} = topThis;
        const nextSelectedTags = checked ?
            [...selectedTagsA, tag] :
            selectedTagsA.filter(t => t !== tag);
        this.setState({selectedTagsA: nextSelectedTags});
    }

    TagBChange(tag, checked) {
        const topThis = this;
        const {state: {selectedTagsB}} = topThis;
        const nextSelectedTags = checked ?
            [...selectedTagsB, tag] :
            selectedTagsB.filter(t => t !== tag);
        this.setState({selectedTagsB: nextSelectedTags});
    }

    onTableRowClick(txt) {
        WebModal.info({
            width: 600,
            title: '注意事项',
            okText: '关闭',
            content: (
                <div style={{whiteSpace: 'pre-line'}}>
                    {txt}
                </div>
            ),
            onOk() {
            },
        });
    }

    renderTable() {
        const columns = [{
            title: <span>运输方式</span>,
            dataIndex: 'channelName',
            width: '8%'
        }, {
            title: <span>计费重量(kg)</span>,
            dataIndex: 'weight',
            width: '8%'
        }, {
            title: <span>运费(RMB)</span>,
            dataIndex: 'Amount',
            width: '8%'
        }, {
            title: <span>送达时间(工作日)</span>,
            dataIndex: 'Prescription',
            width: '10%'
        }, {
            title: <span>服务费(RMB)</span>,
            dataIndex: 'ServiceAmount',
            width: '5%'
        }, {
            title: <span>总费用</span>,
            dataIndex: 'AllCount',
            width: '5%',
            render: (txt, record) => {
                return <span>{record.ServiceAmount + record.Amount}</span>;
            }
        }, {
            title: <span>备注</span>,
            dataIndex: 'Remark',
            width: '10%'
        }, {
            title: <span>注意事项</span>,
            dataIndex: '',
            width: '5%',
            render: (text, record, index) => {
                return <a onClick={v => {
                    this.onTableRowClick(record.Clause);
                }}>点击查看</a>
            }
        }];
        return <Table columns={columns}
                      loading={!this.state.data ? true : false}
                      style={{minHeight: '400px'}}
                      bordered={false}
                      dataSource={this.state.data}
                      locale={{emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>}}/>;
    }

    renderCard() {
        const topThis = this;
        if (!this.state.data) return <div></div>;
        return <Row>
            {this.state.data.map(function (item, index) {
                return <Col key={index}>
                    <WingBlank size="sm">
                        <WhiteSpace size="sm"/>
                        <Card>
                            <Card.Header
                                title={''}
                                extra={<a
                                    onClick={() => {
                                        topThis.openMobileModal(item.Clause);
                                    }}
                                    style={{fontSize: '12px', color: '#e65922', cursor: 'pointer'}}>注意事项</a>}
                            />
                            <Card.Body>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>计费重量(kg)</h3>
                                    <p style={{fontSize: '12px'}}>{item.weight}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>运费(RMB)</h3>
                                    <p style={{fontSize: '12px'}}>{item.Amount}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>送达时间(工作日)</h3>
                                    <p style={{fontSize: '12px'}}>{item.Prescription}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>服务费(RMB)</h3>
                                    <p style={{fontSize: '12px'}}>{item.ServiceAmount}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>总费用(RMB) </h3>
                                    <p style={{fontSize: '12px'}}>{item.Amount + item.ServiceAmount}</p>
                                </Row>
                                <Row>
                                    <h3 style={{fontSize: '14px', fontWeight: 'bold'}}>备注</h3>
                                    <p style={{fontSize: '12px'}}>{item.Remark}</p>
                                </Row>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm"/>
                    </WingBlank>
                </Col>;
            })}
        </Row>
    }

    renderContent() {
        const topThis = this;
        const {isMobile} = topThis;
        return <Row type="flex" justify="space-between">
            <Col xs={24} sm={24} md={24} lg={10} xl={10} style={{marginBottom: '30px'}}>
                <Cost onClick={v => {
                    this.setState({data: v});
                }}></Cost>
                <Row>
                    <Col style={{
                        border: '1px solid #e65922',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        color: '#e65922'
                    }} span={24}>您可以通过支付宝、微信。以下费用已基本包含本公司所有的收费项目（磁检费、超重超长处理费、偏远地区派送费等除外）</Col>
                </Row>
            </Col>
            <Col xs={0} sm={0} md={24} lg={10} xl={10}>
                <Layout style={{background: '#fff'}}>
                       <Layout.Header style={{background: '#fff', paddingLeft: '0px'}}>
                        <Icon type="info-circle" onClick={()=>{
                            topThis.onTableRowClick("ddddddddddddddddddddddddddd");
                        }}/>
                        <span>注意事项</span>
                    </Layout.Header>
                    <Layout.Content>
                        <span>
                            一、禁寄物品是指国家法律、法规禁止寄递的物品，主要包括：
                            （一）各类武器、弹药。如枪支、子弹、炮弹、手榴弹、地雷、炸弹等。
                            （二）各类易爆炸性物品。如雷管、炸药、火药、鞭炮等。
                            （三）各类易燃烧性物品，包括液体、气体和固体。如汽油、煤油、桐油、酒精、生漆、柴油、气雾剂、气体打火机、瓦斯气瓶、磷、硫磺、火柴等。
                            （四）各类易腐蚀性物品。如火硫酸、盐酸、硝酸、有机溶剂、农药、双氧水、危险化学品等。
                            （五）各类放射性元素及容器。如铀、钴、镭、钚等。
                            （六）各类烈性毒药。如铊、氰化物、砒霜等。
                            （七）各类麻醉药物。如鸦片（包括罂粟壳、花、苞、叶）、吗啡、可卡因、海洛因、大麻、冰毒、麻黄素及其它制品等。
                            （八）各类生化制品和传染性物品。如炭疽、危险性病菌、医药用废弃物等。
                            （九）各种危害国家安全和社会政治稳定以及淫秽的出版物、宣传品、印刷品等。
                            （十）各种妨害公共卫生的物品。如尸骨、动物器官、肢体、未经硝制的兽皮、未经药制的兽骨等。
                            （十一）国家法律、法规、行政规章明令禁止流通、寄递或进出境的物品，如国家秘密文件和资料、国家货币及伪造的货币和有价证券、仿真武器、管制刀具、珍贵文物、濒危野生动物及其制品等。
                            （十二）包装不妥，可能危害人身安全、污染或者损毁其他寄递件、设备的物品等。
                            （十三）各寄达国（地区）禁止寄递进口的物品等。
                            （十四）其他禁止寄递的物品。
                        </span>
                    </Layout.Content>
                </Layout>
            </Col>
            <Col span={24}>
                {isMobile ? topThis.renderCard() : topThis.renderTable()}
            </Col>
        </Row>
    }

    openMobileModal(content: string) {
        const topThis = this;
        topThis.onTableRowClick(content);
        // topThis.setState({mobileModalVisible: true, mobileModalContent: content});
    }

    renderMobileModal() {
        const topThis = this;
        const {state: {mobileModalVisible, mobileModalContent}} = topThis;
        return <WingBlank>
            <WhiteSpace/>
            <Modal
                visible={mobileModalVisible}
                transparent
                maskClosable={false}
                title={"注意事项"}
                footer={[{
                    text: '关闭', onPress: () => {
                        topThis.setState({mobileModalVisible: false});
                    }
                }]}
                onClose={() => {
                    topThis.setState({mobileModalVisible: false});
                }}
                wrapProps={{onTouchStart: this.onWrapTouchStart}}>
                <div style={{height: 250, overflow: 'scroll', whiteSpace: 'pre-line'}}>
                    <p>{mobileModalContent}</p>
                </div>
            </Modal>
        </WingBlank>;
    }

    render() {
        const topThis = this;
        return <Layout className="cost-estimate-page" style={{minHeight: '100%', backgroundColor: '#FFF'}}>
            <Content>
                {topThis.renderMobileModal()}
                <Row style={{marginBottom: 24, backgroundSize: 'cover'}} className="page-title-cost-image">
                </Row>
                <Row type="flex" justify="space-around">
                    <Col xs={22} sm={22} md={18} lg={18} xl={18}>
                        <Row type="flex" justify="space-between"
                             style={{borderBottom: '1px solid #c2c2c2', marginBottom: 24}}>
                            <Col>
                                <h2>费用估算<span style={{paddingLeft: 16, fontSize: 16}}>COST ESTIMATING</span></h2>
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