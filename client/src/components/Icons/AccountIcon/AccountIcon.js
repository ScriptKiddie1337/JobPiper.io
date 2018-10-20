import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiAccountCircle } from '@mdi/js'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    
    },
});

function AccountIcon(props) {

    const { classes } = props;
    return (
    <div className={classes.root}>
        <IconButton
		    href='/profile'
            aria-haspopup="true"
            color="secondary">
                <Icon 
                    path={mdiAccountCircle} 
                    size={1.5} 
                    color='#fdd835'/>
                <p style={{marginLeft: 10, fontSize: '1.2rem'}}>Profile</p>
        </IconButton>
    </div>
    )
}
    AccountIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(AccountIcon);