import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'
import { mdiLogoutVariant } from '@mdi/js'
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: 200,
    position: 'fixed',
    
  },
});

function HomeIcons(props) {
  
    const { classes } = props;
    return (
      <div className={classes.root}>
    
          <IconButton
		  	    href='/profile'
            aria-haspopup="true"
            color="secondary">
            <Icon
              path={mdiAccountCircle}
			        size={1}
              color='fdd835' />
            <Hidden mdDown>
              <p style={{marginLeft: 10, fontSize: '22px'}}>Profile</p>
            </Hidden>  
          </IconButton>
        
        <Divider inset style={{backgroundColor: '#fdd835', marginLeft: 0}}/>
     
          <IconButton
		  	href='/usersetting'
            aria-haspopup="true"
            color="secondary">
            <Icon 
              path={mdiSettings} 
              size={2} 
              color='green'/>
            <Hidden mdDown>
              <p style={{marginLeft: 10, fontSize: '22px'}}>Settings</p>
            </Hidden>  
          </IconButton>
      
        <Divider inset style={{backgroundColor: '#fdd835', marginLeft: 0}}/>
      
		  <IconButton	
		  	href='/'		  
            aria-haspopup="true"
            color="secondary">
            <Icon 
              path={mdiLogoutVariant} 
			        size={2} 
              color='#fdd835'/>
            <Hidden mdDown>
              <p style={{marginLeft: 10, fontSize: '22px'}}>Log Out</p>
            </Hidden>  
          </IconButton>
      
      </div>
    )
  
}
HomeIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(HomeIcons);