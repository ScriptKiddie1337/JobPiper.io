import React from "react";
import Grid from '@material-ui/core/Grid';
const Jumbotron = ({ children }) => (
  <div
    style={{ minHeight: 150, clear: "both", paddingTop: 30, paddingRight: 900, textAlign: "center"}}
    className="jumbotron"
  >
    {children}
    <Grid container>
			  	<Grid item xs={3} >
					<img src='../../Images/favicon.png' alt='Brand Logo'></img>
				</Grid>
			</Grid>
  </div>
);

export default Jumbotron;
