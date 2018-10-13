import React, { Component } from "react";

import { signInPopUp } from "../../firebase/auth";

import Nav from '../../components/Nav'

class Login extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: [],
    signIn: signInPopUp
  };

  componentDidMount() {

    setTimeout(this.state.signIn, 5000)
  }

  componentWillUnmount() {

    this.setState({ signIn: () => { } })
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
