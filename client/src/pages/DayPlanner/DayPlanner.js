import React, { Component } from "react";
import OutlinedButtons from '../../components/Button'
import { Grid } from '@material-ui/core';
class DayPlanner extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadDayPlanner();
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
  					<OutlinedButtons />
				</Grid>
			</Grid>
			<Grid>

			</Grid>
	  </div>
    );
  }
}

export default DayPlanner;
