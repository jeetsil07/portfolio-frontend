import styled from "@emotion/styled";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

export const Logo = styled(Avatar)`
  margin: "0 auto";
`;
export const SearchBar = styled("div")`
  width: 70%;
`;
export const ContentBox = styled(Box)<{ topMargin?: number, bgImg?: string }>`
  margin-top: ${(props) => props.topMargin}px;
  padding: 20px;
  box-sizing: border-box;
  background-image: url(${(props)=>props.bgImg});
  background-size: contain;
  background-position: start;
  background-repeat: no-repeat;
`;
export const GridContainer = styled(Grid)`
    width: 100%;
    Height: auto;
    padding-top: 20px;
`;
export const ImageBox = styled(Box)`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 10px white, 0 0 0 15px #47a992;
`;
export const AboutText = styled(Typography)`
text-align: left;
 margin-top: 10px
`;
export const CustomButton = styled(Button)<{btnColor?: string}>`
    background-color: ${props=> props.btnColor === '#FF0060'?'#47A992':'#FF0060'};
    margin: 10px;
    &:hover{
        background-color: ${props=> props.btnColor === '#FF0060'?'#FF0060':'#47A992'};
    }
`;
