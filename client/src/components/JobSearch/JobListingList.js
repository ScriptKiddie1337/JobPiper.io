import React, { Component } from 'react';
import './JobListingList.scss'

export default class JobListingList extends Component {

  render() {
    const { _id, image, title, link, keywords, body } = this.props
      function createMarkup() {
        return {__html: body };
      }
    return (
      <li key={_id}>
          <div style={{backgroundColor: 'white'}}>
          <img src={ image } alt={ image } />
          <a href={ link }><h3 style={{backgroundColor: '#fdd835', padding: '10px'}} target="_blank">{title}</h3></a>
            <p style={{backgroundColor: 'grey', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px'}}>{ keywords.join(' | ') }</p>
            <div style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px'}} 
            dangerouslySetInnerHTML={createMarkup()} />
          </div>  
        </li>
    )
  }
}