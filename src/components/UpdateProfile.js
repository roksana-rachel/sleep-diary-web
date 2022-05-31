import React, {useRef, useState, useEffect} from "react"
import {useAuth} from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import useStyles from './theme';
import Alert from "@material-ui/lab/Alert";
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';


const UpdateProfile = () => {

    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updatePassword, logout} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Zmień hasło';
        document.body.style.backgroundColor = 'white';
    }, []);

    async function handleLogout() {
        setError("")

        try {
            await logout();
            history.push("/signin");
        } catch {
            setError("Wystąpił błąd podczas wylogowania");
        }
    };

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Hasła nie są takie same");
        }

        const promises = [];
        setLoading(true);
        setError("");

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setError("Nie udało się zmienić hasła");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
<div>

<AppBar position="static">
    <Toolbar variant="dense" className={classes.navbar}>
        <img src={image} alt="logo" width='60px' height='60px'/>
        <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography variant="h6"  className={classes.title}>
                Dziennik Snu</Typography>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6"  className={classes.title}>
                Lista pacjentów</Typography>
                </Link>
                <Link to="/add" style={{ textDecoration: 'none' }}>
            <Typography variant="h6"  className={classes.title}>
                Dodaj pacjenta</Typography>
                </Link>
                <Link to="/update-profile" style={{ textDecoration: 'none' }}>
            <Typography variant="h6"  className={classes.title}>
                Zmień hasło</Typography>
                </Link>
            <Typography variant="h6"  className={classes.title}>
                </Typography>
                <Button variant="link" onClick={handleLogout}
                    maxWidth="30px"
                    variant="contained"
                    color="secondary"
                    style={{marginTop: "15px", marginBottom: "15px"}}
            >
                Wyloguj się
            </Button>
    </Toolbar>
</AppBar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Zmień hasło
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Typography component="h1" variant="h6" className={classes.forPass}>
                            dla {currentUser.email}
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Grid item xs={12}>
                            <TextField
                                inputRef={passwordRef}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Hasło"
                                name="password"
                                type="password"
                                autoComplete="password"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={passwordConfirmRef}
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
                            Zmień hasło
                        </Button>
                    </form>

                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            </div>
            );
        </>
    )
}
export default UpdateProfile;