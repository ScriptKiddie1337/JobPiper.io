import React, { Component } from "react";
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import './JobListing.scss'
//import { Table } from "@material-ui/core";

class JobListing extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadJobListing();
  }
;

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  };

  render() {
    return (
	<div style={{backgroundColor: '#76FF03'}}>
		<Jumbotron />
		<Container>
			<ScrollableTabsButtonAuto />
			
		</Container>
		
			
	</div>
    );
  }
}

export default JobListing;
