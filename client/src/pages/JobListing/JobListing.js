import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import JobListingList from '../../components/JobSearch/JobListingList'
import AdvancedSearch from '../../components/JobSearch/AdvancedSearch'
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
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 64,
      minMatchCharLength: 5,
      keys: [
        {name:"title", weight: .6},
        {name: "body", weight: .3},
        {name: "keywords", weight: .8}
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
    // console.log('Result Count: ',currentSearch.length)

    return (
	<div style={{backgroundColor: '#546e7a', padding: '20px', borderRadius: '5px'}}>
    <div style={{padding: '20px', backgroundImage: "url('../../Images/boardroom-ss.jpeg')", width: '100%', height: '100%', backgroundSize: 'cover'}}>
      <Grid container spacing={24} alignItems='center'>
        <Grid item xs={12} >
            <Input 
              name='searchTerm'
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
              placeholder='Search keywords...'
              style={{width: '100%', backgroundColor: 'white', borderRadius: '2px', padding: '10px'}}
            />
        </Grid>
        {/* <Grid fullWidth item xs={12} md={5}>
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
<<<<<<< HEAD
        </Grid>
        <Grid>
          <AdvancedSearch />
        </Grid>  
=======
        </Grid>   */}
>>>>>>> b5b2d3a1807b6c3a5f2dc50e7808ef1f237c158f
      </Grid>          
    </div>  
      <br />
      <ul>
    { currentSearch.map((job, i) => {
      // console.log(job.item.title, job.score)
      if (job.score < 0.4) {
        return <JobListingList 
          key={i} 
          link={job.item.link}  
          _id={job.item._id}
          title={job.item.title}
          keywords={job.item.keywords}
          body={job.item.body}
          />;
      }
          })
     }
 </ul>
      
      
	</div>
    );
  }
}

export default JobListing;
