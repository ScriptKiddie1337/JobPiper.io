import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from '../../components/Jumbotron';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import HomeIcons from '../../components/HomeIcons'
// import AppBar from '@material-ui/core/AppBar';
// import { Typography } from '@material-ui/core';
// import { Table } from '@material-ui/core';

const homeStyles = theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
  },
  
});

class Home extends Component {
  state = {
    currentPage: 'Home', 
    jobs: [],
    title: '',
    link: '',
    image: '',
    note: [],
    contact: [],
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
// render function
  
    return (
	<div>
        <Grid container>
        	<Hidden smDown>
        		<Grid item md={2} style={{ backgroundColor: '#819ca9', borderRight: '#fdd835 solid 2px'}}>
					<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
						<img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '200px', 	width: '200px' }}></img>
					</Grid>
        			<Grid position='sticky' style={{ alignItems: 'center'}}>
						<HomeIcons  />
            		</Grid>
            	</Grid>
          	</Hidden>
			<Grid item md={10}>
			  	<Grid item xs={12}>
  					<Jumbotron />
				</Grid>
    			<Grid item xs={12}>
			   		<ScrollableTabsButtonAuto /> 
    			</Grid>
  			</Grid>
		</Grid>
		<Hidden smUp>
			<LabelBottomNavigation />
		</Hidden>
	</div>
    );
  }
}

export default withStyles(homeStyles)(Home);