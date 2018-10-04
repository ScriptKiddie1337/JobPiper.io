import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
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
	<Jumbotron>
      <h1>Day Planner</h1>
	  </Jumbotron>
    );
  }
}

export default DayPlanner;
