import axios from 'axios';



export async function postUser(values){
    delete values.id;
    console.log("in post user function");
    const response = await axios.post(`http://localhost:8000/user`, values);

    console.log("user added. response is ");
    console.log(response);
}

export async function updateUser(values){
    console.log("in update user function");
    const response = await axios.put(`http://localhost:8000/user/${values.id}`, values);
    console.log("user updated ");

}

export async function getUserById (id){
    const response = await axios.get(`http://localhost:8000/user/${id}`);
    return response.data;
}

 export async function getUsers (){
    const response = await axios.get(`http://localhost:8000/user`);
    const arr = response.data.users;
    return arr;
}

export async function deleteUser(id){
    const response = await axios.delete(`http://localhost:8000/user/${id}`);
    console.log("delete successful");
}