import { grey, blue, purple, red, orange } from './colors';


const palette = {
  grey,

  text: {
    primary: grey[800],
    secondary: grey[400],
  },

  action: {
    hover: grey[200],
    selected: grey[200],
  },

  neutral: {
    lighter: grey[50],
    light: grey[300],
    main: grey[500],
    dark: grey[800],
    darker: grey[900],
    contrastText: '#fff',
  },

  primary: {
    lighter: blue[50],
    light: blue[300],
    main: blue[500],
    dark: blue[800],
  },

  secondary: {
    lighter: purple[50],
    light: purple[300],
    main: purple[500],
  },

  error: {
    lighter: red[50],
    light: red[300],
    main: red[500],
    dark: red[800],
  },

  warning: {
    lighter: orange[50],
    light: orange[300],
    main: orange[500],
    dark: orange[800],
    darker: orange[900],
    contrastText: '#fff',
  },
};

export default palette;
