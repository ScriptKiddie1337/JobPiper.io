import React, { Component } from 'react';
import { initGoogleCalendar } from '../../session/googleCalendar'

class MyCalendar extends Component {
  state = {
    googleCalendarId: undefined
  }

  componentDidMount() {

    initGoogleCalendar().then(result => {

      this.setState({ googleCalendarId: result })
    })
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        {
          this.state.googleCalendarId ?
            <iframe title="Job Piper Calendar" src={`https://calendar.google.com/calendar/embed?height=550&wkst=1&bgcolor=%23FFFFFF&src=${this.state.googleCalendarId}&color=%238C500B&ctz=America%2FLos_Angeles`}
              style={{ border: 0 }} width="800" height="600" frameborder="0" scrolling="no"></iframe> : null
        }
      </div>
    );
  }
}
export default MyCalendar;