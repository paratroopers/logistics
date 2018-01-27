import * as React from 'react';
import {withRouter} from 'react-router';
import {Layout, Row, Col, Button, Icon} from 'antd';
import {FormOrderRelation, FormOrderDeclare, FormOrderAddressee, FormOrderInfo} from '../../../components/form';

export interface MemberMergePackageProps {
}

export interface MemberMergePackageStates {
}

@withRouter
export class MemberMergePackage extends React.Component<MemberMergePackageProps, MemberMergePackageStates> {
    render() {
        return <Layout className="merge-package">
            <Layout.Header className="merge-package-header">
                <Row>
                    <Col span={24}>
                        <div className="merge-package-header-title">
                            <Icon type="tag" style={{color: '#f2804b', marginRight: '15px'}}/>
                            <span>单号：201801270052</span>
                        </div>
                        <Button.Group size="default" className="merge-package-header-button">
                            <Button type="primary">确认合并打包</Button>
                            <Button type="primary">取消</Button>
                        </Button.Group>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content>
                <FormOrderInfo></FormOrderInfo>
                <FormOrderRelation></FormOrderRelation>
                <FormOrderAddressee></FormOrderAddressee>
                <FormOrderDeclare></FormOrderDeclare>
            </Layout.Content>
        </Layout>;
    }
}