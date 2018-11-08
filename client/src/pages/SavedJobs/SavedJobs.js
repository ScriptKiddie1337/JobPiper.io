import React, { Component } from "react";
import PropTypes from 'prop-types';
import SavedJobListing from '../../components/SavedJobListing'
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
import API from "../../utils/API";
import { auth } from '../../firebase';

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
	
	tableWrapper: {
		overflowX: 'auto',
	},
});

class SavedJobs extends Component {
	state = {
		jobs: [],
		page: 0,
		rowsPerPage: 5,

		// ! add persistent search and exclude arrays
	};


	handleChangePage = (event, page) => {
		this.setState({ page });

		// Need to update jobs after page change so can reflect 
		// changes to jobs user saved on a page
		this.updateJobs()
	};

	handleChangeRowsPerPage = event => {

		this.setState({ rowsPerPage: event.target.value });

		// Need to update jobs after page change so can reflect 
		// changes to jobs user saved on a page
		this.updateJobs()
	};


	updateJobs = () => {

		API.getUserJobs(auth.getUserId())
			.then(userSavedJobs => {
				this.setState({ jobs: userSavedJobs.data });
			});

	}

	componentDidMount() {

		this.updateJobs()
	}

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

	render() {
		const { classes } = this.props;
		const { jobs: rows, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

		return (
			<div style={{ borderRadius: '5px' }}>

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
								return (
									<TableRow key={i} style={{ listStyleType: 'none' }}>

										<TableCell component="th" scope="row" style={{ padding: '0px' }}>
											<SavedJobListing
												link={job.link}
												_id={job._id}
												title={job.title}
												keywords={job.keywords}
												body={job.body}
												image={job.image}
												description={job.description}
												saved={true}
											/>
										</TableCell>
									</TableRow>
								)
							})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 48 * emptyRows }}>
									<TableCell colSpan={6} 
									component="th" scope="row" style={{ padding: '0px' }}/>
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


SavedJobs.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SavedJobs);
