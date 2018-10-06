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
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from'./utils/Theme/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles';



const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
	  <CssBaseline />
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
		<Route path="/home" component={Home} />
        <Route path="/jobs" component={JobListing} />
        <Route path="/jobs/:id" component={Detail} />
		<Route path="/profile" component={Profile} />
		<Route path="/profile/:id" component={Profile} />
		<Route path="/dayplanner" component={DayPlanner} />
		<Route path="/dayplanner/:id" component={DayPlanner} />
        <Route component={NoMatch} />
      </Switch>
    </MuiThemeProvider>
  </Router>
);

export default App;
