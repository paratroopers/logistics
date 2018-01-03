import * as React from "react";
import {hashHistory} from 'react-router';
import {PathConfig} from "../../../config/pathconfig";

interface HeaderLogoProps {
    className?: string;
    logo?: string;
    homePagePath?: string;
}

interface HeaderLogoStates {
    className?: string;
    logo?: string;
    homePagePath?: string;
}

export const logo = "http://www.famliytree.cn/icon/logo.png";
const defaultConfig = {
    className: 'logo',
    logo: logo,
    homePagePath: PathConfig.HomePage
};

export class HeaderLogo extends React.Component<HeaderLogoProps, HeaderLogoStates> {

    render() {
        const {className, logo, homePagePath} = this.props;
        return <a className={className ? className : defaultConfig.className}>
            <img onClick={() => {
                hashHistory.push(homePagePath ? homePagePath : defaultConfig.homePagePath);
            }} src={logo ? logo : defaultConfig.logo}></img>
        </a>
    }
}