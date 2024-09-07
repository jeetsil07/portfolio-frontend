import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import "../../css/global.scss"
import { primaryColor, secondaryColor } from '../../util/constant';
import { IconButton, TextField, Grid, Snackbar, Alert, Typography, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCreatePostCommentMutation } from '../../services/comment.service';
import { useCreatePostMutation, useUpdatePostMutation } from '../../services/posts.service';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getUiUxState, setPostData } from '../../slices/ui';
import { CustomButton } from '../StyledComponents/CommonStyle';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from './CustomUploadAdapter';
import { PostCategory } from '../../util/type/types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';

const PostUpdateEditor = () => {
    const [postDescription, setpostDescription] = useState('');
    const [postTitle, setpostTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
    const [descImages, setDescImages] = useState<Array<{ file: File }>>([]); // Type definition for images
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [binaryImg, setBinaryImg] = useState<File | null>(null);
    const dispatch = useAppDispatch()
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setBinaryImg(file)
            const fileUrl = URL.createObjectURL(file);
            setImage(fileUrl);
        }
    };
    const [updatePost] = useUpdatePostMutation()
    const handleUpdatePost = async (id:any) => {
        try {
            const postData = {
                id: id,
                title: postTitle,
                description: postDescription,
                image: binaryImg,
                post_category: selectedCategory?.id
            }

            const response = await updatePost(postData).unwrap();
            if (response.status === 200) {
                dispatch(
                    setPostData({
                        editPost: {}
                    })
                )
            }
            setShowSnackBar(true)
        } catch (error: any) {
            console.error('Failed to login:', error);
        }
    }
    const handleCloseSnack = () => {
        setShowSnackBar(false)
    }
    const { navBar, postCategory, postData } = useAppSelector(getUiUxState)
    const getFileExtension = (url: string): string => {
        const extension = url.split('.').pop();
        return extension ? extension : 'jpg'; // Default to 'jpg' if no extension is found
    };
    const fetchImageAsFile = async (imageUrl: string): Promise<File> => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const extension = getFileExtension(imageUrl);
        const fileName = `image.${extension}`;
        return new File([blob], fileName, { type: blob.type });
    };
    useEffect(() => {
        if (Object.keys(postData.editPost).length > 0) {
            const updateCategory = postCategory.data.find(obj => obj.id === postData.editPost.post_category)
            if (updateCategory) {
                setSelectedCategory(updateCategory)
            }
            setpostTitle(postData.editPost.title);
            setpostDescription(postData.editPost.description)
            const fetchImage = async () => {
                const file = await fetchImageAsFile(postData.editPost.image);
                setBinaryImg(file);
                const fileUrl = URL.createObjectURL(file);
                setImage(fileUrl);
            };
            fetchImage();
        }
    }, [postData])
    return (
        <div>
            <Grid container spacing={0}>
                <Typography variant="h5" color="initial" sx={{ color: primaryColor, marginY: '15px' }}>Update Post</Typography>
                <Snackbar open={showSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnack}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{
                        '@media (min-width:320px)': {
                            top: `${navBar.height + 10}px`,
                        }
                    }}

                >
                    <Alert
                        onClose={handleCloseSnack}
                        severity="info"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        post updated successfully
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
                    marginTop: '5px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: primaryColor, // Outline color
                        },
                        '&:hover fieldset': {
                            borderColor: primaryColor, // Outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primaryColor, // Outline color when focused
                        },
                        '& input': {
                            color: primaryColor, // Input text color
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: primaryColor, // Label color
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                        color: primaryColor, // Dropdown arrow color
                    },
                    '& .MuiAutocomplete-listbox .MuiAutocomplete-option': {
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
                variant='outlined'
                placeholder='Post Title'
                label={'Title'}
                fullWidth
                sx={{
                    marginTop: '5px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: `${primaryColor}`, // Set outline color
                        },
                        '&:hover fieldset': {
                            borderColor: `${primaryColor}`, // Set outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: `${primaryColor}`, // Set outline color when focused
                        },
                    },
                }}
                InputProps={{
                    style: {
                        color: `${primaryColor}`,
                    }
                }}
                InputLabelProps={{
                    style: { color: `${primaryColor}` } // Change the color of the label
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
                                sx={{ color: secondaryColor, margin: '5px', fontSize: '18px', cursor: 'pointer' }}
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
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'size': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }, { 'direction': 'rtl' }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        ['link', 'image', 'video'],
                        ['clean'],
                    ]
                }}
            />
            <Grid container justifyContent={'end'} my={2}>

                <CustomButton variant='contained' size='large' onClick={() => handleUpdatePost(postData.editPost.id)}>Update Post</CustomButton>
            </Grid>
        </div>
    );
};

export default PostUpdateEditor;

