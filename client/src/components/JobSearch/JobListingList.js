import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import SavedIcon from '@material-ui/icons/StarRate'
import SaveIcon from '@material-ui/icons/Stars'
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
	}
});

class JobListingList extends Component {

	handleJobSave = () => {

		api.userSaveJob(this.props, auth.getUserId())
		this.setState({ saved: true })
	}

	handleJobUnsave = () => {
		api.userUnsaveJob(this.props._id, auth.getUserId())
		this.setState({ saved: false })
	}

	state = { saved: this.props.saved }

	componentWillReceiveProps(newProps) {

		if (newProps.saved !== this.state.saved) {

			this.setState({ saved: newProps.saved })
		}
	}

	render() {

		const { _id, image, title, link, keywords, body } = this.props
		const keywordsString = keywords.join(' | ')
		function createMarkup(val) {
			return { __html: val };
		}
		return (
			<Paper style={{ backgroundColor: '#FAFAFA', margin: '10px', border: 'solid 3px #819ca9', borderRadius: '5px' }}>
				<div key={_id} style={{ margin: '10px' }}>
					<Grid container>
						<Grid item xs={12} style={{ border: '#fdd835 solid 1px', backgroundColor: '#819ca9', padding: '10px', borderRadius: '5px' }}>
							<Grid container
								direction="row"
								justify="space-between"
								alignItems="center">
								<Grid item xs={1}
									style={{textAlign: 'center'}}>
									{
										this.state.saved
										? <SavedIcon onClick={this.handleJobUnsave} color="secondary" />
										: <SaveIcon onClick={this.handleJobSave} color='primary' />
									}
								</Grid>
								<Grid item xs={11}>
									<a href={link} target="_blank" style={{ textDecoration: 'none' }}>
									<Grid container
										direction="row"
										justify="space-between"
										alignItems="center">
										<Grid item xs={10} style={{ textAlign: "left" }}><h3 style={{ color: 'white' }} dangerouslySetInnerHTML={createMarkup(title)} />
										</Grid>
										<Grid item xs={2} ><img align="right" style={{ maxHeight: "50px" }} src={image} alt={title} />
										</Grid>
									</Grid>
									</a>
								</Grid>
							</Grid>
						</Grid>

						<ExpansionPanel style={{ minWidth: '95%', margin: '10px 10px 0px 10px'}}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
								<Typography dangerouslySetInnerHTML={createMarkup(keywordsString)} />
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid item xs={12} style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}
									dangerouslySetInnerHTML={createMarkup(body)} />
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
				</div>
			</Paper>
		)
	}
}

export default withStyles(styles)(JobListingList)