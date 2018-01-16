import * as React from 'react';
import {Context} from "../../../util/common";
import {Row, Col} from 'antd';

interface CustomerserviceDropdownProps {
}

interface CustomerserviceDropdownStates {
}

export class CustomerserviceDropdown extends React.Component<CustomerserviceDropdownProps, CustomerserviceDropdownStates> {

    render() {
        return <div>
            <Row key="0" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-dianhua-yuankuang')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-num-title">客服电话</p>
                    <p className="tool-doubt-content-num">400-820-8820</p>
                </Col>
            </Row>,
            <Row key="1" type="flex" className="tool-doubt-content qq">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-qq')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-num-title">客服QQ</p>
                    <p className="tool-doubt-content-num">738114990</p>
                </Col>
            </Row>,
            <Row key="2" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-youxiang')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-eml-title">客服邮箱</p>
                    <p className="tool-doubt-content-eml">xuke_break@163.com</p>
                </Col>
            </Row>,
            <Row key="3" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-weixin')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-wx-title">关注我</p>
                    <img className="code" src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
                </Col>
            </Row>
        </div>
    }
}