import React from "react";
import Grid from '@material-ui/core/Grid';
import Jumbotron from "../../components/Jumbotron";

const NoMatch = () => (
	<Grid container>
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </Jumbotron>
	</Grid>
);

export default NoMatch;
