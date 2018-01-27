import * as React from 'react';
import {Row, Col, Table} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {FormSettingTitle} from './form-setting-title'

export interface FormOrderRelationProps {
}

export interface FormOrderRelationStates {
}

class FormOrderRelationTable extends Table<any> {
}

export class FormOrderRelation extends React.Component<FormOrderRelationProps, FormOrderRelationStates> {

    renderTable() {
        const colums: ColumnProps<any>[] = [
            {
                title: '客服订单号',
                dataIndex: 'orderName'
            },
            {
                title: '物流订单号',
                dataIndex: '1'
            }, {
                title: '物流方式',
                dataIndex: '2'
            }, {
                title: '入库时间',
                dataIndex: '3'
            }, {
                title: '初始重量(KG)',
                dataIndex: '4'
            }, {
                title: '初始体积(cm³)',
                dataIndex: '5'
            }, {
                title: '客服备注',
                dataIndex: '6'
            }
        ]
        return <FormOrderRelationTable columns={colums}
                                       pagination={false}
                                       dataSource={[{
                                           orderName: 'Code21',
                                           '1': '20180127',
                                           2: 'USD',
                                           3: '01-27',
                                           4: '10.22',
                                           5: '10.22',
                                           6: '挺好的'
                                       }, {
                                           orderName: 'Code21',
                                           '1': '20180127',
                                           2: 'USD',
                                           3: '01-27',
                                           4: '10.22',
                                           5: '10.22',
                                           6: '挺好的'
                                       }, {
                                           orderName: 'Code21',
                                           '1': '20180127',
                                           2: 'USD',
                                           3: '01-27',
                                           4: '10.22',
                                           5: '10.22',
                                           6: '挺好的'
                                       }]}></FormOrderRelationTable>
    }

    render() {
        return <div className="form-control-group">
            <Row>
                <Col>
                    <FormSettingTitle size={16} title={"关联订单信息"}></FormSettingTitle>
                </Col>
                <Col>
                    {this.renderTable()}
                </Col>
            </Row>
        </div>
    }
}