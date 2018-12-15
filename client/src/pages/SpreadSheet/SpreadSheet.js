import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase'
import { Grid } from '@material-ui/core';
import SpreadSheetList from '../../components/SpreadSheetList';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import api from '../../utils/API'
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginTop: 'auto',
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},

	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},

	table: {
		minWidth: 700,
	},
});

const numberOfEmployees = [
	{
		value: 100,
		label: '100',
	},
	{
		value: 1000,
		label: '1,000',
	},
	{
		value: 5000,
		label: '5,000',
	},
	{
		value: 10000,
		label: '10,000',
	},
];

const methodApplied = [
	{
		value: 'Online',
		label: 'Online',
	},
	{
		value: 'In Person',
		label: 'In person',
	},
	{
		value: 'Networking event',
		label: 'Networking event',
	},
	{
		value: 'Referral',
		label: 'Referral',
	},
	{
		value: 'Linked In referral',
		label: 'Linked In referral',
	},
	{
		value: 'HR cold email',
		label: 'HR cold email',
	},
	{
		value: 'Other',
		label: 'Other',
	},
];

const currentStatus = [
	{
		value: 'applied',
		label: 'Applied',
	},
	{
		value: 'phoneStart',
		label: 'Phone interview scheduled',
	},
	{
		value: 'phoneDone',
		label: 'Phone interview done',
	},
	{
		value: 'techStart',
		label: 'Tech interview scheduled',
	},
	{
		value: 'techDone',
		label: 'Tech interview done',
	},
	{
		value: 'wait',
		label: 'Waiting for offer',
	},
	{
		value: 'no',
		label: 'No offer',
	},
	{
		value: 'yes',
		label: 'Got job offer',
	},
];

class SpreadSheet extends Component {
	state = {
		open: false,
		loading: false,
		sheets: [],
		title: "",
		site_link: "",
		hr_link: "",
		body: "",
		company: "",
		industry: "",
		size: "",
		method: "",
		status: "",
		image: "",
		note: [],
		contact: [],
		// form states
		jobname: '',
		companyName: '',
		industryDescription: '',
		numberOfEmployees: '',
		jobLink: '',
		hrLink: '',
		methodApplied: '',
		currentStatus: '',
	};

	handleDelete = () => {
		console.log('Unsaving job: ', this.props.title)
		this.setState({ saved: false })
		api.deleteSheet(this.props._id, auth.getUserId())
		this.updateSheets()
		this.props.deleteCallback(this.props._id)
	}
	updateSheets = () => {
		fetch('/api/spreadSheet')
			.then(response => response.json())
			.then(x => this.setState({ sheets: x }))
			.catch(err => { throw new Error(err) });
	}
	componentDidMount() {
		this.updateSheets()
	}

	// handleChange for input
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleClickLoading = () => {
		this.setState(state => ({
			loading: !state.loading,
		}));
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.handleClickLoading();
		let title = document.getElementById("standard-title").value;
		let site_link = document.getElementById("standard-jobLink").value;
		let hr_link = document.getElementById("standard-hrLink").value;
		let company = document.getElementById("standard-hrLink").value;
		let industry = document.getElementById("standard-industry").value;
		let size = document.getElementById("standard-select-number").value;
		let method = document.getElementById("standard-select-method").value;
		let status = document.getElementById("standard-select-status").value;
		let date = document.getElementById('date').value;

		var url = '/api/spreadSheet';
		var data = {
			title: title,
			site_link: site_link,
			hr_link: hr_link,
			company: company,
			industry: industry,
			size: size,
			method: method,
			status: status,
			date: date,
		};

		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.then(this.updateSheets())
			.then(document.getElementById("jobForm").reset())
			.catch(error => console.error('Error:', error));
		this.setState({ open: false })
	};

	handleCreateEvent = () => {
		//const { start, end, title, eventId } = this.state
		// const updateEvent = { start: new Date(start), end: new Date(end), title: title, eventId: eventId }
		this.setState({ open: true })
	};

	handleDeleteEvent = id => {

		let deletedIndex = this.state.sheets.findIndex(sheet => sheet._id === id)
		if (deletedIndex > -1) {
			let updatedSheets = this.state.sheets
			updatedSheets.splice(deletedIndex, 1)
			this.setState({ sheets: updatedSheets })
			this.setState.handleClose()
		}
	}

	resetForm = () => {
		this.setState({
			jobname: '',
			companyName: '',
			industryDescription: '',
			numberOfEmployees: '',
			jobLink: '',
			hrLink: '',
			methodApplied: '',
			currentStatus: '',
		})
	}
	handleClose = () => {
		this.setState({ open: false });
		this.resetForm();
	};



	render() {

		const { classes } = this.props;

		return (
			<div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Update</DialogTitle>
					<DialogContent>
						<form id='jobForm' className={classes.formData} noValidate autoComplete="off">
							<TextField
								id="standard-title"
								label="Job Description"
								className={classes.textField}
								value={this.state.jobname}
								onChange={this.handleChange('jobname')}
								margin="normal"
							/>
							<TextField
								id="standard-company"
								label="Company"
								className={classes.textField}
								value={this.state.companyName}
								onChange={this.handleChange('companyName')}
								margin="normal"
							/>
							<TextField
								id="standard-industry"
								label="Industry"
								className={classes.textField}
								value={this.state.industryDescription}
								onChange={this.handleChange('industryDescription')}
								margin="normal"
							/>
							<TextField
								id="standard-select-number"
								select
								label="Number of employees"
								className={classes.textField}
								value={this.state.numberOfEmployees}
								onChange={this.handleChange('numberOfEmployees')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								margin="normal"
							>
								{numberOfEmployees.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="standard-jobLink"
								label="Link to Job Description"
								className={classes.textField}
								value={this.state.jobLink}
								onChange={this.handleChange('jobLink')}
								margin="normal"
							/>
							<TextField
								id="date"
								label="Date Applied"
								type="date"
								defaultValue="2017-05-24"
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="standard-hrLink"
								label="Link to HR email"
								className={classes.textField}
								value={this.state.hrLink}
								onChange={this.handleChange('hrLink')}
								margin="normal"
							/>
							<TextField
								id="standard-select-method"
								select
								label="How did you apply"
								className={classes.textField}
								value={this.state.methodApplied}
								onChange={this.handleChange('methodApplied')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								margin="normal"
							>
								{methodApplied.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="standard-select-status"
								select
								label="Status"
								className={classes.textField}
								value={this.state.currentStatus}
								onChange={this.handleChange('currentStatus')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								margin="normal"
							>
								{currentStatus.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</form>
					</DialogContent>
					<DialogActions>
						<Button variant="fab" color="primary" aria-label="Delete">
							<DeleteIcon onClick={this.handleDelete} />
						</Button>
						<Button onClick={this.handleClose} color="primary">
							Cancel
          </Button>
						<Button onClick={this.handleFormSubmit} color="primary">
							Save
          </Button>
					</DialogActions>
				</Dialog>
				<Grid container>
					<Grid item xs={12}>
						<Button aria-label="Create Event" style={{ color: '#546e7a', position: 'fixed', right: 30, bottom: 70, zIndex: 999 }} variant="fab" color="secondary"><AddIcon onClick={this.handleCreateEvent} /></Button>


					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.root}>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell>Edit</TableCell>
										<TableCell>Job Title</TableCell>
										<TableCell>Company</TableCell>
										<TableCell>Industry</TableCell>
										<TableCell>Company Size</TableCell>
										<TableCell>Link to Job Desc</TableCell>
										<TableCell>Link to HR</TableCell>
										<TableCell>Method Applied</TableCell>
										<TableCell>Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.sheets.map((sheet, i) => {
										// saved sheets are excluded from search terms
										if (sheet.item) {
											if (!sheet.item.search.some(x => x.toLowerCase().includes(this.state.excludeTerm)) || this.state.excludeTerm === '') {
												return (
													<SpreadSheetList
														key={i}
														site_link={sheet.item.site_link}
														_id={sheet.item._id}
														title={sheet.item.title}
														hr_link={sheet.item.hr_link}
														body={sheet.item.body}
														company={sheet.item.company}
														industry={sheet.item.industry}
														size={sheet.item.size}
														method={sheet.item.method}
														status={sheet.item.status}
														saved={false}
														onClick={this.handleCreateEvent}
													/>

												)
											}
										} else {
											return (
												<SpreadSheetList
													//onChange={this.handleDelete()}

													key={i}
													site_link={sheet.site_link}
													_id={sheet._id}
													title={sheet.title}
													hr_link={sheet.hr_link}
													body={sheet.body}
													company={sheet.company}
													industry={sheet.industry}
													size={sheet.size}
													method={sheet.method}
													status={sheet.status}
													saved={true}
													handleCreateEvent={this.handleCreateEvent}
												/>
											)
										}

										return null
									})}
								</TableBody>
								<TableFooter>

								</TableFooter>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

SpreadSheet.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpreadSheet);