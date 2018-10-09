import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
  
  function SimpleCard(props) {
    const { classes } = props;
  
    return (
      <Card className={classes.card}>
        <CardContent>
         
        </CardContent>
        <CardActions>
         
        </CardActions>
      </Card>
    );
  }
  
  SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleCard);