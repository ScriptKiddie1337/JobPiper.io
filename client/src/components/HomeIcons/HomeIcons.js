import React from "react";
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'
import { mdiLogoutVariant } from '@mdi/js'

class HomeIcons extends React.Component {
  render () {
    return (
      <Grid container>
        <Grid item xs={12}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="secondary">
            <Icon
              path={mdiAccountCircle}
              size={2}
              color='fdd835' />
            <p style={{marginLeft: 10}}>Profile</p>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="secondary">
            <Icon 
              path={mdiSettings} 
              size={2} 
              color='#fdd835'/>
            <p style={{marginLeft: 10}}>Settings</p>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="secondary">
            <Icon 
              path={mdiLogoutVariant} 
              size={2} 
              color='#fdd835'/>
            <p style={{marginLeft: 10}}>Log Out</p>
          </IconButton>
        </Grid>
      </Grid>
    )
  }
}
export default (HomeIcons);