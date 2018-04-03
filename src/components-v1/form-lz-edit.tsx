/**
 * 富文本编辑器
 * https://github.com/leejaen/react-lz-editor/blob/master/README.cn.md
 * Created by Handy
 * */
import * as React from 'react';
import * as LzEditor from 'react-lz-editor';
import * as hmacsha1 from "hmacsha1";
import {Base64} from "js-base64";
import * as md5 from "md5";
import * as lodash  from "lodash";
import {APINameSpace}from "../model/api";

interface FormLzEditProps {
    value?: string,
    onChange?: (value) => void
    readonly?: boolean;
    isMultiple?: boolean;
}

interface FormLzEditStates {
    htmlContent?: string;
    responseList?: any[];
}

export class FormLzEdit extends React.Component<FormLzEditProps, FormLzEditStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            htmlContent: !props.value ? props.value : ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && this.state.htmlContent !== nextProps.value) {
            this.setState({htmlContent: nextProps.value})
        }
    }

    receiveHtml(content) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        this.setState({htmlContent: content,responseList:[]});
        if (onChange)
            onChange(content);
    }

    onChange(info) {
        // console.log("onChange:", info);
        // console.log("upload onChange this.state.files",this.state.files,info)
        let currFileList = info.fileList;

        currFileList = currFileList.filter((f) => (!f.length));
        let url = "http://www.famliytree.cn/upload/";
        //读取远程路径并显示链接
        currFileList = currFileList.map((file) => {
            if (file.response) {
                // 组件会将 file.url 作为链接进行展示  自定义上传接口没有返回response
                // file.url = url + file.response.url;
                file.url = url + file.name;
            }
            if (!file.length) {
                return file;
            }
        });
        const topThis = this;
        //按照服务器返回信息筛选成功上传的文件
        currFileList = currFileList.filter((file) => {
            //根据多选选项更新添加内容
            let hasNoExistCurrFileInUploadedList = !lodash.findIndex(topThis.state.responseList, item => item.name === file.name)
            if (hasNoExistCurrFileInUploadedList) {
                let responseList = topThis.state.responseList;
                if (!!topThis.props.isMultiple === true) {
                    responseList.push(file);
                } else {
                    responseList = [file];
                }
                topThis.setState({responseList: responseList});
                topThis.forceUpdate();
            }
            return !!file.response || (!!file.url && file.status === "done") || file.status === "uploading";
        });
        currFileList = lodash.uniqBy(currFileList, "name");
        if (!!currFileList && currFileList.length !== 0) {
            // console.log("upload set files as fileList", currFileList);
            topThis.setState({responseList: currFileList});
        }
        topThis.forceUpdate();
    }

    beforeUpload(file) {
        console.log("beforeUpload like", file);
    }

    getSignature(fileName) {
        let now = new Date();
        let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
        let Signature = Base64.encode(h);
        return Signature;
    }

    getPolicy(fileName) {
        let now = new Date();
        let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //过期时间1小时后
        let policy = Base64.encode(JSON.stringify({
            "bucket": "devopee",
            "save-key": "/" + fileName,
            "expiration": Math.round(afterHour.getTime() / 1000),
            "date": now
        }));
        return policy;
    }

    render() {
        const topThis = this;
        const {props: {readonly}, state: {htmlContent}} = topThis;

        var watermarkImage = [{
            type: "white_small",
            tip: "white small",
            value: "http://www.famliytree.cn/icon/h.png",
            valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9zbWFsbC5wbmc="
        }, {
            type: "white_big",
            tip: "white big",
            value: "http://www.famliytree.cn/icon/h.png",
            valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9iaWcucG5n"
        }];

        let policy = "";

        const uploadProps = {
            action: APINameSpace.CommonAPI.baseUploadURL,
            onChange: topThis.onChange.bind(this),
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => { //自定义上传参数，这里使用UPYUN
                return {
                    Authorization: "UPYUN reactlzeditor:" + topThis.getSignature(file.name),
                    policy: (() => {
                        policy = this.getPolicy(file.name);
                        return policy;
                    })(),
                    signature: md5(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
                }
            },
            multiple: true,
            beforeUpload: topThis.beforeUpload.bind(this),
            showUploadList: true
        }

        return !readonly ?
            <LzEditor uploadProps={uploadProps}
                      disabled={readonly}
                      active={true}
                      importContent={htmlContent}
                      watermarkImage={watermarkImage}
                      cbReceiver={topThis.receiveHtml.bind(this)}/> :
            <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>;
    }
}