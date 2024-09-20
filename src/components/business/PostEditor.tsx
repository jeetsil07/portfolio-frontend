import React, { useState } from "react";
import "../../css/global.scss";
import { primaryColor, secondaryColor } from "../../util/constant";
import {
  IconButton,
  TextField,
  Grid,
  Snackbar,
  Alert,
  Typography,
  Autocomplete,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCreatePostCommentMutation } from "../../services/comment.service";
import { useCreatePostMutation } from "../../services/posts.service";
import { useAppSelector } from "../../app/hook";
import { getUiUxState } from "../../slices/ui";
import { CustomButton } from "../StyledComponents/CommonStyle";
import CustomUploadAdapter from "./CustomUploadAdapter";
import { PostCategory } from "../../util/type/types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostEditor = () => {
  const [postDescription, setpostDescription] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(
    null
  );
  const [descImages, setDescImages] = useState<Array<{ file: File }>>([]); // Type definition for images
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [binaryImg, setBinaryImg] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBinaryImg(file);
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
    }
  };
  const [createPost,{isLoading}] = useCreatePostMutation();
  const handleCreatePost = async () => {
    try {
      const postData = {
        title: postTitle,
        description: postDescription,
        image: binaryImg,
        post_category: selectedCategory?.id,
      };

      const response = await createPost(postData).unwrap();
      if (response.status === 201) {
        setpostDescription("");
        setImage(null);
        setBinaryImg(null);
        setpostTitle("");
      }
      setErrorMessage("Post created successfully");
      setShowSnackBar(true);
    } catch (error: any) {
      // General error handling
      if (error?.data?.message) {
        // Check if backend provides a message field in the response
        setErrorMessage(error.data.message);
      } else if (error?.status === 400) {
        // Handle validation errors (Bad request)
        setErrorMessage("Please ensure all fields are correctly filled.");
      } else if (error?.status === 500) {
        // Handle server-side errors
        setErrorMessage("Internal server error. Please try again later.");
      } else {
        // Generic error for unknown issues
        setErrorMessage("Something went wrong. Please try again.");
      }
      setShowSnackBar(true);
    }
  };
  const handleCloseSnack = () => {
    setShowSnackBar(false);
  };
  const { navBar, postCategory } = useAppSelector(getUiUxState);

  return (
    <div>
      <Grid container spacing={0}>
        <Typography
          variant="h5"
          color="initial"
          sx={{ color: primaryColor, marginY: "15px" }}
        >
          Add Post
        </Typography>
        <Snackbar
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "@media (min-width:320px)": {
              top: `${navBar.height + 10}px`,
            },
          }}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Grid>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        fullWidth
        options={postCategory.data}
        getOptionLabel={(option) => option.name}
        value={selectedCategory} // Set the selected value here
        onChange={(event, newValue) => {
          setSelectedCategory(newValue); // Update the state with the selected value
        }}
        sx={{
          marginTop: "5px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: primaryColor, // Outline color
            },
            "&:hover fieldset": {
              borderColor: primaryColor, // Outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: primaryColor, // Outline color when focused
            },
            "& input": {
              color: primaryColor, // Input text color
            },
          },
          "& .MuiInputLabel-root": {
            color: primaryColor, // Label color
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: primaryColor, // Dropdown arrow color
          },
          "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
            color: primaryColor, // Dropdown items color
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Category"
            InputLabelProps={{
              style: { color: primaryColor }, // Label color
            }}
            inputProps={{
              ...params.inputProps,
              style: { color: primaryColor }, // Input text color
            }}
          />
        )}
      />
      <TextField
        variant="outlined"
        placeholder="Post Title"
        label={"Title"}
        fullWidth
        sx={{
          marginTop: "5px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: `${primaryColor}`, // Set outline color
            },
            "&:hover fieldset": {
              borderColor: `${primaryColor}`, // Set outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: `${primaryColor}`, // Set outline color when focused
            },
          },
        }}
        InputProps={{
          style: {
            color: `${primaryColor}`,
          },
        }}
        InputLabelProps={{
          style: { color: `${primaryColor}` }, // Change the color of the label
        }}
        onChange={(e) => setpostTitle(e.target.value)}
        value={postTitle}
      />
      <div className="file-upload-container">
        <div className="input-container">
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <div className="placeholder">No Image</div>
          )}
          <label htmlFor="file-input" className="add-image-button">
            <IconButton component="span">
              <CloudUploadIcon
                sx={{
                  color: secondaryColor,
                  margin: "5px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </label>

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>
      </div>
      <ReactQuill
        value={postDescription}
        onChange={(content: string) => {
          setpostDescription(content);
        }}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }, { direction: "rtl" }],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
            ],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
      />
      <Grid container justifyContent={"end"} my={2}>
        <CustomButton
          variant="contained"
          size="large"
          onClick={handleCreatePost}
        >
            {isLoading ? 'Creating...':'Create Post'}          
        </CustomButton>
      </Grid>
    </div>
  );
};

export default PostEditor;
