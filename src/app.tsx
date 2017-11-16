import * as React from "react";
import { render } from "react-dom";
import router from "./config/router";
import {MasterPage} from "./page/master/master-page";

require.ensure([], () => {
    require("./themes/index.less")
}, "app.css");

render(<MasterPage>{router}</MasterPage>, document.getElementById("app_content"));
