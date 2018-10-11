import React, { Component } from "react";
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
class CompanyNews extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadCompanyNews();
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
				</Paper>
			</Grid>
	  </div>
    );
  }
}

export default CompanyNews;
