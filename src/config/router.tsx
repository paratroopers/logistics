import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig, MobilePathConfig} from './pathconfig';
import {
    LoginForm,
    NaMasterMainPage,
    HomePage,
    CostPage,
    CompanyPage,
    NaMobileTabBar,
    NaVIPCenterPage,
    NaVIPConsigneeAddressPage,
    NaVIPWelcomePage,
    MbUserCenter,
    MbUserHelp,
    MbUserCenterDetail,
    RegisterPage
} from '../page/index';

const routerConfig = (
    <Router history={hashHistory}>
        <Route path={PathConfig.MasterPage} component={NaMasterMainPage}>
            <IndexRoute component={HomePage}></IndexRoute>
            <Route path={PathConfig.HomePage} component={HomePage}/>
            <Route path={PathConfig.CostEstimatePage} component={CostPage}/>
            <Route path={PathConfig.CompanyProfilePage} component={CompanyPage}/>
            <Route path={PathConfig.MobilePage} component={NaMobileTabBar}/>
            <Route path={MobilePathConfig.UserCenter} component={MbUserCenter}/>
            <Route path={MobilePathConfig.UserCenterDetail} component={MbUserCenterDetail}/>
            <Route path={MobilePathConfig.UserHelper} component={MbUserHelp}/>
            <Route path={PathConfig.VIPCenterPage} component={NaVIPCenterPage}>
                <IndexRoute component={NaVIPWelcomePage}></IndexRoute>
                <Route path={PathConfig.VIPConsigneeAddressPage} component={NaVIPConsigneeAddressPage}/>
            </Route>
        </Route>
        <Route path={PathConfig.LoginPage} component={LoginForm}/>
        <Route path={PathConfig.RegisterPage} component={RegisterPage}/>
    </Router>
);
export default routerConfig;


