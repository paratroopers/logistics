/**
 * 富文本编辑器
 * https://github.com/leejaen/react-lz-editor/blob/master/README.cn.md
 * Created by Handy
 * */
import * as React from 'react';
import * as LzEditor from 'react-lz-editor';

interface FormLzEditProps {
    value?: string,
    onChange?: (value) => void
    readonly?: boolean;
}

interface FormLzEditStates {
    htmlContent?: string;
}

export class FormLzEdit extends React.Component<FormLzEditProps, FormLzEditStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            htmlContent: props.value ? props.value : ""
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
        this.setState({htmlContent: content});
        if (onChange)
            onChange(content);
    }

    render() {
        const topThis = this;
        const {props: {readonly}, state: {htmlContent}} = topThis;
        return !readonly ?
            <LzEditor active={true} importContent={htmlContent} cbReceiver={this.receiveHtml.bind(this)}/> :
            <div dangerouslySetInnerHTML={{__html: htmlContent}} ref="lzEditor"></div>;
    }
}