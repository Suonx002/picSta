import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  AppBar,
  Toolbar,
  InputBase,
  InputAdornment,
  FormControl,
  Avatar,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import useStyles from '../styles/NavbarStyles';

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppBar
      elevation={0}
      style={{
        borderBottom: `1px solid ${theme.palette.common.greyLight}`,
      }}>
      <Container maxWidth='md'>
        <Toolbar className={classes.appbar}>
          <a href='#' className={classes.logo}>
            picSta
          </a>

          <FormControl className={classes.form}>
            <InputBase
              placeholder='Search'
              inputProps={{ 'aria-label': 'search' }}
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              }
            />
          </FormControl>

          <div className={classes.profile}>
            <Link to='/' className={classes.profileLink}>
              <HomeOutlinedIcon />
            </Link>
            <Link to='/' className={classes.profileLink}>
              <TelegramIcon />
            </Link>
            <Link to='/' className={classes.profileLink}>
              <ExploreOutlinedIcon />
            </Link>
            <Link to='/' className={classes.profileLink}>
              <FavoriteBorderOutlinedIcon />
            </Link>
            <Link to='/' className={classes.profileLink}>
              <Avatar
                className={classes.avatar}
                alt='profile-image'
                src='https://images.unsplash.com/photo-1588342698151-9616728f21c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=651&q=80'
              />
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
