import * as React from "react";
import {FormMediaPlayer,FormMediaPlayerType,IFormMediaPlayerProps}from "./form-media-player";
import {ModelNameSpace} from '../model/model';
import {DocumentCommon} from '../util/util';

export interface FormFileViewerProps extends IFormMediaPlayerProps{
    item: ModelNameSpace.Attachment;
    changeVisible?: (visible: boolean) => void;
}
export interface FormFileViewerState {
    mediaPlayerProps: IFormMediaPlayerProps;
}
export class FormFileViewer extends React.Component<FormFileViewerProps, FormFileViewerState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            mediaPlayerProps: {
                visible: false
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if ("visible" in nextProps && nextProps.visible !== this.props.visible) {
            if (nextProps.item && nextProps.visible) {
                let { item } = nextProps;
                this.onDisplay(item);
            }
        }
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
    onDisplayMedia(item: ModelNameSpace.Attachment) {
        this.setState({
            mediaPlayerProps: {
                visible: true,
                filename: DocumentCommon.getFileNameWithOutExtension(item.path),
                src: item.path,
                mediatype: DocumentCommon.isImageFile(DocumentCommon.getFileExtension(item.path)) ? FormMediaPlayerType.Image : FormMediaPlayerType.Video,
                createDate: "",
                size: "0",
                extension: DocumentCommon.getFileExtension(item.path),
                onClose: () => {
                    this.setState({
                        mediaPlayerProps: {
                            visible: false
                        }
                    });
                    this.props.changeVisible(false);
                }
            }
        })
    }
    render() {
        return <div>
            <FormMediaPlayer {...this.state.mediaPlayerProps} />
        </div>;
    }
}
