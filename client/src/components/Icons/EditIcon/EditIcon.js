import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react'
import { mdiBorderColor} from '@mdi/js'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    
    },
});

function EditIcon(props) {

    const { classes } = props;
    return (
    <div className={classes.root}>
        <IconButton
            aria-haspopup="true"
            color="secondary">
                <Icon 
                    path={mdiBorderColor} 
                    size={1.5} 
                    color='#546e7a'/>
        </IconButton>
    </div>
    )
}
    EditIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(EditIcon);