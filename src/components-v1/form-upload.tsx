import * as React from 'react';
import { Upload, Icon, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { ModelNameSpace } from '../model/model';
import { APINameSpace } from '../model/api';
import { Util } from '../util/util';
import { FormFileViewer } from "./form-file-viewer";
import Item from 'antd-mobile/lib/popover/Item';
import { Notification } from './notification';

export interface FormUploadProps {
    imgCount: number;
    onChange?: (files?: string[]) => void;
    disabled?: boolean;
    fileList?: ModelNameSpace.UploadModel[];
    customerOrderID?: string;
}

export interface FormUploadStates {
    previewVisible?: boolean,
    previewImage?: string,
    fileList?: any[],
}

export class FormUpload extends React.Component<FormUploadProps, FormUploadStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            previewImage: '',
            fileList: [],
            previewVisible: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
        if ('fileList' in nextProps && nextProps.fileList !== this.props.fileList) {
            this.setState({ fileList: nextProps.fileList });
        }
    }

    getData() {
        if (this.props.customerOrderID)
            APINameSpace.CustomerOrderAPI.GetAttachments({ customerOrderID: this.props.customerOrderID }).then(rs => {
                if (rs.Status === 0) {
                    let files: ModelNameSpace.UploadModel[] = [];
                    Util.each((rs.Data as any[]), (item: any) => {
                        let data: ModelNameSpace.UploadModel = {
                            uid: item.ID,
                            url: APINameSpace.CommonAPI.baseFileURL + item.path
                        };
                        files.push(data);
                    });
                    this.setState({ fileList: files });
                }
            });
    }

    onPreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    onCancel(bool: boolean) {
        this.setState({ previewVisible: bool })
    }

    beforeUpload(file, fileList) {
        var patrn = /^[%&',;=?“【】[]#*$\\^]+/g;
        if (!patrn.test(file.name)) {// 如果包含特殊字符返回false
            Notification.error({
                message:"提示",
                description:"上传失败，文件名称不能包含特殊字符！"
            })
        }
        return patrn.test(file.name);
    }

    onChange(fileList) {
        const topThis = this;
        const { props: { onChange } } = topThis;
        let fileIds: string[] = [];
        Util.each(fileList.fileList, (item: any) => {
            if (item.response)
                fileIds.push(item.response.Data.fileID);
            else
                fileIds.push(item.uid);
        });
        if (onChange)
            onChange(fileIds);
        this.setState({ fileList: fileList.fileList });
    }

    render() {
        const { state: { previewVisible, previewImage, fileList }, props: { disabled, imgCount } } = this;
        const items: ModelNameSpace.Attachment[] = [{ path: previewImage }];

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <div className="clearfix">
            <Upload action={APINameSpace.CommonAPI.baseUploadURL}
                data={(file: UploadFile) => {
                    return {
                        type: 1,
                        TenantID: "890501594632818690",
                        isAdmin: false
                    }
                }}
                listType="picture-card"
                multiple={false}
                beforeUpload={(file, fileList) => this.beforeUpload(file, fileList)}
                fileList={fileList}
                disabled={disabled}
                onPreview={this.onPreview.bind(this)}
                onChange={this.onChange.bind(this)}>
                {fileList.length >= imgCount || disabled ? null : uploadButton}
            </Upload>
            <FormFileViewer items={items} visible={previewVisible}
                changeVisible={this.onCancel.bind(this)} />
        </div>;
    }
}