import React, { Fragment } from 'react'

//************************************** Props MAteria-UI ***************************************
import PropTypes from 'prop-types'

//************************************ Components MAteria-UI ************************************
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Slide,
  makeStyles,
  IconButton,
  Typography
} from '@material-ui/core'

//************************************** Icons MAteria-UI ***************************************
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

//****************************************** Styles  ********************************************
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

//**************************************** Components *******************************************
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

//********************************************* Components *********************************************
export default function HideAppBar(props) {
  const classes = useStyles();

  return (
    <Fragment >
      <CssBaseline />
      <HideOnScroll {...props}>
        <div className={classes.root}>
          <AppBar>
            <Toolbar>

              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href='/home'>
                <HomeIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                ClusteringMap
              </Typography>

              <IconButton className={classes.menuButton} color="inherit" aria-label="add" href='/restaurant/new'>
                <AddIcon/>
              </IconButton>

              <IconButton className={classes.menuButton} color="inherit" aria-label="about" href='/about'>
                <InfoIcon/>
              </IconButton>

            </Toolbar>
          </AppBar>
        </div>
      </HideOnScroll>
      <Toolbar />
    </Fragment>
  );
}