import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#005BAA',
        },
        secondary: {
          main: '#E2001A',
        },
        background: {
          default: '#F8F9FA',
        },
        info: {
          main: '#2ad833',
          contrastText: "#fff"
        },
      },
});

