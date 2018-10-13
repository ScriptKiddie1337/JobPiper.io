import React from "react";
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'
import { mdiLogoutVariant } from '@mdi/js'

class HomeIcons extends React.Component {
  render () {
    return (
      <Grid container style={{ marginBottom: 100}}>
        <Grid item xs={12}>
		<Button varient='fab'>
          <IconButton
		  	variant='fab'
            aria-haspopup="true"
            color="secondary">
            <Icon
              path={mdiAccountCircle}
              size={2}
              color='fdd835' />
            <p style={{marginLeft: 10}}>Profile</p>
          </IconButton>
		  </Button>
        </Grid>
        <Grid item xs={12}>
		<Button varient='fab'>
          <IconButton
            aria-haspopup="true"
            color="secondary">
            <Icon 
              path={mdiSettings} 
              size={2} 
              color='#fdd835'/>
            <p style={{marginLeft: 10}}>Settings</p>
          </IconButton>
		</Button>
        </Grid>
        <Grid item xs={12}>
		<a href='/'>
		<Button varient='fab'>
          <IconButton
            aria-haspopup="true"
            color="secondary">
            <Icon 
              path={mdiLogoutVariant} 
              size={2} 
              color='#fdd835'/>
            <p style={{marginLeft: 10}}>Log Out</p>
          </IconButton>
		  </Button>
		  </a>
        </Grid>
      </Grid>
    )
  }
}
export default (HomeIcons);