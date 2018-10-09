import React from "react";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react'
import { mdiSettings } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'
import { mdiLogoutVariant } from '@mdi/js'

const styles = theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    float: 'right',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  })
  
  class Jumbotron extends React.Component {
    state = {
      currentPage: 'Jumbotron', 
      jobs: [],
      title: '',
      link: '',
      image: '',
      note: [],
      contact: [],
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  
    componentDidMount() {
      // this.loadJobListing();
    }
  ;
  
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      
    };
  // mobile menu
    handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleMenuClose = () => {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
    };
  
    handleMobileMenuOpen = event => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };
  
    handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
    };
  
    render() {
      const { anchorEl, mobileMoreAnchorEl } = this.state;
      const { classes } = this.props;
      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </Menu>
      );
  
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton
              aria-haspopup="true"
              color="inherit">
              <Icon
                path={mdiAccountCircle}
                size={1}
                color='inherit' />
              <p style={{fontSize: 13, marginLeft: 10}}>Profile</p>
            </IconButton>
          </MenuItem>
          <MenuItem>
          <IconButton
                aria-haspopup="true"
                color="inherit"
                >
              <Icon 
                path={mdiSettings} 
                size={1} 
                color='inherit'
                />
                <p style={{fontSize: 13, marginLeft: 10}}>Settings</p>
              </IconButton>
          </MenuItem>
          <MenuItem>
          <IconButton
                aria-haspopup="true"
                color="inherit"
                >
              <Icon 
                path={mdiLogoutVariant} 
                size={1} 
                color='inherit'
                />
                <p style={{fontSize: 13, marginLeft: 10}}>Log Out</p>
              </IconButton>
          </MenuItem>
        </Menu>
      );

return (
  <div
    style={{ minHeight: 150, clear: "both", paddingTop: 30, textAlign: "center"}}
    className="jumbotron"
  >

    <Grid container>
			  	<Grid item xs={2} >
					<img src='../../Images/favicon.png' alt='Brand Logo' style={{marginLeft: 10}}></img>
				</Grid>
        <Grid item xs={8} >
        <Typography style={{margin: '20px 0px -10px 0px', fontSize: 60, color: 'white', backgroundColor: 'transparent', minHeight: 40, border: 'none'}}>Jobs</Typography>
				</Grid>
        <Hidden mdUp>
          <Grid>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Grid>
        </Hidden>
			</Grid>
      {renderMenu}
    {renderMobileMenu}
  </div>
  )
}
}
Jumbotron.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Jumbotron);
