import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import SpreadSheetList from '../../components/SpreadSheetList';
//import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	textField: {
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
  });

const numberOfEmployees = [
	{
	  value: '100',
	  label: '100',
	},
	{
	  value: '1000',
	  label: '1,000',
	},
	{
	  value: '5000',
	  label: '5,000',
	},
	{
	  value: '10000',
	  label: '10,000',
	},
  ];

  const methodApplied = [
	{
	  value: 'online',
	  label: 'Online',
	},
	{
	  value: 'person',
	  label: 'In person',
	},
	{
	  value: 'network',
	  label: 'Networking event',
	},
	{
	  value: 'referral',
	  label: 'Referral',
	},
	{
	  value: 'linkedin',
	  label: 'Linked In referral',
	},
	{
	  value: 'hremail',
	  label: 'HR cold email',
	},
	{
	  value: 'other',
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
	  label: 'No offer',
	},
  ];

class SpreadSheet extends Component {
  state = {
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

  updateSheets = () => {

	fetch('/api/spreadSheet')
    .then(response => response.json())
    .then(x => this.setState({ sheets: x}))
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

    fetch('/api/spreadSheet')
    .then(response => response.json())
    .then(x => this.setState({ sheets: x}))
    .catch(err => { throw new Error(err) });
  };

  render() {

	  const { classes } = this.props;
		
    return (

      <div>
			<Grid container>
				<Grid item xs={12}>
				<form noValidate autoComplete="off">
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
				</Grid>
				<Grid item xs={12}>
						<Button>Submit</Button>
				</Grid>
				<Grid item xs={12}>
  					<Table>
              			<TableHead>
                			<TableRow>
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
                    						size={sheet.size}
                    						method={sheet.method}
                    						status={sheet.status}
                    						saved={false}
                    					/>
                					)
              					}

              						return null
            				})}
              			</TableBody>
              			<TableFooter>
                  			<TableRow>
                    			<TableCell>
                    				<Button fullwidth="true" onClick={this.handleFormSubmit} type='success' style={{ backgroundColor: '#fdd835', padding: '10px', height: '50px' }} >Search</Button>
                    			</TableCell>
                  			</TableRow>
            			</TableFooter>
            		</Table>
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