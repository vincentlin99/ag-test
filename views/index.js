import Promise from "promise-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./root"; // import Root that we just created

if (!window.Promise) {
  window.Promise = Promise;
}

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("App"));
};

render(Root);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./root", () => {
    render(Root);
  });
}
