import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollableTabsButtonAuto from '../../components/Tabs/Tabs';
import Grid from '@material-ui/core/Grid';
import LabelBottomNavigation from '../../components/Footer/Footer';
import Hidden from '@material-ui/core/Hidden';
import UserSettings from '../UserSetting'
import Profile from '../Profile';
import MemoryRouter from 'react-router/MemoryRouter';
import NoSsr from '@material-ui/core/NoSsr';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { mdiLogoutVariant } from '@mdi/js';
import { mdiSettings } from '@mdi/js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import { auth } from '../../firebase';
import Tooltip from '@material-ui/core/Tooltip';

const homeStyles = theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
  },
  flexContainer: {
    flexDirection: 'column'
  },
  labelContainer: {
    width: '55%'
  },
 
  
});

class Home extends React.Component {
  state = {
    profilePic: auth.getUserProfilePic(),
    userName: auth.getUserName(),
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
					      <Grid item xs={12} style={{margin: '20px', display: 'flex', justifyContent: 'center'}}>
						      <img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '50%', 	width: '50%'}}></img>
					      </Grid>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    {this.state.userName ?
										<h3 style={{ color: 'white'}} alt="userId">Welcome,  {this.state.userName}.</h3>
										: null}
                </Grid>
                <div style={{margin: '0 auto', position: 'fixed' }}>
                <Grid item xs={12} style={{ marginTop: '20vh' }}>
                  <Tabs 
                    classes={{ flexContainer: classes.flexContainer }}
                    value={value}
                    style={{ flexDirection: 'column' }}
                    onChange={this.handleChange}
				            indicatorColor='primary'
                    textColor='inherit'
                    >
                      <Tab
                      classes={{ labelContainer: classes.labelContainer}}
                        value={1}
                        onChange={this.handleChange}
                        label=
                          {
                          <Tooltip title='Profile'>
                            <Avatar
                            alt=""
                            size={1.5}
                            src={this.state.profilePic} alt="Profile Picture"
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                          </Tooltip>
                          }>
                      </Tab>
                    <Tab
                        value={0}
                        onChange={this.handleChange}
                        label=
                          {
                          <Tooltip title='Home'>
                            <Icon 
                              path={mdiHome} 
                              size={1.5} 
                              color='#fdd835'/>
                          </Tooltip>
                          }>
                      </Tab>
                      <Tab
                        value={2}
                        onChange={this.handleChange}
                        label=
                          {
                          <Tooltip title='Settings'>
                            <Icon 
                              path={mdiSettings} 
                              size={1.5} 
                              color='#fdd835'/>
                          </Tooltip>
                          }>
                      </Tab>
                      <Tab
                        value={3}
                        onChange={this.handleChange}
                        label=
                          {
                          <Tooltip title='Log Out'>
                            <Icon 
                              path={mdiLogoutVariant} 
                              size={1.5} 
                              color='#fdd835'/>
                          </Tooltip>
                          }>
                      </Tab>
                  </Tabs>
            	  </Grid>
				      </div>
            </Grid>
          </Hidden>
			    <Grid item md={10}>
            {value === 0 && <Grid item xs={12}><ScrollableTabsButtonAuto /></Grid>}
            {value === 1 && <Grid item xs={12}to='/profile'><Profile /></Grid>}
            {value === 2 && <Grid item xs={12}to='/usersettings'><UserSettings /></Grid>}
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

