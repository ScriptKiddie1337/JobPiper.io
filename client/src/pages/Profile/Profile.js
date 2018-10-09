import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";

class Profile extends Component {
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
		<Jumbotron>
      <h1>Profile page</h1>
	  </Jumbotron>
    );
  }
}

export default Profile;
