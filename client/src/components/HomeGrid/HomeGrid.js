import React from "react";
import { Grid } from '@material-ui/core';
import SimpleCard from '../Cards';

class HomeGrid extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item xs={6}>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item xs={6}>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item xs={12}>
                    <SimpleCard></SimpleCard>
                </Grid>
            </Grid>
        )
    }
};

export default HomeGrid;
