import React, { Component } from "react";
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import PermanentDrawer from '../../components/Drawer/Drawer'
import { Typography } from "@material-ui/core";
import './DayPlanner.scss'

class DayPlanner extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadDayPlanner();
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
				 
   				</Grid>
    			<Grid item xs={12} md={9}>
			    
    			</Grid>
  			</Grid>
		<LabelBottomNavigation />
	</div>
    );
  }
}

export default DayPlanner;
