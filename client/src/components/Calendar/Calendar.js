import React, { Component } from 'react';
import { initGoogleCalendar } from '../../session/googleCalendar'

class MyCalendar extends Component {
  state = {
    googleCalendarId: undefined
  }

  componentDidMount() {

    initGoogleCalendar().then(result => {

      console.log("Init google calendar result: " + result)
      this.setState({ googleCalendarId: result.id })
    })
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        {
          this.state.googleCalendarId ?
            <iframe title="Job Piper Calendar" src={`https://calendar.google.com/calendar/embed?
height=550&amp;wkst=1&amp;bgcolor=%23FFFFFF&
amp;src=${this.state.googleCalendarId}&
amp;color=%238C500B&amp;ctz=America%2FLos_Angeles`}
              style={{ border: 0 }} width="800" height="600" frameborder="0" scrolling="no"></iframe> : null
        }
      </div>
    );
  }
}
export default MyCalendar;