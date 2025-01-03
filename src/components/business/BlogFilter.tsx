import { FormControlLabel, FormGroup, RadioGroup, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BlogFilterPanel, StyledButton, StyledCheckBox, StyledDivider, StyledFilterButtonsHolder, StyledRadio } from '../StyledComponents/CommonStyle'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getUiUxState, setBlogFilter } from '../../slices/ui';
import { primaryColor } from '../../util/constant';

const BlogFilter = () => {
  const {blogFilter, navBar} = useAppSelector(getUiUxState);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const dispatch = useAppDispatch();
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
  const ratings = [5, 4, 3, 2, 1];
  return (
    <BlogFilterPanel marginTop={navBar?.height}>
      <Typography variant="h5" color={primaryColor}>
        Apply Filters
      </Typography>
      <StyledDivider/>
      <Typography variant="h6" color={primaryColor}>
        Date
      </Typography>
      <RadioGroup
        aria-labelledby="filterDate"
        defaultValue="new"
        name="filterDate"
        value={dateFilter}
        onChange={handleDateFilter}
      >
        <FormControlLabel value="new" control={<StyledRadio />} label="Newest First" />
        <FormControlLabel value="old" control={<StyledRadio />} label="Oldest First" />
      </RadioGroup>
      <StyledDivider/>
      <Typography variant="h6" color={primaryColor}>
        Ratings
      </Typography>
      <FormGroup>
        {ratings.map((rating) => (
          <FormControlLabel
            key={rating}
            control={
              <StyledCheckBox
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
              <StyledCheckBox
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
      <StyledFilterButtonsHolder>
        <StyledButton spaceMargin={true} variant='contained' size='large'onClick={resetFilter}>Reset</StyledButton>
        <StyledButton spaceMargin={true} variant='contained' size='large' onClick={setFilter}>Apply</StyledButton>
      </StyledFilterButtonsHolder>
    </BlogFilterPanel>
  )
}

export default BlogFilter