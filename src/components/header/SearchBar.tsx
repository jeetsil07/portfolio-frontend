import { IconButton, InputAdornment, TextField } from "@mui/material";

import React, { useState } from "react";
import { StyledSearchField, StyledSearchIcon } from "../StyledComponents/NavbarStyled";

const SearchBar = ({ pathName }: { pathName: string }) => {
  const [searchProject, setSearchProject] = useState<string>("");
  const [searchPost, setSearchPost] = useState<string>("");
  return (
    <>
      <StyledSearchField
        variant="outlined"
        placeholder="Search..."
        label={pathName === "/blogs" ? "Search Post" : "Search Project"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => console.log(searchProject)}>
                <StyledSearchIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          pathName === "/blogs"
            ? setSearchPost(e.target.value)
            : setSearchProject(e.target.value)
        }
        value={pathName === "/blogs" ? searchPost : searchProject}
      />
    </>
  );
};

export default SearchBar;
