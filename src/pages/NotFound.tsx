import React from 'react'
import { ContentBox } from '../components/StyledComponents/CommonStyle'
import { useAppSelector } from '../app/hook'
import { getUiUxState } from '../slices/ui'

const NotFound = () => {
  const {navBar} = useAppSelector(getUiUxState)
  return (
    <ContentBox topmargin={navBar.height}>
    <h3>Page Not Found</h3>
    </ContentBox>
  )
}

export default NotFound