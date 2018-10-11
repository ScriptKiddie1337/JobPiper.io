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
          <div style={{backgroundColor: 'white'}}>
            <h3 style={{backgroundColor: '#fdd835', padding: '10px'}}>{job.title}</h3>
            <p style={{backgroundColor: 'grey', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px'}}>{ job.keywords.join(' | ') }</p>
            <p style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px'}}>{ job.body }</p>
          </div>  
        </li>
         
        )}
      </ul>
    )
  }
}