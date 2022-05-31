import React, {useEffect, useRef, useState} from "react"
import {useAuth} from "../contexts/AuthContext"
import {Link} from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import useStyles from './theme';
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';


const ForgotPassword = () => {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Zresetuj hasło';
        document.body.style.backgroundColor = 'white';
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Sprawdź swoją skrzynkę pocztową!");
        } catch {
            setError("Wystąpił błąd");
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

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zresetuj hasło
                </Typography>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        style={{backgroundColor: '#315C9C', color: 'white'}}
                        className={classes.submit}
                    >
                        Zresetuj hasło
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signin">
                                Zaloguj się
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
        </div>
    )
}

export default ForgotPassword;