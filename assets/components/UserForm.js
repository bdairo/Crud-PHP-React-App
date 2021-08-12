import React, { useState,useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Form from './Form';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
    pageContent:{
       
        padding: theme.spacing(3)
    }
}))

export default function UserForm(props){
    const {id, setOpenPopup, setUsers} = props;
    const classes = useStyles();

    return (
        <>
            <Paper className ={classes.pageContent}>
                <Form setUsers= {setUsers} setOpenPopup={setOpenPopup} id={id}></Form>
            </Paper>
        </>
    );
}