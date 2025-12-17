import React,{useState} from 'react';

const Register = ()=>{
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    });

    const [message,setMessage] = useState("");

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

}

export default Register