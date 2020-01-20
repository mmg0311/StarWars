import React from 'react';
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Dashboard from './Component/Dashboard/dashboard';
import { Route } from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  palette: {
    type: "dark"
  },
  root: {
    width: "70%",
    marginTop: theme.spacing(10),
    borderStyle: 'solid',
    margin: "auto",
    background: '#2B413C ',
  },
  root1: {
    width: "40%",
    marginTop: theme.spacing(10),
    borderStyle: 'solid',
    margin: "auto",
    background: '#2B413C ',
  },
  table: {
    margin: "auto",
    minWidth: 500,
  },
  tableRow: {

    cursor: "pointer",

  },
  tablecell: {
    color: "#FDF9FE "
  },
  icon: {
    color: "#FDF9FE",

  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    
  },
});



const sortTypes = {
  up: {
    fn: (a, b) => ((a.height - b.height))
  },
  down: {
    fn: (a, b) => ((b.height - a.height))
  },
  default: {
    fn: (a, b) => a
  },
  az:{
    fn: (a, b) => {
      if (a.name.toLowerCase() === b.name.toLowerCase()) {
        return 0;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return -1;
    }
  },
  za:{
    fn: (a, b) => {
      if (b.name.toLowerCase() === a.name.toLowerCase()) {
        return 0;
      }
      if (b.name.toLowerCase() > a.name.toLowerCase()) {
        return 1;
      }
      return -1;
    }
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      filtered_value:[],
    };
    this.page = 0;
    this.rowsPerPage = 5;
    this.emptyRows = 0;
    this.currentSort = 'default';
  }

  getCharacter = async i => {
    let { people } = this.state;
    let {filtered_value} = this.state;
    let res = await axios.get(`https://swapi.co/api/people/${i}/`);
    let r = await axios.get(res.data.homeworld);
    res.data.homeworld = r.data.name;
    people.push(res.data);
    filtered_value.push(res.data);
    this.setState({ people,filtered_value });
    this.emptyRows = this.rowsPerPage - Math.min(this.rowsPerPage, this.state.people.length - this.page * this.rowsPerPage);
    return res;
  };

  componentDidMount() {
    let ids = Array.from({ length: 10 }, (v, k) => k + 1)
    Promise.all(ids.map(id => this.getCharacter(id)))
  }
  handleChangePage = (event, newPage) => {
    this.page = newPage;
    this.setState({ ...this.state });
  }

  handleChangeRowsPerPage = event => {
    this.rowsPerPage = parseInt(event.target.value, 10);
    this.page = 0;
    this.setState({ ...this.state });
  }

  handleClick1 = index => event => {
    let i;
    index = this.page * this.rowsPerPage + index;
    let v = this.state.people[index].url.slice(28);
    i = v.substr(0, v.indexOf('/'));
    return (window.open(
      "http://localhost:3000/characters?ind=" + i,
      "_blank"
    ));

  }
  onSortChangeName = () => {
    let nextSort;
    if (this.currentSort === 'az') nextSort = 'za';
    else if (this.currentSort === 'za') nextSort = 'default';
    else if (this.currentSort === 'default') nextSort = 'az';
    else nextSort='za';
    this.currentSort = nextSort;
    this.setState({
      ...this.state,
    });
  };
  onSortChangeHeight = () => {
    let nextSort;
    if (this.currentSort === 'down') nextSort = 'up';
    else if (this.currentSort === 'up') nextSort = 'default';
    else if (this.currentSort === 'default') nextSort = 'down';
    else nextSort = 'down';
    this.currentSort =  nextSort;
    this.setState({
      ...this.state,
    });
  };

  handleChange = (event) =>{
    let { filtered_value } = this.state;
    let a = event.target.value;
    if(a.length === 0){
      filtered_value.push([...this.state.people]);
      this.setState({
        filtered_value,
        ...this.state
      })
      return;
    }
   
    filtered_value.length = 0;
    let filtered = this.state.people.filter(e=>e.name.includes(a) || e.homeworld.includes(a));

    filtered_value.push([...filtered]);
    this.setState({
      filtered_value,
      ...this.state, function() {
        this.loadGroupsFromQuery();}
    })
     console.log(this.state.filtered_value);
  }
  render() {
    const { classes } = this.props;
 
    return (
      <React.Fragment >
        <div>
          <Route
            component={() => (
              <Dashboard >
              </Dashboard>
            )}
          />
        </div>
        <br /><br />
        <Paper className={classes.root1}>
          <form className={classes.form} noValidate autoComplete="off"  style={{padding:"2%"}}>
            <TextField id="standard-basic" label="Search" style={{marginLeft:"35%"}} onChange={ this.handleChange }/>
          </form>
        </Paper>
        <Paper className={classes.root}>
          <Table className="table  ">
            <TableHead style={{ background: '#3D3340' }} >
              <TableRow>
                <TableCell align="center" className={classes.tablecell}>
                  Name
                  {
                    this.currentSort === 'default' || this.currentSort === 'up' || this.currentSort === 'down'? <AutorenewIcon onClick={this.onSortChangeName} className={classes.icon} /> : (this.currentSort === 'az' ?
                      <KeyboardArrowDownIcon onClick={this.onSortChangeName} className={classes.icon} /> :
                      <KeyboardArrowUpIcon onClick={this.onSortChangeName} className={classes.icon} />)
                  }
                </TableCell>
                <TableCell align="center" className={classes.tablecell}>Gender</TableCell>
                <TableCell align="center" className={classes.tablecell}>
                  Height
                  {
                    this.currentSort === 'default' || this.currentSort === 'za' || this.currentSort === 'az'? <AutorenewIcon onClick={this.onSortChangeHeight} className={classes.icon} /> : (this.currentSort === 'down' ?
                      <KeyboardArrowDownIcon onClick={this.onSortChangeHeight} className={classes.icon} /> :
                      <KeyboardArrowUpIcon onClick={this.onSortChangeHeight} className={classes.icon} />)
                  }
                </TableCell>
                <TableCell align="center" className={classes.tablecell}>Home World</TableCell>
                <TableCell align="center" className={classes.tablecell}>Birth Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {(this.rowsPerPage > 0 ? [...this.state.people].sort(sortTypes[this.currentSort].fn).slice(this.page * this.rowsPerPage, this.page * this.rowsPerPage + this.rowsPerPage) : this.state.people).map((s, index) => (
                <TableRow key={index} className={classes.tableRow} hover={true} onClick={this.handleClick1(index)}>
                  <TableCell component="th" scope="row" align="center" className={classes.tablecell}>
                    {s.name}
                  </TableCell>
                  <TableCell align="center" className={classes.tablecell}>{s.gender}</TableCell>
                  <TableCell align="center" className={classes.tablecell}>{s.height}</TableCell>
                  <TableCell align="center" className={classes.tablecell}>{s.homeworld}</TableCell>
                  <TableCell align="center" className={classes.tablecell}>{s.birth_year}</TableCell>
                </TableRow>
              ))}

            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={this.state.people.length}
                  rowsPerPage={this.rowsPerPage}
                  page={this.page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(App);
