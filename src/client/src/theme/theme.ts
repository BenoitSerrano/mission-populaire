import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            light: '#A288A6',
            dark: '#654F69',
            main: '#89678C',
        },
        mode: 'dark',
        secondary: {
            main: '#001C55',
        },

        warning: { main: '#e87a00', light: '#f5b44d' },
        common: { black: '#12002c' },
        background: { default: '#21004c', paper: '#432a63' },
        divider: '#C8B9CA',
    },
    spacing: (value: number) => value * 8,
    typography: {
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
