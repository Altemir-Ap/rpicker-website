import React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import useStyles from './useStyles';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const MyDrawer = () => {
  const classes = useStyles();
  const { signOut } = useAuth();

  const location = useLocation().pathname;

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Home', 'Amount', 'Add User', 'Logout'].map((text, index) => (
          <Link
            to={
              text === 'Home'
                ? '/home'
                : text === 'Amount'
                ? '/amount'
                : '/newuser'
            }
            style={{
              textDecoration: 'none',
              color: '#000000DE',
            }}
            key={index}
          >
            {text === 'Home' ? (
              <ListItem
                button={true}
                key={text}
                selected={location === '/home'}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ) : text === 'Amount' ? (
              <ListItem
                button={true}
                key={text}
                selected={location === '/amount'}
              >
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ) : text === 'Add User' ? (
              <ListItem
                button={true}
                key={text}
                selected={location === '/newuser'}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ) : (
              <ListItem
                button={true}
                key={text}
                onClick={text === 'Logout' ? signOut : () => {}}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )}
          </Link>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default MyDrawer;
