import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
export default class JobListingList extends Component {

  render() {
	
    const { _id, image, title, link, keywords, body } = this.props
    const keywordsString = keywords.join(' | ')
      function createMarkup(val) {
        return {__html: val };
      }
    return (
      <Paper style={{backgroundColor: '#FAFAFA', margin: '10px', border: 'solid 2px #819ca9', borderRadius: '5px'}}>
      <div key={_id} style={{margin: '10px'}}>
        <Grid container>
			<Grid item xs={12} style={{ border: '#fdd835 solid 1px', backgroundColor: '#819ca9', padding: '10px', borderRadius: '5px'}}>
          		<a href={ link } target="_blank" style={{textDecoration: 'none'}}>
          			<img style={{ maxHeight:"50px" }} src={ image } alt={ title } />
          				<h3 style={{color: 'white'}}dangerouslySetInnerHTML={createMarkup(title)} />
				</a>
		  	</Grid>
			  <Grid item xs={12}>
            <p style={{border: '#546e7a solid 1px', backgroundColor: '#fdd835', paddingLeft: '5px', paddingRight: '5px', marginLeft: '5px', marginRight: '5px', borderRadius: '5px'}}
            dangerouslySetInnerHTML={ createMarkup(keywordsString) } />
			</Grid>
            <Grid item xs={12} style={{paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px'}} 
            dangerouslySetInnerHTML={createMarkup(body)} />
        </Grid>  
      </div>
      </Paper>
    )
  }
}