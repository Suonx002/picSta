import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const primaryColor = '#ffffff';
const secondaryColor = '#000000';
const greyLight = '#DBDBDB';

export default createMuiTheme({
  palette: {
    common: {
      greyLight,
    },
    primary: {
      main: primaryColor,
    },
    secondaryColor: {
      main: secondaryColor,
    },
  },
});
