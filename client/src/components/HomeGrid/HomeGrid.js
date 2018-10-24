import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Quotes from '../Quotes';
import MyCalendar from '../Calendar';

const styles = {
    card: {
        minHeight: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function HomeGrid(props) {
    const { classes } = props;

    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Card className={classes.card} style={{ textAlign: 'center' }}>
                    <Quotes />
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>

                <Card className={classes.card} style={{ textAlign: 'center' }}>
                    <p>Tech News or instructional material goes here</p>
                </Card>

            </Grid>
            <Grid item xs={12} md={6}>
                <Card className={classes.card} style={{ textAlign: 'center' }}>
                    <p>A Meetup goes here</p>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card className={classes.card} style={{ border: '#fdd835 solid 2px', padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <MyCalendar calendarRefreshCallback={() => { }} />
                </Card>
            </Grid>
        </Grid>
    )
};

HomeGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeGrid);
