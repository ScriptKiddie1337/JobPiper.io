import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
  flexGrow: 1,
	width: '100%',
  },
  
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{borderBottom: '10px solid #FFD740'}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="inherit"
            scrollable
            scrollButtons="auto" 
          >
            <Tab label="Home" style={{margin: '0px 0px 0px 20px', borderRadius: '10px 10px 0px 0px'}} />
            <Tab label="Day Planner" style={{margin: '0px 0px 0px 20px', borderRadius: '10px 10px 0px 0px'}} />
            <Tab label="Job Search" style={{margin: '0px 0px 0px 20px', borderRadius: '10px 10px 0px 0px'}} />
            <Tab label="Company News" style={{margin: '0px 0px 0px 20px', borderRadius: '10px 10px 0px 0px'}} />
            <Tab label="Meetups" style={{margin: '0px 0px 0px 20px', borderRadius: '10px 10px 0px 0px'}} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Home</TabContainer>}
        {value === 1 && <TabContainer>Day Planner</TabContainer>}
        {value === 2 && <TabContainer>Job Search</TabContainer>}
        {value === 3 && <TabContainer>Company News</TabContainer>}
        {value === 4 && <TabContainer>Meetups</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);