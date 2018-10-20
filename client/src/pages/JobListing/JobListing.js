import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import JobListingList from '../../components/JobSearch/JobListingList'
//import AdvancedSearch from '../../components/JobSearch/AdvancedSearch'
import { Input, Button } from "@material-ui/core";
//import API from '../../utils/API'
import Fuse from 'fuse.js';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import LocationSelector from '../../components/LocationSelector'
import API from "../../utils/API";


const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5,
	},


});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};

	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1);
	};

	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
		);
	};

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;

		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page"
				>
					{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page"
				>
					{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
	TablePaginationActions,
);


const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 500,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});

class JobListing extends Component {
	state = {
		jobs: [],
		note: [],
		contact: [],
		searchTerm: '',
		excludeTerm: '',
		page: 0,
		rowsPerPage: 5,
		// location selector id's
		selectedCountryID: 231,
		countries: [],
		selectedRegionID: 0,
		regions: [],
		region:'',
		selectedCityID: 0,
		cities: [],
		city:''

		// ! add persistent search and exclude arrays
	};


	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	fuse(list) {
		const options = {
			shouldSort: true,
			tokenize: true,
			matchAllTokens: true,
			findAllMatches: true,
			includeScore: true,
			// threshold, location and distance are ignored if tokenize is set to true
			// threshold: 0.6,
			// location: 0,
			// distance: 100,
			maxPatternLength: 64,
			minMatchCharLength: 5,
			keys: ["search", "item.search"]
		};
		let fuse = new Fuse(list, options);
		let res = fuse.search(`${this.state.searchTerm} ${this.state.city} ${this.state.region}`);
		return res;
	}

	componentDidMount() {
		fetch('/api/jobs')
			.then(response => response.json())
			.then(data => this.fuse(data))
			.then(x => this.setState({ jobs: x },
				// () => console.log(this.state.jobs)
			));
		fetch('/api/loc/state/' + this.state.selectedCountryID)
			.then(response => response.json())
			.then(data => this.setState({ regions: data.map(x => ({ value: x.name, label: x.name, id: x.id })) },
				// () => console.log(this.state.states)
			));
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleRegionChange = async (event) => {
		this.setState({
			region: event.value
		});
		await this.setState({
			selectedRegionID: event.id
		} //, () => console.log('new input: ', this.state.searchTerm)
		)
		await fetch('/api/loc/city/' + this.state.selectedRegionID)
			.then(response => response.json())
			.then(data => this.setState({ cities: data.map(x => ({ value: x.name, label: x.name, id: x.id })) },
				// () => console.log('cities: ', data)
			));
	}
	handleCityChange = event => {
		this.setState({
			city: event.value
		});
	}

	handleFormSubmit = event => {
		// console.log(this.state)
		event.preventDefault();
		API.scrape((this.state.searchTerm === '' ? '+': this.state.searchTerm), 
					(this.state.city === '' ? '+': this.state.city), 
					(this.state.region === '' ? '+': this.state.region))
		.catch(error => {
			console.log(error.response)
		});
		fetch('/api/jobs')
			.then(response => response.json())
			.then(data => this.fuse(data))
			.then(x => this.setState({ jobs: x }))
			// API.getJobTerm(this.state.searchTerm.replace(/' '/g, '+'))
			// .then(res => this.fuse(res.data), (res) => console.log('data fused: ', res.data))
			// .then(x => this.setState({ jobs: x }), () => console.log(this.state.jobs))
			.catch(err => { throw new Error(err) });
	};

	render() {
		const { classes } = this.props;
		const { jobs: rows, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

		// let currentSearch = this.fuse(this.state.jobs)
		// console.log('Result Count: ',currentSearch.length)

		return (
			<div style={{ padding: '20px', borderRadius: '5px' }}>
				<div style={{ padding: '20px', backgroundImage: "url('../../images/boardroom-ss.jpeg')", width: '100%', height: '100%', backgroundSize: 'cover', borderRadius: '5px' }}>
					<Grid container spacing={24} alignItems='center'>
						<Grid item xs={12} md={6}>
							<form onSubmit={this.handleFormSubmit}>
								<Input
									name='searchTerm'
									value={this.state.searchTerm}
									onChange={this.handleInputChange}
									placeholder='Search keywords...'
									style={{ width: '100%', opacity: .9, backgroundColor: 'white', borderRadius: '2px', padding: '10px' }}
								/>
							</form>
						</Grid>
						<Grid fullwidth="true" item xs={12} md={6}>
							<Input
								name='excludeTerm'
								value={this.state.excludeTerm}
								onChange={this.handleInputChange}
								placeholder='Exclude keywords...'
								style={{ opacity: .9, width: '100%', backgroundColor: 'white', borderRadius: '2px', padding: '10px' }}
							/>
						</Grid>
						<Grid item xs={12}>
						</Grid>
						<Grid item xs={12} >
							{/* <LocationSelector 
								options={ this.state.countries } 
								placeholder='Select Country' /> */}
							<LocationSelector
								options={this.state.regions}
								placeholder='Select State/Region'
								onChange={this.handleRegionChange}
							/>
							<LocationSelector
								options={this.state.cities}
								placeholder='Select City' 
								onChange={ this.handleCityChange }
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<Button fullwidth="true" onClick={this.handleFormSubmit} type='success' style={{ backgroundColor: '#fdd835', padding: '10px', height: '50px' }}>Search</Button>
						</Grid>
					</Grid>
				</div>
				<br />
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TablePagination
									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActionsWrapped}
								/>
							</TableRow>
						</TableHead>
						<TableBody>

							{this.state.jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, i) => {
								// console.log(job.item.title, job.score)
								if (!job.item.search.some(x => x.toLowerCase().includes(this.state.excludeTerm)) || this.state.excludeTerm === '') {
									return (
										<TableRow key={i} style={{ listStyleType: 'none', padding: '5px', margin: '0px' }}>

											<TableCell component="th" scope="row" style={{ padding: '0px' }}>
												<JobListingList
													link={job.item.link}
													_id={job.item._id}
													title={job.item.title}
													keywords={job.item.keywords}
													body={job.item.body}
													image={job.item.image}
												/>
											</TableCell>
										</TableRow>
									)
								}
								return null
							})}

							{emptyRows > 0 && (
								<TableRow style={{ height: 48 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination

									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActionsWrapped}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		);
	}
}


JobListing.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(JobListing);
