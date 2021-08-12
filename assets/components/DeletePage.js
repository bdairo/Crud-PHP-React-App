import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles,Typography } from '@material-ui/core';
import '@fontsource/roboto';
import Box from '@material-ui/core/Box';
import * as service from "../userServices";


const useStyles = makeStyles(theme =>({
    pageContent:{
        padding: theme.spacing(3)
    },
    alignItemsAndJustifyContent: {
        marginTop:theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        
      },
}))


export default function DeletePage(props){
    const {id, setOpenPopup, setUsers, setPopupType} = props;
    const classes = useStyles();

    const handleDelete= async id=>{
        const response = await service.deleteUser(id); 
        const updatedUsers = await service.getUsers();
        setUsers(updatedUsers);
        setOpenPopup(false);
        setPopupType("form");
    }

    return (
        <>
            <Paper className ={classes.pageContent}>
                <Box className={classes.alignItemsAndJustifyContent} component="span" m={1}>
                    <Typography className={classes.title} variant="h4" gutterBottom>
                        Do you want to delete this user?
                    </Typography>         
                </Box>
                

                <Box className={classes.alignItemsAndJustifyContent} component="span" m={1}>
                    <Button onClick={ () =>{handleDelete(id)}} variant = "contained" size="large" color="secondary"> Delete</Button> 
                    <Button onClick={()=>{setOpenPopup(false); setPopupType("form")}} size="large" variant = "contained" > cancel</Button>           
                </Box>
  
            </Paper>
        </>
    );
}