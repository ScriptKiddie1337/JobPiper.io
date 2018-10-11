import React, { Component } from 'react';
import './JobListingList.scss'

export default class JobListingList extends Component {

  render() {
    const { _id, title, link, keywords, body } = this.props
    return (
      <li key={_id}>
          <div style={{backgroundColor: 'white'}}>
          <a href={ link }><h3 style={{backgroundColor: '#fdd835', padding: '10px'}}>{title}</h3></a>
            <p style={{backgroundColor: 'grey', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px'}}>{ keywords.join(' | ') }</p>
            <p style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px'}}>{ body }</p>
          </div>  
        </li>
    )
  }
}