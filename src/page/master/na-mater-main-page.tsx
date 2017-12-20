import * as React from 'react';
import {NaUtil} from "../../util/util";
import {withRouter} from "react-router";
import {ScreenModeEnum} from "../../api/model/common-model";
import NaMasterMobilePage from './na-master-mobile-page';
import NaMasterWebPage from './na-master-web-page';

interface NaMasterMainPageProps {

}

interface NaMasterMainPageStates {
    mode: ScreenModeEnum;

}

let timeout;
let currentValue;

@withRouter
export class NaMasterMainPage extends React.Component<NaMasterMainPageProps, NaMasterMainPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mode: NaUtil.getScrrenMode(window.innerWidth)
        }
    }

    /**
     * 监视屏幕
     **/
    onWindowResize() {
        const topThis = this;
        const {state: {mode}} = topThis;
        topThis.fetch(window.innerWidth, (data) => {
            console.log(data);
            if ((data === ScreenModeEnum.sm && mode !== ScreenModeEnum.sm) || (data !== ScreenModeEnum.sm && mode === ScreenModeEnum.sm)) {
                topThis.setState({mode: data});
            }
        });
    }

    /**
     * 获取最终mode
     * */
    fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            if (currentValue === value) {
                callback(NaUtil.getScrrenMode(value));
            }
        }

        timeout = setTimeout(fake, 1000);
    }

    componentWillMount() {
        const topThis = this;

        /* 装载事件-监视屏幕大小*/
        window.addEventListener('resize', topThis.onWindowResize.bind(this));
    }

    componentWillUnmount() {
        const topThis = this;
        /* 卸载-监视屏幕大小*/
        window.removeEventListener('resize', topThis.onWindowResize.bind(this))
    }

    render() {
        const topThis = this;
        const {props: {children}, state: {mode}} = topThis;
        const Master = (mode === ScreenModeEnum.sm) ?
            <NaMasterMobilePage>{children}</NaMasterMobilePage> :
            <NaMasterWebPage>{children}</NaMasterWebPage>;
        return Master;
    }
}
