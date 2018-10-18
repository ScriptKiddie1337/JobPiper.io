import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: "100%",
    },
});

const preventFormSubmission = e => {

    e.preventDefault()
}

function DateAndTimePickers(props) {
    const { classes, label, onChange, timeId } = props;
    const currentDateTime = new Date()

    console.log("timeId " + timeId)
    return (
        <form className={classes.container} noValidate onSubmit={preventFormSubmission}>
            <TextField
                id={timeId}
                label={label}
                type="datetime-local"
                defaultValue={currentDateTime}
                className={classes.textField}
                onChange={onChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

DateAndTimePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateAndTimePickers);