import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
	  primary: {
		light: '#819ca9',
		main: '#546e7a',
		dark: '#29434e',
		
	  },
	  secondary: {
		light: '#ffff6b',
		main: '#fdd835',
		dark: '#c6a700',
		
	  },
	  contrastThreshold: 3,
	  tonalOffset: 0.2,
		background: {
			default: "#546e7a"
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				borderBottom: '10px solid #fdd835',
			},
		},
    MuiTab: { // Name of the component ⚛️ / style sheet
			root: {
				backgroundColor: '#FFD740', 
				margin: '0px 0px 0px 20px', 
				borderRadius: '10px 10px 0px 0px',
				
			},
      textColorInherit: { // Name of the rule
				color: 'black', // Some CSS
			},
    },
  },
  });

  export default theme;