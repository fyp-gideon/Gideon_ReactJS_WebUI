import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Events from "./components/events";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/events"
              render={props => <Events {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/events" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;