import * as React from "react";
import { render } from "react-dom";
import { reducers } from "./reducers/index";
import router from "./config/router";
import {NaMasterPage} from "./page/master/na-master-page";

require.ensure([], () => {
    require("./themes/index.less")
}, "app.css");

render(<NaMasterPage reducers={reducers}>{router}</NaMasterPage>, document.getElementById("app_content"));
