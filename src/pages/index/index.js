import styles from "./index.scss";
import "./index.pug"
import templatePage from "./template.pug";

let body = document.body,
    pageWrapper = document.querySelector('.page-wrapper'),
    page = LayoutInWrapper(templatePage);

function LayoutInWrapper(template) {
    pageWrapper.innerHTML = template;
    return pageWrapper;
}

body.insertBefore(page, body.firstChild);

if (module.hot) {
    module.hot.accept('./template.pug', () => {
        page = LayoutInWrapper(templatePage);
        body.insertBefore(page, body.firstChild);
    });
}