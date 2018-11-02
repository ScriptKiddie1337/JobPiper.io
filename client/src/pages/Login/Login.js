import React, { Component } from "react";
import { signInPopUp } from "../../firebase/auth";
import Button from '@material-ui/core/Button'

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
		  <Button>Button</Button>
      </div>
    );
  }
}

export default Login;
