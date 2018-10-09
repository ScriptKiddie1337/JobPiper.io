import React, { Component } from "react";
// import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
// import Jumbotron from "../../components/Jumbotron";
// import Grid from '@material-ui/core/Grid';
//import LabelBottomNavigation from '../../components/Footer/Footer'
import './JobListing.scss'
import JobListingList from '../../components/JobSearch/JobListingList'
//import { Table } from "@material-ui/core";

class JobListing extends Component {
  state = {
    jobs: [],
    note: [],
    contact: []
  };

  componentDidMount() {
    fetch('/api/jobs')
      .then(response => response.json())
      .then(data => this.setState({ jobs:data }, 
        // () => console.log(this.state.jobs)
        ));
  }


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
  <JobListingList jobs={this.state.jobs} />
	</div>
    );
  }
}

export default JobListing;
