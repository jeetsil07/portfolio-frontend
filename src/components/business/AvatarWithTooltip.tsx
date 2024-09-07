import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { secondaryColor } from '../../util/constant';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

const AvatarWithTooltip = ({ id }: { id: number }) => {
    const [avatarId,setAvatarId ] = useState<null|number>(null)
    const handleClick = (id: number)=>{
        setAvatarId(prevId => (prevId === id ? null : id));
    }
    const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: 'white',
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: 11,
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: 'white',
        },
    }));

    const TooltipLabel = () => (
        <Box m={1}>
            <Typography variant="subtitle2" sx={{ color: secondaryColor }}>
                Hi, I am Jeet. Quibusdam magni eligendi exercitationem cum ratione
                possimus et minus eaque reprehenderit, accusamus itaque sunt inventore?
            </Typography>
        </Box>
    );

    return (
        <LightTooltip
            title={<TooltipLabel />}
            arrow
            placement="top"
            {...((isMobile || isTablet) ? { open: avatarId === id } : {})}
            onClick={()=>handleClick(id)}
        >
            <Avatar
                sx={{
                    bgcolor: 'green',
                    margin: 'auto',
                    cursor: 'pointer', // Change cursor to hand on hover
                }}
            >
                H
            </Avatar>
        </LightTooltip>
    );
};

export default AvatarWithTooltip;
