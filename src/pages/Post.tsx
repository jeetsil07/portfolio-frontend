import React, { useEffect, useRef, useState } from "react";
import {
  ContentBox,
  NoContent,
  UserImg,
} from "../components/StyledComponents/CommonStyle";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUiUxState, setNavBar, setPostCategory, setPostComments, setPostData } from "../slices/ui";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../util/routes";
import {
  useCreatePostCommentMutation,
  useDeletePostCommentMutation,
  useGetPostCommentQuery,
  useUpdatePostCommentMutation,
} from "../services/comment.service";
import SendIcon from "@mui/icons-material/Send";
import {
  delModalStyle,
  ModalStyle,
  primaryColor,
  secondaryColor,
} from "../util/constant";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate, sortComments } from "../util/general";
import { getUserData, setUserData } from "../slices/user";
import {
  StyledNoComment,
  StyledPostCommentFieldHolder,
  StyledPostCommentSecHolder,
  StyledPostCommentSecTitle,
  StyledPostCommentShowBtn,
  StyledPostContainer,
  StyledPostDescriptionHolder,
  StyledPostImageCard,
  StyledPostWrapper,
  StyledSelectedPostArea,
  StyledSelectedPostCategory,
  StyledSelectedPostDate,
  StyledSelectedPostHeader,
  StyledSelectedPostTitle,
} from "../components/StyledComponents/PostStyle";
import { useGetPostsQuery } from "../services/posts.service";
import { useGetPostsCategoryQuery } from "../services/postsCategory.service";
import SimilarBlogs from "../components/business/SimilarBlogs";
import { Helmet } from "react-helmet-async";
const Post = () => {
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [expandedChildren, setExpandedChildren] = useState(new Set());
  const [showAllComments, setShowAllComments] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const [parentCommentId, setParentCommentId] = useState("");
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { navBar, postData, postCategory, postComments } =
    useAppSelector(getUiUxState);
  const { user } = useAppSelector(getUserData);
  const storedTokens = localStorage.getItem("authTokens");
  useEffect(()=>{
    dispatch(
      setNavBar({
        selectedTab: -1,
      })
    );
  },[])
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
  // useEffect(() => {
  //   if (Object.values(postData.selectedPost).length === 0) {
  //     navigate(routes.blogs);
  //     // Scroll to top after navigation
  //     window.scrollTo(0, 0);
  //   }
  // }, [postData]);
    const { data: postCategories, isLoading: categoryLoading } =
      useGetPostsCategoryQuery({});
    useEffect(() => {
      if (!postCategories || postCategories.status !== 200) return;
      dispatch(
        setPostCategory({
          data: postCategories.data,
        })
      );
    }, [postCategories, dispatch]);
  const { data:SelectedPostData, isLoading, isSuccess } = useGetPostsQuery(id);
  useEffect(()=>{
    if(SelectedPostData){
      dispatch(
        setPostData({
          selectedPost: {
            title: SelectedPostData?.data.title,
            id: SelectedPostData?.data.id,
            post_category: SelectedPostData?.data.post_category
          },
        })
      );
    }
    
  },[SelectedPostData,dispatch])
  useEffect(() => {
    // Function to apply styles to images
    const styleImages = () => {
      if (contentRef.current) {
        const images = contentRef.current.querySelectorAll("img");
        images.forEach((img: any) => {
          img.style.textAlign = "center";
          img.style.width = "60%";
          img.style.margin = "10px auto";
          img.style.display = "block";
        });
      }
    };

    // Apply styles when component mounts or postData changes
    styleImages();
  }, [SelectedPostData]);
  const { data: comments } = useGetPostCommentQuery(id, {
    skip: !id,
  });
  const [deleteComment] = useDeletePostCommentMutation();
  const [createPostComment] = useCreatePostCommentMutation();
  const [updatePostComment] = useUpdatePostCommentMutation();

  useEffect(() => {
    if (!comments || comments.status !== 200) return;
    const mutableComments = JSON.parse(JSON.stringify(comments.data));
    const sortedComments = sortComments(mutableComments);
    dispatch(
      setPostComments({
        data: sortedComments,
      })
    );
  }, [comments]);

  const getCategoryName = (post_category: number) => {
    const category = postCategory.data.find(
      (item) => item.id === post_category
    );
    return category ? category.name : "Category not found";
  };
  const handleToggleExpand = (commentId: any) => {
    setExpandedComments((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(commentId)) {
        newExpanded.delete(commentId);
      } else {
        newExpanded.add(commentId);
      }
      return newExpanded;
    });
  };
  const handleToggleChildren = (commentId: any) => {
    setExpandedChildren((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(commentId)) {
        newExpanded.delete(commentId);
      } else {
        newExpanded.add(commentId);
      }
      return newExpanded;
    });
  };
  const confirmDeleteComment = async () => {
    try {
      setDeleteCommentId("");
      setModalOpen(false);
      await deleteComment(deleteCommentId).unwrap();
    } catch (error) {
      const typedError = error as { status?: number };
      if (typedError.status === 404) {
        setShowSnackBar(true);
        // Handle 404 error, such as showing a message to the user
      } else {
        console.error("Failed to update comment:", error);
        // Handle other errors
      }
      console.error("Failed to delete the comment:", error);
    }
  };
  const handleCommentSubmit = async () => {
    try {
      if (parentCommentId !== "") {
        await createPostComment({
          related_post: postData.selectedPost.id,
          comment: newComment,
          parent_comment: parentCommentId,
        }).unwrap();
      } else {
        await createPostComment({
          related_post: postData.selectedPost.id,
          comment: newComment,
        }).unwrap();
      }
      setNewComment("");
      setParentCommentId("");
    } catch (error) {
      const typedError = error as { status?: number };
      if (typedError.status === 400) {
        setShowSnackBar(true);
        setNewComment("");
        setParentCommentId("");
        // Handle 404 error, such as showing a message to the user
      } else {
        console.error("Failed to update comment:", error);
        // Handle other errors
      }
      console.error("Failed to create comment", error);
    }
  };

  const handleCommentEdit = async () => {
    try {
      await updatePostComment({
        comment_id: editCommentId,
        comment: updatedComment,
      }).unwrap();
      setEditCommentId("");
      setUpdatedComment("");
      setModalOpen(false);
    } catch (error) {
      setEditCommentId("");
      setUpdatedComment("");
      setModalOpen(false);
      const typedError = error as { status?: number };
      if (typedError.status === 404) {
        setShowSnackBar(true);
        // Handle 404 error, such as showing a message to the user
      } else {
        console.error("Failed to update comment:", error);
        // Handle other errors
      }
      console.error("Failed to update comment", error);
    }
  };

  const renderComments = (comments: any, level = 0, show = false) => {
    return comments.map((comment: any) => {
      const isExpanded = expandedComments.has(comment.comment_id);
      const showAllChildren = expandedChildren.has(comment.comment_id);

      const commentText =
        comment.comment.length > 240 && !isExpanded ? (
          <Typography>
            {comment.comment.substring(0, 240)}...
            <Typography
              variant="caption"
              color={primaryColor}
              style={{ cursor: "pointer", display: "inline" }}
            >
              Read More
            </Typography>
          </Typography>
        ) : (
          <Typography>{comment.comment}</Typography>
        );

      const indent =
        level === 0
          ? { marginLeft: `${level * 40}px` }
          : { marginLeft: `${level + 40}px` }; // Adjust indent for nested comments

      return (
        <div key={comment.comment_id} style={indent}>
          <div style={{ display: "flex", alignItems: "start" }}>
            {comment.user ? (
              <UserImg alt="user" src={comment.user.image} />
            ) : (
              <Avatar
                sx={{
                  width: 20,
                  height: 20,
                  margin: "0 7px",
                  bgcolor: `hsl(${level * 40}, 100%, 80%)`,
                  padding: "3px",
                }}
              >
                <Typography variant="body1" color="white">
                  UU
                </Typography>
              </Avatar>
            )}

            <div>
              <Paper
                sx={{ padding: "5px", cursor: "pointer" }}
                onClick={() => handleToggleExpand(comment.comment_id)}
              >
                <Typography variant="caption" color={"GrayText"}>
                  {formatDate(comment.updated_at)}
                </Typography>
                <Typography variant="body2">{commentText}</Typography>
              </Paper>
              <div style={{ display: "flex" }}>
                <Tooltip
                  title="Add Comment"
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
                            offset: [0, -20],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <IconButton
                    onClick={() => addCommentModalHandle(comment.comment_id)}
                  >
                    <AddCommentIcon
                      sx={{
                        color: primaryColor,
                        margin: "5px",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                {user.user_id !== "" &&
                  comment.user &&
                  user.user_id === comment.user.user_id && (
                    <Tooltip
                      title="Edit Comment"
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
                                offset: [0, -20],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          editCommentModalHandle(
                            comment.comment_id,
                            comment.comment
                          )
                        }
                      >
                        <RateReviewIcon
                          sx={{
                            color: primaryColor,
                            margin: "5px",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                {user.user_id !== "" &&
                  comment.user &&
                  user.user_id === comment.user.user_id && (
                    <Tooltip
                      title="Delete Comment"
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
                                offset: [0, -20],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        onClick={() => handleDeleteClick(comment.comment_id)}
                      >
                        <DeleteIcon
                          sx={{
                            color: primaryColor,
                            margin: "5px",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                {comment.comment_likes !== 0 ? (
                  <>
                    <Tooltip
                      title="Total Like"
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
                                offset: [0, -20],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton>
                        <ThumbUpAltIcon
                          sx={{
                            color: `${primaryColor}`,
                            margin: "5px",
                            cursor: "pointer",
                            fontSize: "18px",
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: primaryColor, marginY: "7px" }}
                        >
                          {comment.comment_likes}
                        </Typography>
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip
                    title="Give Like"
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
                              offset: [0, -20],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <IconButton>
                      <ThumbUpOffAltIcon
                        sx={{
                          color: `${primaryColor}`,
                          margin: "5px",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>

            {comment.children && comment.children.length > 1 && (
              <Button
                size="small"
                sx={{
                  margin: "5px",
                  fontSize: "10px",
                  color: `${
                    showAllChildren === true ? secondaryColor : primaryColor
                  }`,
                }}
                onClick={() => handleToggleChildren(comment.comment_id)}
              >
                {showAllChildren ? "Show Less" : "Show All"}
              </Button>
            )}
          </div>
          {comment.children &&
            comment.children.length > 1 &&
            showAllChildren && (
              <>{renderComments(comment.children, level + 1, true)}</>
            )}
          {comment.children && comment.children.length === 1 && (
            <>{renderComments(comment.children, level + 1)}</>
          )}
          {comment.children &&
            comment.children.length > 1 &&
            !showAllChildren && (
              <>{renderComments(comment.children.slice(0, 1), level + 1)}</>
            )}
        </div>
      );
    });
  };

  const handleModalClose = () => {
    if (modalOpen) {
      setModalOpen(false);
      if (deleteCommentId !== "") {
        setDeleteCommentId("");
      }
      if (parentCommentId !== "") {
        setParentCommentId("");
        setNewComment("");
      }
      if (editCommentId !== "") {
        setEditCommentId("");
        setUpdatedComment("");
      }
    }
  };
  const addComment = (e: any) => {
    setNewComment(e.target.value);
  };

  const editComment = (e: any) => {
    setUpdatedComment(e.target.value);
  };
  const handleDeleteClick = (id: string) => {
    setModalOpen(true);
    setDeleteCommentId(id);
  };
  const addCommentModalHandle = (id: any) => {
    setNewComment("");
    setModalOpen(true);
    setParentCommentId(id);
  };
  const editCommentModalHandle = (id: any, comment: any) => {
    setEditCommentId(id);
    setUpdatedComment(comment);
    setModalOpen(true);
  };

  const handleCloseSnack = () => {
    setShowSnackBar(false);
  };

  const postTitle = `Post: ${id} - JeetHack`; // Replace this with your actual post title
  const postDescription = `This is the detailed page for Post ${id}. Learn more about the topic here!`;
  const postImage = `https://jeethack.com/tabicon.png`; // Replace this with your image URL

  return (
    <>
      <Helmet>
        <title>{postTitle}</title>
        <link rel="icon" href="/tabicon.png" />
        <meta name="description" content={postDescription} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:image" content={postImage} />
        <meta property="og:url" content={`https://jeethack.com/post/${id}`} />
        <meta property="og:type" content="article" />
      </Helmet>
      <ContentBox topmargin={navBar.height}>
        <StyledPostContainer container>
          <StyledPostWrapper item lg={7}>
            {isSuccess && Object.values(SelectedPostData?.data).length > 0 ?(
              <StyledSelectedPostArea container>
                <StyledSelectedPostHeader item>
                  <StyledSelectedPostTitle variant="h4">
                    {SelectedPostData.data.title}
                  </StyledSelectedPostTitle>
                  <Grid container justifyContent={"space-between"}>
                    <StyledSelectedPostCategory variant="caption">
                      {getCategoryName(SelectedPostData.data.post_category)}
                    </StyledSelectedPostCategory>
                    <StyledSelectedPostDate variant="caption">
                      {formatDate(SelectedPostData.data.created_at)}
                    </StyledSelectedPostDate>
                  </Grid>
                </StyledSelectedPostHeader>
                <Divider />
                <Grid item>
                  <StyledPostImageCard>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="240"
                      image={SelectedPostData.data.image}
                      sx={{ objectFit: "contain" }}
                    />
                  </StyledPostImageCard>
                </Grid>
                <StyledPostDescriptionHolder item>
                  <div
                    ref={contentRef}
                    dangerouslySetInnerHTML={{
                      __html: SelectedPostData.data.description,
                    }}
                  />
                </StyledPostDescriptionHolder>
                <StyledPostCommentSecTitle variant="h6">
                  Comment
                </StyledPostCommentSecTitle>
                <Divider />
                <StyledPostCommentFieldHolder item>
                  <TextField
                    variant="outlined"
                    placeholder="Enter Comment"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray", // Set outline color
                        },
                        "&:hover fieldset": {
                          borderColor: "gray", // Set outline color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "gray", // Set outline color when focused
                        },
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "gray",
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleCommentSubmit}>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => addComment(e)}
                    value={parentCommentId === "" ? newComment : ""}
                  />
                </StyledPostCommentFieldHolder>
                {postComments.data.length > 0 ? (
                  <StyledPostCommentSecHolder item>
                    {renderComments(
                      showAllComments
                        ? postComments.data
                        : postComments.data.slice(0, 2)
                    )}
                    {!showAllComments && postComments.data.length > 2 ? (
                      <StyledPostCommentShowBtn
                        colorCode={primaryColor}
                        onClick={() => setShowAllComments(true)}
                      >
                        Show All Comments
                      </StyledPostCommentShowBtn>
                    ) : postComments.data.length <= 2 ? (
                      <></>
                    ) : (
                      <StyledPostCommentShowBtn
                        colorCode={secondaryColor}
                        onClick={() => setShowAllComments(false)}
                      >
                        Show Less
                      </StyledPostCommentShowBtn>
                    )}
                  </StyledPostCommentSecHolder>
                ) : (
                  <StyledNoComment>No Comments</StyledNoComment>
                )}
              </StyledSelectedPostArea>
            ):(<NoContent>{isLoading ? <h3>Loadng...</h3> : <h3>No Data Available</h3>}</NoContent>)}
          </StyledPostWrapper>
          <Grid item lg={4} sx={{ width: '100%' }}>
            <SimilarBlogs/>
          </Grid>
        </StyledPostContainer>
      </ContentBox>

      {deleteCommentId !== "" && (
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-describedby="modal-modal-description"
        >
          <Paper sx={delModalStyle}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Do You want to delete the comment ?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleModalClose}>No</Button>
              <Button onClick={confirmDeleteComment}>Yes</Button>
            </Box>
          </Paper>
        </Modal>
      )}

      {parentCommentId !== "" && (
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-describedby="modal-modal-description"
        >
          <Paper sx={ModalStyle}>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Add Your Comment
            </Typography>
            <Grid item sx={{ py: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Enter Comment"
                fullWidth
                multiline
                rows={5}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray",
                    },
                  },
                }}
                InputProps={{
                  style: {
                    color: "gray",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentSubmit}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => addComment(e)}
                value={newComment}
              />
            </Grid>
          </Paper>
        </Modal>
      )}
      {editCommentId !== "" && (
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-describedby="modal-modal-description"
        >
          <Paper sx={ModalStyle}>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Edit Your Comment
            </Typography>
            <Grid item sx={{ py: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Enter Comment"
                fullWidth
                multiline
                rows={5}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray",
                    },
                  },
                }}
                InputProps={{
                  style: {
                    color: "gray",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentEdit}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => editComment(e)}
                value={updatedComment}
              />
            </Grid>
          </Paper>
        </Modal>
      )}
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
          Comment does not exist...
        </Alert>
      </Snackbar>
    </>
  );
};

export default Post;
