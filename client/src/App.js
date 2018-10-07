import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobListing from "./pages/JobListing";
import Detail from "./pages/Detail";
import DayPlanner from "./pages/DayPlanner";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import withAuthentication from './session/withAuthentication'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',

    },
    secondary: {
      light: '#ffff6b',
      main: '#fdd835',
      dark: '#c6a700',

    },
    //error: '#ff1744',
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },

});

const AuthenticatedRoutes = (props, { authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

AuthenticatedRoutes.contextTypes = {
  authUser: PropTypes.object,
}

const NavigationAuth = () => (
  <Switch>
    <Route exact path="/" component={JobListing} />
    <Route path="/jobs" component={JobListing} />
    <Route path="/jobs/:id" component={Detail} />
    <Route path="/profile" component={Profile} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/dayplanner" component={DayPlanner} />
    <Route path="/dayplanner/:id" component={DayPlanner} />
    <Route component={NoMatch} />
  </Switch>
)

const NavigationNonAuth = () => (
  <Switch>
    <Route path="/" component={Login} />
  </Switch>
)

const App = withAuthentication(() => (


  <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <AuthenticatedRoutes />
    </MuiThemeProvider>
  </Router>
));

export default App;
