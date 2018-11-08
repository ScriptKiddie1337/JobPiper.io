import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import MoreIcon from '@material-ui/icons/MoreVert';
//import Hidden from '@material-ui/core/Hidden';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import Icon from '@mdi/react'
// import { mdiSettings } from '@mdi/js'
// import { mdiAccountCircle } from '@mdi/js'
// import { mdiLogoutVariant } from '@mdi/js'

const styles = theme => ({
  h1: {
    [theme.breakpoints.down('md')]: {
      fontSize: 10
    },
  },
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
  img: {
    height: '%',
    width: '%'
  }
 
  
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
      //const { anchorEl, mobileMoreAnchorEl } = this.state;
      const { classes } = this.props;
      // const isMenuOpen = Boolean(anchorEl);
      // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
      // const renderMenu = (
      //   <Menu
      //     anchorEl={anchorEl}
      //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      //     open={isMenuOpen}
      //     onClose={this.handleMenuClose}
      //   >
      //     <MenuItem onClick={this.handleClose}>Profile</MenuItem>
      //     <MenuItem onClick={this.handleClose}>My account</MenuItem>
      //   </Menu>
      // );
  
      // const renderMobileMenu = (
      //   <Menu
      //     anchorEl={mobileMoreAnchorEl}
      //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      //     open={isMobileMenuOpen}
      //     onClose={this.handleMobileMenuClose}
      //   >
      //     <MenuItem onClick={this.handleProfileMenuOpen}>
      //       <IconButton
      //         aria-haspopup='true'
      //         color='inherit'>
      //         <Icon
      //           path={mdiAccountCircle}
      //           size={1}
      //           color='inherit' />
      //         <p style={{fontSize: 13, marginLeft: 10}}>Profile</p>
      //       </IconButton>
      //     </MenuItem>
      //     <MenuItem>
      //     <IconButton
      //           aria-haspopup='true'
      //           color='inherit'
      //           >
      //         <Icon 
      //           path={mdiSettings} 
      //           size={1} 
      //           color='inherit'
      //           />
      //           <p style={{fontSize: 13, marginLeft: 10}}>Settings</p>
      //         </IconButton>
      //     </MenuItem>
      //     <MenuItem>
      //     <IconButton
      //           aria-haspopup='true'
      //           color='inherit'
      //           >
      //         <Icon 
      //           path={mdiLogoutVariant} 
      //           size={1} 
      //           color='inherit'
      //           />
      //           <p style={{fontSize: 13, marginLeft: 10}}>Log Out</p>
      //         </IconButton>
      //     </MenuItem>
      //   </Menu>
      // );

return (

  <div style={{ clear: 'both', paddingTop: 30, textAlign: 'center'}} className={classes.root}>
    <Grid container>		  	
        <Grid item xs={12}>
        <Typography variant="h1" className={classes.root} style={{  color: 'white', backgroundColor: 'transparent', fontFamily: 'Federant, cursive', textShadow: '4px 4px #fdd835'}}>Jobs Piper</Typography>
				</Grid>
        <Grid item xs={12} style={{ margin: '1vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src='../../images/site_logo_1.svg' alt='Brand Logo' style={{ height: '50%', 	width: '50%'}}></img>
        </Grid>
			</Grid>
  </div>
  )
}
}
Jumbotron.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Jumbotron);
