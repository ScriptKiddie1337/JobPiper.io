import React, { Component } from "react";
import { signInPopUp } from "../../firebase/auth";
import Button from '@material-ui/core/Button'

class Login extends Component {

  signIn = () => {

    signInPopUp()
  }

  render() {
    return (
      <div>
        <Button onClick={this.signIn}>Sign In</Button>
      </div>
    );
  }
}

export default Login;
