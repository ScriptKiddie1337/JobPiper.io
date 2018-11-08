import React, { Component } from "react";
import moment from "moment";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';

class EventModal extends Component {
    render() {
        const { open, title, start, end, isAllDay, eventId, description } = this.props.updateEvent;

        return (
            <Dialog
                open={ open }
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Event Details</DialogTitle>
                <Button 
                    variant="fab" 
                    color="primary" 
                    aria-label="Delete"  
                    style={{ color: '#fdd835', position: 'absolute', right: 10, top: 10 }}
                    >
                        <DeleteIcon onClick={ this.props.deleteEvent } />
                    </Button>
                <DialogContent>
                    {/* Title and all-day flag */}
                    <FormGroup row>
                        <TextField
                            id="title"
                            name="title"
                            label="Event Title"
                            margin="none"
                            fullWidth
                            value={ title }
                            onChange={ this.props.onChange }
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
                            onChange={ this.props.onChange }
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
                            onChange={ this.props.onChange }
                            defaultValue={(end ? moment(end).format("YYYY-MM-DDThh:mm") : moment(Date.now()).format("YYYY-MM-DDThh:mm"))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormGroup>
                    <FormGroup row>
                            <TextField
                                id="description"
                                label="Notes"
                                multiline
                                rowsMax="10"
                                defaultValue={ description }
                                onChange={ this.props.onChange }
                                margin="none"
                                variant="filled"
                                fullWidth
                                />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={ this.props.onClose } color="primary">
                        Cancel
                    </Button>
                    <Button onClick={ this.props.saveEvent } color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

    
    

export default EventModal;