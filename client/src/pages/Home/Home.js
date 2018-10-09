import React, { Component } from "react";
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import Nav from "../../components/Nav";
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
  		<Jumbotron>
        <img src='%PUBLIC_URL%/images/favicon.png' alt='brand icon'></img>
      </Jumbotron>
   			<Grid container>
          <Hidden smDown>
   				  <Grid item smDown={0} md={2}>
             <IconButton
               
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="secondary"
              >
                <AccountCircle />
              </IconButton>
              <Icon path={mdiSettings} />
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