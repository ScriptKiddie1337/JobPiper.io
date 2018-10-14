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
          <Grid>
            {/* <OutlinedButtons /> */}
            <CreateCalendarEventDialog />
          </Grid>
        </Grid>
        <Grid>
          <Paper style={{ border: '#fdd835 solid 2px' }}>
            <MyCalendar />
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default DayPlanner;
