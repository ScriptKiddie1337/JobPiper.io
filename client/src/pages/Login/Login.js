import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { signInPopUp } from "../../firebase/auth";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { mdiGoogle } from '@mdi/js';
import Header from '../../components/Jumbotron'
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  alignItems: 'flex-end',
	},
	icon: {
	  margin: theme.spacing.unit * 2,
	},
	iconHover: {
	  margin: theme.spacing.unit * 2,
	  '&:hover': {
		color: red[800],
	  },
	},
  });

  function GIcon(props) {
	return (
	  <SvgIcon {...props}>
		<path d={mdiGoogle} />
	  </SvgIcon>
	);
  }
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
              <GIcon 
                style={{ margin: '0px 10px 0px 0px' }}
                size={1} 
                color='primary'
				component={svgProps => (
					<svg {...svgProps}>
					  <defs>
						<linearGradient id="gradient1">
						  <stop offset="25%" stopColor={red[400]} />
						  <stop offset="25%" stopColor={yellow[400]} />
						  <stop offset="25%" stopColor={green[400]} />
						  <stop offset="25%" stopColor={blue[400]} />
						</linearGradient>
					  </defs>
					  {React.cloneElement(svgProps.children[0], { fill: 'url(#gradient1)' })}
					</svg>
				  )}/>
                Sign In / Create Account
                </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login);
