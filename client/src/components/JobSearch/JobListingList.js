import React, { Component } from 'react';
import './JobListingList.scss'

export default class JobListingList extends Component {

  render() {
    const { _id, title, link, keywords, body } = this.props
    return (
      <li
      key={_id}>
          <a href={ link }><h3>{title}</h3></a>
          <p>{ keywords.join(' | ') }</p>
          <p>{ body }</p>
      </li>
    )
  }
}