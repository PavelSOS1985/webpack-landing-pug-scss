import styles from "./index.scss";
import "./index.pug"
import layout from "./layout.pug";
/*
import createPage from "../../modules/createPage";
*/
let body = document.body,
    pageWrapper = document.createElement('div'),
    page = LayoutInWrapper(layout);

function LayoutInWrapper(layout) {
    pageWrapper.innerHTML = layout;
    return pageWrapper;
}

body.insertBefore(page, body.firstChild);

if (module.hot) {
    module.hot.accept('./layout.pug', () => {
        page = LayoutInWrapper(layout);
        body.insertBefore(page, body.firstChild);
    });
}