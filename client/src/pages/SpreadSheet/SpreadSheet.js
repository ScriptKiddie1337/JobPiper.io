import React, { Component } from "react";
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
class Meetups extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadMeetups();
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

  render() {
    return (
      <div>
			<Grid container>
				<Grid>
  					
				</Grid>
			</Grid>
			<Grid>
				<Paper style={{ border: '#fdd835 solid 2px'}}>
        MeetUps go here!!!
				</Paper>
			</Grid>
	  </div>
    );
  }
}

export default Meetups;