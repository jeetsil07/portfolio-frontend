import { IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import React, { useState } from 'react'

const SearchBar = ({pathName}:{pathName: string}) => {
    const [searchProject,setSearchProject] = useState("");
    const [searhPost,setSearchPost] = useState("");
    return (
        <>
            <TextField
                variant='outlined'
                placeholder='Search...'
                label={pathName === "/blogs" ? "Search Post" : "Search Project"}
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Set outline color
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Set outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Set outline color when focused
                        },
                    },
                }}
                InputProps={{
                    style: {
                        color: 'white',
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={()=>console.log(searchProject)}>
                                <SearchIcon style={{ color: 'white' }} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    style: { color: 'white' } // Change the color of the label
                }}
                onChange={(e)=>pathName === "/blogs" ? setSearchPost(e.target.value) : setSearchProject(e.target.value)}
                value={pathName === "/blogs" ? searhPost : searchProject}
            />
        </>
    )
}

export default SearchBar