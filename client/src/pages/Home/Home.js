import React, { Component } from "react";
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
//import { Col, Row, Container } from "../../components/Grid";
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer'

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
	<div style={{backgroundColor: '#8BC34A'}}>
  <Jumbotron />
   <Grid>
    <Grid item xs={12} md={9}>
      <Grid>
		  
			    <ScrollableTabsButtonAuto />
		      <LabelBottomNavigation />
		    
      </Grid>
    </Grid>
  </Grid>
	</div>
    );
  }
}

export default Home;