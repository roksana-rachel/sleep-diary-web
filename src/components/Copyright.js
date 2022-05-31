import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import React from "react";

const Copyright = () =>{
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Dziennik Snu
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;