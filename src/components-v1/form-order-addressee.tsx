import * as React from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
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
        return <div style={{display: 'inline-block'}}>
            <FormControl.FormButtonControl title="添加联系人"
                                           type={ModelNameSpace.ButtonTypeEnum.confirm}
                                           savingdata={() => true}></FormControl.FormButtonControl>
            <FormControl.FormButtonControl title="另存为联系人"
                                           type={ModelNameSpace.ButtonTypeEnum.confirm}
                                           savingdata={() => true}></FormControl.FormButtonControl>
        </div>
    }

    renderRow(label?: string, value?: string) {
        const formItemLayout = {labelCol: {span: 10}, wrapperCol: {span: 14}};
        const defaultRowSetting: RowProps = {justify: "start", type: "flex", gutter: 8};
        return <Row {...defaultRowSetting}>
            <Col span={8}>
                <Form.Item label={label} {...formItemLayout} required>
                    <Input value={value} placeholder={'请输入'}></Input>
                </Form.Item>
            </Col>
        </Row>;
    }

    render() {
        return <FormSettingGroup size={16} title={"收件人基本信息"} span={24} header={this.renderHeader()}>
            <Form>
                {this.renderRow('收件人姓名')}
                {this.renderRow('收件国家')}
                {this.renderRow('收件城市')}
                {this.renderRow('邮编')}
                {this.renderRow('电话')}
                {this.renderRow('公司名或税号')}
            </Form>
        </FormSettingGroup>
    }
}