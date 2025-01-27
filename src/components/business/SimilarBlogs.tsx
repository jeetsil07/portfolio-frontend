import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { getUiUxState, setNavBar } from '../../slices/ui'
import { useGetPostsQuery } from '../../services/posts.service';
import Typography from '@mui/material/Typography'
import { Post } from '../../util/type/types';
import { Box, Grid } from '@mui/material';
import { ImageHolder, SimilarPostHeading } from '../StyledComponents/PostStyle';
import { primaryColor } from '../../util/constant';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '../../util/routes';

const SimilarBlogs = () => {
    const { postData } = useAppSelector(getUiUxState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const payload = {
        id: postData?.selectedPost.post_category
    }
    const {
        data: SimilarPosts,
        isLoading
    } = useGetPostsQuery(payload, {
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
    return (
        <>
            {
                isLoading ? (
                    <Typography variant="h6">Loading...</Typography>
                ) : (
                    <Grid container>
                        <SimilarPostHeading variant="h4">Similar Posts</SimilarPostHeading>
                        {SimilarPosts && SimilarPosts.data.map((post: Post) => (
                            <Grid item key={post.id} xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    sx={{
                                        margin: "8px 0",
                                        padding: "8px",
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        backgroundColor: "#f5f5f5",
                                    }}
                                    onClick={() => {
                                        openPost(post);
                                    }}
                                >
                                    <ImageHolder>
                                        <img src={post.image} alt="" />
                                    </ImageHolder>
                                    <Typography variant="body2" noWrap sx={{
                                        color: primaryColor
                                    }}>
                                        {post.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </>
    )
}

export default SimilarBlogs