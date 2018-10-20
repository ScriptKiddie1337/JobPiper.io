import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiLogoutVariant } from '@mdi/js'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    
    },
});

function LogOutIcon(props) {

    const { classes } = props;
    return (
    <div className={classes.root}>
        <IconButton
		    href='/'
            aria-haspopup="true"
            color="secondary">
                <Icon 
                    path={mdiLogoutVariant} 
                    size={1.5} 
                    color='#fdd835'/>
                <p style={{marginLeft: 10, fontSize: '1.2rem'}}>Log Out</p>
        </IconButton>
    </div>
    )
}
    LogOutIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(LogOutIcon);