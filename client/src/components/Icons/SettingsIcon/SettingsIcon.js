import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    
    },
});

function SettingsIcon(props) {

    const { classes } = props;
    return (
    <div className={classes.root}>
        <IconButton
		    href='/usersetting'
            aria-haspopup="true"
            color="secondary">
                <Icon 
                    path={mdiSettings} 
                    size={1.5} 
                    color='#fdd835'/>
                <p style={{marginLeft: 10, fontSize: '1.2rem'}}>Settings</p>
        </IconButton>
    </div>
    )
}
    SettingsIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(SettingsIcon);