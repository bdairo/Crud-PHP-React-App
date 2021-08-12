import Button from '@material-ui/core/Button';
import React, { useState,useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import '@fontsource/roboto';
import Box from '@material-ui/core/Box';

import {withStyles, makeStyles} from '@material-ui/core';
import { Typography } from '@material-ui/core';

import Popup from './Popup';
import * as service from "../userServices";



const useStyles = makeStyles(theme =>({
    paper:{
        marginLeft:theme.spacing(3),
        marginRight:theme.spacing(3),
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3),

    },
    Button:{
        marginLeft:'10px',
        marginTop:'10px',
        marginBottom:'20px'
    },
    alignItemsAndJustifyContent: {
        marginTop:theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        
      },

}))

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:hover":{
            backgroundColor: '#f2f2f2'
        }
    },
  }))(TableRow);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#000080',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  }))(TableCell);


export default function Home() {
  const [users, setUsers] = useState([]);
  const[openPopup, setOpenPopup] = useState(false);
  const[popupType, setPopupType] = useState("form");
  const[id, setId] = useState(-1)
  
  useEffect( async()=>{
        const arr = await service.getUsers();
        setUsers(arr);     
  } , []);
 
  const classes = useStyles();

  return (

      <>
        <Paper className={classes.paper}>

          <TableContainer className={classes.container}>
              <Box className={classes.alignItemsAndJustifyContent} component="span" m={1}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                    users
                </Typography>
                <Button className={classes.Button}onClick = {()=> {setOpenPopup(true); setId(-1)}} size="small" variant = "contained" color="primary"> 
                    Add User 
                </Button>           
                
              </Box>
              <Table stickyHeader aria-label="sticky table" >
                  <TableHead >
                      <StyledTableRow >
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell >Last Name</StyledTableCell>
                        <StyledTableCell>Age </StyledTableCell>
                        <StyledTableCell> Address </StyledTableCell>
                        <StyledTableCell> Phone Number </StyledTableCell>
                        <StyledTableCell> Email </StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                      </StyledTableRow>
                  </TableHead>

                  <TableBody>
                      {
                          users.map(user =>(
                              <StyledTableRow className = {classes.tableRow}key ={user.id}>
                                  <StyledTableCell>{user.firstName}</StyledTableCell>
                                  <StyledTableCell>{user.lastName}</StyledTableCell>
                                  <StyledTableCell>{user.age}</StyledTableCell>
                                  <StyledTableCell>{user.address}</StyledTableCell>
                                  <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                                  <StyledTableCell>{user.email}</StyledTableCell>
                                  <StyledTableCell> 
                                      <Button onClick ={()=>{ setOpenPopup(true); setId(user.id)}}  variant  = "outlined" color="primary">  Edit </Button> 
                                      <Button onClick = {()=> {setOpenPopup(true); setPopupType("delete"); setId(user.id)}} variant  = "outlined" color="secondary"> <CloseIcon/>  </Button> 
                                  </StyledTableCell>
                                  
                              </StyledTableRow>
                          ))}
                  </TableBody>
              </Table>
          </TableContainer>
        
        <Popup id={id} openPopup ={openPopup} setOpenPopup={setOpenPopup} setUsers={setUsers} popupType={popupType} setPopupType={setPopupType}>  
        </Popup>

        </Paper>

      </>
  );
 
}


