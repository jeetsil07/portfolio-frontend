import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Typography,
    TablePagination,
    Box,
    IconButton,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../app/hook';
import { getUserData } from '../../slices/user';
import { getUiUxState } from '../../slices/ui';
import { primaryColor, secondaryColor } from '../../util/constant';
import { sortPosts } from '../../util/general';

const PostsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [paginatedData, setPaginatedData] = useState<any[]>([]);
    const { user } = useAppSelector(getUserData);
    const { postCategory, postData } = useAppSelector(getUiUxState);

    
    useEffect(() => {
        console.log(postData.data.data,'all post')
        
        if (postData?.data.data) {
            const sortedPosts = sortPosts([...postData?.data.data], 'new')
            const userPosts = sortedPosts.filter((post: any) => post.user?.user_id === user.user_id);
            console.log('userPosts',userPosts)
            setFilteredData(userPosts);
        }
        
    }, [postData, user]);

    useEffect(() => {
        if (filteredData.length > 0) {
            const paginatedPosts = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
            setPaginatedData(paginatedPosts);
        }
    }, [filteredData, page, rowsPerPage]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when rows per page changes
    };

    const getCategoryName = (categoryId: number) => {
        const category = postCategory.data.find((cat: any) => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    const handlePostDelete = (id: any) => {
        // Implement delete functionality here
        
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Last Action</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {(filteredData.length > 0 && paginatedData.length > 0) ? (
                        <TableBody>
                            {paginatedData.map((post: any) => (
                                <TableRow key={post.id}>
                                    <TableCell>{getCategoryName(post.post_category)}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            variant="square"
                                            src={post.image}
                                            alt={post.title}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </TableCell>
                                    <TableCell>{new Date(post.updated_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            sx={{ color: primaryColor }}
                                            // onClick={() => onEdit(post.id)}
                                            aria-label="edit"
                                        >
                                            <EditNoteIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: secondaryColor }}
                                            onClick={() => handlePostDelete(post.id)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <Box sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h6">No data available</Typography>
                        </Box>
                    )}
                </Table>
            </TableContainer>
            {filteredData.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};

export default PostsTable;
