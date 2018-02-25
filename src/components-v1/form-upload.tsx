import * as React from 'react';
import {Upload, Icon, Modal} from 'antd';
import {UploadFile} from 'antd/lib/upload/interface';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {Util} from '../util/util';

export interface FormUploadProps {
    imgCount: number;
    onChange?: (files?: string[]) => void;
    disabled?: boolean;
    fileList?: ModelNameSpace.UploadModel[];
    customerOrderID?: number;
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
            this.setState({fileList: nextProps.fileList});
        }
    }

    getData() {
        if (this.props.customerOrderID)
            APINameSpace.CustomerOrderAPI.GetAttachments({customerOrderID: this.props.customerOrderID}).then(rs => {
                if (rs.Status === 0) {
                    let files: ModelNameSpace.UploadModel[] = [];
                    Util.each((rs.Data as any[]), (item: any) => {
                        let data: ModelNameSpace.UploadModel = {
                            uid: item.ID,
                            url: APINameSpace.CommonAPI.baseFileURL + item.path
                        };
                        files.push(data);
                    });
                    this.setState({fileList: files});
                }
            });
    }

    onPreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    onCancel() {
        this.setState({previewVisible: false})
    }

    onChange(fileList) {
        let fileIds: string[] = [];
        Util.each(fileList.fileList , (item: any) => {
            if (item.response)
                fileIds.push(item.response.Data);
            else
                fileIds.push(item.uid);
        });
        this.props.onChange && this.props.onChange(fileIds);
        this.setState({fileList: fileList.fileList});
    }

    render() {
        const {state: {previewVisible, previewImage, fileList}, props: {disabled, imgCount}} = this;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <div className="clearfix">
            <Upload action={APINameSpace.CommonAPI.baseUploadURL}
                    listType="picture-card"
                    multiple={false}
                    fileList={fileList}
                    disabled={disabled}
                    onPreview={this.onPreview.bind(this)}
                    onChange={this.onChange.bind(this)}>
                {fileList.length >= imgCount || disabled ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.onCancel.bind(this)}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>;
    }
}