import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUiUxState, setBlogFilter } from "../slices/ui";
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


const Blogs = () => {
  console.log("blogs");
  const [postCategory, setPostCategory] = useState<string>("Recent Posts");
  const [postPage, setPostpage] = useState<number>(1);
  const { navBar, blogFilter } = useAppSelector(getUiUxState);
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { data: postdata, error, isLoading } = useGetPostsQuery({})
  console.log(isLoading, 'data', postdata)

  const allPostCategory = [
    "Recent Posts",
    "Sports",
    "Politics",
    "Wild Life",
    "Technology",
    "Education",
    "Travel",
    "Heritage & Culture",
    "Entertainment",
    "History of India",
  ];
  const toggleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setBlogFilter({
      open: true
    }))
  }
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      console.log(filterRef.current, event.target);
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

  const postsPerPage = 5;
  const totalPostPage = Math.ceil(postdata?.length / postsPerPage);
  const startIndex = (postPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return (
    <ContentBox topmargin={navBar.height}>
      <Grid
        container
        sx={{ padding: "10px" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" color={"GrayText"}>
          {postCategory}
        </Typography>
        <Button
          variant="text"
          startIcon={<FilterAltIcon />}
          sx={{
            color: "#47A992", // Change text color
            "& .MuiSvgIcon-root": {
              color: "#47A992", // Change icon color
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
            !isLoading &&
            <Box>
              {postdata.map((post: any, index: any) => (
                <Card key={index} sx={{ padding: "5px", margin: "10px" }}>
                  <CardActionArea>
                    <Grid container alignItems={"start"}>
                      <Grid item md={6} xs={12}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={post.image}
                          alt="post img"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {post.title}
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
                          >
                            Read More
                          </CustomButton>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          }
          <Stack sx={{ margin: "25px" }}>
            <Pagination
              count={10}
              page={postPage}
              onChange={handlePostPage}
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#47A992", // Change to your desired color
                },
                "& .Mui-selected": {
                  backgroundColor: "#FF0060 !important", // Change to your desired color
                  color: "white", // Change to your desired color
                  transform: "scale(1.2)",
                },
                alignSelf: "center",
              }}
            />
          </Stack>
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
              <Stack direction="row" spacing={1} flexWrap={"wrap"}>
                {allPostCategory.map((category: string, index: number) => (
                  <Chip
                    key={index}
                    label={`${category} ${10}`}
                    variant="outlined"
                    sx={{
                      "&.MuiChip-root": {
                        margin: "3px",
                        backgroundColor:
                          category === postCategory ? "#47A992" : "inherit",
                        color: category === postCategory ? "#fff" : "inherit",
                        "&:hover": {
                          backgroundColor: "#47A992",
                          color: "#fff",
                        },
                      },
                    }}
                    onClick={() => setPostCategory(category)}
                  />
                ))}
              </Stack>
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
