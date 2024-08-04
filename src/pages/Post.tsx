import React, { useEffect, useState } from 'react'
import { ContentBox } from '../components/StyledComponents/CommonStyle'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { getUiUxState, setPostComments } from '../slices/ui'
import { Avatar, Box, Button, Card, CardMedia, Divider, Grid, IconButton, InputAdornment, Modal, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../util/routes'
import { useCreatePostCommentMutation, useDeletePostCommentMutation, useGetPostCommentQuery, useUpdatePostCommentMutation } from '../services/comment.service'
import SendIcon from '@mui/icons-material/Send';
import { delModalStyle, ModalStyle, primaryColor, secondaryColor } from '../util/constant'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';
import { Comment } from '../util/type/types'
const Post = () => {
    const [expandedComments, setExpandedComments] = useState(new Set());
    const [expandedChildren, setExpandedChildren] = useState(new Set());
    const [showAllComments, setShowAllComments] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteCommentId, setDeleteCommentId] = useState('')
    const [parentCommentId, setParentCommentId] = useState('')
    const [newComment, setNewComment] = useState('')
    const [editCommentId, setEditCommentId] = useState('')
    const [updatedComment, setUpdatedComment] = useState('');

    console.log('post')
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { navBar, postData, postCategory, postComments } = useAppSelector(getUiUxState)
    useEffect(() => {
        if (Object.values(postData.selectedPost).length === 0) {
            navigate(routes.blogs)
        }
    }, [postData])

    const { data: comments } = useGetPostCommentQuery(postData.selectedPost.id, {
        skip: Object.values(postData.selectedPost).length === 0
    })
    const [deleteComment] = useDeletePostCommentMutation();
    const [createPostComment] = useCreatePostCommentMutation();
    const [updatePostComment] = useUpdatePostCommentMutation();

    useEffect(() => {
        if (!comments || comments.status !== 200) return;
        const mutableComments = JSON.parse(JSON.stringify(comments.data));
        const sortedComments = sortComments(mutableComments)
        dispatch(setPostComments({
            data: sortedComments
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
    const confirmDeleteComment = async () => {
        try {
            setDeleteCommentId('')
            setModalOpen(false)
            await deleteComment(deleteCommentId).unwrap();
        } catch (error) {
            console.error('Failed to delete the comment:', error);
        }
    }
    const handleCommentSubmit = async () => {
        try {
            if (parentCommentId !== '') {
                await createPostComment({ related_post: postData.selectedPost.id, comment: newComment, parent_comment: parentCommentId }).unwrap();
            } else {
                await createPostComment({ related_post: postData.selectedPost.id, comment: newComment }).unwrap();
            }
            setNewComment('');
            setParentCommentId('');
        } catch (error) {
            console.error('Failed to create comment', error);
        }
    };

    const handleCommentEdit = async () => {
        try {
            await updatePostComment({ comment_id: editCommentId, comment: updatedComment }).unwrap();
            setEditCommentId('');
            setUpdatedComment('');
            setModalOpen(false);
            console.log('Comment updated successfully');
        } catch (error) {
            console.error('Failed to update comment', error);
        }
    };
    const formatDate = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);

        const options: Intl.DateTimeFormatOptions = { weekday: 'short' }; // Abbreviated day name
        const dayName = date.toLocaleDateString('en-US', options); // Sun
        const day = String(date.getDate()).padStart(2, '0'); // 04
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 08 (months are zero-indexed in JavaScript)
        const year = date.getFullYear(); // 2024
        const hours = String(date.getHours()).padStart(2, '0'); // 07
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 57

        const formattedDate = `${dayName}, ${day}-${month}-${year} ${hours}:${minutes}`;
        return formattedDate;
    };
    const renderComments = (comments: any, level = 0, show = false) => {
        console.log(level, 'level')
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
                    <div style={{ display: 'flex', alignItems: 'start', margin: '10px' }}>
                        <Avatar sx={{ width: 30, height: 30, margin: '0 7px', bgcolor: `hsl(${level * 40}, 100%, 80%)` }}>J</Avatar>
                        <div>
                            <Paper sx={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleToggleExpand(comment.comment_id)}>
                                <Typography variant='caption' color={'GrayText'}>{formatDate(comment.updated_at)}</Typography>
                                <Typography variant='body2'>{commentText}</Typography>
                            </Paper>
                            <div style={{ display: 'flex' }}>
                                <Tooltip title="Add Comment"
                                    arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: primaryColor,
                                                color: 'white',
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
                                                    name: 'offset',
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
                                            sx={{ color: primaryColor, margin: '8px', fontSize: '16px', cursor: 'pointer' }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit Comment"
                                    arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: primaryColor,
                                                color: 'white',
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
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, -20],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <IconButton
                                        onClick={() => editCommentModalHandle(comment.comment_id, comment.comment)}

                                    >
                                        <RateReviewIcon
                                            sx={{ color: primaryColor, margin: '8px', fontSize: '16px', cursor: 'pointer' }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Comment"
                                    arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: primaryColor,
                                                color: 'white',
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
                                                    name: 'offset',
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
                                            sx={{ color: primaryColor, margin: '8px', fontSize: '16px', cursor: 'pointer' }}

                                        />
                                    </IconButton>
                                </Tooltip>
                                {
                                    comment.comment_likes !== 0 ? (
                                        <>
                                            <Tooltip title="Total Like"
                                                arrow
                                                componentsProps={{
                                                    tooltip: {
                                                        sx: {
                                                            bgcolor: primaryColor,
                                                            color: 'white',
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
                                                                name: 'offset',
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
                                                            margin: '8px',
                                                            cursor: 'pointer',
                                                            fontSize: '16px'
                                                        }}
                                                    />
                                                    <Typography variant="caption" sx={{ color: primaryColor, marginY: '7px', }}>
                                                        {comment.comment_likes}
                                                    </Typography>
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Tooltip title="Give Like"
                                            arrow
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: primaryColor,
                                                        color: 'white',
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
                                                            name: 'offset',
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
                                                        margin: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '16px'
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                }
                            </div>
                        </div>

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

    const sortComments = (comments: Comment[]): Comment[] => {
        // Sort comments by created_at in descending order
        comments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        // Recursively sort the children comments
        comments.forEach((comment) => {
            if (comment.children && comment.children.length > 0) {
                sortComments(comment.children);
            }
        });

        return comments;
    };
    const handleModalClose = () => {
        if (modalOpen) {
            setModalOpen(false)
            if (deleteCommentId !== '') {
                setDeleteCommentId('')
            }
            if (parentCommentId !== '') {
                setParentCommentId('')
                setNewComment('');
            }
            if (editCommentId !== '') {
                setEditCommentId('');
                setUpdatedComment('');
            }

        }
    }
    const addComment = (e: any) => {
        setNewComment(e.target.value)
    }

    const editComment = (e: any) => {
        setUpdatedComment(e.target.value)
    }
    const handleDeleteClick = (id: string) => {
        setModalOpen(true)
        setDeleteCommentId(id)
    };
    const addCommentModalHandle = (id: any) => {
        setNewComment('');
        setModalOpen(true)
        setParentCommentId(id)
    }

    const editCommentModalHandle = (id: any, comment: any) => {
        setEditCommentId(id);
        setUpdatedComment(comment);
        setModalOpen(true);
    }
    return (
        <>
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
                                                    <IconButton
                                                        onClick={handleCommentSubmit}>
                                                        <SendIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={(e) => addComment(e)}
                                        value={parentCommentId === '' ? newComment : ''}
                                    />
                                </Grid>
                                {postComments.data.length > 0 ?
                                    <Grid item sx={{ py: 1 }}>
                                        {renderComments(showAllComments ? postComments.data : postComments.data.slice(0, 2))}
                                        {!showAllComments && postComments.data.length > 2 ? (
                                            <Button sx={{ margin: 2, color: primaryColor }} onClick={() => setShowAllComments(true)}>Show All Comments</Button>
                                        ) : (postComments.data.length <= 2) ? <></> : <Button sx={{ margin: 2, color: secondaryColor }} onClick={() => setShowAllComments(false)}>Show Less</Button>}
                                    </Grid> : <Typography sx={{ mt: 2, textAlign: 'center' }}>
                                        No Comments
                                    </Typography>
                                }
                            </Grid>
                        }
                    </Grid>
                    <Grid item sm={4}>

                    </Grid>
                </Grid>
            </ContentBox>

            {
                deleteCommentId !== '' &&
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-describedby="modal-modal-description"
                >
                    <Paper sx={delModalStyle}>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                            Do You want to delete the comment ?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleModalClose}>No</Button>
                            <Button onClick={confirmDeleteComment}>Yes</Button>
                        </Box>
                    </Paper>
                </Modal>
            }

            {
                parentCommentId !== '' &&
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
                                variant='outlined'
                                placeholder='Enter Comment'
                                fullWidth
                                multiline
                                rows={5}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gray',
                                        },
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: 'gray',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleCommentSubmit}>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e) => addComment(e)}
                                value={newComment}
                            />
                        </Grid>
                    </Paper>
                </Modal>
            }
            {
                editCommentId !== '' &&
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
                                variant='outlined'
                                placeholder='Enter Comment'
                                fullWidth
                                multiline
                                rows={5}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gray',
                                        },
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: 'gray',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleCommentEdit}>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e) => editComment(e)}
                                value={updatedComment}
                            />
                        </Grid>
                    </Paper>
                </Modal>
            }
        </>
    )
}

export default Post