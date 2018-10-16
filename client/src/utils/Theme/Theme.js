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
			default: "#E1E2E1"
		},
	},
	overrides: {
		
    	MuiTab: { // Name of the component ⚛️ / style sheet
			root: {
				backgroundColor: '#546e7a', 
				margin: '0px 0px 0px 1.5px', 
			},
      	textColorInherit: { // Name of the rule
				color: 'black', // Some CSS
			},
		},
				
  },
  });

  export default theme;