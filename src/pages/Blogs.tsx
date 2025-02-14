import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  getUiUxState,
  setBlogFilter,
  setNavBar,
  setPostCategory,
  setPostData,
} from "../slices/ui";
import {
  BackgroundFilter,
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
import BlogFilter from "../components/business/BlogFilter";
import { useGetPostsQuery } from "../services/posts.service";
import { primaryColor, secondaryColor } from "../util/constant";
import { useGetPostsCategoryQuery } from "../services/postsCategory.service";
import { Post, PostCategory } from "../util/type/types";
import { Route, useNavigate } from "react-router-dom";
import routes from "../util/routes";
import { formatDate, sortPosts } from "../util/general";
import { StyledBlogCard, StyledBlogCategoryHolder, StyledBlogCategoryTitle, StyledBlogContainer, StyledBlogLeft, StyledBlogPagination, StyledBlogPlaceHolder, StyledButton, StyledCategoryChip, StyledCategoryName, StyledFilterContainer } from "../components/StyledComponents/BlogStyle";

const Blogs = () => {
  const [postPage, setPostpage] = useState<number>(1);
  const { navBar, blogFilter, postData, postCategory } =
    useAppSelector(getUiUxState);
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const {
    data: postdata,
    isLoading,
    isFetching,
  } = useGetPostsQuery(postCategory.selectedCategory, {
    skip: Object.values(postCategory.selectedCategory).length === 0,
  });

  useEffect(() => {
    if (!postdata || postdata.status !== 200) return;
    const mutablePosts = JSON.parse(JSON.stringify(postdata.data));
    const dateOrder = blogFilter.filter.date;
    const sortedPosts = sortPosts(mutablePosts, dateOrder);
    dispatch(
      setPostData({
        data: sortedPosts,
      })
    );
  }, [postdata, dispatch, blogFilter, postCategory]);

  const toggleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(
      setBlogFilter({
        open: true,
      })
    );
  };
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        dispatch(
          setBlogFilter({
            open: false,
          })
        );
      }
    },
    [filterRef, dispatch]
  );

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [filterRef, handleOutsideClick]);
  const handlePostPage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPostpage(page);
  };

  const postsPerPage = 3;
  const totalPostPage = Math.ceil(postData.data.length / postsPerPage);
  const startIndex = (postPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const openPost = (post: Post) => {
    // dispatch(
    //   setPostData({
    //     selectedPost: post,
    //   })
    // );
    dispatch(
      setNavBar({
        selectedTab: -1,
      })
    );
    navigate(`${routes.post}/${post.id}`);
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };
  const setCatPage = (value: PostCategory) => {
    setPostpage(1);
    dispatch(
      setPostCategory({
        selectedCategory: value,
      })
    );
  };
  // Function to strip HTML tags and get plain text
  const stripHtmlTags = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || ""; // Extract plain text from HTML
  };
  return (
    <>
    <ContentBox topmargin={navBar.height} minHeight="100vh">
      <StyledFilterContainer
        container
      >
        <StyledCategoryName variant="h5">
          {postCategory.selectedCategory.name === ""
            ? "All Category"
            : postCategory.selectedCategory.name}
        </StyledCategoryName>
        <StyledButton
          variant="text"
          startIcon={<FilterAltIcon />}
          onClick={toggleFilter}
        >
          Blogs Filter
        </StyledButton>
      </StyledFilterContainer>
      <StyledBlogContainer container spacing={2}>
        <StyledBlogLeft item sm={8}>
          {!isFetching && !isLoading && postData.data.length > 0 ? (
            <>
              <Box>
                {postData.data
                  .slice(startIndex, endIndex)
                  .map((post: any, index: any) => (
                    <StyledBlogCard key={index}>
                      <CardActionArea>
                        <Grid container alignItems={"center"}>
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
                              <Typography variant="subtitle1" component="div">
                                {post.title}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="caption"
                                component="div"
                                color={"GrayText"}
                              >
                                {formatDate(post.created_at)}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: stripHtmlTags(
                                      post.description
                                    ).substring(0, 140),
                                  }}
                                />
                              </Typography>
                              <br />
                              <CustomButton
                                size="small"
                                marginTop={true}
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() => {
                                  openPost(post);
                                }}
                              >
                                Read More
                              </CustomButton>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </CardActionArea>
                    </StyledBlogCard>
                  ))}
                {(postdata === undefined || postdata?.length === 0) && (
                  <Typography variant="body1" color={"GrayText"} margin={2}>
                    No Result Found
                  </Typography>
                )}
              </Box>
              {postData.data.length > postsPerPage &&
              <StyledBlogPlaceHolder>
                <StyledBlogPagination
                  count={totalPostPage}
                  page={postPage}
                  onChange={handlePostPage}
                  showFirstButton
                  showLastButton
                />
              </StyledBlogPlaceHolder>}
            </>
          ) : (
            <StyledBlogPlaceHolder>
              {isFetching || isLoading ? (
                <Typography variant="body1" color="initial">
                  Loading Data...
                </Typography>
              ) : (
                <Typography variant="body1" color="initial">
                  No Post Available
                </Typography>
              )}
            </StyledBlogPlaceHolder>
          )}
        </StyledBlogLeft>
        <StyledBlogCategoryHolder item sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledBlogCategoryTitle
                variant="h6"
              >
                Blogs Category
              </StyledBlogCategoryTitle>
              {postCategory.data.length > 0 &&
                Object.values(postCategory.selectedCategory).length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap={"wrap"}>
                    <StyledCategoryChip
                      label="All"
                      variant="outlined"
                      selectedCategory={postCategory.selectedCategory.id === ""}
                      onClick={() => {
                        setCatPage({
                          id: "",
                          name: "",
                        });
                      }}
                    />
                    {postCategory.data?.map((category: any, index: number) => (
                      <StyledCategoryChip
                        key={index}
                        label={category.name}
                        variant="outlined"
                        selectedCategory={postCategory.selectedCategory.id === category.id}
                        onClick={() => {
                          setCatPage({
                            id: category.id,
                            name: category.name,
                          });
                        }}
                      />
                    ))}
                  </Stack>
                )}
            </Grid>
          </Grid>
        </StyledBlogCategoryHolder>
      </StyledBlogContainer>      
    </ContentBox>
    {blogFilter.open && (
      <BackgroundFilter>
        <section ref={filterRef}>
          <BlogFilter />
        </section>
      </BackgroundFilter>
    )}
    </>
  );
};

export default Blogs;
