import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
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
	<div style={{backgroundColor: '#546e7a', padding: '20px', borderRadius: '5px'}}>
    <div style={{padding: '20px', backgroundImage: "url('../../Images/boardroom-ss.jpeg')", width: '100%', height: '100%', backgroundSize: 'cover'}}>
      <Grid container spacing={24} alignItems='center'>
        <Grid fullWidth item xs={12} md={5}>
            <Input 
              name='searchTerm'
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
              placeholder='Search keywords...'
              style={{width: '100%', backgroundColor: 'white', borderRadius: '2px', padding: '10px'}}
            />
        </Grid>
        <Grid fullWidth item xs={12} md={5}>
            <Input 
              name='excludeTerm'
              value={this.state.excludeTerm}
              onChange={this.handleInputChange}
              placeholder='Exclude keywords...'
              style={{width: '100%', backgroundColor: 'white', borderRadius: '2px', padding: '10px'}}
            />
        </Grid>
        <Grid item xs={12} md={2}>
            <Button fullWidth onClick={this.handleFormSubmit} type='success' style={{backgroundColor: '#fdd835', padding: '10px', height: '50px'}}>Search</Button>
        </Grid>  
      </Grid>          
    </div>  
      <br />
      <JobListingList jobs={this.state.jobs} exclude={this.state.excludeTerm} />
      
      
	</div>
    );
  }
}

export default JobListing;
