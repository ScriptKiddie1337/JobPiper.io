import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'
import { mdiLogoutVariant } from '@mdi/js'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
   
  },
});

function HomeIcons(props) {
  
    const { classes } = props;
    return (
      <div className={classes.root}>
      <List>
        <ListItem>
          <IconButton
		  	variant='fab'
            aria-haspopup="true"
            color="secondary">
            <Icon
              path={mdiAccountCircle}
			  size={1}
              color='fdd835' />
            <p style={{marginLeft: 10, fontSize: '10px'}}>Profile</p>
          </IconButton>
        </ListItem>
        <Divider inset style={{backgroundColor: '#fdd835', marginLeft: 0}}/>
        <ListItem>
          <IconButton
            aria-haspopup="true"
            color="secondary">
            <Icon 
              path={mdiSettings} 
              size={1} 
              color='#fdd835'/>
            <p style={{marginLeft: 10, fontSize: '10px'}}>Settings</p>
          </IconButton>
          </ListItem>
        <Divider inset style={{backgroundColor: '#fdd835', marginLeft: 0}}/>
        <ListItem>
		<a href='/' style={{textDecoration: 'none'}}>
		  <IconButton			  
            aria-haspopup="true"
            color="secondary">
            <Icon 
              path={mdiLogoutVariant} 
			  size={1} 
              color='#fdd835'/>
            <p style={{marginLeft: 10, fontSize: '10px'}}>Log Out</p>
          </IconButton>
		  </a>
      </ListItem>
      </List>
      </div>
    )
  
}
HomeIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(HomeIcons);