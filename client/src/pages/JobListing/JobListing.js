import React, { Component } from "react";
// import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
// import Jumbotron from "../../components/Jumbotron";
// import Grid from '@material-ui/core/Grid';
//import LabelBottomNavigation from '../../components/Footer/Footer'
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
	<div >
      Jobs!
	</div>
    );
  }
}

export default JobListing;
