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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {useAuth} from "../contexts/AuthContext";
import {AppBar, Toolbar} from "@material-ui/core";
import image from './assets/icon2.PNG';
import CanvasJSReact from '../lib/canvasjs.react';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { startOfToday } from 'date-fns';

const SnapshotFirebase = () => {

    const [error, setError] = useState("");
    const history = useHistory();

    const [data,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [data4,setData4]=useState([])
    const [table,setTable]=useState([])
    const [stats,setStats]=useState([])
    const [name, setName] = useState("")
    const [last, setLast] = useState("")
    const [err, setErr] = useState("")

    const [da, setDa] = useState("")
    const [q1, setQ1] = useState("")
    const [q2, setQ2] = useState("")
    const [q3, setQ3] = useState("")
    const [q4, setQ4] = useState("")
    const [q5, setQ5] = useState("")
    const [q6, setQ6] = useState("")
    const [q7, setQ7] = useState("")
    const [q8, setQ8] = useState("")
    const [q9, setQ9] = useState("")

    const [s1, setS1] = useState("")
    const [s2, setS2] = useState("")
    const [s3, setS3] = useState("")
    const [s4, setS4] = useState("")
    const [s5, setS5] = useState("")

    const [chart, setChart] = useState([])
    const [sleeps, setSleeps] = useState([])

    const [ifData, setIfData] = useState(false)

    const [loading, setLoading] = useState(false);
    const {currentUser, logout} = useAuth()

    const classes = useStyles();
    const nameRef = useRef();
    const date1Ref = useRef();
    const date2Ref = useRef();

    const ref = db.firestore().collection("patients");
    const ref2 = db.firestore().collection("sleepdiary");

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    //Tabela
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: '#315C9C',
            color: "white"
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    useEffect(() => {
        document.title = 'Dziennik snu pacjenta';
        fetchPatientData();
        fetchUserData();
        fetchPatient2Data();
        document.body.style.backgroundColor = 'white';
    }, []);

    const fetchUserData=async()=>{
        const query = ref;
        await query.where("emailDoctor", "==", currentUser.email).get().then(
            item => {
                const items = item.docs.map(doc => doc.data());
                setData(items);
            })
    }


    const fetchPatientData=async()=>{
        const query3 = ref2.orderBy("timestamp");
        await query3.get().then(
            item => {
                const items = item.docs.map(doc => doc.data());
                setData2(items);
            })
    }

    const fetchPatient2Data=async()=>{
        const query3 = ref2.orderBy("timestamp", "desc");
        await query3.get().then(
            item => {
                const items = item.docs.map(doc => doc.data());
                setData4(items);
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

    const GreenRadio = withStyles({
        root: {
            color: '#315C9C',
            '&$checked': {
                color: '#315C9C',
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    const filterData = () => {
        let filter = data4.filter(i =>{
            return i.patientEmail==name;
          });
          setTable(filter);

          let filter2 = data2.filter(i =>{
            return i.patientEmail==name;
          });
          setStats(filter2);

        setS1('');
        setS2('');
        setS3('');
        setS4('');
        setS5('')

        setDa('');
        setQ1('');
        setQ2('');
        setQ3('');
        setQ4('');
        setQ5('');
        setQ6('');
        setQ7('');
        setQ8('');
        setQ9('');
        setChart('');
    }

    const showDiary = row => {
      setDa(row.dateEntry);
      setQ1(row.q1);
      setQ2(row.q2);
      setQ3(row.q3);
      setQ4(row.q4);
      setQ5(row.q5);
      setQ6(row.q6);
      setQ7(row.q7);
      setQ8(row.q8);
      setQ9(row.q9);
    }


    
    if (loading)
        return (<h1>Loading ... </h1>)
   


    const options = {
        title: {
          text: "Jakość snu (w skali od 1 do 5)"
        },
        data: [{				
                  type: "line",
                  dataPoints: chart
         }]
     }

     const getStats = () => {

        let sleeps2 = [];

        let date1 = new Date(date1Ref.current.value);
        let date2 = new Date(date2Ref.current.value);
            
        var datestring1 = ("0" + date1.getDate()).slice(-2) + "." + ("0"+(date1.getMonth()+1)).slice(-2) + "." +
        date1.getFullYear();
        var datestring2 = ("0" + date2.getDate()).slice(-2) + "." + ("0"+(date2.getMonth()+1)).slice(-2) + "." +
        date2.getFullYear();

        let find1=false;
        let find2=false;
        let i=0;
        let i2=false;
        let findIndex=0;

        while(find1==false && i<stats.length){
            if(stats[i].dateEntry==datestring1){
                find1=true;
                findIndex = i;
            }
            i++;
        };

        i2 = findIndex;

        while(find2==false && i2<stats.length){
            sleeps2.push(stats[i2])
            if(stats[i2].dateEntry==datestring2){
                find2=true;
            }
            i2++;
        }

        let licznik = sleeps2.length;

        let fallAsleep = 0;
        let quality = 0;
        let singleQuality = 0;
        let qualityDesc = '';
        let percent = 0;
        let qualities = [];
        let sleepTotal = 0;
        let sleepHour = 0;
        let sleepMinute = 0;
        let bedTotal = 0;
        let bedHour = 0;
        let bedMinute = 0;
        let d1 = '';
        let d2 = '';
        let d01 = '';
        let diff = '';
        let d5 = '';
        let d6 = '';
        let diff2 = '';

        var getDuration = function(d1, d2) {
            let d3 = new Date(d2 - d1);
            let d0 = new Date(0);
        
            return {
                getHours: function(){
                    return d3.getHours() - d0.getHours();
                },
                getMinutes: function(){
                    return d3.getMinutes() - d0.getMinutes();
                },
                getMilliseconds: function() {
                    return d3.getMilliseconds() - d0.getMilliseconds();
                },
                toString: function(){
                    return this.getHours() + ":" +
                           this.getMinutes() + ":" + 
                           this.getMilliseconds();
                },
            };
        };

        if(find1==false || find2==false){
            setErr("Brak wpisów")
            setS1("");
            setS2("");
            setS3("");
            setS4("");
            setS5("");
            setChart('')
        }

        if(find2==true && find1==true){
            setErr("");

            for (let j = 0; j < licznik; j++) {
                
                fallAsleep = fallAsleep + parseInt(sleeps2[j].q4);

                if (sleeps2[j].q8 == "Bardzo zła" ) {
                    quality = quality + 1;
                    singleQuality = 1;
                } else if (sleeps2[j].q8 == "Zła") {
                    quality = quality + 2;
                    singleQuality = 2;
                } else if (sleeps2[j].q8 == "Przeciętna") {
                    quality = quality + 3;
                    singleQuality = 3;
                } else if (sleeps2[j].q8 == "Dobra") {
                    quality = quality + 4;
                    singleQuality = 4;
                } else if (sleeps2[j].q8 == "Bardzo dobra" ) {
                    quality = quality + 5;
                    singleQuality = 5;
                }

                qualities.push({label: sleeps2[j].dateEntry, y: singleQuality});

                d01 = new Date(Date.parse("1970-01-01T" + sleeps2[j].q3));
                d1 = new Date(d01);
                d2 = new Date(Date.parse("1970-01-01T" + sleeps2[j].q5));

                d1.setMinutes(d01.getMinutes() + parseInt(sleeps2[j].q4))
                
                diff = getDuration(d1, d2);

                sleepTotal = sleepTotal + diff.getMinutes() + diff.getHours()*60;

                d5 = new Date(Date.parse("1970-01-01T" + sleeps2[j].q2));
                d6 = new Date(Date.parse("1970-01-01T" + sleeps2[j].q7));
            
                diff2 = getDuration(d5, d6);

                bedTotal = bedTotal + diff2.getMinutes() + diff2.getHours()*60;
              }
            
            fallAsleep = fallAsleep/licznik;
            quality = parseInt(quality/licznik);

            if (quality == 1) {
                qualityDesc = "Bardzo zła";
            } else if (quality == 2) {
                qualityDesc = "Zła";
            } else if (quality == 3) {
                qualityDesc = "Przeciętna";
            } else if (quality == 4) {
                qualityDesc = "Dobra";
            } else if (quality == 5) {
                qualityDesc = "Bardzo dobra";
            }

            sleepTotal = sleepTotal/licznik;
            sleepHour = parseInt(sleepTotal/60);
            sleepMinute = parseInt(sleepTotal - sleepHour*60);

            bedTotal = bedTotal/licznik;
            bedHour = parseInt(bedTotal/60);
            bedMinute = parseInt(bedTotal - bedHour*60);

            percent = sleepTotal/bedTotal*100;

            setS1(parseInt(fallAsleep) + ' minut');
            setS2(qualityDesc);
            setS3(sleepHour + " godzin " + sleepMinute + " minut")
            setS4(bedHour + " godzin " + bedMinute + " minut")
            setS5(percent.toFixed(2) + '%')
            setChart(qualities);
        }

        console.log(sleepTotal);
        console.log(bedTotal);
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

            <Container component="main" >
            <CssBaseline/>
            <div className={classes.paper}>

                            <Typography component="h1" variant="h4">
                                Wybierz pacjenta
                            </Typography>

                            <RadioGroup aria-label="trail" name="trail" value={name}
                            inputRef={nameRef}
                            onChange={(e) => {
                                setName(e.target.value);}
                            }>
                    {data.sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map(t => (
                        
                        <FormControlLabel value={t.email} control={<GreenRadio />} label={(t.firstName).concat(' ', t.lastName)} />
                    ))}
                </RadioGroup>

                <Button type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="inherit"
                                        style={{color: 'white',
                                        backgroundColor: '#315C9C',
                                            marginBottom: "20px", width: "155px"}}
                                            onClick={() => filterData()}
                                >
                                    Pokaż dane
                                </Button>

                <Grid container spacing={2} style={{padding: 10}}>

                    <Grid container justify="space-around">
                    <Typography component="h1" variant="h6" style={{marginTop: "10px"}}>
                        Statystyki
                    </Typography>

                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}}>
                            Data początkowa
                        </Typography>
                        <TextField
                            inputRef={date1Ref}
                            id="date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{width: 400, marginTop: '10px'}}
                        />
                    </Grid>


                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}}>
                            Data końcowa
                        </Typography>
                        <TextField
                        inputRef={date2Ref}
                            id="date2"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{width: 400, marginTop: '10px'}}
                        />
                    </Grid>

                    <Grid container justify="space-around">
                                <Button variant="submit"
                                        fullWidth
                                        variant="contained"
                                        color="inherit"
                                        style={{backgroundColor: '#315C9C', color: 'white',
                                            marginTop: "5px", width: "200px"}} 
                                            onClick={() => getStats()}
                                >
                                    Pokaż statystyki
                                </Button>
                    </Grid>

                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color:'red'}}>
                        {err}
                        </Typography>
                    </Grid>

                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}}>
                            
                        </Typography>
                    </Grid>

                    <CanvasJSChart options = {options}></CanvasJSChart>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Średni czas zaśnięcia
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                          {s1}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Średnia jakość snu
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {s2}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Średnia długość snu
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                         {s3}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Średni czas spędzony w łóżku
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                          {s4}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Wydajność snu
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {s5}
                        </Typography>
                    </Grid>

                </Grid>

                <Grid container spacing={2}>

                    <Grid item xs={6}>

                        <Grid container justify="space-around">
                <Typography component="h1" variant="h6" style={{marginTop: "10px"}}>
                    Dziennik snu
                </Typography>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table"
                               style={{marginTop: "15px"}}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Data</StyledTableCell>
                                    <StyledTableCell align="left"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {table
                                    .map((row) => (
                                    <TableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row" align="left">
                                            {row.dateEntry}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">

                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                variant="contained"
                                                color="inherit"
                                                style={{backgroundColor: '#315C9C', color: 'white'}}
                                                onClick={() => showDiary(row)}
                                            >
                                               Pokaż
                                            </Button>
                                            </StyledTableCell>
                                    </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    </Grid>

                    <Grid item xs={6}>
                <Container maxWidth="xs" >

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Data
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {da}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Dzień wolny
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q1}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Godzina położenia się do łóżka
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                         {q2}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Godzina pójścia spać
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q3}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Czas zaśnięcia w minutach
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q4}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Czas obudzenia się
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q5}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                           Korzystanie z pomocy budzika
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q6}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Godzina wstania z łóżka
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q7}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            Jakość snu
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q8}
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px"}} display="block">
                            {q9}
                        </Typography>
                    </Grid>
                    <Grid container justify="space-around">
                        <Typography component="h1" variant="h6" style={{marginTop: "10px", color: '#315C9C'}}>
                           {q9}
                        </Typography>
                    </Grid>
            
                </Container>



                {loading ? <h1>Loading...</h1> : null}

                </Grid>
                </Grid>
            </div>
            <Box mt={8}>
            <Grid container justify="space-around" style={{marginTop: "20px"}}>
                        <Link to="/">
                            Wróć do listy pacjentów
                        </Link>
                    </Grid>
                <Copyright/>
            </Box>
        </Container>

                
        </div>
    );
};

export default SnapshotFirebase;