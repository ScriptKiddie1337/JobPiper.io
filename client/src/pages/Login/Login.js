import React, { Component } from "react";

import { signInPopUp } from "../../firebase/auth";

import './Login.scss'
import Nav from '../../components/Nav'

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

    setTimeout(this.signIn, 5000)
  }

  signIn = () => {

    signInPopUp()
  }

  componentWillUnmount() {

    this.signIn = () => { }
  }

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
        <img src="../../images/doors.jpeg" alt='Doors' style={{ maxHeight: '85vh', minWidth: '100vw' }} />
      </div>
    );
  }
}

export default Login;
