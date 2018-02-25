import * as React from "react";
import {AkOneUp,AkOneUpMediaType,IAkOneUpProps}from "./form-media-player";
import {ModelNameSpace} from '../model/model';
import {DocumentCommon} from '../util/util';

export interface FileViewerProps extends IAkOneUpProps{
    item: ModelNameSpace.Attachment;
    changeVisible?: (visible: boolean) => void;
}
export interface FileViewerState {
    mediaPlayerProps: IAkOneUpProps;
}
export class FileViewer extends React.Component<FileViewerProps, FileViewerState>{
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
                mediatype: DocumentCommon.isImageFile(DocumentCommon.getFileExtension(item.path)) ? AkOneUpMediaType.Image : AkOneUpMediaType.Video,
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
            <AkOneUp {...this.state.mediaPlayerProps} />
        </div>;
    }
}
