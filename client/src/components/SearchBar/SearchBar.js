import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
//import PropTypes from 'prop-types';
import { Input, Button } from "@material-ui/core";
//import { withStyles } from '@material-ui/core/styles';
//import JobListingList from '../../components/JobSearch/JobListingList'
import API from '../../utils/API'

class SearchBar extends Component {

	state = {
		jobs: [],
		note: [],
		contact: [],
		searchTerm: '',
		excludeTerm: '',
		page: 0,
		rowsPerPage: 5,
		// ! add persistent search and exclude arrays
	  };

	ComponentDidMount() {
		fetch('/api/jobs')
		  .then(response => response.json())
		  .then(data => this.fuse(data))
		  .then(x => this.setState({ jobs: x },
			// () => console.log(this.state.jobs)
		  ))
	
	  }
	
	  handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		} //, () => console.log('new input: ', this.state.searchTerm)
		)
	  };
	
	  handleFormSubmit = event => {
		event.preventDefault();
		API.getJobTerm(this.state.searchTerm.replace(/' '/g, '+'))
		  .then(res => this.fuse(res.data))
		  .then(x => this.setState({ jobs: x }), () => console.log(this.state.jobs))
		  .catch(err => {throw new Error(err)});
	  };
render() {
	

return (
<div style={{ padding: '20px', borderRadius: '5px' }}>
        	<div style={{ padding: '20px', backgroundImage: "url('../../Images/boardroom-ss.jpeg')", width: '100%', height: '100%', backgroundSize: 'cover', borderRadius: '5px'}}>
          		<Grid container spacing={24} alignItems='center'>
            		<Grid item xs={12} >
              			<form onSubmit = {this.handleFormSubmit}>
                			<Input
                			  name='searchTerm'
                			  value={this.state.searchTerm}
                			  onChange={this.handleInputChange}
                			  placeholder='Search keywords...'
                			  style={{ width: '100%', opacity: .8, backgroundColor: 'white', borderRadius: '2px', padding: '10px' }}
                			/>
              			</form>
            		</Grid>
            		<Grid fullwidth="true" item xs={12} md={5}>
            			<Input 
            			  name='excludeTerm'
            			  value={this.state.excludeTerm}
            			  onChange={this.handleInputChange}
            			  placeholder='Exclude keywords...'
            			  style={{ opacity: .8, width: '100%', backgroundColor: 'white', borderRadius: '2px', padding: '10px'}}
            			/>
    				</Grid>
        			<Grid item xs={12} md={2}>
            			<Button fullwidth="true" onClick={this.handleFormSubmit} type='success' style={{backgroundColor: '#fdd835', padding: '10px', height: '50px'}}>Search</Button>
        			</Grid>
          		</Grid>
        	</div>
			</div>
			)
		}
	}

	

export default (SearchBar);