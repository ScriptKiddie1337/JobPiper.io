import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
//import FloatingActionButtons from '../../components/FloatingButton'
import { auth } from '../../firebase';
import LocationSelector from '../../components/LocationSelector'


const homeStyles = theme => ({
	root: {
		position: 'relative',
		overflow: 'auto',
	},

});

class Profile extends Component {
	state = {
		profilePic: auth.getUserProfilePic(),
		userName: auth.getUserName(),
		userEmail: auth.getUserEmail(),
	}

  render() {
    return (
		<div>
      <Grid container>
        
			<Grid item md={10} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<div>
					<Paper style={{ padding: '10px', border: '2px solid #fdd835'}}>
							<Grid container style={{ margin: '10px'}}>
								<Grid item xs={12}>
									<Grid item xs={3} >
										{this.state.profilePic ?
										<img src={this.state.profilePic} style={{ maxWidth: '100px', borderRadius: '50%', margin: '10px'}} alt="Profile 	"></img>
										: null}
									</Grid>
								</Grid>
								<Grid item xs={12}>
									{this.state.userName ?
										<p  alt="userId">{this.state.userName}</p>
										: null}
								</Grid>
								
								<Grid item xs={12}>
									{this.state.userEmail ?
										<p  alt="userId">{this.state.userEmail}</p>
										: null}
								</Grid>
								
								<Grid fullwidth="true" item xs={12}>
							{/* <LocationSelector 
						options={ this.state.countries } 
						placeholder='Select Country' /> */}
							<LocationSelector
								options={this.state.regions}
								placeholder='Default State/Region'
								onChange={this.handleRegionChange}
							/>
						</Grid>
						<Grid fullwidth="true" item xs={12}>
							<LocationSelector
								options={this.state.cities}
								placeholder='Default Select City' />
						</Grid>
								
							</Grid>
					</Paper>
				</div>
  		</Grid>
		</Grid>
		<Hidden mdUp>
			<LabelBottomNavigation />
		</Hidden>
	</div>
    );
  }
}

export default withStyles(homeStyles)(Profile);