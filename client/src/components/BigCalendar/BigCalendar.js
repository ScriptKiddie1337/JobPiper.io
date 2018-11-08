import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
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
    state = {
        events: [],
        start: new Date(),
        end: new Date(),
        title: '',
        isAllDay: true,
        eventId: '',
        open: false,
        calendarId: ''
    }

    drawCalendarEvents = () => {
        initGoogleCalendar()
        .then(calendarId => {

            this.setState({ calendarId: calendarId })
            getCalendarEvents(calendarId, new Date(moment().subtract(30, 'days')), new Date(moment().add(30, 'days')))
                .then(res => {
                    if (res.status === 200) {
                        // Update the state with the retrieved calendar events
                        const eventArray = res.result.items.map(date => ({
                            id: date.id,
                            start: moment(date.start.dateTime),
                            end: moment(date.end.dateTime),
                            title: date.summary,
                            isAllDay: false
                        }))
                        console.log(eventArray)
                        this.setState({ events: eventArray }, () => console.log(this.state))
                    }
                })
        })
    }

    deleteCalendarEvent = () => {
 // Delete the calendar event at index 0
                        // deleteCalendarEvent(this.state.calendarId,this.state.googleCalEvents[0].id)
                        // .then(res => {
                        //     if(res.status === 204) {
                        //         // The first arg of splice is the index of the event you want to remove
                        //         this.setState({googleCalEvents: this.state.googleCalEvents.splice(0, 1)})
                        //     }
                        // })
                        //         }
                        //     })
    }

    resetEvent = () => {
        this.setState({
            start: new Date(),
            end: new Date(),
            title: '',
            isAllDay: true,
            eventId: '',
            open: false,
            calendarId: ''
        })
    }

    componentDidMount() {
        this.drawCalendarEvents();
    }

    handleCreateEvent = () => {
        const { start, end, title, eventId } = this.state
        const updateEvent = { start: start, end: end, title: title, eventId: eventId }
        console.log(updateEvent)
        this.setState({ open: true })
    }
    onEventResize = (event) => {
        const { start, end } = event;
        const { id, title } = event.event
        let updatedEvent = { id: id, start: start, end: end, title: title }
        let newEvents = this.state.events.filter(event => event.id !== id);
        // add the unchanged characters to the updated character array
        newEvents.push(updatedEvent)
        this.setState({ ...this.state, events: newEvents, start: start, end: end, eventId: id, title: title, open: true });
        //update the calendar event at index 0
       
    };

    onEventDrop  = (event) => {
        console.log(event)
        // const { id, title, start, end } = event;
        // let updatedEvent = { id: id, start: start, end: end, title: title }
        // let newEvents = this.state.events.filter(event => event.id !== id);
        // // add the unchanged characters to the updated character array
        // newEvents.push(updatedEvent)
        // this.setState({ ...this.state, events: newEvents, start: start, end: end, eventId: id, title: title, open: true });
    };

    onDoubleClickEvent  = (event) => {
        const { id, title, start, end } = event;
        let updatedEvent = { id: id, start: start, end: end, title: title }
        let newEvents = this.state.events.filter(event => event.id !== id);
        // add the unchanged characters to the updated character array
        newEvents.push(updatedEvent)
        this.setState({ ...this.state, events: newEvents, start: start, end: end, eventId: id, title: title, open: true });

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSave = (event) => {
        const { start, end, title, eventId } = this.state
        this.setState({
            open: false,
        });
        if (eventId !== '' && eventId !== undefined) {
            updateCalendarEvent(this.state.calendarId, eventId, title, "updated event", start, end)
            .then(res => {
                if (res.status === 200) {
                    console.log(`Events Updated: Code ${res.status}`)
                }
            })
                .catch(err => console.log(err))
        } else {
            console.log("Creating Event", this.state.calendarId, title, "created event", start, end)
            createCalendarEvent(this.state.calendarId, title, "created event", start, end)
                .then(res => {
                    if (res.status === 200) {
                        // Update state with the event that was sucessfully created
                        let calendarEvents = this.state.events;
                        (res.result && calendarEvents.push(res.result));
                        this.setState({ events: calendarEvents })
                    };
                })
                .catch(err => console.log(err))
        }
        this.drawCalendarEvents();
        this.resetEvent();
    };

    handleisAllDay = name => event => {
        this.setState({ isAllDay: event.target.checked });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { isAllDay, title, start, end, eventId } = this.state;
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
                    startAccessor="start"
                    endAccessor="end"
                    resizable
                    popup
                    style={{ height: "90vh" }}
                />
                <Button variant="fab" color="primary" aria-label="Add"  >
                    <AddIcon onClick={this.handleCreateEvent} />
                </Button>
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
                                name="title"
                                label="Event Title"
                                margin="normal"
                                value={title}
                                onChange={this.handleChange}
                            />
                            {/* <FormControlLabel control={
                                <Checkbox
                                    checked={isAllDay}
                                    onChange={this.handleisAllDay}
                                    color="primary"
                                    value="isAllDay"
                                />
                            }
                                label="All-Day Event" /> */}
                        </FormGroup>
                        {/* Start Date */}
                        <FormGroup row>
                            <TextField
                                id="startDate"
                                label="Start Date"
                                name="start"
                                type="datetime-local"
                                onChange={this.handleChange}
                                defaultValue={(start ? moment(start).format("YYYY-MM-DDThh:mm") : moment(Date.now()).format("YYYY-MM-DDThh:mm"))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormGroup>
                        {/* End Date */}
                        <FormGroup row>
                            <TextField
                                id="endDate"
                                name="end"
                                label="End Date"
                                type="datetime-local"
                                onChange={this.handleChange}
                                defaultValue={(end ? moment(end).format("YYYY-MM-DDThh:mm") : moment(Date.now()).format("YYYY-MM-DDThh:mm"))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormGroup>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default BigCalendar;