import React, { Component } from "react";
import Dashboard from "./components/page/Dashboard";
import Login from "./components/page/Login";
import ManageUsers from "./components/page/ManageUsers";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory as createHistory } from "history";
import { checkToken } from "./services/api";
import store from "./store";
import "./colors.css";
import "./global.css";
import importProducts from "./components/page/importProducts"
import TopBanner from './components/pres/TopBanner/topBanner';
import UpperControls from "./components/pres/UpperControls";

const history = createHistory();

class App extends Component {
  state = {
    isAuthenticated: false
  };

  componentWillMount() {
    checkToken(sessionStorage.getItem("moda_token")).then((res) => {
      this.setState({ isAuthenticated: res.authenticated })
    });
  }

  componentDidMount() {
    if (window.location.pathname !== "/login") {
      checkToken(sessionStorage.getItem("moda_token")).then((res) => {
        if (res.authenticated !== true) window.location.pathname = "/login";
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history} basename={"/"}>
          <React.Fragment>
          <Route exact path={"/login"} component={Login} />
          {
            this.state.isAuthenticated &&
            <>
              <TopBanner />
              <UpperControls/>
              <Route exact path={"/manage-users"} component={ManageUsers} />
              <Route exact path={"/import"} component={importProducts} />
              <Route exact path={"/"} component={Dashboard} />
            </>
          }
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
