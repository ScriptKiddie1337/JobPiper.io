import React, { Component } from "react";
import { signInPopUp } from "../../firebase/auth";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@mdi/react';
import { mdiGoogle } from '@mdi/js';
import Header from '../../components/Jumbotron'

class Login extends Component {

  signIn = () => {

    signInPopUp()
  }

  render() {
    return (
      <div>
        <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} >
        <Header />
        </Grid>
          <Grid item xs={12} style={{ marginTop: '-15vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Button onClick={this.signIn} style={{ backgroundColor: 'white', minWidth: '25vw' }}>
              <Icon 
                style={{ margin: '0px 10px 0px 0px' }}
                path={mdiGoogle} 
                size={1} 
                color='red'/>
                Sign In / Create Account
                </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
