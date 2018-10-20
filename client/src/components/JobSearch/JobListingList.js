import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save'
import { auth } from '../../firebase'
import api from '../../utils/API'
//import PropTypes from 'prop-types';

const styles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
});

class JobListingList extends Component {

	handleJobClick = () => {

		api.userSaveJob(this.state.jobId, auth.getUserId())
	}

	componentDidMount() {

		this.setState({ jobId: this.props._id })
	}

	render() {

		const { _id, image, title, link, keywords, body } = this.props
		const keywordsString = keywords.join(' | ')
		function createMarkup(val) {
			return { __html: val };
		}
		return (
			<Paper style={{ backgroundColor: '#FAFAFA', margin: '10px', border: 'solid 2px #819ca9', borderRadius: '5px' }}>
				<div key={_id} style={{ margin: '10px' }}>
					<Grid container>
						<Grid item xs={12} style={{ border: '#fdd835 solid 1px', backgroundColor: '#819ca9', padding: '10px', borderRadius: '5px' }}>
							<a href={link} target="_blank" style={{ textDecoration: 'none' }}>
								<img style={{ maxHeight: "50px" }} src={image} alt={title} />
								<h3 style={{ color: 'white' }} dangerouslySetInnerHTML={createMarkup(title)} />
							</a>
						</Grid>
						<Grid item xs={12}>
							<p style={{ border: '#546e7a solid 1px', backgroundColor: '#fdd835', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px', borderRadius: '5px' }}
								dangerouslySetInnerHTML={createMarkup(keywordsString)} />
						</Grid>
						<ExpansionPanel style={{ minWidth: '100%' }}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
								<Typography>Description</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid item xs={12} style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}
									dangerouslySetInnerHTML={createMarkup(body)} />
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<SaveIcon onClick={this.handleJobClick} />
					</Grid>
				</div>
			</Paper>
		)
	}
}

export default withStyles(styles)(JobListingList)