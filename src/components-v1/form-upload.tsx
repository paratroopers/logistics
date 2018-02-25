import * as React from 'react';
import {Upload, Icon, Modal} from 'antd';
import {UploadFile} from 'antd/lib/upload/interface';
import {ModelNameSpace} from '../model/model';
import {ResponseNameSpace} from '../model/response'
import {Util} from '../util/util';

export interface FormUploadProps {
    imgCount: number;
    onChange?: (files?: ModelNameSpace.UploadModel[]) => void;
    disabled?: boolean;
    fileList?: any[];
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

    componentWillReceiveProps(nextProps) {
        if ('fileList' in nextProps && nextProps.fileList !== this.props.fileList) {
            this.setState({fileList: nextProps.fileList});
        }
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
        if (this.props.onChange) {
            let files: ModelNameSpace.UploadModel[] = [];
            Util.each(fileList.fileList, (item: UploadFile) => {
                let newFile: ModelNameSpace.UploadModel = {
                    uid: item.response ? (item.response as ResponseNameSpace.BaseResponse).Data : Util.guid(),
                    size: item.size,
                    status: item.status,
                    name: item.name,
                    url: '/upload/' + item.name
                };
                files.push(newFile);
            })
            this.props.onChange(files);
        }
        this.setState({fileList: fileList.fileList});
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <div className="clearfix">
            <Upload action="http://www.famliytree.cn/_api/ver(1.0)/File/upload"
                    listType="picture-card"
                    multiple={false}
                    fileList={fileList}
                    disabled={this.props.disabled}
                    onPreview={this.onPreview.bind(this)}
                    onChange={this.onChange.bind(this)}>
                {fileList.length >= this.props.imgCount ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.onCancel.bind(this)}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>;
    }
}