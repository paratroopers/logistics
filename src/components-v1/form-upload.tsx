import * as React from 'react';
import {Upload, Icon, Modal, Button} from 'antd';

export interface FormUploadProps {
    imgCount: number;
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
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            previewVisible: false
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
        this.setState({fileList});
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
            <Upload action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
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