import * as React from 'react';
import {Row, Col, Form, Input, Button, Icon} from 'antd';
import {RowProps} from 'antd/lib/row';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';
import {FormControl} from './form-control';

export interface FormOrderAddresseeProps {
    readOnly?: boolean;
}

export interface FormOrderAddresseeStates {
}

export class FormOrderAddressee extends React.Component<FormOrderAddresseeProps, FormOrderAddresseeStates> {

    renderFooter() {
        return <Button type="dashed">添加联系人</Button>
    }

    renderHeader() {
        return <Row type="flex" justify="start" align="bottom">
            <Col span={16}>
                <Icon type="plus-circle-o" style={{marginRight: "5px"}}/>
                <a>
                    <span>添加联系人</span>
                </a>
                <span> | </span>
                <Icon type="check-circle-o" style={{marginRight: "5px"}}/>
                <a>
                    <span>另存为联系人</span>
                </a>
            </Col>
        </Row>
    }

    renderRow(label?: string, value?: string) {
        const formItemLayout = {labelCol: {span: 10}, wrapperCol: {span: 14}};
        return <Col span={8}>
            <Form.Item label={label} {...formItemLayout} required>
                <Input value={value} placeholder={'请输入'}></Input>
            </Form.Item>
        </Col>;
    }

    render() {
        const defaultRowSetting: RowProps = {justify: "start", type: "flex", gutter: 8};
        return <FormSettingGroup size={16} title={"收件人基本信息"} span={24}>
            {this.renderHeader()}
            <Form>
                <Row {...defaultRowSetting}>
                    {this.renderRow('收件人姓名')}
                    {this.renderRow('收件国家')}
                    {this.renderRow('收件城市')}
                </Row>
                <Row {...defaultRowSetting}>
                    {this.renderRow('邮编')}
                    {this.renderRow('电话')}
                    {this.renderRow('公司名或税号')}
                </Row>
            </Form>
        </FormSettingGroup>
    }
}