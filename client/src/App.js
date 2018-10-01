import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JobListing from "./pages/JobListing";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={JobListing} />
        <Route exact path="/jobs" component={JobListing} />
        <Route exact path="/jobs/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
