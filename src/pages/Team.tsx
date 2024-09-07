import React from 'react'
import { ContentBox } from '../components/StyledComponents/CommonStyle'
import { useAppSelector } from '../app/hook';
import { getUiUxState } from '../slices/ui';
import { Avatar, Box, Grid, Typography} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { primaryColor, secondaryColor } from '../util/constant';
import { green, pink } from '@mui/material/colors';
import { styled } from '@mui/system';
import AvatarWithTooltip from '../components/business/AvatarWithTooltip';
const Team = () => {
    const members = [
        {
            id: 1,
            name: 'Jeet'
        },
        {
            id: 2,
            name: 'Jeet'
        },
        {
            id: 3,
            name: 'Jeet'
        },
        {
            id: 4,
            name: 'Jeet'
        },
        {
            id: 5,
            name: 'Jeet'
        },
        {
            id: 6,
            name: 'Jeet'
        },
        {
            id: 7,
            name: 'Jeet'
        },
        {
            id: 8,
            name: 'Jeet'
        },
        {
            id: 9,
            name: 'Jeet'
        },
        {
            id: 10,
            name: 'Jeet'
        },
        {
            id: 11,
            name: 'Jeet'
        },
        {
            id: 13,
            name: 'Jeet'
        },
        {
            id: 14,
            name: 'Jeet'
        },
        {
            id: 15,
            name: 'Jeet'
        },
        {
            id: 16,
            name: 'Jeet'
        },
        {
            id: 17,
            name: 'Jeet'
        },
        {
            id: 18,
            name: 'Jeet'
        },
        {
            id: 19,
            name: 'Jeet'
        },
        {
            id: 21,
            name: 'Jeet'
        },
        {
            id: 22,
            name: 'Jeet'
        },
        {
            id: 23,
            name: 'Jeet'
        },
        {
            id: 24,
            name: 'Jeet'
        },
        {
            id: 25,
            name: 'Jeet'
        },
        {
            id: 26,
            name: 'Jeet'
        },
        {
            id: 27,
            name: 'Jeet'
        },
        {
            id: 28,
            name: 'Jeet'
        },
        {
            id: 29,
            name: 'Jeet'
        },
        {
            id: 31,
            name: 'Jeet'
        },
        {
            id: 32,
            name: 'Jeet'
        },
        {
            id: 33,
            name: 'Jeet'
        },
        {
            id: 34,
            name: 'Jeet'
        },
        {
            id: 35,
            name: 'Jeet'
        },
        {
            id: 36,
            name: 'Jeet'
        },
        {
            id: 37,
            name: 'Jeet'
        },
        {
            id: 38,
            name: 'Jeet'
        },
        {
            id: 39,
            name: 'Jeet'
        },
    ]
    const { navBar } = useAppSelector(getUiUxState);
    
    return (
        <ContentBox topmargin={navBar.height} minHeight="80vh">
    <Grid container mb={5}>
        <Typography variant="h5" sx={{ margin: 'auto', color: primaryColor }}>
            Our Team
        </Typography>
    </Grid>
    <Grid container spacing={5}>
        {members.map((member, index) => (
            <Grid item xs={3} lg={1} key={index}>
                <AvatarWithTooltip id={member.id}/>
            </Grid>
        ))}
        <Grid item></Grid>
    </Grid>
</ContentBox>
    )
}

export default Team

