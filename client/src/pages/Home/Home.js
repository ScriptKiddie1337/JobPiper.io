import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '../../components/Icons/SettingsIcon'
import AccountIcon from '../../components/Icons/AccountIcon'
import LogOutIcon from '../../components/Icons/LogOutIcon'
import Divider from '@material-ui/core/Divider'

const homeStyles = theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
  },
  
});

class Home extends Component {
  state = {
    currentPage: 'Home', 
  };

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
// render function
    return (
	    <div>
        <Grid container>
        	<Hidden smDown>
        		<Grid item md={2} style={{ backgroundColor: '#819ca9', borderRight: '#fdd835 solid 2px' }}>
<<<<<<< HEAD
					<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
						<img src='../../images/site_logo_1.svg' alt='JobPiper Logo' style={{ height: '200px', 	width: '200px' }}></img>
					</Grid>
        			<Grid style={{ justifyContent: 'center', }}>
						<HomeIcons  />
            		</Grid>
=======
					    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
						    <img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '200px', 	width: '200px' }}></img>
					    </Grid>
        			<Grid position='sticky' style={{ alignItems: 'center' }}>
                <SettingsIcon />
                  <Divider inset style={{backgroundColor: '#fdd835',marginLeft: 0}}/>
                <AccountIcon />
                  <Divider inset style={{backgroundColor: '#fdd835',marginLeft: 0}}/>
                <LogOutIcon />
>>>>>>> 18e2b796706afbcd2ef21b342abcd8c988bdf33a
            	</Grid>
            </Grid>
          </Hidden>
			    <Grid item md={10}>
    			  <Grid item xs={12}>
			        <ScrollableTabsButtonAuto /> 
    			  </Grid>
  			  </Grid>
		    </Grid>
		    <Hidden smUp>
			    <LabelBottomNavigation />
		    </Hidden>
	    </div>
    );
  }
}

export default withStyles(homeStyles)(Home);