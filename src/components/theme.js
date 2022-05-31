import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper2: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: "center"
    },
    navbar: {
        background: '#315C9C',
    },
    carrd: {
        margin: theme.spacing(1),
        width: '310px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 2, 
    },
    carrdc: {
        margin: theme.spacing(1),
        width: '310px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
        padding: 20,
        color: "white",
    },
    title2: {
        color: '#315C9C',
    },
    title3: {
        color: '#315C9C',
        marginTop: "30px"
    },
    welcome:{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 30,
        alignItems: 'center',
    },
    forPass:{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        alignItems: 'center',
    },
    addP:{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        alignItems: 'center',
        textAlign: 'center',
    },
    addPa:{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        alignItems: 'center',
        textAlign: 'center',
        color:  '#315C9C',
    },
    poinfo:{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        alignItems: 'center',
        textAlign: 'center',
        color:  'red',
    },
    odznaki: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        minWidth: 800,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#315C9C',
    },
    avatar2: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        
        backgroundColor: '#315C9C',
        justifyContent: "center",
        display: "flex",
        backgroundColor: '#315C9C',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useStyles;