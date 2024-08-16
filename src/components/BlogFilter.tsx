import { Autocomplete, Box, Button, ButtonGroup, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BlogFilterPanel, CustomButton } from './StyledComponents/CommonStyle'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { getUiUxState, setBlogFilter } from '../slices/ui';
import { primaryColor } from '../util/constant';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const top100Films = [
  { title: 'The Shawshank Redemption' },
  { title: 'The Godfather' },
  { title: 'The Godfather: Part II' },
  { title: 'The Dark Knight' },
  { title: '12 Angry Men' },
  { title: "Schindler's List" },
  { title: 'Pulp Fiction' },
];
const BlogFilter = () => {
  const {blogFilter, navBar} = useAppSelector(getUiUxState);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  // const stopPropagation = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  //   event.stopPropagation();
  // };
  useEffect(()=>{
    setDateFilter(blogFilter.filter.date)
    setRatingFilter(blogFilter.filter.ratings)
  },[blogFilter]);
  const setFilter = () => {
    dispatch(
      setBlogFilter({
        open: false,
        filter:{
            date: dateFilter,
            ratings: ratingFilter
        }
      })
    )
  }
  const resetFilter = () => {
    setDateFilter('new');
    setRatingFilter([]);
    dispatch(
      setBlogFilter({
        filter:{
            date: 'new',
            ratings: []
        }
      })
    )
  }

  const handleDateFilter = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setDateFilter(value)
  }

  const handleRatingFilter = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const value = Number(event.target.value);
    if (checked) {
      if (!ratingFilter.includes(value)) {
        setRatingFilter((prev) => [...prev, value]);
      }
    } else {
      setRatingFilter((prev) => prev.filter((item) => item !== value));
    }
  }
  console.log(ratingFilter)
  const ratings = [5, 4, 3, 2, 1];
  return (
    <BlogFilterPanel sx={{boxShadow: 1, marginTop: `${navBar?.height}px`}}>
      <Typography variant="h5" color={primaryColor}>
        Date
      </Typography>
      <RadioGroup
        aria-labelledby="filterDate"
        defaultValue="new"
        name="filterDate"
        value={dateFilter}
        onChange={handleDateFilter}
      >
        <FormControlLabel value="new" control={<Radio sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }} />} label="Newest First" />
        <FormControlLabel value="old" control={<Radio sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }} />} label="Oldest First" />
      </RadioGroup>
      <Divider sx={{ margin: '5px 0' }} />
      <Typography variant="h5" color={primaryColor}>
        Ratings
      </Typography>
      <FormGroup>
        {ratings.map((rating) => (
          <FormControlLabel
            key={rating}
            control={
              <Checkbox
                sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }}
                onChange={handleRatingFilter}
                value={rating}
                checked={ratingFilter.includes(rating)}
              />
            }
            label={
              <Typography variant="body1">
                <Rating name="read-only" value={rating} readOnly sx={{ display: 'flex' }} />
              </Typography>
            }
          />
        ))}
        <FormControlLabel
            control={
              <Checkbox
                sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }}
                onChange={handleRatingFilter}
                value={0}
                checked={ratingFilter.includes(0)}
              />
            }
            label={
              <Typography variant="body1">
                <Rating name="read-only" value={0} readOnly sx={{ display: 'flex' }} />
              </Typography>
            }
          />
      </FormGroup>
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: '25px',
        backgroundColor: '#fff'
      }}>
        <CustomButton variant='contained' size='large' marginRight={true} onClick={resetFilter}>Reset</CustomButton>
        <CustomButton variant='contained' size='large' onClick={setFilter}>Apply</CustomButton>
      </Box>
    </BlogFilterPanel>
  )
}

export default BlogFilter