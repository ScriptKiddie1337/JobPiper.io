import React, { Component } from 'react';

export default class JobListingList extends Component {
  render() {
    return (
      // <div>
        
      //   {console.log('Props', this.props.jobs[0])}
      // </div>
      <ul>
        {this.props.jobs.map((job) => 
        <li>
          <h3>{job.title}</h3>
          { job.keywords.join(' | ') }
          <p>{ job.body }</p>
        </li>
        )}
      </ul>
    )
  }
}