import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// import "./App.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment)

const DnDCalendar = withDragAndDrop(Calendar)

class BigCalendar extends Component {
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
    onDoubleClickEvent = (event) => console.log(event)

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
                    popup="true"
                    style={{ height: "90vh" }}
                />
            </div>
        );
    }
}

export default BigCalendar;