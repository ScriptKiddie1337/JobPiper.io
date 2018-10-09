import React from "react";
import { Grid } from '@material-ui/core';

class HomeGrid extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>Full width</Grid>
                <Grid item xs={6}>half width</Grid>
                <Grid item xs={6}>Half width</Grid>
                <Grid item xs={12}>full width</Grid>
            </Grid>
        )
    }
};

export default (HomeGrid);
