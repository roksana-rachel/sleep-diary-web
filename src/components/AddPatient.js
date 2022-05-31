import React, {useEffect, useRef, useState} from 'react';
import db from '../Firebase';
import {Link, useHistory} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./theme";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import {useAuth} from "../contexts/AuthContext";
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';
import Alert from '@material-ui/lab/Alert';
import generator from 'generate-password';

const SnapshotFirebase = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const name2Ref = useRef();
    const {signup} = useAuth();

    const [error, setError] = useState("");
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const {currentUser, logout, login} = useAuth()

    const ref = db.firestore().collection("patients");
    const ref2 = db.firestore().collection("doctors");

    const classes = useStyles();

    const password = generator.generate({
        length: 7,
        numbers: true
    });


    useEffect(() => {
        document.title = 'Dodaj pacjenta';
        document.body.style.backgroundColor = 'white';
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const emailD = currentUser.email;
        const docId="";

        db.firestore().collection("doctors").where("email", "==", emailD)
        .get()
        .then(function(doc) {
            if (doc.exists) {
            console.log("Document data:", doc.data());
            const docId = doc.data().get(0).id;
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        const newUser = {
            email: emailRef.current.value,
            emailDoctor: emailD,
            firstName: nameRef.current.value,
            lastName: name2Ref.current.value,
            id: uuidv4(),
            doctorId: docId,
            }

        try {
            setError("");
            setLoading(true);

            /*await signup(emailRef.current.value, password);
            await logout();
            await login(emailD, passwordRef.current.value);
            ;*/
            ref.doc(newUser.id).set(newUser).catch((err) => { console.error(err); });
            history.push("/");

        } catch {
            setError("Błąd dodania użytkownika")
        }

        /*
        <Grid item xs={12}>
                        <Typography component="h1" variant="h6" className={classes.addP}>
                                Hasło pacjenta:
                            </Typography>
                            <Typography component="h1" variant="h6" className={classes.addPa}>
                                {password}
                            </Typography>
                            <Typography component="h1" variant="subtitle2" className={classes.poinfo}>
                               Poproś pacjenta o zmianę swojego hasła po pierwszym zalogowaniu w aplikacji mobilnej!
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography component="h1" variant="subtitle1" className={classes.addP}>
                                Wpisz swoje hasło, aby potwierdzić dodanie pacjenta
                            </Typography>
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
                        
        */ 

        console.log(error);

        setLoading(false);

    }

    async function handleLogout() {
        setError("")

        try {
            await logout();
            history.push("/signin");
        } catch {
            setError("Wystąpił błąd podczas wylogowania");
        }
    }

    

    return (

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
            <CssBaseline/>
            <div className={classes.paper}>

                <Typography component="h1" variant="h4">
                    Dodaj nowego pacjenta
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        style={{backgroundColor: '#315C9C', color: 'white'}}
                        className={classes.submit}
                        disabled={loading}
                    >
                        Dodaj pacjenta
                    </Button>
                    </Grid>
                </form>


                    <Grid container justify="space-around" style={{marginTop: "20px"}}>
                        <Link to="/">
                            Wróć do strony głównej
                        </Link>
                    </Grid>
               


                {loading ? <h1>Loading...</h1> : null}

 
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <CssBaseline/>
        </Container>
        </div>
    );
};

export default SnapshotFirebase;