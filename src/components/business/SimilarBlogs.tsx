import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getUiUxState, setNavBar } from "../../slices/ui";
import { useGetPostsQuery } from "../../services/posts.service";
import Typography from "@mui/material/Typography";
import { Post } from "../../util/type/types";
import { Box, Divider, Grid } from "@mui/material";
import { ImageHolder, SimilarPostHeading } from "../StyledComponents/PostStyle";
import { primaryColor, secondaryColor } from "../../util/constant";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../util/routes";
import { StyledBlogPagination, StyledBlogPlaceHolder } from "../StyledComponents/BlogStyle";

const SimilarBlogs = () => {
    const { postData } = useAppSelector(getUiUxState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [postPage, setPostpage] = useState<number>(1);

    const payload = {
        id: postData?.selectedPost.post_category,
    };
    const { data: SimilarPosts, isLoading } = useGetPostsQuery(payload, {
        skip: !payload.id,
    });
    // console.log('SimilarPosts', SimilarPosts)
    const openPost = (post: Post) => {
        dispatch(
            setNavBar({
                selectedTab: -1,
            })
        );
        navigate(`${routes.post}/${post.id}`);
        window.scrollTo(0, 0);
    };

    const handlePostPage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPostpage(page);
    };

    const orderedPosts = [...(SimilarPosts?.data ?? [])].sort(
        (a: Post, b: Post) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
    const postsPerPage = 10;
    const totalPostPage = Math.ceil(orderedPosts?.length / postsPerPage);
    const startIndex = (postPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const extractShortDesc = (description: string)=>{
        const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 100);
    }
    return (
        <>
            {isLoading ? (
                <Typography variant="h6">Loading...</Typography>
            ) : (
                <Grid >
                    <SimilarPostHeading variant="h4">Similar Posts</SimilarPostHeading>
                    {SimilarPosts && orderedPosts &&
                        orderedPosts.slice(startIndex, endIndex)
                            .map((post: Post) => (
                                <>
                                <Grid container key={post.id} sx={{marginTop:"16px",marginBottom:"5px",cursor: 'pointer' }} onClick={() => {
                                        openPost(post);
                                    }}>
                                    <Grid item xs={3}>
                                        <ImageHolder>
                                            <img src={post.image} alt={post.title} />
                                        </ImageHolder>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography
                                            variant="h5"
                                            noWrap
                                            sx={{
                                                color: secondaryColor,
                                                paddingLeft: '16px'
                                            }}
                                        >
                                            {post.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color={primaryColor} paddingLeft="16px">                                            
                                            {extractShortDesc(post.description)}...
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                </>
                            ))}
                    {
                        SimilarPosts?.data?.length > postsPerPage &&
                        <StyledBlogPlaceHolder>
                            <StyledBlogPagination
                                count={totalPostPage}
                                page={postPage}
                                onChange={handlePostPage}
                                showFirstButton
                                showLastButton
                            />
                        </StyledBlogPlaceHolder>
                    }

                </Grid>
            )}
        </>
    );
};

export default SimilarBlogs;
