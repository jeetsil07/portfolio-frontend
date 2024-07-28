import React, { useEffect, useState } from 'react'
import { ContentBox } from '../components/StyledComponents/CommonStyle'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { getUiUxState, setPostComments } from '../slices/ui'
import { Avatar, Button, Card, CardMedia, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../util/routes'
import { useGetPostCommentQuery } from '../services/comment.service'
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import { primaryColor, secondaryColor } from '../util/constant'
const Post = () => {
    const [expandedComments, setExpandedComments] = useState(new Set());
    const [expandedChildren, setExpandedChildren] = useState(new Set());
    const [showAllComments, setShowAllComments] = useState(false);
    console.log('post')
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { navBar, postData, postCategory, postComments } = useAppSelector(getUiUxState)
    useEffect(() => {
        if (Object.values(postData.selectedPost).length === 0) {
            navigate(routes.blogs)
        }
    }, [postData])

    const { data: comments, isLoading } = useGetPostCommentQuery(postData.selectedPost.id, {
        skip: Object.values(postData.selectedPost).length === 0
    })
    useEffect(() => {
        if (!comments || comments.status !== 200) return;
        dispatch(setPostComments({
            data: comments.data
        }))
    }, [comments])
    const getCategoryName = () => {
        const category = postCategory.data.find(item => item.id === postData.selectedPost.post_category);
        return category ? category.name : 'Category not found';
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
    const renderComments = (comments: any, level = 0, show = false) => {
        return comments.map((comment: any) => {
            const isExpanded = expandedComments.has(comment.comment_id);
            const showAllChildren = expandedChildren.has(comment.comment_id);

            const commentText = comment.comment.length > 100 && !isExpanded
                ? (
                    <Typography>
                        {comment.comment.substring(0, 100)}...
                        <Typography
                            variant='caption'
                            color={primaryColor}
                            // onClick={() => handleToggleExpand(comment.comment_id)}
                            style={{ cursor: 'pointer', display: 'inline' }}
                        >
                            Read More
                        </Typography>
                    </Typography>
                )
                : (<Typography>{comment.comment}</Typography>);

            const indent = (level === 0) ? { marginLeft: `${level * 40}px` } : { marginLeft: `${level + 40}px` }; // Adjust indent for nested comments

            return (
                <div key={comment.comment_id} style={indent}>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                        <Avatar sx={{ width: 30, height: 30, margin: '7px' }}>J</Avatar>
                        <Paper sx={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleToggleExpand(comment.comment_id)}>
                            <Typography variant='body1'>{commentText}</Typography>
                        </Paper>
                        {comment.children && comment.children.length > 1 && (
                            <Button
                                size="small"
                                sx={{ margin: '5px', fontSize: '10px', color: `${(showAllChildren === true) ? secondaryColor : primaryColor}` }}
                                onClick={() => handleToggleChildren(comment.comment_id)}
                            >
                                {showAllChildren ? 'Show Less' : 'Show All'}
                            </Button>
                        )}
                    </div>
                    {comment.children && comment.children.length > 1 && showAllChildren && (
                        <>
                            {renderComments(comment.children, level + 1, true)}
                        </>
                    )}
                    {comment.children && comment.children.length === 1 && (
                        <>
                            {renderComments(comment.children, level + 1)}
                        </>
                    )}
                    {comment.children && comment.children.length > 1 && !showAllChildren && (
                        <>
                            {renderComments(comment.children.slice(0, 1), level + 1)}
                        </>
                    )}
                </div>
            );
        });

    };
    return (
        <ContentBox topmargin={navBar.height}>
            <Grid container>
                <Grid item lg={8}>
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
                            <Grid item sx={{ py: 2 }}>
                                {postData.selectedPost.description}
                            </Grid>
                            <Typography variant='h6' color={'GrayText'}>Comment</Typography>
                            <Divider />
                            <Grid item sx={{ py: 2 }}>
                                <TextField
                                    variant='outlined'
                                    placeholder='Enter Comment'
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray', // Set outline color
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'gray', // Set outline color on hover
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'gray', // Set outline color when focused
                                            },
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: 'gray',
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => console.log('comment')}>
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                // onChange={(e) => pathName === "/blogs" ? setSearchPost(e.target.value) : setSearchProject(e.target.value)}
                                // value={pathName === "/blogs" ? searhPost : searchProject}
                                />
                            </Grid>
                            {postComments.data.length > 0 &&
                                <Grid item sx={{ py: 1 }}>
                                    {/* {renderComments(postComments.data)} */}
                                    {renderComments(showAllComments ? postComments.data : postComments.data.slice(0, 2))}
                                    {!showAllComments && postComments.data.length > 2 ? (
                                        <Button sx={{margin:2, color: primaryColor}} onClick={() => setShowAllComments(true)}>Show All Comments</Button>
                                    ) : <Button sx={{margin:2, color: secondaryColor}} onClick={() => setShowAllComments(false)}>Show Less</Button>}
                                </Grid>}
                        </Grid>
                    }
                </Grid>
                <Grid item sm={4}>

                </Grid>
            </Grid>

        </ContentBox>
    )
}

export default Post