import React, {useRef, useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Copyright from "./Copyright";
import useStyles from './theme';
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';

const SignIn = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Zaloguj się';
        document.body.style.backgroundColor = 'white'; 
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Błąd logowania!")
        }

        setLoading(false);

    }


    return (
        <div>

            <AppBar position="static">
                <Toolbar variant="dense" className={classes.navbar}>
                    <img src={image} alt="logo" width='60px' height='60px'/>
                    <Typography variant="h6"  className={classes.title}>
                            Dziennik Snu</Typography>
                        <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6"  className={classes.title}>
                            Zaloguj się</Typography>
                            </Link>
                </Toolbar>
            </AppBar>

            <div className={classes.welcome}>
                <Typography component="h1" variant="h4" className={classes.title2}>
                    Witaj w Dzienniku Snu!
                </Typography>
                <Typography component="h1" variant="h5">
                   Śledź dzienniki snu swoich pacjentów
                </Typography>
            </div>

        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zaloguj się
                </Typography>
                {error && <Alert variant="error">{error}</Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        inputRef={emailRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        inputRef={passwordRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        style={{backgroundColor: '#315C9C', color: 'white'}}
                        className={classes.submit}
                    >
                        Zaloguj się
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgot-password">
                                Zapomniałeś hasła?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                Zarejestruj się
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
        </div>
    );
};

export default SignIn;