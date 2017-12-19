import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig, MobilePathConfig} from './pathconfig';
import {
    NaLoginForm,
    NaMasterMainPage,
    NaHomePage,
    NaCostEstimatePage,
    NaCompanyProfilePage,
    NaMobileTabBar,
    NaVIPCenterPage,
    NaVIPConsigneeAddressPage,
    NaVIPWelcomePage,
    MbUserCenter,
    MbUserCenterDetail,
    NaRegisterPage
} from '../page/index';

const routerConfig = (
    <Router history={hashHistory}>
        <Route path={PathConfig.MasterPage} component={NaMasterMainPage}>
            <IndexRoute component={NaHomePage}></IndexRoute>
            <Route path={PathConfig.HomePage} component={NaHomePage}/>
            <Route path={PathConfig.CostEstimatePage} component={NaCostEstimatePage}/>
            <Route path={PathConfig.CompanyProfilePage} component={NaCompanyProfilePage}/>
            <Route path={PathConfig.MobilePage} component={NaMobileTabBar}/>
            <Route path={MobilePathConfig.UserCenter} component={MbUserCenter}/>
            <Route path={MobilePathConfig.UserCenterDetail} component={MbUserCenterDetail}/>
            <Route path={PathConfig.VIPCenterPage} component={NaVIPCenterPage}>
                <Route path={PathConfig.VIPCenterPage} component={NaVIPCenterPage}>
                    <IndexRoute component={NaVIPWelcomePage}></IndexRoute>
                    <Route path={PathConfig.VIPConsigneeAddressPage} component={NaVIPConsigneeAddressPage}/>
                </Route>
            </Route>
        </Route>
        <Route path={PathConfig.LoginPage} component={NaLoginForm}/>
        <Route path={PathConfig.RegisterPage} component={NaRegisterPage}/>
    </Router>
);
export default routerConfig;


