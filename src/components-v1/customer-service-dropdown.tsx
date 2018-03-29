import * as React from 'react';
import {Context} from "../util/common";
import {Row, Col} from 'antd';

interface ContactCustomerServiceProps {}

interface ContactCustomerServiceStates {}

export class ContactCustomerService extends React.Component<ContactCustomerServiceProps, ContactCustomerServiceStates> {

    render() {
        return <Row className="tool-doubt">
            <Row type="flex" justify="start" align="middle" className="tool-doubt-item">
                <Col className="tool-doubt-item-left">
                    <i className={Context.getIconClassName('icon-dianhua-yuankuang')}></i>
                </Col>
                <Col className="tool-doubt-item-right">
                    <span className="tool-doubt-item-right-h team-mao">客服电话</span>
                    <span className="tool-doubt-item-right-p">400-820-8820</span>
                </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" className="tool-doubt-item">
                <Col className="tool-doubt-item-left">
                    <i className={Context.getIconClassName('icon-qq')}></i>
                </Col>
                <Col className="tool-doubt-item-right">
                    <span className="tool-doubt-item-right-h team-mao">客服QQ</span>
                    <span className="tool-doubt-item-right-p">738114990</span>
                </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" className="tool-doubt-item">
                <Col className="tool-doubt-item-left">
                    <i className={Context.getIconClassName('icon-youxiang')}></i>
                </Col>
                <Col className="tool-doubt-item-right">
                    <span className="tool-doubt-item-right-h team-mao">客服邮箱</span>
                    <span className="tool-doubt-item-right-p">xuke_break@163.com</span>
                </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" className="tool-doubt-item">
                <Col className="tool-doubt-item-left">
                    <i className={Context.getIconClassName('icon-weixin')}></i>
                </Col>
                <Col className="tool-doubt-item-right">
                    <span className="tool-doubt-item-right-img">
                        <img className="code" src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
                    </span>
                </Col>
            </Row>
        </Row>
    }
}