import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: "#22a0b1",
        light: "#6bd9e8"
        },
        secondary: {
        main: "#4a4f53",
        },
    },
    typography:{
        h6: {
            fontSize: "0.8rem"
        }
    }
});

export default theme;