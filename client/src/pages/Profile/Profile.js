import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import FloatingActionButtons from '../../components/FloatingButton'
import { auth } from '../../firebase'

const homeStyles = theme => ({
	root: {
		position: 'relative',
		overflow: 'auto',
	},

});

class Profile extends Component {
	state = {
		profilePic: auth.getUserProfilePic()
	}

  render() {
    return (
		<div>
      <Grid container>
        
			<Grid item md={10} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<div>
					<Paper style={{ border: '2px solid #fdd835', minWidth: '500px', minHeight: '500px'}}>
						<FloatingActionButtons />
						<a href='/' >Back</a>>
						{this.state.profilePic ?
									<img src={this.state.profilePic} alt="Profile Picture"></img>
									: null}
					</Paper>
				</div>
  		</Grid>
		</Grid>
		<Hidden smUp>
			<LabelBottomNavigation />
		</Hidden>
	</div>
    );
  }
}

export default withStyles(homeStyles)(Profile);