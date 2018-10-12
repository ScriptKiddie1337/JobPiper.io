import React, { Component } from 'react';
import './JobListingList.scss'

export default class JobListingList extends Component {

  render() {
    const { _id, image, title, link, keywords, body } = this.props
    const keywordsString = keywords.join(' | ')
      function createMarkup(val) {
        return {__html: val };
      }
    return (
      <li key={_id}>
        <div style={{backgroundColor: 'white'}}>
          <a href={ link } target="_blank">
          <img style={{ maxHeight:"50px" }} src={ image } alt={ image } />
          <h3 style={{backgroundColor: '#fdd835', padding: '10px'}} >{String(title)}</h3></a>
            <p style={{backgroundColor: 'grey', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px'}}
            dangerouslySetInnerHTML={ createMarkup(keywordsString) } />
            <div style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px'}} 
            dangerouslySetInnerHTML={createMarkup(body)} />
        </div>  
      </li>
    )
  }
}