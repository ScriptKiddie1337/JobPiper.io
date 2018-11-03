import React, { Component } from "react";
import { signInPopUp } from "../../firebase/auth";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@mdi/react';
import { mdiGoogle } from '@mdi/js'

class Login extends Component {

  signIn = () => {

    signInPopUp()
  }

  render() {
    return (
      <div>
        <Grid container style={{ minHeight: '100vh' }}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={this.signIn} style={{ backgroundColor: '#fdd835'}}>
              <Icon 
                path={mdiGoogle} 
                size={1.5} 
                color='#546e7a'/>
                Sign In
                </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
