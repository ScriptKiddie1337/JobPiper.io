import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
<<<<<<< HEAD
//import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
//import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import { auth } from '../../firebase';
=======
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EventModal from '../EventModal';
import Tooltip from '@material-ui/core/Tooltip';
>>>>>>> 32caf94d6f536ff6b0f2bb2ca69f7f796107dd9a
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
        description: '',
        isAllDay: true,
        eventId: '',
        open: false,
        calendarId: ''
    }

    handleSave = (event) => {
        console.log(this.state)
        const { start, end, title, description, eventId } = this.state
        this.setState({
            open: false,
        });
        if (eventId !== '' && eventId !== undefined) {
            updateCalendarEvent(this.state.calendarId, eventId, title, description, new Date(start), new Date(end))
            .catch(err => console.log(err))
        } else {
            createCalendarEvent(this.state.calendarId, title, description, new Date(start), new Date(end))
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
        this.resetEvent();
        this.drawCalendarEvents();
    };

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
                            start: new Date(date.start.dateTime),
                            end: new Date(date.end.dateTime),
                            title: date.summary,
                            description: date.description,
                            isAllDay: false
                        }))
                        this.setState({ events: eventArray })
                    }
                })
        })
    }

    deleteEvent = (event) => {
        this.setState({open: false});
        deleteCalendarEvent(this.state.calendarId,this.state.eventId)
        this.resetEvent();
        this.drawCalendarEvents();
      
    }

    resetEvent = () => {
        this.setState({
            start: new Date(),
            end: new Date(),
            title: '',
            description: '',
            isAllDay: true,
            eventId: '',
            open: false,
            calendarId: ''
        })
    }

    componentDidMount() {
        this.drawCalendarEvents();
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleisAllDay = name => event => {
        this.setState({ isAllDay: event.target.checked });
    };

    handleUpdateEvent = (e) => {
        const { start, end, description } = e;
        const { id, title } = e.event
        let updatedEvent = { id: id, start: new Date(start), end: new Date(end), title: title, description: description }
        let newEvents = this.state.events.filter(event => event.id !== id);
        // add the unchanged characters to the updated character array
        newEvents.push(updatedEvent)
        this.setState({ 
            ...this.state, 
            events: newEvents, 
            start: new Date(start), 
            end: new Date(end), 
            eventId: id, 
            title: title, 
            description: description, 
            open: true 
        }, 
        // () => console.log(this.state)
        );
    };

    onEventResize = (event) => {
        this.handleUpdateEvent(event);
    };

    onEventDrop  = (event) => {
        this.handleUpdateEvent(event);
    };

    onDoubleClickEvent  = (event) => {
        const { id, title, description, start, end } = event;
        let updatedEvent = { id: id, start: new Date(start), end: new Date(end), title: title, description: description }
        let newEvents = this.state.events.filter(event => event.id !== id);
        // add the unchanged characters to the updated character array
        newEvents.push(updatedEvent)
        this.setState({ ...this.state, events: newEvents, start: new Date(start), end: new Date(end), eventId: id, title: title, description: description, open: true });
    }

    render() {
        return (
            <div>
                <DnDCalendar
                    localizer={localizer}
                    selectable="ignoreEvents"
                    defaultDate={new Date()}
                    defaultView={ this.props.view }
                    events={this.state.events}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    onDoubleClickEvent={this.onDoubleClickEvent}
                    startAccessor="start"
                    endAccessor="end"
                    resizable
                    fullwidth
                    popup
                    style={{ height: "90vh" }}
                />
                <Tooltip title="Create Event">
                    <Button aria-label="Create Event" style={{color: '#fdd835', position: 'absolute', right: 50, bottom: 80 }} variant="fab" color="primary" aria-label="Add"  >
                        <AddIcon onClick={this.handleOpen} />
                    </Button>
                </Tooltip>
                <EventModal 
                    updateEvent={ this.state }
                    onClose={ this.handleClose }
                    onChange={ this.handleChange }
                    deleteEvent={ this.deleteEvent }
                    saveEvent={ this.handleSave }
                />
            </div>
        );
    }
}

export default BigCalendar;