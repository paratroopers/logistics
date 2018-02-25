import * as React from 'react';
import {Upload, Icon, Modal} from 'antd';
import {UploadFile} from 'antd/lib/upload/interface';
import {ModelNameSpace} from '../model/model';

export interface FormUploadProps {
    imgCount: number;
    onChange?: (files?: UploadFile[]) => void;
    disabled?: boolean;
    fileList?: ModelNameSpace.UploadModel[];
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
        this.props.onChange && this.props.onChange(fileList.fileList as UploadFile[]);
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
            <Upload action="http://www.famliytree.cn/_api/ver(1.0)/File/upload"
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