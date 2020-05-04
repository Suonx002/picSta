import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    textDecoration: 'none',
    color: theme.palette.common.black,
  },
  form: {
    border: `1px solid ${theme.palette.common.greyLight}`,
    padding: '0.2rem 0.5rem',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: '0.3rem',
  },

  profile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLink: {
    marginRight: '1rem',
    color: theme.palette.common.black,
  },
  avatar: {
    width: 30,
    height: 30,
  },
}));
