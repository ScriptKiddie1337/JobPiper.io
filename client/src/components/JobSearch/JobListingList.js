import React, { Component } from 'react';
import './JobListingList.scss'

export default class JobListingList extends Component {

  render() {
    return (
      <ul>
        {this.props.jobs.map((job) =>
        job.keywords.join(' | ').toLowerCase().includes(this.props.exclude) && this.props.exclude !== ''
        ? null 
        : <li key={job._id}>
          <h3>{job.title}</h3>
          <p>{ job.keywords.join(' | ') }</p>
          <p>{ job.body.replace(/\"/g, "") }</p>
        </li>
         
        )}
      </ul>
    )
  }
}