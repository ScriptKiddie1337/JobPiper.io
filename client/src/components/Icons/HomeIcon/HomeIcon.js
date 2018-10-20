import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiHome } from '@mdi/js'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    
    },
});

function HomeIcon(props) {

    const { classes } = props;
    return (
    <div className={classes.root}>
        <IconButton
		    href='/home'
            aria-haspopup="true"
            color="secondary">
                <Icon 
                    path={mdiHome} 
                    size={1.5} 
                    color='#fdd835'/>
                <p style={{marginLeft: 10, fontSize: '1.2rem'}}>Home</p>
        </IconButton>
    </div>
    )
}
    HomeIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(HomeIcon);