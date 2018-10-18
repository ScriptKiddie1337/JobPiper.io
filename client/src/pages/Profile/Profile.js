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
		<div>
			<Jumbotron />
      			<h1>Profile page</h1>
	  	</div>
    );
  }
}

export default Profile;
