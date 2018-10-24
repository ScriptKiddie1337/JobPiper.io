import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import LogOutIcon from '../../components/Icons/LogOutIcon';
import Divider from '@material-ui/core/Divider';
import UserSettings from '../UserSetting'
import Profile from '../Profile'
import MemoryRouter from 'react-router/MemoryRouter';
import NoSsr from '@material-ui/core/NoSsr';
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react'
import { mdiAccountCircle } from '@mdi/js'
import { mdiSettings } from '@mdi/js'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const homeStyles = theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
  },
  
});

class Home extends React.Component {
  state = {
    value: 0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
      
      render() {
        // render function
        const { classes } = this.props;
        const { value } = this.state;
        console.log(value)
        return (
          <NoSsr>
        <MemoryRouter initialEntries={['/home']} initialIndex={0}>
	    <div className={classes.root}>
        <Grid container>
        	<Hidden smDown>
        		<Grid item md={2} style={{ backgroundColor: '#819ca9', borderRight: '#fdd835 solid 2px', minHeight: '100vh'}}>
					<div style={{margin: '0 auto', position: 'fixed' }}>
					    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
						    <img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '150px', 	width: '150px'}}></img>
					    </Grid>
              <Grid position='sticky' style={{ marginTop: '20vh' }}>
              <Tabs 
                value={value}
                onChange={this.handleChange}
				        indicatorColor='secondary'
                textColor='inherit'>
                  <Tab
                  value={1}
                  onChange={this.handleChange}
                   aria-haspopup="true"
                   color="secondary">
                <Icon 
                    path={mdiAccountCircle} 
                    size={1.5} 
                    color='#fdd835'/>
                <p style={{marginLeft: 10, fontSize: '1.2rem'}}>Profile</p>
                </Tab>
                  <Divider inset style={{backgroundColor: '#fdd835', marginLeft: 0}}/>
              <Tab
                value={2}
                onChange={this.handleChange}
                aria-haspopup="true"
                color="secondary">
                <Icon 
                    path={mdiSettings} 
                    size={1.5} 
                    color='#fdd835'/>
                <p style={{marginLeft: 10, fontSize: '1.2rem'}}>Settings</p>
                </Tab>
                
                  <Divider inset style={{backgroundColor: '#fdd835', marginLeft: 0}}/>
                <LogOutIcon />
                </Tabs>
            	</Grid>
				</div>
            </Grid>
          </Hidden>
			    <Grid item md={10}>
          
    			  <Grid item xs={12}>
            {value === 0 && <Grid item xs={12}><ScrollableTabsButtonAuto /></Grid>}
            {value === 1 && <Grid item xs={12}to='/profile'><Profile /></Grid>}
            {value === 2 && <Grid item xs={12}to='/usersettings'><UserSettings /></Grid>}
    			  </Grid>
  			  </Grid>
		    </Grid>
            
		    <Hidden mdUp>
			    <LabelBottomNavigation />
		    </Hidden>
	    </div>
        </MemoryRouter>
        </NoSsr>
    );
  }
}


export default withStyles(homeStyles)(Home);

