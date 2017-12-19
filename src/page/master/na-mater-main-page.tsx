import * as React from 'react';
import {NaUtil} from "../../util/util";
import {ScreenModeEnum} from "../../api/model/common-model";
import NaMasterMobilePage from './na-master-mobile-page';
import {NaMasterWebPage} from './na-master-web-page';

interface NaMasterMainPageProps {

}

interface NaMasterMainPageStates {

}

export class NaMasterMainPage extends React.Component<NaMasterMainPageProps, NaMasterMainPageStates> {
    render() {
        const children = this.props.children;
        const Master = (NaUtil.getScrrenMode(window.innerWidth) === ScreenModeEnum.sm) ?
            <NaMasterMobilePage>{children}</NaMasterMobilePage> :
            <NaMasterWebPage>{children}</NaMasterWebPage>;
        return Master;
    }
}
