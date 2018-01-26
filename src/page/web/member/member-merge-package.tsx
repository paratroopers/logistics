import * as React from 'react';
import {withRouter} from 'react-router';
import {Layout, Row, Col, Button, Icon} from 'antd';

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
                            <Icon type="exclamation-circle-o"/>
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
                <Row className="form-control-title">
                    <Col span={24} className="sign">
                        <span>订单基本信息</span>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>;
    }
}