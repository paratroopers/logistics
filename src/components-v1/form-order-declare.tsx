import * as React from 'react';
import {Row, Col, Form, Input, Button, Table} from 'antd';
import {FormSettingGroup} from './form-setting-group';
import {ColumnProps} from 'antd/lib/table';

export interface FormOrderDeclareProps {
}

export interface FormOrderDeclareStates {
}

class FormOrderDeclareTable extends Table<any> {
}

export class FormOrderDeclare extends React.Component<FormOrderDeclareProps, FormOrderDeclareStates> {

    renderTable() {
        const colums: ColumnProps<any>[] = [
            {
                title: '产品名称',
                dataIndex: 'orderName'
            },
            {
                title: '产品数量',
                dataIndex: '1'
            }, {
                title: '货币单位',
                dataIndex: '2'
            }, {
                title: '申报单价',
                dataIndex: '3'
            }, {
                title: '申报总额',
                dataIndex: '4'
            }, {
                title: '申报总值',
                dataIndex: '5'
            }, {
                title: '操作',
                dataIndex: '6',
                render: () => {
                    return <div>
                        <a>删除</a>
                        <span> | </span>
                        <a>修改</a>
                    </div>
                }
            }
        ]
        return <FormOrderDeclareTable columns={colums}
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
                                      }]}></FormOrderDeclareTable>
    }

    render() {
        return <FormSettingGroup size={16} title={"货品申报信息"} span={24}>
            {this.renderTable()}
        </FormSettingGroup>
    }
}