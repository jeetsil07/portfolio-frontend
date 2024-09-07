import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUiUxState, setPostCategory, setPostData } from "../slices/ui";
import {
  ContentBox,
  CustomButton,
  ImageBox,
  ProfileImgInput,
} from "../components/StyledComponents/CommonStyle";
import { useNavigate } from "react-router-dom";
import routes from "../util/routes";
import { getUserData, setUserData } from "../slices/user";
import jeet2 from "../assets/img/jeet2.jpeg";
import { primaryColor, secondaryColor } from "../util/constant";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditOffIcon from "@mui/icons-material/EditOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../css/global.scss";
import { useUpdateUserMutation } from "../services/UserRegistration.service";
import { Password } from "@mui/icons-material";
import PostEditor from "../components/business/PostEditor";
import { useGetPostsCategoryQuery } from "../services/postsCategory.service";
import { useGetPostsQuery } from "../services/posts.service";
import PostsTable from "../components/business/PostsTable";
import NewEditor from "../components/business/NewEditor";
import PostUpdateEditor from "../components/business/PostUpdateEditor";

const MyProfile = () => {
  console.log('my profile................')
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [file, setFile] = useState<File | null>(null);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const { user } = useAppSelector(getUserData);
  const { navBar, postCategory, postData } = useAppSelector(getUiUxState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();
  const hadleLogout = () => {
    localStorage.removeItem("authTokens");
    dispatch(
      setUserData({
        user_id: "",
        is_superuser: "",
        email: "",
        first_name: "",
        last_name: "",
        imageUrl: "",
        password: "",
      })
    );
    navigate(routes.login);
  };
  const dispatch = useAppDispatch();
  const storedTokens = localStorage.getItem("authTokens");
  useEffect(() => {
    if (storedTokens) {
      const { user } = JSON.parse(storedTokens);
      if (user) {
        dispatch(
          setUserData({
            user_id: user.user_id,
            is_superuser: user.is_superuser,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            imageUrl: user.image,
          })
        );
      }
    }
  }, [storedTokens]);

  const handleProfileEdit = () => {
    setProfileEdit((prev) => !prev);
  };
  const handleProfileUpdate = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setUserData({
        ...user,
        [field]: e.target.value,
      })
    );
  };
  const [userUpdate] = useUpdateUserMutation();
  const [message, setMessage] = useState("");

  const applyUpdate = async () => {
    try {
      if (
        user.email === "" ||
        user.password === "" ||
        user.first_name === "" ||
        user.last_name === ""
      ) {
        setMessage("All Fields are required");
        setShowSnackBar(true);
        return;
      }
      const updateUser = {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
        ...(file ? { image: file } : {}),
      };

      const response = await userUpdate(updateUser).unwrap();

      if (response.status === 200) {
        // localStorage.setItem('authTokens', JSON.stringify(response.data)); // Store the token
        const storedData = localStorage.getItem("authTokens");
        const parsedData = storedData ? JSON.parse(storedData) : null;

        // Update only the `user` part
        const updatedData = {
          ...parsedData,
          user: response.data.user,
        };

        // Save the updated data back to local storage
        localStorage.setItem("authTokens", JSON.stringify(updatedData));
        // Proceed with further actions like redirecting or fetching user data
        // navigate(routes.profile)
        setMessage("User Profile Updated Successfully");
        setShowSnackBar(true);
      }
    } catch (error: any) {
      // setFieldError(error.data.data.non_field_errors[0])
      console.error("Failed to login:", error);
    }
  };
  const handleCloseSnack = () => {
    setShowSnackBar(false);
  };

  return (
    <>
      <ContentBox topmargin={navBar.height}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item sm={3} xs={12} justifyContent={"center"}>
            <Paper
              sx={{
                padding: "22px",
              }}
            >
              <Grid container mb={5} justifyContent={"space-between"}>
                <Grid item>
                  <Grid container>
                    <ImageBox profile={true}>
                      <img
                        src={selectedImage || user.imageUrl}
                        alt="Jeet"
                        style={{
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </ImageBox>
                    {profileEdit && (
                      <ProfileImgInput>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="icon-button-file"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="icon-button-file">
                          <Tooltip
                            title="Update Image"
                            arrow
                            componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: primaryColor,
                                  color: "white",
                                },
                              },
                              arrow: {
                                sx: {
                                  color: primaryColor,
                                },
                              },
                            }}
                            slotProps={{
                              popper: {
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -14],
                                    },
                                  },
                                ],
                              },
                            }}
                          >
                            <IconButton
                              aria-label="upload picture"
                              component="span"
                            >
                              <AddPhotoAlternateIcon
                                sx={{
                                  color: `${primaryColor}`,
                                  cursor: "pointer",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </label>
                      </ProfileImgInput>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  {profileEdit ? (
                    <Tooltip
                      title="Remove Edit"
                      placement="left"
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: primaryColor,
                            color: "white",
                          },
                        },
                        arrow: {
                          sx: {
                            color: primaryColor,
                          },
                        },
                      }}
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Profile"
                        onClick={handleProfileEdit}
                      >
                        <EditOffIcon
                          sx={{
                            color: `${primaryColor}`,
                            cursor: "pointer",
                            // fontSize: '18px'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Edit Details"
                      placement="left"
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: primaryColor,
                            color: "white",
                          },
                        },
                        arrow: {
                          sx: {
                            color: primaryColor,
                          },
                        },
                      }}
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Profile"
                        onClick={handleProfileEdit}
                      >
                        <EditNoteIcon
                          sx={{
                            color: `${primaryColor}`,
                            cursor: "pointer",
                            // fontSize: '18px'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
              {profileEdit ? (
                <Box>
                  <TextField
                    variant="standard"
                    placeholder="Update Your First Name"
                    fullWidth
                    sx={{
                      marginY: "15px",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: primaryColor, // Default
                      },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: primaryColor, // Hover
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: primaryColor, // Active
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
                    onChange={(e) => handleProfileUpdate("first_name", e)}
                    value={user.first_name}
                  />
                  <TextField
                    variant="standard"
                    placeholder="Update Your Last Name"
                    fullWidth
                    sx={{
                      marginY: "15px",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: primaryColor, // Default
                      },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: primaryColor, // Hover
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: primaryColor, // Active
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
                    onChange={(e) => handleProfileUpdate("last_name", e)}
                    value={user.last_name}
                  />
                  <TextField
                    variant="standard"
                    placeholder="Update Your Email"
                    fullWidth
                    sx={{
                      marginY: "15px",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: primaryColor, // Default
                      },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: primaryColor, // Hover
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: primaryColor, // Active
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
                    onChange={(e) => handleProfileUpdate("email", e)}
                    value={user.email}
                  />
                  <TextField
                    autoComplete="new-password"
                    variant="standard"
                    placeholder="Update Your Password"
                    fullWidth
                    type={passwordFieldType}
                    sx={{
                      marginY: "15px",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: primaryColor, // Default
                      },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: primaryColor, // Hover
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: primaryColor, // Active
                      },
                    }}
                    InputProps={{
                      style: {
                        color: `${primaryColor}`,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          {passwordFieldType === "password" ? (
                            <IconButton
                              onClick={() => setPasswordFieldType("text")}
                            >
                              <VisibilityIcon style={{ color: primaryColor }} />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => setPasswordFieldType("password")}
                            >
                              <VisibilityOffIcon
                                style={{ color: secondaryColor }}
                              />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: { color: `${primaryColor}` }, // Change the color of the label
                    }}
                    onChange={(e) => handleProfileUpdate("password", e)}
                    value={user.password}
                  />
                </Box>
              ) : (
                <Box>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    my={2}
                  >
                    <Typography variant="body1" color={primaryColor}>
                      Name
                    </Typography>
                    <Typography
                      variant="body1"
                      color={secondaryColor}
                      className="profileData"
                    >
                      {user.first_name + " " + user.last_name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    my={2}
                  >
                    <Typography variant="body1" color={primaryColor}>
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      color={secondaryColor}
                      className="profileData"
                    >
                      {user.email}
                    </Typography>
                  </Grid>
                </Box>
              )}
              <Grid container justifyContent={"space-between"} my={2}>
                <CustomButton
                  variant="contained"
                  marginTop={true}
                  onClick={hadleLogout}
                >
                  Logout
                </CustomButton>
                {profileEdit && (
                  <CustomButton
                    variant="contained"
                    marginTop={true}
                    onClick={applyUpdate}
                  >
                    Update Profile
                  </CustomButton>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm={8} xs={12}>
            <PostsTable />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} spacing={2} mt={3}>
          <Grid item xs={8}>
            <Paper sx={{ padding: "10px" }}>
              {Object.keys(postData.editPost).length > 0 ? (
                <PostUpdateEditor />
              ) : (
                <PostEditor />
              )}
            </Paper>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </ContentBox>
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
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyProfile;
