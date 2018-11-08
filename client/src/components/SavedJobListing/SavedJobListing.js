import React, { Component } from 'react';
import { Input, Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import SavedIcon from '@material-ui/icons/StarRate';
import SaveIcon from '@material-ui/icons/Stars';
import EventModal from '../EventModal';
import Tooltip from '@material-ui/core/Tooltip';
import { initGoogleCalendar, getCalendarEvents, createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from '../../session/googleCalendar'
import moment from "moment";
import { auth } from '../../firebase';
import API from '../../utils/API';

const styles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
});

class SavedJobListing extends Component {
    state = {
        saved: this.props.saved,
        start: new Date(),
        end: new Date(),
        title: this.props.title,
        description: this.props.keywords,
        notes: '',
        isAllDay: true,
        open: false,
        calendarId:'',
        jobs: []
    }

    componentDidMount = () => {
        initGoogleCalendar()
        .then(calendarId => {

            this.setState({ calendarId: calendarId })
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

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
            title: this.props.title,
            description: this.props.keywords,
            notes: '',
            isAllDay: true,
            eventId: '',
            open: false,
            calendarId: ''
        })
    }

    handleJobSave = () => {
        this.setState({ saved: true })
        API.userSaveJob({
            ...this.props,
            saved: true,
            notes: '',
            dateSaved: Date.now()
        }, auth.getUserId())
    }

    handleJobUnsave = () => {
        this.setState({ saved: false })
        API.userUnsaveJob(this.props._id, auth.getUserId())
    }

    handleUpdateNotes = () => {
        API.getUserJobs(auth.getUserId())
            .then(job => {
                const newJobs = job.data.map(x => {
                    if (x._id === this.props._id) {
                        return { ...x, notes: this.state.notes };
                    }
                    return { ...x };
                })
                return newJobs;
            })
            .then(jobs => {
                console.log('Send as update: ', jobs)
                API.updateUserJobs(jobs, auth.getUserId())
            })
            .catch(err => console.log(`handleUpdateNotes: ${err}`))
    }
    componentWillReceiveProps(newProps) {

        if (newProps.saved !== this.state.saved) {

            this.setState({ saved: newProps.saved })
        }
    }

    render() {

        const { _id, image, title, link, keywords, body, classes } = this.props
        const keywordsString = keywords.join(' | ')
        function createMarkup(val) {
            return { __html: val };
        }
        return (
            <Paper style={{ backgroundColor: '#FAFAFA', margin: '10px', border: 'solid 2px #819ca9', borderRadius: '5px' }}>
                <div key={_id} style={{ margin: '10px' }}>
                    <Grid container>
                        <Grid item xs={12} style={{ border: '#fdd835 solid 1px', backgroundColor: '#819ca9', padding: '10px', borderRadius: '5px' }}>
                            <Grid container
                                direction="row"
                                justify="space-between"
                                alignItems="center">
                                <Grid item xs={1}
								style={{textAlign: 'center'}}>
								{
                                    this.state.saved
									? <SavedIcon onClick={this.handleJobUnsave}color="secondary" />
									: <SaveIcon onClick={this.handleJobSave}color='primary' />
								}
								</Grid>
                                <Grid item xs={11}>
                                    <a href={link} target="_blank" style={{textDecoration: 'none' }}>
                                    <Grid container
										direction="row"
										justify="space-between"
										alignItems="center">
                                        <Grid item xs={3} style={{ textAlign: "left" }}><h3 style={{ color: 'white' }} dangerouslySetInnerHTML={createMarkup(title)} />
                                        </Grid>
                                        <Grid item xs={2} ><img align="right" style={{ maxHeight: "50px" }} src={image} alt={title} />
                                        </Grid>
                                    </Grid>
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>
                        <ExpansionPanel style={{ minWidth: '99%', margin: '10px 10px 0px 10px' }}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                                <Typography dangerouslySetInnerHTML={createMarkup(keywordsString)} />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12} style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}
                                    dangerouslySetInnerHTML={createMarkup(body)} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Grid item xs={12}>
                        <Input
                            defaultValue={this.props.notes}
                            name="notes"
                            multiline
                            rows="5"
                            placeholder='notes'
                            onChange={this.handleInputChange}
                            style={{width: '100%', backgroundColor: '#F5F5F5', margin: '10px', padding: '10px', border: '#fdd835 solid 1px'}}
                        />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Tooltip title="Create Event">
                                <Button 
                                aria-label="Create Event" 
                                style={{ margin: '0px 10px 0px 0px', backgroundColor: '#fdd835', padding: '10px', height: '40px' }} 
                                color="primary" 
                                onClick={this.handleOpen} >
                                Create Event
                                </Button>
                            </Tooltip>
                            <Tooltip title="Save Notes">
                                <Button
                                    fullwidth="true"
                                    onClick={ this.handleUpdateNotes }
                                    type='success'
                                    style={{ margin: '0px 10px 0px 0px', backgroundColor: '#fdd835', padding: '10px', height: '40px' }}>
                                    Save
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <EventModal 
                        updateEvent={ this.state }
                        onClose={ this.handleClose }
                        onChange={ this.handleChange }
                        deleteEvent={ this.deleteEvent }
                        saveEvent={ this.handleSave }
                    />
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(SavedJobListing)