import React, { Component } from "react";
import Nav from '../../components/Nav'

import './Login.scss'


class Login extends Component {
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
        <Nav />
       <img src="../../Images/doors.jpeg" alt='Doors' />
      </div>
    );
  }
}

export default Login;
