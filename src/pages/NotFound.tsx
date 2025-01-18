import React, { useEffect } from 'react'
import { ContentBox, NoContent } from '../components/StyledComponents/CommonStyle'
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUiUxState, setNavBar } from '../slices/ui'

const NotFound = () => {
  const {navBar} = useAppSelector(getUiUxState)
  const dispatch = useAppDispatch();
  useEffect(()=>{
      dispatch(
        setNavBar({
          selectedTab: -1,
        })
      );
    },[])
  return (
    <ContentBox topmargin={navBar.height}>
      <NoContent>
        <h3>Page Not Found</h3>
      </NoContent>
    </ContentBox>
  )
}

export default NotFound