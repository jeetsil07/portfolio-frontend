import React, { RefObject, useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getUserData } from "../../slices/user";
import {
  getUiUxState,
  setNavBar,
  setPostCategory,
  setPostData,
} from "../../slices/ui";
import { primaryColor, secondaryColor } from "../../util/constant";
import { sortPosts } from "../../util/general";
import { Post } from "../../util/type/types";
import routes from "../../util/routes";
import { useNavigate } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../services/posts.service";
import { useGetPostsCategoryQuery } from "../../services/postsCategory.service";

interface PostTableProps {
  UpdateFormRef: RefObject<HTMLDivElement>;
}
const PostsTable: React.FC<PostTableProps> = ({ UpdateFormRef }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const { user } = useAppSelector(getUserData);
  const { postCategory, postData, navBar } = useAppSelector(getUiUxState);
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
  }, [postCategories]);

  const { data, isLoading } = useGetPostsQuery("");

  useEffect(() => {
    console.log("useeffect", data);
    if (!data || data.status !== 200) return;
    console.log("success");
    dispatch(
      setPostData({
        data: data,
      })
    );
  }, [data]);

  useEffect(() => {
    if (postData?.data.data) {
      const sortedPosts = sortPosts([...postData?.data.data], "new");
      const userPosts = sortedPosts.filter(
        (post: any) => post.user?.user_id === user.user_id
      );
      setFilteredData(userPosts);
    }
  }, [postData, user]);

  useEffect(() => {
    if (filteredData.length > 0) {
      const paginatedPosts = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setPaginatedData(paginatedPosts);
    }
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const getCategoryName = (categoryId: number) => {
    const category = postCategory.data.find(
      (cat: any) => cat.id === categoryId
    );
    return category ? category.name : "Unknown Category";
  };

  const openPost = (post: Post) => {
    dispatch(
      setPostData({
        selectedPost: post,
      })
    );
    dispatch(
      setNavBar({
        selectedTab: -1,
      })
    );
    navigate(routes.post);
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  const handleEditPost = (post: Post) => {
    dispatch(
      setPostData({
        editPost: post,
      })
    );
    const element = UpdateFormRef?.current;

    if (element) {
      // Scroll the element into view smoothly
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align the element to the top of the viewport
      });
  
      // Listen for the scroll event to adjust the scroll position
      const adjustScroll = () => {
        // Adjust the scroll position to leave a 70px gap at the top
        window.scrollBy(0, -(navBar.height+20));
        // Remove the scroll event listener after adjustment
        window.removeEventListener("scroll", adjustScroll);
      };
  
      // Add a one-time scroll event listener to adjust the scroll after the smooth scroll
      window.addEventListener("scroll", adjustScroll, { once: true });
    }
  };

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const handleDelete = async (postId: any) => {
    try {
      await deletePost(postId).unwrap();
      console.log(`Post with ID ${postId} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
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
          {filteredData.length > 0 && paginatedData.length > 0 ? (
            <TableBody>
              {paginatedData.map((post: any) => (
                <TableRow key={post.id}>
                  <TableCell>{getCategoryName(post.post_category)}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={post.title}
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
                    >
                      <Typography
                        variant="body1"
                        onClick={() => {
                          openPost(post);
                        }}
                        sx={{
                          color: primaryColor,
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {post.title.length > 50
                          ? post.title.substring(0, 20) + "..."
                          : post.title}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Avatar
                      variant="square"
                      src={post.image}
                      alt={post.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(post.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: primaryColor }}
                      onClick={() => handleEditPost(post)}
                      aria-label="edit"
                    >
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: secondaryColor }}
                      onClick={() => handleDelete(post.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Box sx={{ padding: 2, textAlign: "center" }}>
              {isLoading ? (
                <Typography variant="h6">Loading...</Typography>
              ) : (
                <Typography variant="h6">No data available</Typography>
              )}
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
