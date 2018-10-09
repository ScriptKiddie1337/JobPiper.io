import React from 'react';
import PropTypes from 'prop-types';
import HomeGrid from '../HomeGrid'
import DayPlanner from '../../pages/DayPlanner';
import JobListing from '../../pages/JobListing';
import CompanyNews from '../../pages/CompanyNews';
import Meetups from '../../pages/Meetups';
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
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="inherit"
            scrollable
            scrollButtons="auto" 
          >
            <Tab label="Home" />
            <Tab label="Day Planner" />
            <Tab label="Job Search" />
            <Tab label="Company News" />
            <Tab label="Meetups" />
          </Tabs>
        </AppBar>
        {value === 0 && 
        <TabContainer>
          <HomeGrid />
        </TabContainer>}
        {value === 1 && <TabContainer><DayPlanner /></TabContainer>}
        {value === 2 && <TabContainer><JobListing /></TabContainer>}
        {value === 3 && <TabContainer><CompanyNews /></TabContainer>}
        {value === 4 && <TabContainer><Meetups /></TabContainer>}
      </div>
     
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);