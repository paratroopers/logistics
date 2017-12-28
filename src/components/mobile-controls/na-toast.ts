import {Toast} from 'antd-mobile';
import {NaUtil} from '../../util/util';
export interface NaLoadingProps {
    children?: any;
}
export class NaToast {
    isMobile?: boolean;
    props?: NaLoadingProps;

    constructor(defaultVaule?: NaLoadingProps) {
        this.props = defaultVaule;
        this.isMobile = NaUtil.isMobile();
    }

    loading() {
        if (this.isMobile) {
            Toast.loading('加载中...', 999);
        }
    }

    hide() {
        if (this.isMobile) {
            Toast.hide();
        }
    }
}