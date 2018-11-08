import React, { Component } from "react";
import { Grid } from '@material-ui/core';
import SpreadSheetList from '../../components/SpreadSheetList';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

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
    contact: []
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

		
    return (
      <div>
			<Grid container>
				<Grid>
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
              }
              else {
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

export default SpreadSheet;