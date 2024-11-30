import { Alert, Grid, Paper, Snackbar } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppSelector } from "../app/hook";
import { getUiUxState } from "../slices/ui";
import { ContentBox } from "../components/StyledComponents/CommonStyle";
import "../css/global.scss";
import PostEditor from "../components/business/PostEditor";
import PostsTable from "../components/business/PostsTable";
import PostUpdateEditor from "../components/business/PostUpdateEditor";
import UserDetails from "../components/business/UserDetails";

const MyProfile = () => {
  const [message, setMessage] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const { navBar, postData } = useAppSelector(getUiUxState);
  const UpdateFormRef = useRef(null);

  const handleCloseSnack = () => {
    setShowSnackBar(false);
  };

  return (
    <>
      <ContentBox topmargin={navBar.height}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item md={4} xs={12} justifyContent={"center"}>
            <UserDetails
              setShowSnackBar={setShowSnackBar}
              setMessage={setMessage}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <PostsTable UpdateFormRef={UpdateFormRef} />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} spacing={2} mt={3}>
          <Grid item md={8}>
            <Paper sx={{ padding: "10px" }}>
              {Object.keys(postData.editPost).length > 0 ? (
                <PostUpdateEditor UpdateFormRef={UpdateFormRef} />
              ) : (
                <PostEditor />
              )}
            </Paper>
          </Grid>
          <Grid item md={3}></Grid>
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
