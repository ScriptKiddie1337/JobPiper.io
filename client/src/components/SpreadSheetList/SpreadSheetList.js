import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
// import moment from 'moment'

//import PropTypes from 'prop-types';

const styles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,

	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	
});

class SpreadSheetList extends Component {

	state = {
		saved: this.props.saved,
	}
	
	componentWillReceiveProps(newProps) {
		
		this.props = newProps
		
		if (newProps.saved !== this.state.saved) {
			
			this.setState({ saved: newProps.saved })
		}
	}
	
	
	render() {
		
		const { _id, site_link, title, hr_link, company, date, industry, method, status } = this.props
		function createMarkup(val) {
			return { __html: val };
		}
		return (

			<TableRow style={{ listStyleType: 'none' }}>
				<TableCell style={{ padding: '10px' }}><Button id={_id} onClick={this.props.handleCreateEvent} ><CreateIcon /></Button></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(title)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(company)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(industry)} /></TableCell>
				{/* <TableCell><h5 dangerouslySetInnerHTML={createMarkup(size)} /></TableCell> */}
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(date)} /></TableCell>
				<TableCell><a href={hr_link} dangerouslySetInnerHTML={createMarkup(hr_link)} /></TableCell>
				<TableCell><a href={site_link} dangerouslySetInnerHTML={createMarkup(site_link)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(method)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(status)} /></TableCell>
			</TableRow>

		)
	}
}

export default withStyles(styles)(SpreadSheetList)