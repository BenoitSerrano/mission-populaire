import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f5e30f',
            dark: '#ebd90e',
        },
        secondary: {
            main: '#571AFF',
        },

        warning: { main: '#e87a00', light: '#f5b44d' },
        common: { black: '#12002c' },
        background: { default: '#ffffff', paper: '#ffffff' },
        divider: '#e6e6e6',
    },
    spacing: (value: number) => value * 8,
    typography: {
        button: {
            fontWeight: 'bold',
            textTransform: 'none',
        },
        fontFamily: ['poppins', 'Trebuchet MS'].join(','),
        h1: {
            fontSize: '2rem',
            fontWeight: 'normal',
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 'normal',
        },
        h3: {
            fontSize: '1.2rem',
            fontWeight: 'normal',
        },
        h4: {
            fontSize: '1.1rem',
            fontWeight: 'normal',
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 'normal',
        },
        h6: {
            fontSize: '0.9rem',
            fontWeight: 'normal',
        },
    },
});

export { theme };
