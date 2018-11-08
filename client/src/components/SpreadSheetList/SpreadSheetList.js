import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase'
import api from '../../utils/API'
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
//import PropTypes from 'prop-types';

const styles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	}
});

class SpreadSheetList extends Component {

	handleSheetSave = () => {

		this.setState({ saved: true })
		api.userSaveSheet({
			...this.props,
			saved: true,
			notes: '',
			dateSaved: Date.now()
		}, auth.getUserId())
	}
//change to delete row
	// handleJobUnsave = () => {
	// 	console.log('Unsaving job: ', this.props.title)
	// 	this.setState({ saved: false })
	// 	api.userUnsaveJob(this.props._id, auth.getUserId())
	// }

	state = { saved: this.props.saved }

	componentWillReceiveProps(newProps) {

		this.props = newProps

		if (newProps.saved !== this.state.saved) {

			this.setState({ saved: newProps.saved })
		}
	}

	render() {

		const { _id, site_link, title, hr_link, company, industry, size, method, status } = this.props
		function createMarkup(val) {
			return { __html: val };
		}
		return (
			
				<TableRow  style={{ listStyleType: 'none' }}>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(title)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(company)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(industry)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(size)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(hr_link)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(site_link)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(method)} /></TableCell>
					<TableCell><h5 dangerouslySetInnerHTML={createMarkup(status)} /></TableCell>
				</TableRow>
		
		)
	}
}

export default withStyles(styles)(SpreadSheetList)