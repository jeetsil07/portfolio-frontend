import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ContentBox, GridContainer } from './../StyledComponents/CommonStyle';
import { primaryColor, secondaryColor } from '../../util/constant';

const Skills = () => {
    
    const [skillPage, setSkillPage] = useState(1);
    const [skills, setSkills] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    
    const allSkillsprogress = useMemo(() => [70, 80, 90, 70, 90, 80, 60, 80, 70, 60], []);
    const allSkillsTitle = ['React Js', 'Laravel', 'Javascript', 'Php', 'Html', 'Css', 'Bootstrap', 'Material Ui', 'Figma', 'Aws']
    const handleSkillPage = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        if (page !== skillPage) {
            setSkillPage(page);
            setSkills([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }, [skillPage])
    useEffect(() => {
        const timer = setInterval(() => {
            setSkills(prevSkills => {
                const updatedSkillOptions = prevSkills.map((skill, index) => {
                    if (skill < allSkillsprogress[index]) {
                        return skill + 10;
                    } else {
                        return allSkillsprogress[index];
                    }
                });
                if (JSON.stringify(updatedSkillOptions) === JSON.stringify(allSkillsprogress)) {
                    clearInterval(timer);
                }
                return updatedSkillOptions;
            });
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, [allSkillsprogress, skillPage]);
    const skillsPerPage = 3;
    const totalSkillPage = Math.ceil(allSkillsprogress.length / skillsPerPage);
    const startIndex = (skillPage - 1) * skillsPerPage;
    const endIndex = startIndex + skillsPerPage;

    return (
        <>
            <Box>
                <ContentBox sx={{ backgroundColor: '#F2EFE5', margin: '30px' }}>
                    <Typography variant="h4" align='center' margin={3} sx={{ color: primaryColor }}>SKILLS & TECH STACK</Typography>
                    <GridContainer container justifyContent="center" alignItems="center">
                        {
                            skills.slice(startIndex, endIndex).map((skill, index) => (
                                <Grid key={index} item md={3} sx={{ margin: "30px" }}>
                                    <Box sx={{ position: "relative", display: 'flex', justifyContent: 'center' }} >
                                        <CircularProgress variant="determinate" value={skill} size={100} sx={{ color: secondaryColor }} />
                                        <Typography sx={{ color: primaryColor, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>{skill}%</Typography>
                                    </Box>
                                    <Typography align="center" margin={'10px'} sx={{ color: primaryColor }} >{allSkillsTitle[startIndex + index]}</Typography>
                                </Grid>
                            ))
                        }

                    </GridContainer>
                    <GridContainer container justifyContent="center" alignItems="center">
                        <Stack spacing={2}>
                            <Pagination count={totalSkillPage} showFirstButton showLastButton 
                             page={skillPage} onChange={handleSkillPage} 
                             sx={{
                                '& .MuiPaginationItem-root': {
                                  color: primaryColor, // Change to your desired color
                                },
                                '& .Mui-selected': {
                                  backgroundColor: `${secondaryColor} !important`, // Change to your desired color
                                  color: 'white', // Change to your desired color
                                  transform: 'scale(1.2)'
                                },
                                alignSelf: 'center'
                              }} 
                            />
                        </Stack>
                    </GridContainer>
                </ContentBox>
            </Box >
        </>
    )
}

export default Skills