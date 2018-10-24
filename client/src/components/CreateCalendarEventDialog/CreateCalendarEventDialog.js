import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateTimePicker from './DateTimePicker/DateTimePicker';
import { addEventToGoogleCalendar } from '../../session/googleCalendar'

const initialState = {
    open: false,
    title: "",
    description: "",
    startTime: "",
    endTime: ""
}

export default class FormDialog extends React.Component {
    state = initialState

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState(initialState);
    };

    handleCreate = () => {
        const { title, description, startTime, endTime } = this.state
        addEventToGoogleCalendar(title, description, (startTime? startTime:Date.now()), (endTime?endTime:Date.now()))
        this.handleClose()
    }

    handleChange = event => {

        this.setState({ [event.target.id]: event.target.value })
        console.log(JSON.stringify(this.state))
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen} color="secondary">Create Event</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create an Event</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add an event to your job search calendar:
            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="name"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="name"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <DateTimePicker
                            id="startTimePicker"
                            timeId="startTime"
                            label="Start Time"
                            onChange={this.handleChange}
                        />
                        <DateTimePicker
                            id="endTimePicker"
                            timeId="endTime"
                            label="End Time"
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleCreate} color="primary">
                            Create
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}