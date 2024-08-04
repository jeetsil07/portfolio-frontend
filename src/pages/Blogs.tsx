import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUiUxState, setBlogFilter, setNavBar, setPostCategory, setPostData } from "../slices/ui";
import {
  ContentBox,
  CustomButton,
} from "../components/StyledComponents/CommonStyle";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import BlogFilter from "../components/BlogFilter";
import { useGetPostsQuery } from "../services/posts.service";
import { primaryColor, secondaryColor } from "../util/constant";
import { useGetPostsCategoryQuery } from "../services/postsCategory.service";
import { Post, PostCategory } from "../util/type/types";
import { Route, useNavigate } from "react-router-dom";
import routes from "../util/routes";
import { formatDate, sortPosts } from "../util/general";


const Blogs = () => {
  console.log("blogs");
  const [postPage, setPostpage] = useState<number>(1);
  const { navBar, blogFilter, postData, postCategory } = useAppSelector(getUiUxState);
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: postCategories, isLoading: categoryLoading } = useGetPostsCategoryQuery({})
  useEffect(() => {
    if (!postCategories || postCategories.status !== 200) return
    dispatch(
      setPostCategory({
        data: postCategories.data,
        // selectedCategory: {
        //   id: '',
        //   name: ''
        // }
      })
    )
  }, [postCategories, dispatch])
  const { data: postdata, isLoading } = useGetPostsQuery(postCategory.selectedCategory, {
    skip: Object.values(postCategory.selectedCategory).length === 0
  })

  useEffect(() => {
    if (!postdata || postdata.status !== 200) return
    const mutablePosts = JSON.parse(JSON.stringify(postdata.data));
    const dateOrder = blogFilter.filter.date
    const sortedPosts = sortPosts(mutablePosts, dateOrder)
    dispatch(
      setPostData({
        data: sortedPosts
      })
    )
  }, [postdata, dispatch, blogFilter])

  const toggleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setBlogFilter({
      open: true
    }))
  }
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      dispatch(setBlogFilter({
        open: false
      }));
    }
  }, [filterRef, dispatch]);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  }, [filterRef, handleOutsideClick])
  const handlePostPage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPostpage(page);
  }

  const postsPerPage = 2;
  const totalPostPage = Math.ceil(postData.data.length / postsPerPage);
  const startIndex = (postPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const openPost = (post: Post) => {
    dispatch(
      setPostData({
        selectedPost: post
      }),
    )
    dispatch(
      setNavBar({
        selectedTab: -1
      })
    )
    navigate(routes.post)
  }
  const setCatPage = (value: PostCategory) => {
    setPostpage(1)
    dispatch(
      setPostCategory({
        selectedCategory: value
      })
    )
  }
  return (
    <ContentBox topmargin={navBar.height}>
      <Grid
        container
        sx={{ padding: "10px" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" color={"GrayText"}>
          {postCategory.selectedCategory.name === '' ? 'All' : postCategory.selectedCategory.name}
        </Typography>
        <Button
          variant="text"
          startIcon={<FilterAltIcon />}
          sx={{
            color: primaryColor, // Change text color
            "& .MuiSvgIcon-root": {
              color: primaryColor, // Change icon color
            },
          }}
          onClick={toggleFilter}
        >
          Blogs Filter
        </Button>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          {
            !isLoading && postData.data.length > 0 ?
              (
                <>
                  <Box>
                    {postData.data.slice(startIndex, endIndex).map((post: any, index: any) => (
                      <Card key={index} sx={{ padding: "5px", margin: "10px" }}>
                        <CardActionArea>
                          <Grid container alignItems={"start"}>
                            <Grid item md={6} xs={12}>
                              <CardMedia
                                component="img"
                                height="170"
                                image={post.image}
                                alt="post img"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CardContent>
                                <Typography
                                  variant="subtitle1"
                                  component="div"
                                >
                                  {post.title}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="caption"
                                  component="div"
                                  color={'GrayText'}
                                >
                                  {formatDate(post.created_at)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {post.description.substring(0, 100)}...
                                </Typography>
                                <br />
                                <CustomButton
                                  size="small"
                                  marginTop={true}
                                  variant="contained"
                                  endIcon={<SendIcon />}
                                  onClick={() => { openPost(post) }}
                                >
                                  Read More
                                </CustomButton>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                      </Card>
                    ))}
                    {(postdata === undefined || postdata?.length === 0) &&
                      <Typography variant="body1" color={"GrayText"} margin={2}>No Result Found</Typography>
                    }
                  </Box>
                  <Stack sx={{ margin: "25px" }}>
                    <Pagination
                      count={totalPostPage}
                      page={postPage}
                      onChange={handlePostPage}
                      showFirstButton
                      showLastButton
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: primaryColor, // Change to your desired color
                        },
                        "& .Mui-selected": {
                          backgroundColor: `${secondaryColor} !important`, // Change to your desired color
                          color: "white", // Change to your desired color
                          transform: "scale(1.2)",
                        },
                        alignSelf: "center",
                      }}
                    />
                  </Stack>
                </>) : (
                <Typography variant="body1" color="initial">No Post Available</Typography>
              )
          }
        </Grid>
        <Grid item sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color={"GrayText"}
                sx={{
                  margin: "5px",
                  marginBottom: "10px",
                }}
              >
                Blogs Category
              </Typography>
              {
                (postCategory.data.length > 0 && Object.values(postCategory.selectedCategory).length > 0) && (
                  <Stack direction="row" spacing={1} flexWrap={"wrap"}>
                    <Chip
                      label='All'
                      variant="outlined"
                      sx={{
                        "&.MuiChip-root": {
                          margin: "3px",
                          backgroundColor:
                            postCategory.selectedCategory.id === '' ? primaryColor : "inherit",
                          color: postCategory.selectedCategory.id === '' ? "#fff" : "inherit",
                          "&:hover": {
                            backgroundColor: primaryColor,
                            color: "#fff",
                          },
                        },
                      }}
                      onClick={() => {
                        setCatPage({
                          id: '',
                          name: ''
                        })

                      }}
                    />
                    {postCategory.data?.map((category: any, index: number) => (
                      <Chip
                        key={index}
                        label={category.name}
                        variant="outlined"
                        sx={{
                          "&.MuiChip-root": {
                            margin: "3px",
                            backgroundColor:
                              category.id === postCategory.selectedCategory.id ? primaryColor : "inherit",
                            color: category.id === postCategory.selectedCategory.id ? "#fff" : "inherit",
                            "&:hover": {
                              backgroundColor: primaryColor,
                              color: "#fff",
                            },
                          },
                        }}
                        onClick={() => {
                          setCatPage({
                            id: category.id,
                            name: category.name
                          })
                        }}
                      />
                    ))}
                  </Stack>

                )
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {
        blogFilter.open && (
          <section ref={filterRef}>
            <BlogFilter />
          </section>
        )
      }
    </ContentBox>
  );
};

export default Blogs;
