import React, {Fragment} from 'react';

// Material-UI
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    useScrollTrigger,
    Slide,
    Link,
    Menu,
    MenuItem,
    IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  return (
  <Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
          <AppBar>
          <Toolbar>
            <SimpleMenu/>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
          </Toolbar>
          </AppBar>
      </HideOnScroll>
      <Toolbar />
  </Fragment>
  )
}


function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link href='/home' color="inherit">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href='/client' color="inherit">Client</Link></MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
