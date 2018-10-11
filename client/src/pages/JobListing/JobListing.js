import React, { Component } from "react";

import JobListingList from '../../components/JobSearch/JobListingList'
import { Input, Button } from "@material-ui/core";
import API from '../../utils/API'
import Fuse from 'fuse.js'

class JobListing extends Component {
  state = {
    jobs: [],
    note: [],
    contact: [],
    searchTerm: '',
    excludeTerm: '',
    
    // ! add persistent search and exclude arrays
  };

      
  fuse(list) {
    const options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.4,
      location: 0,
      distance: 80,
      maxPatternLength: 64,
      minMatchCharLength: 5,
      keys: [
        "title",
        "body",
        "keywords"
      ]
    };
    let fuse = new Fuse(list, options);
    let res = fuse.search(this.state.searchTerm);
    return res;
  }

  componentDidMount() {
    fetch('/api/jobs')
    .then(response => response.json())
    .then(data => this.setState({ jobs:data }, 
      // () => console.log(this.state.jobs)
      ))
    
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
    .then(x => console.log('fuse form submit: ',this.fuse(this.state.jobs)))
    .catch(err => console.log(err));
  };

  render() {
    let currentSearch = this.fuse(this.state.jobs)
    console.log('Result Count: ',currentSearch.length)

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
 <ul>
    { currentSearch.map((job, i) => {
      console.log(job.item.title, job.score)
            return <JobListingList 
              key={i} 
              link={job.item.link}  
              _id={job.item._id}
              title={job.item.title}
              keywords={job.item.keywords}
              body={job.item.body}
              />;
          })
          
     }
 </ul>
	</div>
    );
  }
}

export default JobListing;
