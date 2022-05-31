import React, {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import useStyles from './theme';
import db from "../Firebase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';
import image2 from './assets/sleeplogo.PNG';
import Avatar from '@material-ui/core/Avatar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const DoctorDashboard = () => {

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const [data,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [show, setShow]=useState(false);
    const [patientEmail, setPatientEmail] = useState("");

    const classes = useStyles();

    const ref = db.firestore().collection("doctors");
    const ref2 = db.firestore().collection("patients");

    useEffect(() => {
        document.title = 'Dziennik Snu';

        fetchUserData();
        fetchPatientData();
        console.log(data2)
        document.body.style.backgroundColor = 'white';

    }, []);

    const fetchUserData=async()=>{
        const query = ref.where('email', '==', currentUser.email);
        await query.get().then(
            item => {
                const items = item.docs.map(doc => doc.data());
                setData(items);
            })
    }
    

    const fetchPatientData=async()=>{
        const query = ref2.where('emailDoctor', '==', currentUser.email);
        await query.get().then(
            item => {
                const items = item.docs.map(doc => doc.data());
                setData2(items);
            })
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

    const deletePatient = patient => {

        const pat = patient.firstName + ' ' + patient.lastName

        confirmAlert({
            title: pat,
            message: 'Czy na pewno chcesz usunąć tego pacjenta?',
            buttons: [
              {
                label: 'Tak',
                onClick: () => ref2
                .doc(patient.id)
                .delete()
                .then(setData2(prevState =>
                    prevState.filter(element => element.id != patient.id)))
                .catch((err) => {
                    console.error(err);
                })
              },
              {
                label: 'Nie',
              }
            ]
          });

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


            <div className={classes.welcome}>
            <img src={image2} alt="logo" width='150px' height='120px'/>
            {data.map(d => (
                            <Typography component="h1" variant="h4" className={classes.title2}>
                                Witaj w Dzienniku Snu, {d.firstName} {d.lastName}!
                            </Typography>
                        ))}
                <Typography component="h1" variant="h5">
                   Śledź dzienniki snu swoich pacjentów i oglądaj statystyki
                </Typography>
            </div>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    
                    <Typography component="h1" variant="h4" className={classes.title3}>
                                Lista Twoich pacjentów
                            </Typography>
                            <Link to="/add" style={{ textDecoration: 'none' }}>
                                <Button variant="link"
                                        fullWidth
                                        variant="contained"
                                        color="inherit"
                                        style={{backgroundColor: '#315C9C', color: 'white',
                                            marginTop: "5px"}}
                                >
                                    Dodaj nowego pacjenta
                                </Button>
                        </Link>
                        <Link to="/db" style={{ textDecoration: 'none' }}>
                                <Button variant="link"
                                        fullWidth
                                        variant="contained"
                                        color="inherit"
                                        style={{backgroundColor: '#315C9C', color: 'white',
                                            marginTop: "5px"}}
                                >
                                    Dzienniki snu pacjentów
                                </Button>
                        </Link>
                </div>
            </Container>

            <Container maxWidth="xl">
            <div className={classes.paper2}>
            <Grid container spacing={2}>
            {data2.sort((a, b) => a.lastName.localeCompare(b.lastName))
            .map(d => (
                            <Card variant="outlined" className={classes.carrd}>
                            <CardContent className={classes.carrdc}>
                            <Avatar className={classes.avatar2}>
                            </Avatar>
                              <Typography variant="h5" component="h2" className={classes.addPa}>
                                {d.firstName} {d.lastName}
                              </Typography>
                              <Typography variant="h6" component="h2">
                                  {d.email}
                              </Typography>
                            </CardContent>
                                <Button type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        style={{color: 'white',
                                            marginBottom: "20px", width: "155px"}}
                                            onClick={() => deletePatient(d)}
                                >
                                    Usuń pacjenta
                                </Button>
                          </Card>
                        ))}

    

            
            </Grid>
            </div>
            </Container>


        </div>
        </>
    )
}

export default DoctorDashboard;