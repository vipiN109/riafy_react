import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import validator from 'validator'
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Bookmark() {
    const navigate= useNavigate()
    const [title,setTitle]=useState("")
    const [url,setUrl]=useState("")
    const handleChangeTitle = (value)=>{
        setTitle(value)
    }
    const handleChangeUrl=(value)=>{
        setUrl(value)
    }
    const submit=()=>{
        var data= {
            title:title,
            url:url
        }
        if (validator.isURL(data.url) ) {
            if(data.title.trim().length===0){
                toast.error("White spaces are not allowed in title field")
            }else{
                axios.post("http://54.212.17.247:3001/create_bookmark",data).then((res)=>{
                    if(res.data.code===200){
                        toast.success(res.data.message)
                        navigate("/")
                        setTitle("")
                        setUrl("")
                    }else if(res.data.code===201){
                        toast.error(res.data.message)
                    }else{
                        toast.error("Something went wrong!")
                    }
                })
            }
          } else {
            toast.error('Please provide a valid url')
          }
        
    }
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
          maxWidth:"100%"
        },
      }}
    >
        
      <Paper>
        <div><h1 style={{marginLeft:"20px"}}>Create Bookmark</h1></div>
        
        <TextField fullWidth label="title" id="fullWidth" onChange={(e)=>handleChangeTitle(e.target.value)}/>
        <TextField fullWidth label="url" onChange={(e) => handleChangeUrl(e.target.value)} id="fullWidth" />
        
        <Button variant="contained" size="large" style={{marginLeft:"15px"}} onClick={submit}>
          Create new bookmark
        </Button>
       
       
      </Paper>
    </Box>
    </>
  )
}

export default Bookmark