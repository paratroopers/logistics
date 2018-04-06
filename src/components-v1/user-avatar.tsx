import * as React from 'react';
import {connect, hashHistory} from "react-redux";
import {Global, Context} from '../util/common';
import {WebAction} from "../actions/index";
import {Avatar, Modal, Upload, Icon, message} from 'antd';
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {PathConfig} from "../config/pathconfig";

interface UserAvatarProps {
    size?: number;
    src?: string;
    attr?: 'Photo' | 'Name';
    className?: string;
}

interface UserAvatarStates {
    src?: string;
    size?: string;
    modalVisible?: boolean;
    loading?: boolean;
    imageBase64?: string;
    url?: string;
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = ["image/jpg", "image/jpeg", "image/png"].indexOf(file.type) !== -1;
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class UserAvatar extends React.Component<UserAvatarProps, UserAvatarStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            src: props.src ? props.src : "http://www.famliytree.cn/icon/timor.png",
            modalVisible: false,
            loading: false,
            imageBase64: ""
        }
    }

    componentDidMount() {
        const topThis = this;
        /** 更新用户信息*/
        let userModel: ModelNameSpace.UserModel = Context.getMerchantData();
        try {
            topThis.setState({src: userModel.userInfo.HeaderURL});
        } catch (e) {
            message.warning("登录信息失效，请重新登录");
            hashHistory.push(PathConfig.LoginPage);
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {src}} = topThis;
        if ('src' in nextProps && nextProps.src !== src) {
            topThis.setState({src: nextProps.src !== "" && nextProps.src !== null ? nextProps.src : "http://www.famliytree.cn/icon/timor.png"});
        }
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done' && info.file.response.Data.fileURL) {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageBase64) => {
                this.setState({
                    imageBase64,
                    url: APINameSpace.CommonAPI.baseFileURL + info.file.response.Data.fileURL,
                    loading: false,
                })
            });
        }
    }

    onOk() {
        const topThis = this;
        const {state: {url}} = topThis;
        topThis.setState({
            modalVisible: false,
            src: url
        }, () => {
            Global.store.dispatch(WebAction.update_user_avatar(url));
        });
    }

    renderModal() {
        const topThis = this;
        const {state: {modalVisible, imageBase64}} = topThis;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <Modal maskClosable={true} destroyOnClose={true} title="更换头像" visible={modalVisible}
                      bodyStyle={{display: "flex", alignItems: "center", justifyContent: "center"}}
                      onOk={topThis.onOk.bind(this)} onCancel={() => {
            topThis.setState({modalVisible: false, imageBase64: ""})
        }}>
            <Upload
                action={APINameSpace.CommonAPI.baseUploadUserURL}
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageBase64 ? <img style={{width: 120, height: 120}} src={imageBase64} alt=""/> : uploadButton}
            </Upload>
        </Modal>
    }

    render() {
        const topThis = this;
        const {props: {size, className}, state: {src, modalVisible}} = topThis;

        const style = size ? {width: size, height: size, borderRadius: size} : {};
        return <a className="user-avatar" onClick={() => {
            topThis.setState({modalVisible: true, imageBase64: ""});
        }}>
            <Avatar className={className} style={style} src={src}></Avatar>
            {modalVisible && topThis.renderModal()}
        </a>;
    }
}

const mapStateToProps = (state) => {
    return {
        src: state.web.avatarUrl
    }
}
export default connect(mapStateToProps)(UserAvatar);