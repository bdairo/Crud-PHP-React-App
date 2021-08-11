import React, {useState , useEffect} from 'react' 
import { Grid, TextField, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as service from "../userServices";


const useStyles = makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin: theme.spacing(1)
        }
        
    }
}))

const initialFValues ={
    id:'',
    firstName:'',
    lastName:'',
    age:'',
    phoneNumber:'',
    address:'',
    email:''
}

export default function Form(props){
    const [values , setValues] =  useState(initialFValues);
    const {id, setOpenPopup, setUsers} = props;
    
    if(id >= 0){
        useEffect( async()=>{
            const data = await service.getUserById(id);
            setValues(data);
            
      } , []);
    }

    const handleInputChange= e =>{
        const{name , value}= e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        values.age = parseInt(values.age);
        values.phoneNumber= parseInt(values.phoneNumber);

        if(typeof(values.id) === 'string'){
            await service.postUser(values);
        }
        else{
            await service.updateUser(values);
        }

        const updatedUsers = await service.getUsers();
        setUsers(updatedUsers);
        setOpenPopup(false);
      };

     
    const classes = useStyles();
    return(
            <form onSubmit={handleSubmit} className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                    variant ="outlined"
                    label="First Name"
                    name ="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}/>

                    <TextField
                    variant ="outlined"
                    label="Last Name"
                    name ="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}/>
                    
                </Grid>

                <Grid item xs={6}>
                <TextField
                    variant ="outlined"
                    label="Age"
                    name ="age"
                    value={values.age}
                    onChange={handleInputChange}/>

                <TextField
                    variant ="outlined"
                    label="Phone Number"
                    name ="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleInputChange}/>                  
                </Grid>

                <Grid item xs={12}>
                <TextField
                    variant ="outlined"
                    label="Email"
                    name ="email"
                    value={values.email}
                    onChange={handleInputChange}/>

                <TextField
                    variant ="outlined"
                    label="Address"
                    name = "address"
                    value={values.address}
                    onChange={handleInputChange}/>

                </Grid>

                <Grid item xs ={4}>
                    <Button type = "submit" variant = "contained" size="large" color="primary"> Submit</Button> 
                    <Button onClick={()=>setValues(initialFValues)}size="large" variant = "contained" > Reset</Button> 
                </Grid>
                
            </Grid>

        </form>
    )
}
