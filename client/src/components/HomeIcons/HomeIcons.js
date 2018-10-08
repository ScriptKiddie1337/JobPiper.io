
import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'
import { mdiLogoutVariant } from '@mdi/js'

class HomeIcons extends React.Component {
    render () {
    return (
        <div>
            <IconButton
                size={3}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="secondary"
              >
                <Icon
                  path={mdiAccountCircle}
                  size={2}
                  color='fdd835' />
                <p>Profile</p>
              </IconButton>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="secondary"
                >
              <Icon 
                path={mdiSettings} 
                size={2} 
                color='#fdd835'
                />
                <p>Settings</p>
              </IconButton>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="secondary"
                >
              <Icon 
                path={mdiLogoutVariant} 
                size={2} 
                color='#fdd835'
                />
                <p>Log Out</p>
              </IconButton>
              </div>
            )
    }
}
export default (HomeIcons);