import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
//import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  root: {
    width: '100%',
    backgroundColor: '#fdd835',
	  position: "fixed",
    left: 0,
    bottom: 0,
    textAlign: "center",
    zIndex: '999'
  },
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'profile',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction href='/home' label="Home" value="home" icon={<HomeIcon/>} />
        <BottomNavigationAction href='/profile' label="Profile" value="profile" icon={<AccountCircleIcon/>} />
        <BottomNavigationAction href='/' label="Log off" value="log off" icon={<PowerSettingsNewIcon />} />
        <BottomNavigationAction href='/userSetting' label="UserSetting" value="usersetting" icon={<SettingsIcon />} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);