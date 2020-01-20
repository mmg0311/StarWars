import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:"#4C3154 ",
    alignItems:"center",
  },
}));

function PermanentDrawerLeft(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          <Typography variant="h5" noWrap >
            {/* <div className="col-lg-1">
             <img src="/star.jpg" alt="star wars" height="60" width="100"></img>
            </div> */}
            STAR WARS
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PermanentDrawerLeft;