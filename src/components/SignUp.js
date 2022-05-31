import React, {useEffect, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useAuth} from "../contexts/AuthContext";
import {useHistory, Link} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Copyright from "./Copyright";
import useStyles from './theme';
import db from "../Firebase";
import 'date-fns';
import {v4 as uuidv4} from "uuid";
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfRef = useRef();
    const nameRef = useRef();
    const name2Ref = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const classes = useStyles();

    const ref = db.firestore().collection("doctors");

    useEffect(() => {
        document.title = 'Zarejestruj się';
        document.body.style.backgroundColor = 'white';
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const newId = uuidv4();

        if (passwordRef.current.value !== passwordConfRef.current.value)
            return setError("Hasła nie są takie same");

        const newUser = {
            email: emailRef.current.value,
            firstName: nameRef.current.value,
            lastName: name2Ref.current.value,
            id: newId,
            }

        try {
            setError("");
            setLoading(true);

            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");
            ref.doc(newUser.id).set(newUser).catch((err) => { console.error(err); });

        } catch {
            setError("Błąd rejestracji")
        }

        console.log(error);

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

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zarejestruj się
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={nameRef}
                                variant="outlined"
                                required
                                fullWidth
                                id="name1"
                                label="Imię"
                                name="name1"
                                autoComplete="name1"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={name2Ref}
                                variant="outlined"
                                required
                                fullWidth
                                id="name2"
                                label="Nazwisko"
                                name="name2"
                                autoComplete="name2"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={emailRef}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={passwordRef}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={passwordConfRef}
                                variant="outlined"
                                required
                                fullWidth
                                name="password-confirm"
                                label="Powtórz hasło"
                                type="password"
                                id="password-confirm"
                            />
                        </Grid>
                        
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        style={{backgroundColor: '#315C9C', color: 'white'}}
                        className={classes.submit}
                        disabled={loading}
                    >
                        Zarejestruj się
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signin">
                                Masz już konto? Zaloguj się
                            </Link>
                        </Grid>
                    </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
        </div>
    );
}

export default SignUp;