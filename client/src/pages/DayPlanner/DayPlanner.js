import React, { Component } from "react";
// import OutlinedButtons from '../../components/Button'
import CreateCalendarEventDialog from '../../components/CreateCalendarEventDialog'
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import MyCalendar from '../../components/Calendar'
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
          <Grid item xs={2}>
            <CreateCalendarEventDialog />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Paper style={{ border: '#fdd835 solid 2px', padding: '10px'}}>
            <MyCalendar />
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default DayPlanner;
