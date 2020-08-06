import { createMuiTheme } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: grey,
  },
});
