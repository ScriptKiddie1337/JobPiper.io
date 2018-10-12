import React, { Component } from 'react';


export default class JobListingList extends Component {

  render() {
    const { _id, title, link, keywords, body } = this.props
      function createMarkup() {
        return {__html: body };
      }
    return (
      <li key={_id}>
          <div style={{backgroundColor: 'white'}}>
          <a href={ link } style={{textDecoration: 'none'}}><h3 style={{color: 'white', border: '#fdd835 solid 1px', backgroundColor: '#819ca9', padding: '10px', borderRadius: '5px'}}>{title}</h3></a>
            <p style={{border: '#546e7a solid 1px', backgroundColor: '#fdd835', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px', borderRadius: '5px'}}>{ keywords.join(' | ') }</p>
            <div style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px'}} 
            dangerouslySetInnerHTML={createMarkup()} />
          </div>  
        </li>
    ) 
  }
}