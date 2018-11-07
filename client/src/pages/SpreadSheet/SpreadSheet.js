import React, { Component } from "react";
import { Grid } from '@material-ui/core';
import SpreadSheetList from '../../components/SpreadSheetList';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


class SpreadSheet extends Component {
  state = {
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

  componentDidMount() {
    // this.loadSpreadSheet();
  }
;

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  };

  render() {

		
    return (
      <div>
			<Grid container>
				<Grid>
  					<Table>
              <TableHead>
                <TableRow>
                  <h2>Tracker</h2>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.state.sheets.map((sheet, i) => {
								// saved sheets are excluded from search terms
								if (sheet.item) {
									if (!sheet.item.search.some(x => x.toLowerCase().includes(this.state.excludeTerm)) || this.state.excludeTerm === '') {
                    return (
                <TableRow key={i} style={{ listStyleType: 'none' }}>
                  <TableCell component="th" scope="row" style={{ padding: '0px' }}>
                    <SpreadSheetList
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
                      company={sheet.item.company}
                      saved={false}
                    />
                  </TableCell>
                </TableRow>
                    )
                }
              }
              else {
                return (
                  <TableRow key={i} style={{ listStyleType: 'none', margin: '0px' }}>

                    <TableCell component="th" scope="row" style={{ padding: '0px' }}>
                      <SpreadSheetList
                        link={sheet.link}
                        _id={sheet._id}
                        title={sheet.title}
                        keywords={sheet.keywords}
                        body={sheet.body}
                        image={sheet.image}
                        saved={true}
                      />
                    </TableCell>
                  </TableRow>
                )
              }

              return null
            })}
              </TableBody>
            </Table>
				</Grid>
			</Grid>
			<Grid>
				<Paper style={{ border: '#fdd835 solid 2px'}}>
        SpreadSheet go here!!!
				</Paper>
			</Grid>
	  </div>
    );
  }
}

export default SpreadSheet;