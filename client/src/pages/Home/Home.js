import React, { Component } from "react";
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import PermanentDrawer from '../../components/Drawer/Drawer'
//import { Table } from "@material-ui/core";

class Home extends Component {
  state = {
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
   				<Grid item md={3}>
				   <PermanentDrawer />
   				</Grid>
    			<Grid item xs={12} md={9}>
			    	<ScrollableTabsButtonAuto />
    			</Grid>
  			</Grid>
		<LabelBottomNavigation />
	</div>
    );
  }
}

export default Home;