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
import moment from 'moment'

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
		id: '',
		title: '',
		site_link: '',
		hr_link: '',
		body: '',
		company: '',
		industry: '',
		method: '',
		status: '',
		image: '',
		note: [],
		contact: [],
		// form states
		jobname: '',
		companyName: '',
		industryDescription: '',
		jobLink: '',
		hrLink: '',
		methodApplied: '',
		currentStatus: '',
		dateApplied: '',
		saved: this.props.saved,
	};

	refreshSheets = () => {
		console.log('spreadsheet')
		fetch('/api/spreadSheet')
			.then(response => response.json())
			.then(x => this.setState({ sheets: x }))
			.catch(err => { throw new Error(err) });
	};

	componentDidMount() {
		this.refreshSheets()
	};

	// handle change for user input in modal form
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	// attempting to use a loading gif
	handleClickLoading = () => {
		this.setState(state => ({
			loading: !state.loading,
		}));
	};

	handleFormSubmit = event => {
		event.preventDefault();

		let title = document.getElementById("standard-title").value;
		let site_link = document.getElementById("standard-jobLink").value;
		let hr_link = document.getElementById("standard-hrLink").value;
		let company = document.getElementById("standard-hrLink").value;
		let industry = document.getElementById("standard-industry").value;
		let method = document.getElementById("standard-select-method").value;
		let status = document.getElementById("standard-select-status").value;
		let date = document.getElementById('date').value;
		
		let findId = this.state.id;
		var data = {
			title: title,
			site_link: site_link,
			hr_link: hr_link,
			company: company,
			industry: industry,
			method: method,
			status: status,
			date: date,
		};
	
		if (findId) {
			
			api.updateSheet(findId, data, auth.getUserId())
			.then(userSavedSheet => {
				this.refreshSheets(userSavedSheet)
			})
			
        } else {
		
			api.saveSheet(data, auth.getUserId())
			.then(userSavedSheet => {
				this.refreshSheets(userSavedSheet)
			})
			
		}
		
		this.handleClose();
		this.resetForm();
	};

	// Open modal for spreadsheet
	handleCreateEvent = (id) => {

		let findIndex = id.currentTarget.id;
		let sheetRow = this.state.sheets;

		//if there is an id, populate the form in the modal with the data. else open a blank modal
		if (findIndex) {
			id=findIndex
				for (let i = 0; i < sheetRow.length; i++) {
					if (sheetRow[i]._id === id) {
						this.setState({
							id: findIndex,
							jobname: sheetRow[i].title,
							companyName: sheetRow[i].company,
							industryDescription: sheetRow[i].industry,
							jobLink: sheetRow[i].site_link,
							hrLink: sheetRow[i].hr_link,
							dateApplied: sheetRow[i].date,
							methodApplied: sheetRow[i].method,
							currentStatus: sheetRow[i].status,
							date: sheetRow[i].date,
						});
					};
				};

				this.setState({ open: true });

		} else {

				this.setState({ 
					open: true, 
					id: ''
				});

		};

	};

	// Delete a spreadsheet row by id from database
	handleDelete = () => {
		let findId = this.state.id;

		this.setState({ sheets: this.state.sheets.filter(item => item._id !== findId) });
		api.deleteSheet(findId, auth.getUserId());

		this.handleClose();

	}

	// close modal
	handleClose = () => {
		this.setState({
			open: false
		});

		this.resetForm();
	};

	// reset modal form
	resetForm = () => {
		this.setState({
			jobname: '',
			companyName: '',
			industryDescription: '',
			jobLink: '',
			hrLink: '',
			methodApplied: '',
			currentStatus: '',
			dateApplied: ''
		})
	};

	formatDate = () => {
		
	}
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
								id='standard-title'
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
								defaultValue={moment().format('YYYY-MM-DD')}
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
						<Button 
							id={this.state.id} 
							variant="fab" 
							color="primary" 
							aria-label="Delete"
							
							>
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
										<TableCell>Date</TableCell>
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
														date={moment(sheet.item.date, 'YYYY/MM/DD').format('MM/DD/YYYY')}
														method={sheet.item.method}
														status={sheet.item.status}
														saved={false}
														deleteCallback={this.handleClose}
														handleCreateEvent={this.handleCreateEvent}
													/>

												)
											}
										} else {
											return (
												<SpreadSheetList
													key={i}
													site_link={sheet.site_link}
													_id={sheet._id}
													title={sheet.title}
													hr_link={sheet.hr_link}
													body={sheet.body}
													company={sheet.company}
													industry={sheet.industry}
													date={moment(sheet.date, 'YYYY/MM/DD').format('MM/DD/YYYY')}
													method={sheet.method}
													status={sheet.status}
													saved={true}
													deleteCallback={this.handleClose}
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