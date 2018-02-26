import * as React from "react";
import {FormMediaPlayer, FormMediaPlayerType, IFormMediaPlayerProps}from "./form-media-player";
import {ModelNameSpace} from '../model/model';
import {DocumentCommon} from '../util/util';

export interface FormFileViewerProps extends IFormMediaPlayerProps {
    items: ModelNameSpace.Attachment[];
    changeVisible?: (visible: boolean) => void;
}
export interface FormFileViewerState {
    mediaPlayerProps: IFormMediaPlayerProps;
    fileIndex: number;
}

export class FormFileViewer extends React.Component<FormFileViewerProps, FormFileViewerState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mediaPlayerProps: {
                visible: false,
            },
            fileIndex: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        // if ("visible" in nextProps && nextProps.visible !== this.props.visible) {
            if (nextProps.items && nextProps.visible) {
                let {items} = nextProps;
                this.setState({fileIndex: 0}, () => {
                    this.onDisplay(items[0]);
                });
            }
        // }
    }


    onDisplay(item: ModelNameSpace.Attachment) {
        let obj: ModelNameSpace.Attachment = item;


        if (DocumentCommon.isMediaFile(DocumentCommon.getFileExtension(obj.path))) {
            this.onDisplayMedia(obj);
        } else {
            document.location.href = obj.path;
            this.props.changeVisible(false);
        }
    }

    /** 上一张*/
    onPrevious() {
        const topThis = this;
        const {state: {fileIndex}, props: {items}} = topThis;
        if (fileIndex - 1 >= 0) {
            topThis.setState({fileIndex: fileIndex - 1}, () => {
                topThis.onDisplayMedia(items[fileIndex - 1]);
            })
        } else {
            topThis.setState({fileIndex: items.length - 1}, () => {
                topThis.onDisplayMedia(items[items.length - 1]);
            })
        }
    }

    /** 下一张*/
    onNext() {
        const topThis = this;
        const {state: {fileIndex}, props: {items}} = topThis;
        if (fileIndex + 1 <= items.length - 1) {
            topThis.setState({fileIndex: fileIndex + 1}, () => {
                topThis.onDisplayMedia(items[fileIndex + 1]);
            })
        } else {
            topThis.setState({fileIndex: 0}, () => {
                topThis.onDisplayMedia(items[0]);
            })
        }
    }

    onDisplayMedia(item: ModelNameSpace.Attachment) {
        const topThis = this;
        const {props: {items}} = topThis;
        const otherProps = items.length > 1 ? {
            onPrevious: topThis.onPrevious.bind(this),
            onNext: topThis.onNext.bind(this)
        } : {};
        this.setState({
            mediaPlayerProps: {
                visible: true,
                src: DocumentCommon.getPath(item.path),
                mediatype: DocumentCommon.isImageFile(DocumentCommon.getFileExtension(item.path)) ? FormMediaPlayerType.Image : FormMediaPlayerType.Video,
                onClose: () => {
                    this.setState({
                        mediaPlayerProps: {
                            visible: false
                        }
                    });
                    this.props.changeVisible(false);
                },
                ...otherProps
            }
        })
    }

    render() {
        return <div>
            <FormMediaPlayer {...this.state.mediaPlayerProps} />
        </div>;
    }
}
