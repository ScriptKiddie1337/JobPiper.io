import React, { Component } from "react";
// import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
// import Jumbotron from "../../components/Jumbotron";
// import Grid from '@material-ui/core/Grid';
//import LabelBottomNavigation from '../../components/Footer/Footer'
import './JobListing.scss'
//import { Table } from "@material-ui/core";
import JobSearch from '../../components/JobSearch';
import JobListingDetails from './JobListingDetails';
import JobListingList from './JobListingList';

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
<<<<<<< HEAD
	<div style={{backgroundColor: 'red'}}>
  <JobSearch></JobSearch>
  <JobListingList></JobListingList>
  <JobListingDetails></JobListingDetails>
=======
	<div >
      Jobs!
>>>>>>> 1ab07ee495ef2db4b1e56062d321edb84ea077c7
	</div>
    );
  }
}

export default JobListing;
