import React from 'react';
import {Dialog , DialogTitle, DialogContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import UserForm from './UserForm.js';

import CloseIcon from '@material-ui/icons/Close';
import DeletePage from './DeletePage.js';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top:theme.spacing(5),
    
  },
}));


export default function Popup(props) {
  const {id, openPopup, setOpenPopup, setUsers, popupType, setPopupType} = props;
  const classes = useStyles();
  return (

    <Dialog classes= {{paper: classes.dialogWrapper }} open ={openPopup} maxWidth ="md">
        <DialogTitle>
          <div style={{display: 'flex'}}>
          <Typography variant = "h6" component = "div" style={{flexGrow : 1}} >UserForm</Typography>
          <Button onClick ={()=> {setOpenPopup(false); setPopupType("form")}}  variant  = "outlined" color="secondary">  <CloseIcon/> </Button>
          </div>
        </DialogTitle>
        
        <DialogContent dividers>

          {popupType === 'form'?
          < UserForm 
          id = {id} openPopup= {openPopup} setOpenPopup = {setOpenPopup} setUsers={setUsers} setPopupType={setPopupType}
          />
          :
          <DeletePage id = {id} openPopup= {openPopup} setOpenPopup = {setOpenPopup} setUsers={setUsers} setPopupType={setPopupType}/>
          }
           
        </DialogContent>
    </Dialog>

  );
}
