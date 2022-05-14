import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <div id='modalScrollBar' />
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
