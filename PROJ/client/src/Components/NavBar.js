import React, {useContext} from 'react';
import AuthContext from '../Contexts/AuthContext'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  
  const history = useHistory();
  const {user, handleLogout} = useContext(AuthContext);
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logout = () => {
      handleClose();
      handleLogout();
  };

 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
      handleClose();
      history.push('/auth/login');
  };

  const handleRegister = () => {
      handleClose();
      history.push('/auth/register');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SPE PROJECT
          </Typography>
          <Button color="inherit" onClick={() => history.push('/category')}>
            Categories
          </Button>


          {user ? 
             (
                <div>
                <Button
                  onClick={handleMenu}
                  color="inherit"
                >
                  {user.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logout}>Logout</MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                </Menu>
              </div>
             )
                :
                (
                    <div>
                    <Button
                      onClick={handleMenu}
                      color="inherit"
                    >
                      Account
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleLogin}>Login</MenuItem>
                      <MenuItem onClick={handleRegister}>Register</MenuItem>
                    </Menu>
                  </div>
                 )}


          {/* {auth && (
         
          )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
