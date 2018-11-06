import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
            .then(calendarId => {

                this.setState({ calendarId })
                getCalendarEvents(calendarId, new Date(), new Date(moment().add(30, 'days')))
                    .then(res => {
                        if (res.status === 200) {
                            // Update the state with the retrieved calendar events
                            const eventArray = res.result.items.map(date => ({
                                start: date.start.dateTime,
                                end: date.end.dateTime,
                                title: date.summary,
                                allDay: false
                            }))
                            this.setState({ events: eventArray }, () => console.log(this.state))


                            // createCalendarEvent(this.state.calendarId, "Job Piper IO", "test event", new Date(moment().subtract(2, 'days')), new Date(moment().add(1, 'days')))
                            //     .then(res => {
                            //         if (res.status === 200) {
                            //             // Update state with the event that was sucessfully created
                            //             let calendarEvents = this.state.googleCalEvents;
                            //             (res.result && calendarEvents.push(res.result));
                            //             this.setState({ googleCalEvents: calendarEvents })

                            //             //update the calendar event at index 0
                            //             updateCalendarEvent(this.state.calendarId, this.state.googleCalEvents[0].id, "Job Piper IO2", "updated event!", new Date(moment().add(2, 'days')), new Date(moment().add(4, 'days')))
                            //                 .then(res => {
                            //                     if (res.status === 200) {

                            //                         let calEvents = this.state.googleCalEvents
                            //                         calEvents[0] = res.result
                            //                         this.setState({ googleCalEvents: calEvents })
                            //                     }
                            //                 })

                            //             //         // Delete the calendar event at index 0
                            //             //         // deleteCalendarEvent(this.state.calendarId,this.state.googleCalEvents[0].id)
                            //             //         // .then(res => {
                            //             //         //     if(res.status === 204) {
                            //             //         //         // The first arg of splice is the index of the event you want to remove
                            //             //         //         this.setState({googleCalEvents: this.state.googleCalEvents.splice(0, 1)})
                            //             //         //     }
                            //             //         // })
                            //         }
                            //     })
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
                allDay: true
            }
        ],
        newEvent: {
            start: new Date(),
            end: new Date(moment().add(1, 'days')),
            title: 'Test event',
            allDay: true
        },
        open: false
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
        console.log(this.state)
        this.setState({ open: true })
        API.createEvent(auth.getUserId(), {
            start: 'Tue Oct 30 2018 14:52:27 GMT-0700 (Pacific Daylight Time)',
            end: 'Wed Oct 31 2018 14:52:27 GMT-0700 (Pacific Daylight Time)',
            title: 'Test event',
            allDay: true
        })
            .catch(error => {
                console.log(error)
            });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
        console.log('All Day: ', this.state.newEvent.allDay);
    };

    handleClose = () => {
        this.setState({ open: false });
        console.log('All Day: ', this.state.newEvent.allDay);
    };

    handleAllDay = name => event => {
        let newEvent = { ...this.state.newEvent }
        newEvent.allDay = event.target.checked
        this.setState({ newEvent });
    };

    render() {
        const { allDay } = this.state;
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Event Details</DialogTitle>
                    <DialogContent>
                        {/* Title and all-day flag */}
                        <FormGroup row>
                            <TextField
                                id="title"
                                label="Event Title"
                                margin="normal"
                            />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={allDay}
                                    onChange={this.handleAllDay('allDay')}
                                    color="primary"
                                    value="allDay"
                                />
                            }
                                label="All-Day Event" />
                        </FormGroup>
                        {/* Start Date */}
                        <FormGroup row>
                            <TextField
                                id="startDate"
                                label="Start Date"
                                type="date"
                                defaultValue={moment(Date.now()).format("YYYY-MM-DD")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="startTime"
                                label="Start Time"
                                type="time"
                                defaultValue={moment(Date.now()).format("HH:mm")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </FormGroup>
                        {/* End Date */}
                        <FormGroup row>
                            <TextField
                                id="endDate"
                                label="End Date"
                                type="date"
                                defaultValue={moment(Date.now()).format("YYYY-MM-DD")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="endTime"
                                label="End Time"
                                type="time"
                                defaultValue={moment(Date.now()).format("HH:mm")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </FormGroup>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default BigCalendar;