import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig, MobilePathConfig} from './pathconfig';
import {
    NaDemoPage,
    NaHomePage,
    NaProcessDemoPage,
    NaCostEstimatePage,
    NaConsultingCenterPage,
    NaCompanyProfilePage,
    NaMobileTabBar,
    NaVIPCenterPage,
    NaVIPConsigneeAddressPage,
    NaVIPWelcomePage,
    MbUserCenter
} from '../page/index';

const routerConfig = (
    <Router history={hashHistory}>
        <IndexRoute component={NaHomePage}></IndexRoute>
        <Route path={PathConfig.DemoPage} component={NaDemoPage}/>
        <Route path={PathConfig.HomePage} component={NaHomePage}/>
        <Route path={PathConfig.ProcessDemoPage} component={NaProcessDemoPage}/>
        <Route path={PathConfig.CostEstimatePage} component={NaCostEstimatePage}/>
        <Route path={PathConfig.ConsultingCenterPage} component={NaConsultingCenterPage}/>
        <Route path={PathConfig.CompanyProfilePage} component={NaCompanyProfilePage}/>
        <Route path={PathConfig.MobilePage} component={NaMobileTabBar}/>
        <Route path={MobilePathConfig.UserCenter} component={MbUserCenter}/>
        <Route path={PathConfig.VIPCenterPage} component={NaVIPCenterPage}>
            <IndexRoute component={NaVIPWelcomePage}></IndexRoute>
            <Route path={PathConfig.VIPConsigneeAddressPage} component={NaVIPConsigneeAddressPage}/>
        </Route>
    </Router>
);
export default routerConfig;


