import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  ImageBox,
  ProfileImgInput,
  StyledButton,
} from "../StyledComponents/CommonStyle";
import { primaryColor, secondaryColor } from "../../util/constant";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getUserData, setUserData } from "../../slices/user";
import { setPostData } from "../../slices/ui";
import { useNavigate } from "react-router-dom";
import routes from "../../util/routes";
import { useUpdateUserMutation } from "../../services/UserRegistration.service";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditOffIcon from "@mui/icons-material/EditOff";
import {
  StyledBioField,
  StyledEditNoteIcon,
  StyledEditOffIcon,
  StyledTextField,
  UserDetailsAns,
  UserDetailsContainer,
  UserDetailsHolder,
  UserDetailsPoints,
  UserPhotoContainer,
} from "../StyledComponents/UserStyle";

interface UserDetailsProps {
  setShowSnackBar: (value: boolean) => void;
  setMessage: (message: string) => void;
}
const UserDetails: React.FC<UserDetailsProps> = ({
  setShowSnackBar,
  setMessage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAppSelector(getUserData);

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
        bio: "",
      })
    );
    dispatch(
      setPostData({
        editPost: {},
      })
    );
    navigate(routes.login);
    window.scrollTo(0, 0);
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
            bio: user.bio,
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
  const [userUpdate, { isLoading }] = useUpdateUserMutation();

  const applyUpdate = async () => {
    try {
      if (
        user.email === "" ||
        user.first_name === "" ||
        user.last_name === "" ||
        user.bio === ""
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
        ...(file ? { image: file } : {}),
        bio: user.bio,
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
        handleProfileEdit();
      }
    } catch (error: any) {
      if (error.status === 400) {
        setMessage("Invalid input data. Please check your fields.");
      } else if (error.status === 401) {
        setMessage("Unauthorized. Please log in again.");
      } else if (error.status === 500) {
        setMessage("Server error. Please try again later.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
      setShowSnackBar(true); // Show the error message
    }
  };

  return (
    <UserDetailsHolder>
      <UserPhotoContainer container>
        <Grid item>
          <Grid container>
            <ImageBox profile={true}>
              <img src={selectedImage || user.imageUrl} alt={user.first_name} />
            </ImageBox>
            {profileEdit && (
              <ProfileImgInput>
                <input
                  accept="image/*"
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
                    <IconButton aria-label="upload picture" component="span">
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
                    bgcolor: secondaryColor,
                    color: "white",
                  },
                },
                arrow: {
                  sx: {
                    color: secondaryColor,
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
              <IconButton aria-label="Edit Profile" onClick={handleProfileEdit}>
                <StyledEditOffIcon />
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
              <IconButton aria-label="Edit Profile" onClick={handleProfileEdit}>
                <StyledEditNoteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </UserPhotoContainer>
      {profileEdit ? (
        <Box>
          <StyledTextField
            variant="standard"
            placeholder="Update Your First Name"
            fullWidth
            onChange={(e) => handleProfileUpdate("first_name", e)}
            value={user.first_name}
          />
          <StyledTextField
            variant="standard"
            placeholder="Update Your Last Name"
            fullWidth
            onChange={(e) => handleProfileUpdate("last_name", e)}
            value={user.last_name}
          />
          <StyledTextField
            variant="standard"
            placeholder="Update Your Email"
            fullWidth
            onChange={(e) => handleProfileUpdate("email", e)}
            value={user.email}
          />
          <StyledBioField
            variant="outlined"
            placeholder="Update Bio"
            fullWidth
            multiline
            rows={3}
            onChange={(e) => handleProfileUpdate("bio", e)}
            value={user.bio}
          />
        </Box>
      ) : (
        <Box>
          <UserDetailsContainer container>
            <Grid item xs={2}>
              <UserDetailsPoints variant="body1">Name</UserDetailsPoints>
            </Grid>
            <Grid item xs={10}>
              <UserDetailsAns variant="body1" className="profileData">
                {user.first_name + " " + user.last_name}
              </UserDetailsAns>
            </Grid>
          </UserDetailsContainer>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"start"}
            my={2}
          >
            <Grid item xs={2}>
              <UserDetailsPoints variant="body1">Email</UserDetailsPoints>
            </Grid>
            <Grid item xs={10}>
              <UserDetailsAns variant="body1" className="profileData">
                {user.email}
              </UserDetailsAns>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"start"}
            my={2}
          >
            <Grid item xs={2}>
              <UserDetailsPoints variant="body1">Bio</UserDetailsPoints>
            </Grid>
            <Grid item xs={10}>
              <UserDetailsAns variant="body1" className="profileData">
                {user.bio}
              </UserDetailsAns>
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid container justifyContent={"space-between"} sx={{mt: 2}}>
        {profileEdit ? (
          <StyledButton
            spaceMargin={false}
            variant="contained"
            onClick={applyUpdate}
            fullWidth
          >
            {isLoading ? "Updating..." : "Apply"}
          </StyledButton>
        ) : (
          <StyledButton
            spaceMargin={false}
            variant="contained"
            onClick={hadleLogout}
            fullWidth
          >
            Logout
          </StyledButton>
        )}
      </Grid>
    </UserDetailsHolder>
  );
};

export default UserDetails;
