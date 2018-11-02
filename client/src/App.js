import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CompanyNews from './pages/CompanyNews';
import Meetups from './pages/Meetups';
import JobListing from './pages/JobListing';
import Detail from './pages/Detail';
import DayPlanner from './pages/DayPlanner';
import Profile from './pages/Profile';
import UserSetting from './pages/UserSetting';
import NoMatch from './pages/NoMatch';
import withAuthentication from './session/withAuthentication'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './utils/Theme/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles';


const AuthenticatedRoutes = (props, { authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

AuthenticatedRoutes.contextTypes = {
  authUser: PropTypes.object,
}

const NavigationAuth = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/home' component={Home} />
    <Route path='/jobs' component={JobListing} />
    <Route path='/jobs/:id' component={Detail} />
    <Route path='/usersetting' component={UserSetting} />
    <Route path='/profile' component={Profile} />
    <Route path='/profile/:id' component={Profile} />
    <Route path='/dayplanner' component={DayPlanner} />
    <Route path='/dayplanner/:id' component={DayPlanner} />
    <Route path='/companynews' component={CompanyNews} />
    <Route path='/Meetups' component={Meetups} />
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
      <AuthenticatedRoutes />
    </MuiThemeProvider>
  </Router>
));

export default App;
