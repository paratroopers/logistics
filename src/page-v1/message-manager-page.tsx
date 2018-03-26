import * as React from 'react';
import {withRouter, hashHistory, Link} from 'react-router';
import {Row, Col, Button, Icon, Modal,message} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {ModelNameSpace} from "../model/model";
import {RequestNameSpace} from "../model/request";
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {PathConfig} from "../config/pathconfig";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ResponseNameSpace} from "../model/response";
import {APINameSpace} from "../model/api";
import {ClickParam} from "antd/lib/menu";
import {
    FormTableOperation,
    FormTableOperationModel,
    FormTableOperationEnum
} from "../components-v1/form-table-operation";
const confirm = Modal.confirm;

interface MessageManagerPageProps {

}

interface MessageManagerPageStates {
    /** 数据源*/
    listData: ModelNameSpace.MessageModel[],
    /** 当前页数*/
    pageIndex: number,
    /** 每页条数*/
    pageSize: number,
    /** 总数*/
    totalCount: number
    /** 列表是否正在查询*/
    loading?: boolean;
}

class MessageManagerPageTable extends CommonTable<any> {
}

@withRouter
export class MessageManagerPage extends React.Component<MessageManagerPageProps, MessageManagerPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false
        }
    }

    componentDidMount() {
        const topThis = this;
        const {state: {pageIndex, pageSize}} = topThis;
        this.loadData(pageIndex, pageSize);
    }

    /** 获取数据源*/
    loadData = (index: number, size: number) => {
        const topThis = this;
        let request: RequestNameSpace.GetMessageListRequest = {
            messageType: ModelNameSpace.MessageType.System,
            pageIndex: index,
            pageSize: size,
            isAdmin: true
        }

        topThis.setState({loading: true});
        APINameSpace.MemberAPI.GetMessageList(request).then((result: ResponseNameSpace.GetMessageListResponse) => {
            if (result.Status === 0) {
                topThis.setState({
                    listData: result.Data,
                    pageIndex: index,
                    totalCount: result.TotalCount,
                    loading: false
                });
            }
        })
    }

    onClickDelete(ID: string) {
        const topThis = this;
        const {state: {pageIndex, pageSize}} = topThis;
        const request: RequestNameSpace.DeleteMessageManagerItemRequest = {
            id: ID,
            isAdmin:true
        }

        topThis.setState({loading: true});
        APINameSpace.MemberAPI.DeleteMessageManagerItem(request).then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                message.success("删除成功!");
                topThis.loadData(pageIndex, pageSize);
            }
        })
    }

    renderTable() {
        const topThis = this;
        const {state: {listData, pageIndex, pageSize, totalCount, loading}} = topThis;

        const columns: CommonColumnProps<ModelNameSpace.MessageModel>[] = [{
            title: "标题",
            dataIndex: 'title',
            layout: ColumnLayout.LeftTop,
            render: (txt, record) => {
                return <Link to={{pathname: PathConfig.MessageManagerViewPage, state: record}}>{txt}</Link>
            }
        }, {
            title: '操作',
            width:"78px",
            layout: ColumnLayout.Option,
            render: (val, record) => {
                const menu: FormTableOperationModel[] = [
                    {
                        key: FormTableOperationEnum.View,
                        type: "search",
                        label: "查看",
                        path: PathConfig.MessageManagerViewPage
                    },
                    {
                        key: FormTableOperationEnum.Edit,
                        type: "edit",
                        label: "编辑",
                        path: PathConfig.MessageManagerEditPage
                    },
                    {
                        key: FormTableOperationEnum.Detele,
                        type: "delete",
                        label: "删除"
                    }
                ]

                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === FormTableOperationEnum.Detele.toString()) {
                        confirm({
                            title: '你确定要删除此系统消息?',
                            content: '系统消息删除后将不可恢复，请注意！',
                            okText: '确认',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                                topThis.onClickDelete(record.ID);
                            },
                            onCancel() {

                            }
                        });
                    } else {
                        const pathModel = menu.filter(r => r.key.toString() === param.key)[0];
                        hashHistory.push({pathname: pathModel.path, state: record});
                    }
                }} value={menu}></FormTableOperation>;
            }
        }];

        const pagination: PaginationProps = {
            current: pageIndex,
            pageSize: pageSize,
            total: totalCount,//数据总数
            onChange: (a) => {
                topThis.loadData(a, pageSize);
            }
        };

        return <MessageManagerPageTable columns={columns}
                                     rowKey={"ID"}
                                     loading={loading}
                                     style={{padding: '12px'}}
                                     pagination={pagination}
                                     bordered={false}
                                     dataSource={listData}
                                     locale={{emptyText: <div><Icon type="frown-o"></Icon><span>暂无数据</span></div>}}/>;
    }

    renderButton() {
        return <Row type="flex" justify="end">
            <Col style={{marginRight: 16}}>
                <Button type="primary" icon="plus" onClick={() => {
                    hashHistory.push({pathname: PathConfig.MessageManagerAddPage});
                }}>发布系统消息</Button>
            </Col>
        </Row>
    }

    render() {
        return <Row className="message-manager-page mainland-content-page">
            <ContentHeaderControl title="系统通知管理" extra={this.renderButton()}></ContentHeaderControl>
            {this.renderTable()}
        </Row>;
    }
}