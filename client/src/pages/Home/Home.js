import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from '../../components/Jumbotron';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import HomeIcons from '../../components/HomeIcons';
import Hidden from '@material-ui/core/Hidden';

// import { Typography } from '@material-ui/core';
// import { Table } from '@material-ui/core';

class Home extends Component {
  state = {
    currentPage: 'Home', 
    jobs: [],
    title: '',
    link: '',
    image: '',
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
		 
		  	<Grid container>
			  	<Grid item xs={3}>
					<img src='../../Images/favicon.png' alt='Brand Logo'></img>
				</Grid>
			</Grid>
		 
		</Jumbotron>
        <Grid container>
          <Hidden smDown>
          <Grid item md={2}>
            <HomeIcons />
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