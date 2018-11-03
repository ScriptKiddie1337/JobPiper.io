import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import API from "../../utils/API";
import { auth } from '../../firebase';
import { initGoogleCalendar, getCalendarEvents } from '../../session/googleCalendar'

// import "./App.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment)

const DnDCalendar = withDragAndDrop(Calendar)

class BigCalendar extends Component {

    componentDidMount() {

        initGoogleCalendar()
        .then( calendarId => {

            this.setState({calendarId})
            getCalendarEvents(calendarId, new Date(), new Date(moment().add(30, 'days')))
            .then(res => {
                this.setState({googleCalEvents: res.result.items})
            })
        })
    }

    state = {
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, 'days')),
                title: 'Test event',
                allDay:true
            }
        ]
    }

    onEventResize = ({ event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        }, () => console.log(start, end));
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        console.log(start);
    };
    onDoubleClickEvent = (event) => {
        console.log(event)
        API.createEvent(auth.getUserId(), {
            start: 'Tue Oct 30 2018 14:52:27 GMT-0700 (Pacific Daylight Time)',
            end: 'Wed Oct 31 2018 14:52:27 GMT-0700 (Pacific Daylight Time)',
            title: 'Test event',
            allDay:true
        })
        .catch(error => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <DnDCalendar
                    localizer={localizer}
                    selectable="ignoreEvents"
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    onDoubleClickEvent={this.onDoubleClickEvent}
                    resizable
                    popup
                    style={{ height: "90vh" }}
                />
            </div>
        );
    }
}

export default BigCalendar;