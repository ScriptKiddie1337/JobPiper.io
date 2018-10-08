import React, { Component } from "react";
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import Nav from "../../components/Nav";
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Typography } from "@material-ui/core";
//import { Table } from "@material-ui/core";

class Home extends Component {
  state = {
    currentPage: "Home", 
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadJobListing();
  }
;

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  };

  render() {
    return (
	<div>
  		<Jumbotron />
   			<Grid container>
          <Hidden smDown>
   				  <Grid item smDown={0} md={2} style={{backgroundColor: 'gray', minHeight: '100vh'}}>
              <Nav />

   				  </Grid>
          </Hidden>
    			<Grid item xs={12} md={10}>
			    	<ScrollableTabsButtonAuto />
    			</Grid>
  			</Grid>
		<LabelBottomNavigation />
	</div>
    );
  }
}

export default Home;