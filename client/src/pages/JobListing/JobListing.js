import React, { Component } from "react";
// import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
// import Jumbotron from "../../components/Jumbotron";
// import Grid from '@material-ui/core/Grid';
//import LabelBottomNavigation from '../../components/Footer/Footer'
import './JobListing.scss'
import JobListingList from '../../components/JobSearch/JobListingList'
import { Input, Button } from "@material-ui/core";
import API from '../../utils/API'
//import { Table } from "@material-ui/core";

class JobListing extends Component {
  state = {
    jobs: [],
    note: [],
    contact: [],
    searchTerm: ''
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
    } //, () => console.log('new input: ', this.state.searchTerm)
    )};

  handleFormSubmit = event => {
    event.preventDefault();
    API.getJobTerm(this.state.searchTerm.replace(/' '/g, '+'))
    .then(res => this.setState({ jobs: res.data } ) ) //this.setState({ jobs: res.data } )
    .catch(err => console.log(err));
  };

  render() {
    return (
	<div style={{backgroundColor: 'red'}}>
  <Input 
    name='searchTerm'
    value={this.state.searchTerm}
    onChange={this.handleInputChange}
    placeholder='Search for locations or keywords.'
  />
  <Button onClick={this.handleFormSubmit} type='success'>Search</Button>
  <JobListingList jobs={this.state.jobs} />
	</div>
    );
  }
}

export default JobListing;
