import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import MyDrawer from '../../components/Drawer';
import useStyles from '../../components/Drawer/useStyles';
import { useLocation, Link } from 'react-router-dom';

import Main from './Main';
import Amount from '../Amount';
import AddUser from '../AddUser';

const Home = (props) => {
  const { window } = props;
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation().pathname;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  var title;
  var content;
  if (location === '/home') {
    title = 'Rubish Picker';
    content = <Main />;
  } else if (location === '/amount') {
    title = 'Amount';
    content = <Amount />;
  } else {
    title = 'Add User';
    content = <AddUser />;
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <MyDrawer />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <MyDrawer />
            </Drawer>
          </Hidden>
        </nav>
        {content}
      </div>
    </>
  );
};

export default Home;
