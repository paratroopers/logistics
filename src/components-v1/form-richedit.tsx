/**
 * 富文本编辑器
 * Created by Handy
 * */
import * as React from 'react';
import * as wangeditor from 'wangeditor';
import {Util} from "../util/util";

interface FormRichEditProps {
    value?: string,
    type?: string,
    height?: number;
    menus?: string[],
    onChange?: (value) => void,
    onUploadImgLoad?: (bool) => void,
}

interface FormRichEditStates {

}

export class FormRichEdit extends React.Component<FormRichEditProps, FormRichEditStates> {
    type?: string;
    menus?: string[]
    editor?: any;
    value?: string;

    constructor(props, content) {
        super(props, content);
        this.type = props.type ? props.type : "";
        this.menus = props.menus ? props.menus : "";
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && this.editor.txt.html() !== nextProps.value) {
            this.value = nextProps.value;
            this.editor.txt.html(this.value);
        }
        if ("type" in nextProps && this.props.type !== nextProps.type) {
            this.type = nextProps.type;
            this.initEditor();
        }
        if ("menus" in nextProps && !Util.isEqual(this.props.menus, nextProps.menus)) {
            this.menus = nextProps.menus;
            this.initEditor();
        }
    }

    componentDidMount() {
        this.initEditor();
    }

    onChange(html) {
        const topThis = this;
        const {props: {onChange}} = topThis;
        if (typeof onChange === "function") {
            onChange(html);
        }
    }

    getMenu() {
        let menu = [];
        switch (this.type) {
            case "nobar":
                menu = [];
                break;
            case "simple":
                menu = ["head", 'bold', 'underline', 'italic', 'strikethrough', 'foreColor', 'backColor'];
                break;
            case "custom":
                menu = this.menus || [];
                break;
            case "":
            default:
                menu = [
                    'head',  // 标题
                    'bold',  // 粗体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    'video',  // 插入视频
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复
                ]
                break;
        }
        return menu;
    }

    initEditor() {
        const topThis = this;
        const bars = topThis.refs.editorBars;
        const elem = topThis.refs.editorElem;
        const editor = new wangeditor(bars, elem);
        topThis.editor = editor;

        editor.customConfig.onchange = (html) => {
            topThis.onChange(html)
        };
        editor.customConfig.zIndex = 1;
        editor.customConfig.height = 200;
        editor.customConfig.menus = topThis.getMenu();
        editor.create();
        editor.txt.html(topThis.value);
    }

    render() {
        const topThis = this;
        const {props: {height}} = topThis;
        return <div className="ak-editor">
            <div ref="editorBars"></div>
            <div ref="editorElem" style={{height: height || 300}}></div>
        </div>;
    }
}