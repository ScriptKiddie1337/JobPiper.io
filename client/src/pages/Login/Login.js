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
    loginTimeout: null
  };

  componentDidMount() {

    this.setState({ loginTimeout: setTimeout(signInPopUp, 1000) })
  }

  signIn = () => {

    signInPopUp()
    this.setState({ loginTimeout: null })
  }

  componentWillUnmount() {

    if (this.state.loginTimeout) {

      clearTimeout(this.state.loginTimeout)
    }
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
        <div alt='Doors' style={{ maxHeight: '85vh', minWidth: '100vw' }} />
      </div>
    );
  }
}

export default Login;
