import * as React from 'react';
import {Button} from 'antd';

export enum FormMediaPlayerType {
    Image,
    Video
}

export interface IFormMediaPlayerProps {
    /**
     * detailButton
     *
     * @type {boolean}
     * @memberOf IFormMediaPlayerProps
     */
    detailButton?: boolean;

    /**
     * downloadable
     *
     * @type {boolean}
     * @memberOf IFormMediaPlayerProps
     */
    downloadable?: boolean;

    /**
     * visible
     *
     * @type {boolean}
     * @memberOf IFormMediaPlayerProps
     */
    visible?: boolean;

    /**
     * filename
     *
     * @type {string}
     * @memberOf IFormMediaPlayerProps
     */
    filename?: string;

    /**
     * Resource Address
     *
     * @type {string}
     * @memberOf IAkPreviewProps
     */
    src?: string;

    /**
     * Media Type
     * [ Image||Video]
     * @type {FormMediaPlayerType}
     * @memberOf IFormMediaPlayerProps
     */
    mediatype?: FormMediaPlayerType;

    /**
     * create date
     *
     * @type {string}
     * @memberOf IFormMediaPlayerProps
     */
    createDate?: string;

    /**
     * file size
     *
     * @type {string}
     * @memberOf IFormMediaPlayerProps
     */
    size?: string;

    /**
     * On previous event.
     *
     *
     * @memberOf IAkPreviewProps
     */
    onPrevious?: () => void;

    /**
     * On next event.
     *
     *
     * @memberOf IAkPreviewProps
     */
    onNext?: () => void;

    /**
     * On Close Event Handle.
     *
     *
     * @memberOf IFormMediaPlayerProps
     */
    onClose?: () => void;


    /**
     * file type
     *
     * @type {string}
     * @memberOf IFormMediaPlayerProps
     */
    extension?: string;

}

export interface IFormMediaPlayerStates {
    downloadable?: boolean;
    visible?: boolean;
    src?: string;
    currentTransfrom?: number;
    size?: string;
    extension?: string;
    xy?: string;
    showPanal?: boolean;
    createDate?: string;
    mediatype?: FormMediaPlayerType;
    filename?: string;
}

export class FormMediaPlayer extends React.Component<IFormMediaPlayerProps,
    IFormMediaPlayerStates> {
    private img: any;
    private video: any;
    private container: any;
    private isDragging: boolean = false;
    private oldX = 0;
    private oldY = 0;
    private marginLeft: string;
    private marginTop: string;
    /** 手势识别 */
    private pos_start: any = null;
    private pos_move: any = null;
    public static SurportedMediaTypes = [
        "png",
        "jpg",
        "gif",
        "jpeg",
        "icon",
        "bmp",
        "mp3",
        "mp4",
        "WebM",
        "Ogg"
    ];

    public constructor(props, context) {
        super(props, context);
        this.state = {
            downloadable: "downloadable" in props ? props.downloadable : true,
            visible: props.visible,
            src: props.src,
            currentTransfrom: 0,
            mediatype: FormMediaPlayerType.Image,
            showPanal: false,
            createDate: props.createDate,
            extension: props.extension,
            size: props.size,
            xy: ""
        };
    }

    public componentWillReceiveProps(nextProps: IFormMediaPlayerProps) {
        if ("src" in nextProps && nextProps.src !== this.props.src) {
            this.setState({src: nextProps.src, xy: ""});
        }
        this.setState({visible: nextProps.visible});
        if ("mediatype" in nextProps && nextProps.mediatype !== this.props.mediatype) {
            this.setState({mediatype: nextProps.mediatype});
        }
        if ("downloadable" in nextProps && nextProps.downloadable !== this.props.downloadable) {
            this.setState({downloadable: nextProps.downloadable});
        }
        if ("size" in nextProps && nextProps.size !== this.props.size) {
            this.setState({size: nextProps.size});
        }
        if ("createDate" in nextProps && nextProps.createDate !== this.props.createDate) {
            this.setState({createDate: nextProps.createDate});
        }
        if ("filename" in nextProps && nextProps.filename !== this.props.filename) {
            this.setState({filename: nextProps.filename});
        }
        if ("extension" in nextProps && nextProps.extension !== this.props.extension) {
            this.setState({extension: nextProps.extension});
        }
    }

    public render() {
        return <div
            className="form-media-player"
            style={{display: this.state.visible ? "block" : "none"}}>
            {this.renderCmdBar()}
            {this.renderContent()}
            {this.renderRightPanel()}
            {this.renderOverlay()}
        </div >;
    }

    private renderCmdBar() {
        return <div className="form-media-player-cmdbar">
            <div className="form-media-player-cmdbar-leftbar">
                <Button icon="close" size="large" className="form-media-player-cmdbar-leftbar-close"
                        onClick={this.handleOnClose}></Button>
            </div>
            <div className="form-media-player-cmdbar-rightbar">
                {this.state.mediatype === FormMediaPlayerType.Image
                    ? <Button icon="reload"
                              size="large" className="form-media-player-cmdbar-leftbar-transform"
                              onClick={this.handleOnTransform}></Button>
                    : null}
                {this.state.mediatype === FormMediaPlayerType.Image
                    ? <Button
                        icon="plus"
                        size="large"
                        className="form-media-player-cmdbar-leftbar-zoomin"
                        onClick={this.handleZoomIn}></Button>
                    : null}
                {this.state.mediatype === FormMediaPlayerType.Image
                    ? <Button
                        icon="minus"
                        size="large"
                        className="form-media-player-cmdbar-leftbar-zoomout"
                        onClick={this.handleZoomOut}></Button>
                    : null}
                {this.props.onPrevious
                    ? <Button
                        icon="left"
                        size="large"
                        className="form-media-player-cmdbar-leftbar-previous"
                        onClick={this.handleOnPrevious}></Button>
                    : null}
                {this.props.onNext
                    ? <Button
                        icon="right"
                        size="large"
                        className="form-media-player-cmdbar-leftbar-next"
                        onClick={this.handleOnNext}></Button>
                    : null}
                {this.state.downloadable
                    ? <Button
                        icon="download"
                        size="large"
                        className="form-media-player-cmdbar-leftbar-download"
                        onClick={this.handleOnDownload}></Button>
                    : null}
                {this.props.detailButton
                    ? <Button
                        icon="exclamation-circle-o"
                        size="large"
                        className="form-media-player-cmdbar-leftbar-info"
                        onClick={this.handleOnShowPanel}></Button>
                    : null}
            </div>
        </div>;
    }

    private renderContent() {
        let wraper: React.ReactNode = "";
        let type = this.state.mediatype || FormMediaPlayerType.Image;
        let imgStyle = {
            transform: `rotate(${this.state.currentTransfrom}deg)`
        };
        if (type === FormMediaPlayerType.Image) {
            wraper = <div className="form-media-player-image">
                <img
                    id="myImage"
                    draggable={true}
                    ref={n => this.img = n}
                    src={this.state.visible ? this.state.src : ''}
                    onMouseDown={this.handleStart}
                    onMouseMove={this.handleMove}
                    onMouseUp={this.handleEnd}
                    onMouseLeave={this.handleEnd}
                    onTouchStart={this.handleStart}
                    onTouchMove={this.handleMove}
                    onTouchEnd={this.handleEnd}
                    onTouchCancel={this.handleEnd}
                    onLoad={this.handleImageOnLoad}
                    onClick={this.handleImageClick}
                    style={imgStyle}></img>
            </div>;
        } else if (type === FormMediaPlayerType.Video) {
            wraper = <div className="form-media-player-video">
                <video
                    ref={n => this.video = n}
                    autoPlay
                    controls
                    src={this.state.visible
                        ? this.state.src
                        : ''}>
                    Your browser does not support the video tag.
                </video>
            </div>;
        }
        return <div className="form-media-player-content" ref={n => this.container = n}>{wraper}
        </div>;
    }

    private renderRightPanel() {
        return <div
            className="form-media-player-rightpanel"
            style={{display: this.state.showPanal ? "block" : "none"}}>
            <div className="form-media-player-rightpanel-content">
                <h4
                    className="subject"
                    style={{
                        fontSize: "16px",
                        color: "#fff",
                        lineHeight: "25px"
                    }}>标题</h4>
                <p className="item">
                    <span className="title">名称</span>
                    <span className="value">{this.state.filename
                        ? this.state.filename
                        : this.getFileName(this.state.src)}</span>
                </p>
                <p className="item">
                    <span className="title">类型</span>
                    <span
                        className="value">{this.props.extension ? this.state.extension : this.getFileExtension(this.state.src)}</span>
                </p>
                <p className="item">
                    <span className="title">时间</span>
                    <span className="value">{this.state.createDate}</span>
                </p>
                <p className="item">
                    <span className="title">Dimensions</span>
                    <span className="value">{this.state.xy}</span>
                </p>
                <p className="item">
                    <span className="title">大小</span>
                    <span className="value">{this.state.size}</span>
                </p>
            </div>
            <div className="form-media-player-rightpanel-splitline"></div>
        </div >;
    }

    private renderOverlay() {
        return <div className="form-media-player-overlay"></div>;
    }

    private handleOnPrevious = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.reset();
        if (this.props.onPrevious) {
            this.props.onPrevious()
        }
    }

    private handleOnNext = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.reset();
        if (this.props.onNext) {
            this.props.onNext()
        }
    }

    private handleOnClose = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (this.props.onClose) {
            this.props.onClose()
        }
        this.setState({visible: false});
    }

    private handleOnDownload = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let src = this.state.src;
        if (src && src.length > 0) {
            let a = document.createElement('a');
            a.href = a.download = src;
            a.click();
        }
    }

    private handleOnTransform = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            currentTransfrom: this.state.currentTransfrom + 90
        });
    }

    private handleZoomIn = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let nextWidth = this.img.offsetWidth * 1.1;
        this.img.style.width = nextWidth + "px";
        this.img.style.maxWidth = "none";
        this.img.style.maxHeight = "none";
        this.img.style.marginLeft = (this.container.offsetWidth - this.img.width) / 2 + "px";
    }

    private handleZoomOut = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let width = this.img.offsetWidth * 0.9;
        this.img.style.width = width + "px";
        this.img.style.maxWidth = "none";
        this.img.style.maxHeight = "none";
        this.img.style.marginLeft = (this.container.offsetWidth - width) / 2 + "px";
    }

    private handleStart = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.isDragging = true;
        event = event || window.event;
        let target = event;
        if (event.touches && event.touches.length === 1) {
            target = event.targetTouches[0];
        }
        this.pos_start = this.getPosOfEvent(event);
        this.marginLeft = this.getComputedStyle(this.img, "marginLeft");
        this.marginTop = this.getComputedStyle(this.img, "marginTop");
        this.oldX = target.clientX;
        this.oldY = target.clientY;
    }

    private handleMove = (event) => {
        event.stopPropagation();
        event.preventDefault();

        event = event || window.event;
        event.preventDefault();
        if (!this.isDragging) return;
        let target = event;
        if (event.touches && event.touches.length === 1) {
            target = event.targetTouches[0];
        }
        let fingers = this.getFingers(event);
        if (fingers === 1) //drag
        {
            let disX = target.clientX - this.oldX;
            let disY = target.clientY - this.oldY;
            this.img.style.marginLeft = parseInt(this.marginLeft) + disX + "px";
            this.img.style.marginTop = parseInt(this.marginTop) + disY + "px";
        }
        else if (fingers === 2) //pinch
        {
            this.pos_move = this.getPosOfEvent(event);
            let scale: number = this.calScale(this.pos_start, this.pos_move);
            let nextWidth = this.img.offsetWidth;
            if (scale > 1) {
                nextWidth = this.img.offsetWidth * 1.03;
            }
            else {
                nextWidth = this.img.offsetWidth * 0.98;
            }
            //let nextWidth = this.img.offsetWidth * scale;
            this.img.style.width = nextWidth + "px";
            this.img.style.maxWidth = "none";
            this.img.style.maxHeight = "none";
            this.img.style.marginLeft = (this.container.offsetWidth - this.img.width) / 2 + "px";

            // alert(scale);
        }

    }

    private handleEnd = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.isDragging = false;
    }

    private handleOnShowPanel = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            showPanal: !this.state.showPanal
        });
    }

    private handleImageClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    private handleImageOnLoad = (event: any) => {
        let _self = this;
        if (event.target.naturalWidth) {
            _self.setState({xy: `${event.target.naturalWidth}X${event.target.naturalHeight}`});
        } else { //兼容低版本IE浏览器
            let image = new Image();
            image.src = _self.state.src;
            image.onload = function () {
                if (image.width && image.height) {
                    _self.setState({xy: `${image.width}X${image.height}`});
                }
            }
        }
    }

    private getComputedStyle = (object, key) => {
        return document.defaultView.getComputedStyle(object, null)[key];
        //window.getComputedStyle
    }

    private getFileExtension = (src: string) => {
        if (src && src.lastIndexOf(".") > 0) {
            return src.substr(src.lastIndexOf("."));
        } else {
            return '';
        }
    }

    private getFileName = (src: string) => {
        if (src) {
            return src.substring(src.lastIndexOf("/") + 1)
        }
    }

    private getFingers = (event: any) => {
        return event.touches ? event.touches.length : 1;
    }

    private getPosOfEvent = (event: any) => {
        let hasTouch: boolean = event.touches && event.touches.length > 0;
        if (hasTouch) {
            var posi = [];
            var src = null;
            for (var t = 0, len = event.touches.length; t < len; t++) {
                src = event.touches[t];
                posi.push({
                    x: src.pageX,
                    y: src.pageY
                });
            }
            return posi;
        } else {
            return [{
                x: event.pageX,
                y: event.pageY
            }];
        }
    }

    private calScale = (pstart: any, pmove: any) => {
        if (pstart.length >= 2 && pmove.length >= 2) {
            var disStart = this.getDistance(pstart[1], pstart[0]);
            var disEnd = this.getDistance(pmove[1], pmove[0]);
            return disEnd / disStart;
        }
        return 1;
    }

    private getDistance = (pos1: any, pos2: any) => {
        var x = pos2.x - pos1.x,
            y = pos2.y - pos1.y;
        return Math.sqrt((x * x) + (y * y));
    }

    private reset() {
        this.isDragging = false;
        this.pos_start = this.pos_move = null;
        if (this.img) {
            this.img.style.margin = "auto";
            this.img.style.width = "auto";
            this.img.style.transform = "rotate(0deg)";
        }
    }

}
