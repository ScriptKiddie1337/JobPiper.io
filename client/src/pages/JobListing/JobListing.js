import React, { Component } from "react";
<<<<<<< HEAD
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import './JobListing.scss';
=======
// import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
// import Jumbotron from "../../components/Jumbotron";
// import Grid from '@material-ui/core/Grid';
//import LabelBottomNavigation from '../../components/Footer/Footer'
import './JobListing.scss'
>>>>>>> a50a7e60d0a7fa99c13a0830f407d1f7f6833694
//import { Table } from "@material-ui/core";
import JobSearch from '../../components/JobSearch';

class JobListing extends Component {
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
	<div style={{backgroundColor: 'red'}}>
  <JobSearch></JobSearch>
  
	</div>
    );
  }
}

export default JobListing;
