import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomPaginationActionsTable from '../Table'
//import { Typography } from '@material-ui/core';

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
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.card} style={{margin: '20px', fontSize: 60, color: 'white', backgroundColor: 'transparent', border: 'none'}}>
                        <CardContent>
                            <CustomPaginationActionsTable ></CustomPaginationActionsTable>
                        </CardContent>
                        <CardActions>
            
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card} style={{margin: '20px', fontSize: 60, color: 'white', backgroundColor: 'transparent', border: 'none'}}>
                        <CardContent>
                            <CustomPaginationActionsTable></CustomPaginationActionsTable>
                        </CardContent>
                        <CardActions>
            
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card} style={{margin: '20px', fontSize: 60, color: 'white', backgroundColor: 'transparent', border: 'none'}}>
                        <CardContent>
                            <CustomPaginationActionsTable></CustomPaginationActionsTable>
                        </CardContent>
                        <CardActions>
            
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} style={{margin: '20px', fontSize: 60, color: 'white', backgroundColor: 'transparent', border: 'none'}}>
                        <CardContent>
                            <CustomPaginationActionsTable></CustomPaginationActionsTable>
                        </CardContent>
                        <CardActions>
            
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        )
    
};

HomeGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeGrid);
