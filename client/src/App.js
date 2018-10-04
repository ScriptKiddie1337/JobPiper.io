import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import JobListing from "./pages/JobListing";

import Detail from "./pages/Detail";
import DayPlanner from "./pages/DayPlanner";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/jobs" component={JobListing} />
        <Route path="/jobs/:id" component={Detail} />
		<Route path="/profile" component={Profile} />
		<Route path="/profile/:id" component={Profile} />
		<Route path="/dayplanner" component={DayPlanner} />
		<Route path="/dayplanner/:id" component={DayPlanner} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
