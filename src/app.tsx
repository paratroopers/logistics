import * as React from "react";
import {render} from "react-dom";
import {reducers} from "./reducers/index";
import router from "./config/router";
import NaMasterPage from "./page/master/na-master-page";

//require.ensure([], () => {
    require("./themes/index.less")
//}, "app.css");

// fix firefox drag will open a tab in background bug
document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
};

render(<NaMasterPage cdn={`${process.env.CDN}`}
                     reducers={reducers}>{router}</NaMasterPage>, document.getElementById("app_content"));
