import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '../../components/Icons/SettingsIcon';
import LogOutIcon from '../../components/Icons/LogOutIcon';
import HomeIcon from '../../components/Icons/HomeIcon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
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
				<Grid container>
					<Hidden smDown>
						<Grid item md={2} style={{ backgroundColor: '#819ca9', borderRight: '#fdd835 solid 2px' }}>
							<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
								<img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '200px', width: '200px' }}></img>
							</Grid>
							<Grid position='sticky' style={{ alignItems: 'center' }}>
								<HomeIcon />
								<Divider inset style={{ backgroundColor: '#fdd835', marginLeft: 0 }} />
								<SettingsIcon />
								<Divider inset style={{ backgroundColor: '#fdd835', marginLeft: 0 }} />
								<LogOutIcon />
							</Grid>
						</Grid>
					</Hidden>
					<Grid item md={10} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<div>
							<Paper style={{ border: '2px solid #fdd835', minWidth: '500px', minHeight: '500px' }}>
								<FloatingActionButtons />
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