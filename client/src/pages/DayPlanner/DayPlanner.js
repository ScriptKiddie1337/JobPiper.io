import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
// import Grid from '@material-ui/core/Grid';
// import LabelBottomNavigation from '../../components/Footer/Footer';
// import { Typography } from "@material-ui/core";
import './DayPlanner.scss'

class DayPlanner extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadDayPlanner();
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
      <div>
  		dayplanner
	  </div>
    );
  }
}

export default DayPlanner;
