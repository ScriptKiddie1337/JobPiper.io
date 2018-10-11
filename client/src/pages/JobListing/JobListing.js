import React, { Component } from "react";

import JobListingList from '../../components/JobSearch/JobListingList'
import { Input, Button } from "@material-ui/core";
import API from '../../utils/API'

class JobListing extends Component {
  state = {
    jobs: [],
    note: [],
    contact: [],
    searchTerm: '',
    excludeTerm: ''
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
	<div style={{backgroundColor: '#546e7a'}}>
  <Input 
    name='searchTerm'
    value={this.state.searchTerm}
    onChange={this.handleInputChange}
    placeholder='Search keywords...'
  />
  <Button onClick={this.handleFormSubmit} type='success' style={{backgroundColor: '#fdd835'}}>Search</Button>
  <br />
  <Input 
    name='excludeTerm'
    value={this.state.excludeTerm}
    onChange={this.handleInputChange}
    placeholder='Exclude keywords...'
  />
  <JobListingList jobs={this.state.jobs} exclude={this.state.excludeTerm} />
	</div>
    );
  }
}

export default JobListing;
