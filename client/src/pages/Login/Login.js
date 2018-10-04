import React, { Component } from "react";
import { signInPopUp } from "../../firebase/auth";

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
    signInPopUp()
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
      <h1>Login</h1>
    );
  }
}

export default Login;
