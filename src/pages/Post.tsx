import React from 'react'
import { ContentBox } from '../components/StyledComponents/CommonStyle'
import { useAppSelector } from '../app/hook'
import { getUiUxState } from '../slices/ui'
import { Card, CardMedia, Divider, Grid, Typography } from '@mui/material'

const Post = () => {
    const { navBar, postData, postCategory } = useAppSelector(getUiUxState)
    // console.log(postData.selectedPost)
    const getCategoryName = () => {
        const category = postCategory.data.find(item => item.id === postData.selectedPost.id);
        return category ? category.name : 'Category not found';
    };
    return (
        <ContentBox topmargin={navBar.height}>
            {Object.values(postData.selectedPost).length > 0 &&
                <Grid container flexDirection={'column'} sx={{ background: '' }}>
                    <Grid item>
                        <Typography variant="h4" color={"GrayText"}>
                        {postData.selectedPost.title}
                        </Typography>
                        <Typography variant="caption" color={"GrayText"}>
                            {getCategoryName()}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item>
                        <Card sx={{ maxWidth: 600, margin: '30px auto' }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="240"
                                image={postData.selectedPost.image}
                            />
                        </Card>
                    </Grid>
                    <Grid item>
                    {postData.selectedPost.description}
                    </Grid>

                </Grid>
            }
        </ContentBox>
    )
}

export default Post