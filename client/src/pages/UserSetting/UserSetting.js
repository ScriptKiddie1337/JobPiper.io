import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import AccountIcon from '../../components/Icons/AccountIcon';
import LogOutIcon from '../../components/Icons/LogOutIcon';
import HomeIcon from '../../components/Icons/HomeIcon';
import Paper from '@material-ui/core/Paper';
import SwitchLabels from '../../components/Switches';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import { List, ListItem } from '@material-ui/core';


const homeStyles = theme => ({
	root: {
	  position: 'relative',
	  overflow: 'auto',
	},
	
  });

class UserSetting extends Component {

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
							<img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '200px', 	width: '200px' }}></img>
						</Grid>
        		<Grid position='sticky' style={{ alignItems: 'center' }}>
							<HomeIcon />
                <Divider inset style={{backgroundColor: '#fdd835',marginLeft: 0}}/>
              <AccountIcon />
                <Divider inset style={{backgroundColor: '#fdd835',marginLeft: 0}}/>
              <LogOutIcon />
            	</Grid>
            </Grid>
        </Hidden>
			<Grid item md={10} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				
					<Paper style={{ border: '2px solid #fdd835', minWidth: '500px', minHeight: '500px'}}>
					<h2 style={{textAlign: 'center', padding: '15px'}}>
						Settings
					</h2>
					<Divider />
					<List>
						<ListItem>
						<FormControlLabel
          					control={
			  					<SwitchLabels />
          					}
          					label='Notifications'
        				/>
						</ListItem>
						<ListItem>
						<FormControlLabel
          					control={
			  					<SwitchLabels />
          					}
          					label='Default City'
        				/>
						</ListItem>
						<ListItem>
						<FormControlLabel
          					control={
			  					<SwitchLabels />
          					}
          					label='Upload Image'
        				/>
						</ListItem>
						<ListItem>
						<FormControlLabel
          					control={
			  					<SwitchLabels />
          					}
          					label='Delete Account'
        				/>
						</ListItem>
						</List>
					</Paper>
  			</Grid>
		</Grid>
		<Hidden smUp>
			<LabelBottomNavigation />
		</Hidden>
	</div>
    );
  }
}

export default withStyles(homeStyles)(UserSetting);