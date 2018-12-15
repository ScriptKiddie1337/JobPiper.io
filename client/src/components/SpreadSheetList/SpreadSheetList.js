import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase'
import api from '../../utils/API'
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
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

	state = {
		saved: this.props.saved,

	}

	componentWillReceiveProps(newProps) {

		this.props = newProps

		if (newProps.saved !== this.state.saved) {

			this.setState({ saved: newProps.saved })
		}
	}
	updateSheets = () => {
		console.log("yes")
		this.setState({ saved: true })
		api.getUserSpreadSheets({
			...this.props,
			saved: true,
			notes: '',
			dateSaved: Date.now()
		}, auth.getUserId())
	}

	handleDelete = () => {
		console.log('Unsaving job: ', this.props.title)
		this.setState({ saved: false })
		api.deleteSheet(this.props._id, auth.getUserId())
		this.updateSheets()
		this.props.deleteCallback(this.props._id)
	}
	
	render() {

		const { _id, site_link, title, hr_link, company, industry, size, method, status } = this.props
		function createMarkup(val) {
			return { __html: val };
		}
		return (

			<TableRow style={{ listStyleType: 'none' }}>
				<TableCell><Button id={_id} onClick={this.props.handleCreateEvent} ><CreateIcon /></Button></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(title)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(company)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(industry)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(size)} /></TableCell>
				<TableCell><a href={hr_link} dangerouslySetInnerHTML={createMarkup(hr_link)} /></TableCell>
				<TableCell><a href={site_link} dangerouslySetInnerHTML={createMarkup(site_link)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(method)} /></TableCell>
				<TableCell><h5 dangerouslySetInnerHTML={createMarkup(status)} /></TableCell>
			</TableRow>

		)
	}
}

export default withStyles(styles)(SpreadSheetList)