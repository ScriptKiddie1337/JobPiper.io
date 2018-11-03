import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import API from "../../utils/API";
import { auth } from '../../firebase';
import { initGoogleCalendar, getCalendarEvents, createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from '../../session/googleCalendar'

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
                if(res.status === 200){
                // Update the state with the retrieved calendar events
                this.setState({googleCalEvents: res.result.items})


                createCalendarEvent(this.state.calendarId,"Job Piper IO", "test event", new Date(moment().subtract(2, 'days')), new Date(moment().add(1, 'days')))
                .then(res => {
                    if(res.status === 200){
                        // Update state with the event that was sucessfully created
                        let calendarEvents = this.state.googleCalEvents
                        calendarEvents.push(res.result)
                        this.setState({googleCalEvents: calendarEvents})

                        //update the calendar event at index 0
                        updateCalendarEvent(this.state.calendarId, this.state.googleCalEvents[0].id, "Job Piper IO2", "updated event!", new Date(moment().add(2, 'days')), new Date(moment().add(4, 'days')))
                        .then(res =>{
                            if(res.status === 200) {

                                let calEvents = this.state.googleCalEvents
                                calEvents[0] = res.result
                                this.setState({googleCalEvents: calEvents}) 
                            }
                        })

                        // Delete the calendar event at index 0
                        // deleteCalendarEvent(this.state.calendarId,this.state.googleCalEvents[0].id)
                        // .then(res => {
                        //     if(res.status === 204) {
                        //         // The first arg of splice is the index of the event you want to remove
                        //         this.setState({googleCalEvents: this.state.googleCalEvents.splice(0, 1)})
                        //     }
                        // })
                    }
                })
            }
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