import React, { Component } from 'react';
import './JobListingList.scss'
export default class JobListingList extends Component {


  render() {
    return (
      // <div>
        
      //   {console.log('Props', this.props.jobs[0])}
      // </div>
      <ul>
        {this.props.jobs.map((job) => 
        <li key={job._id}>
          <h3>{job.title}</h3>
          <p>{ job.keywords.join(' | ') }</p>
          <p>{ job.body }</p>
        </li>
        )}
      </ul>
    )
  }
}