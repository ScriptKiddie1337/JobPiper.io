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
    contact: [],
    refreshCalendar: false
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

  handleEventCreated = () => {
    console.log("event created callback")
    this.setState({ refreshCalendar: true })
  }

  handleCalendarRefreshed = () => {
    this.setState({ refreshCalendar: false })
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={2}>
            <CreateCalendarEventDialog eventCreatedCallback={this.handleEventCreated} />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper style={{ border: '#fdd835 solid 2px', padding: '10px' }}>
            <MyCalendar refresh={this.state.refreshCalendar} calendarRefreshCallback={this.handleCalendarRefreshed} />
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default DayPlanner;
